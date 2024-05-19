const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// [ Manish ] : learning about multiple populate statement at once

// create course handler function 
exports.createCourse = async (req, resp) => {
    try{
        //  fetch all data from request body 
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag} = req.body;

        // get thumbnail 
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return resp.status(400).json({
                success: false, 
                message: "All fields are required"
            });
        }
        console.log("Details of course creation  validated successfully")

        // check for instructor [ db call kar le, bcoz instructor ki detail daalni hoti hai course me ]
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details: "+instructorDetails);
        // TODO: [ Manish : check if instructorDetails._id and userId are same, we can save 1 DB call here ]

        if(!instructorDetails){
            return resp.status(404).json({
                success: false,
                message: "Instructor details not found"
            });
        }

        // check if given category is valid or not [ not needed because it is selected from a dropdown ie. always valid]
        const categoryDetails = await Category.findById(category);
        console.log("Category details: ",categoryDetails);
        if(!categoryDetails){
            return resp.status(404).json({
                success: false,
                message: "category details not found"
            });
        }

        // upload image to cloudinary 
        const thumbnailImg = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("Thumbnail uploaded successfully", thumbnailImg)

        // create an entry for this new course 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,  // pay attention to this one, this is why we queried earlier 
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,      // use $push for pushing it to the category
            thumbnail: thumbnailImg.secure_url,
        })
        console.log("Entry created in course")
        // update this course to the user's course list (bcoz this user is an instructor)
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true},
        );

        // Tag update is not needed for now.
        // update the tag's schema 
        // await Tag.findByIdAndUpdate(
        //     {_id: tagDetails._id},
        //     {
        //         $push: {
        //             courses: newCourse._id,
        //         }
        //     },
        //     {new: true}
        // )

        // return response
        return resp.status(200).json({
            success: true,
            message: "Course created successfully ",
            data: newCourse,
        })
    }
    catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Course Creation failed"
        })
    }
}


// get all courses 
exports.getAllCourses = async (req, resp) => {
    try{
        const {courseId} = req.body;

        // babbar did it like await Course.find({_id: courseId}, remaining code)
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        }).populate(
            {
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            }
        )
        .populate("category")
        .populate("ratingAndReviews")
        .populate(
            {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }
        )
        .exec();

        if(!allCourses){
            return resp.status(404).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            })
        }

        return resp.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        })
    }
    catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Fetching of all courses has been failed"
        })
    }
}


exports.getCourseDetails = async (req, resp) => {
    try {
        // fetch course data 
        const {courseId} = req.body;

        // query db and populate course details object 
        const courseDetails = await Course.findById(courseId);

        if(!courseDetails){
            return resp.status(404).json({
                success: false,
                message: "Course data not found for this Course",
            });
        }

        return resp.status(200).json({
            success: true,
            message: "Course data retrieved successfully",
            data: courseDetails,
        });
    } catch (err){
        return resp.status(500).json({
            success: false,
            message: "Error occurred while fetching the course details"
        })
    }
}