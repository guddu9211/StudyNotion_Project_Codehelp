const RatingAndReview = require('../models/RatingAndReview')
const Course = require('../models/Course');
const Contactus = require('../models/Contactus')
const { default: mongoose } = require('mongoose');

// [ Manish ] : lots of learning about mongoose, like aggregate function, $group, $elemMatch, select: , populate

// create a new rating 
exports.createRating = async (req, resp) => {
    try {
        // fetch data 
        const {rating, review, courseId} = req.body;
        const userId = req.user.id;

        // check if user enrolled or not 
        const courseDetails = await Course.findOne(
                                    {_id: courseId,
                                     studentsEnrolled: {$elemMatch: {$eq: userId}},
                                    },
        );

        if(!courseDetails){
            return resp.status(404).json({
                success: false,
                message: "Student is not enrolled in this course"
            })
        }

        // check if review is already done or not
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user: userId,
                                                course: courseId,
        });

        if(alreadyReviewed){
            return resp.status(403).json({
                success: false,
                message: "Review is already submitted by this user"
            });
        }

        // create a record in rating and review model
        const ratingAndReview = await RatingAndReview.create({
                                                rating,
                                                review,
                                                course: courseId,
                                                user: userId,
        })

        // update course with this information
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId,
                                        {
                                            $push: {
                                                ratingAndReviews: ratingAndReview._id,
                                            }
                                        },
                                        {new: true},   
                                );
        console.log("updated course details after registering the rating ",updateCourseDetails)

        // return response 
        return resp.status(200).json({
            success: true,
            message: "Rating and Review has been submitted successfully",
            data: ratingAndReview,
        })
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Rating and Review failed with error"
        })
    }
}

// get average rating 
exports.getAverageRating = async (req, resp) => {
    try {
        const {courseId} = req.body;

        // calculate avg rating 
        const result = await RatingAndReview.aggregate(
            {
                // this line is used to match the records which matches the given course id
                $match: {
                    course: new mongoose.Types.ObjectId(courseId), 
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                }
            }
        )

        // return response 
        if(result.length > 0){
            return resp.status(200).json({
                success: true,
                message: "Average rating calculated successfully",
                averageRating: result[0].averageRating,
            })
        }

        return resp.status(200).json({
            success: true,
            message: "Average rating is 0 because no rating is given",
            averageRating: 0,
        })
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "calculation of review and rating has been failed"
        })
    }
}

// get all rating
exports.getAllRating = async (req, resp) => {
    try {
        // in codehelp review section, we have all the reviews available, but it is possible to fetch a review based on course id or any other criteria
        const allReviews = await RatingAndReview.find({}).sort({"rating":desc})
                                                .populate({
                                                    path: "user",
                                                    select: "firstName lastName email image",
                                                })
                                                .populate({
                                                    path: "course",
                                                    select: "courseName",
                                                })
                                                .exec();

        return resp.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });
    }catch(err) {
        return resp.status(500).json({
            success: false,
            message: "getting all review and rating has been failed"
        })
    }
}


// contact us populate 
exports.contactus = async (req, resp) => {
    try {
        const {firstname, lastname, email, message, phoneNo} = req.body;
        if(!firstname || !email){
            return resp.json(400).json({
                success: false,
                message: "Bad request sent. Kindly send firstname and email for sure"
            })
        }

        const contactus = await Contactus.create({
            firstname,
            lastname,
            email,
            message,
            phoneNo
        });

        return resp.status(200).json({
            success: true,
            message: "Contact us submitted successfully",
            data: contactus
        })
        
    }catch(err){
        console.log("Error caught while trying to insert data into contact us table", err)
        return resp.status(400).json({
            success: false,
            message: "Error occurred while trying to insert data into contact us table"
        })
    }
}