const {instance} = require('../config/razorpay');
const Course = require('../models/Course')
const User = require('../models/User')
const mailSender = require('../utils/mailSender');
// const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const mongoose = require('mongoose')
require('dotenv').config();


// capture the payment and initialize the razorpay order 
exports.capturePayment = async (req, resp) => {
    // get course id and user id 
    const {courseId} = req.body;
    const userId = req.user.id;

    // valid course id and coourse details 
    if(!courseId){
        return resp.status(400).json({
            success: false,
            message: "Please provide valid course ID"
        })
    };

    let course;
    try {
        course = await Course.findById(courseId);
        if(!course){
            return resp.status(404).json({
                success: false,
                message: "Course details not found",
            })
        }
        
        // user already paid for same or not
        const uid = new mongoose.Types.ObjectId(userId);    // type conversion from string to Object ID
        if(course.studentsEnrolled.includes(uid)){
            return resp.status(200).json({
                success: false, 
                message: 'Student is already enrolled in this course',
            })
        }
        
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: err.message
        })
    } 


    // create an order 
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency: currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {        // this is used after payment authorization is done to recognize the user and course enrolled
            courseId: courseId,
            userId,
        }
    };

    try {
        // initiate payment using razorpay 
        const paymentResponse = await instance.orders.create(options);
        console.log("Payment Response: ",paymentResponse);

        // return the response
        return resp.status(200).json({
            success: true,
            message: "Order created successfully",
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    } catch(err) {
        console.log(err)
        return resp.status(500).json({
            success: false,
            message: 'razor pay order creation failed '+err.message
        })
    }

}




// verify signature of razorpay and server 
exports.verifySignature = async (req, resp) => {
    const webhookSecret =  process.env.WEBHOOK_SECRET;  // [ Manish ] do not keep these kind of details in process env. It could be compromised

    const signature = req.headers["x-razorpay-signature"];

    // these 3 steps are the ones which we used to replicate what razorpay does behind the scenes.
    const shaSum = crypto.createHmac("sha256", webhookSecret);
    shaSum.update(JSON.stringify(req.body));
    const digest = shaSum.digest("hex");

    if(signature == digest){
        console.log("Payment is authorized");

        // perform the enrollment using user id and course id from "notes" out of request body. We are doing this because this request is received from razorpay directly 
        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            // fulfull the action 

            // perform enrollment 
            const enrolledCourse = await Course.findOneAndUpdate(
                                                {_id: courseId},
                                                {
                                                    $push: {
                                                        studentsEnrolled: userId
                                                    }
                                                },
                                                {new: true},
            );

            if(!enrolledCourse){
                return resp.status(500).json({
                    success: false,
                    message: "Course not found. or failed for some reason during enrollment"
                })
            }

            console.log("Enrollment done: ", enrolledCourse);

            // find the student and add course to their list of enrolled courses 
            const enrolledStudent = await User.findOneAndUpdate(
                                            {_id: userId},
                                            {
                                                $push: {
                                                    courses: courseId,
                                                }
                                            },
                                            {new: true},
            );

            console.log("Enrolled student is ", enrolledStudent);

            // send mail to student 
            const emailResponse = await mailSender(enrolledStudent.email, "Enrollment confirmed! ", "template to be attached here");
            console.log("Email sent: ", emailResponse);

            return resp.status(200).json({
                success: true,
                message: "Signature is verified and course has been added",
            });

        } catch(err) {
            console.log("Error occurred while enrolling")
            return resp.status(500).json({
                success: false,
                message: 'Error occurred while enrolling '+err.message
            })
        }
    }else {
        return resp.status(400).json({
            success: false,
            message: "Signature not verified"
        })
    }
}