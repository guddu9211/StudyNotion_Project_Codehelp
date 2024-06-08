const Section = require('../models/Section')
const Course = require('../models/Course')

// create section 
exports.createSection = async (req, resp) => {
    try{
        // get title of section 
        const {sectionName, courseId} = req.body;
        console.log("section creation data received: ",sectionName,courseId)
        // validation
        if(!sectionName || !courseId){
            return resp.status(400).json({
                success: false,
                message: "Invalid section name or courseId value is supplied"
            });
        }

        // create a section 
        const newSection = await Section.create({
            sectionName,
        });

        // update course with section id
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            {new: true},
        ).populate("courseContent").exec();

        console.log("Updated course details with new section  ");

        // return response
        return resp.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedCourse,
        })
    } catch(err){
        return resp.status(500).json({
            success: false,
            message: "Section creation failed"
        })
    }
}

// read section [ not needed actually, fetching course can populate this when needed ]

// update section
exports.updateSection = async (req, resp) => {
    // we don't need to update the ID of section in Course content, bcoz we are changing the title only
    try {
        const {sectionName, sectionId} = req.body;
        console.log("Section Name: ",sectionName," Section Id: ",(sectionId));

        // validation
        if(!sectionName || !sectionId){
            return resp.status(400).json({
                success: false,
                message: "Invalid section name is supplied"
            });
        }

        // update data 
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new: true}
        );
        console.log("Section response: ",section);

        // return response 
        return resp.status(200).json({
            success: true,
            message: "Section updated successfully"
        })
    } catch(err){
        return resp.status(500).json({
            success: false,
            message: "Section update failed"
        })
    }
}


// delete section
exports.deleteSection = async (req, resp) => {
    try {
        // only id is needed to delete
        const {sectionId, courseId} = req.body;

        // for query parameters
        // const sectionId= req.query.sectionId;
        // const courseId = req.query.courseId;

        if(!sectionId || !courseId){
            console.log("required data missing ");
            return resp.status(400).json({
                success: false,
                message: "Missing section id or course id, please verify"
            })
        }

        // delete the record 
        await Section.findByIdAndDelete(sectionId);

        // delete this entry from courseContnent 
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId,
                }
            },
            {new: true}
        )

        return resp.status(200).json({
            success: true,
            message: "Section has been deleted successfully"
        })
    } catch(err){
        return resp.status(500).json({
            success: false,
            message: "Section Deletion failed"
        })
    }
}