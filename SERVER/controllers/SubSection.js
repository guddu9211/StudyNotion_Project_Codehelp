const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
const {uploadImageToCloudinary} = require('../utils/imageUploader')

// create subsection 
exports.createSubSection = async (req, resp) => {
    try {
        // fetch data 
        const {title, timeDuration, description, sectionId} = req.body;

        // extract video file 
        const video = req.files.videoFile;

        // validation
        if(!sectionId || !title || !timeDuration || !description){
            return resp.status(400).json({
                success: false,
                message: "All fields in this subsection are required",
            })
        }
        
        // upload to cloudinary and get secure url 
        const uploadDetais = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        
        // create a subsection 
        const subsectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetais.secure_url,
        })

        // add this subsection to parent section 
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: subsectionDetails._id,
                }
            },
            {new: true},
        ).populate("subSection").exec();   // [ Manish : fix this populate parameter]
        console.log("updates subsection is ",updatedSection)

        // return response to user
        return resp.status(200).json({
            success: true, 
            message: "SubSection has been created successfully"
        })
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Creation of subsection is failed"
        })
    }
}


// Homework 
// update subsection
exports.updateSubSection = async (req, resp) => {
    try {
        // fetch data 
        const {title, timeDuration, description, videoUrl, subSectionId} = req.body;

        // extract video file 
        const video = req.files.videoFile;

        // validation
        if(!subSectionId){
            return resp.status(400).json({
                success: false,
                message: "All fields in this subsection are required",
            })
        }

        const subSectionDetails = await SubSection.findById(subSectionId);
        
        // upload to cloudinary and get secure url 
        if(video !== undefined || videoUrl !== undefined) {
            const uploadDetais = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            console.log("New Video uploaded to cloudinary successfully ",uploadDetais);
            subSectionDetails.videoUrl = uploadDetais.secure_url;
            subSectionDetails.timeDuration = `${uploadDetais.duration}`
        }
        if (title !== undefined) {
            subSectionDetails.title = title
        }
    
        if (description !== undefined) {
            subSectionDetails.description = description
        }

        if(timeDuration !== undefined){
            subSectionDetails.timeDuration = timeDuration
        }
        
        const finalUploadDetails = await subSectionDetails.save();

        if(!finalUploadDetails){
            return resp.status(400).json({
                success: false,
                message: 'Update of subsection was failed, please check the logs'
            })
        }

        return resp.status(200).json({
            success: true,
            message: "Subsection has been updated successfully",
            data: finalUploadDetails
        })
        
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Update of subsection is failed"
        })
    }
}


// delete subsection
exports.deleteSubSection = async (req, resp) => {
    try {
        // fetch data 
        const {sectionId,subSectionId} = req.body;

        // validation
        if(!sectionId || !subSectionId){
            return resp.status(400).json({
                success: false,
                message: "All fields in this subsection are required",
            })
        }
        
        // pull this subsection id from the parent section
        const updatedSection = await Section.findByIdAndUpdate(
                                sectionId,
                                {
                                    $pull: {
                                        subSection: subSectionId,
                                    }
                                }
        );
        console.log("Updated parent section: ", updatedSection)

        // find and delete this subsection related entry 
        const updatedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        console.log(`Subsection with id ${subSectionId} deleted -> response returned as ${updatedSubSection}`);

        // return response to user
        return resp.status(200).json({
            success: true, 
            message: "SubSection has been deleted successfully"
        })
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Deletion of subsection is failed"
        })
    }
}