const Course = require('../models/Course')
const Category = require('../models/Category')
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const { convertSecondsToDuration } = require("../utils/secToDuration")

// [ Manish ] : learning about multiple populate statement at once

// create course handler function 
exports.createCourse = async (req, resp) => {
    try{
        //  fetch all data from request body 
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag: _tag,
            category,
            status,
            instructions: _instructions,
        } = req.body;

        console.log("_tag: ",_tag," _instructions: ",_instructions);
          
        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)
        
        console.log("Gathered input fields for course creation : "+courseName+", "+courseDescription+", "+whatYouWillLearn+", "+price+", "+category+", "+tag);

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
        if (!status || status === undefined) {
            status = "Draft"
        }

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
            instructions,
            category: categoryDetails._id,      // use $push for pushing it to the category
            thumbnail: thumbnailImg.secure_url,
            status: status,
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

        // Add the new course to the Categories
        const categoryDetails2 = await Category.findByIdAndUpdate(
        { _id: category },
        {
            $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        )
        console.log("categoryDetails2", categoryDetails2)

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

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
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

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  // Get a list of Course for a given Instructor
  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnroled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }