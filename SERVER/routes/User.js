const express = require('express')
const userRoute = express.Router();

// Import the required controllers and middleware functions
const {
    login,
    signUp,
    sendotp,
    changePassword,
  } = require("../controllers/Auth")
  const {
    resetPasswordToken,
    resetPassword,
  } = require("../controllers/ResetPassword")
  
  const { auth } = require("../middlewares/auth")
  
  // Routes for Login, Signup, and Authentication
  
  // ********************************************************************************************************
  //                                      Authentication routes
  // ********************************************************************************************************
  
  // Route for user login
  userRoute.post("/login", login)
  
  // Route for user signup
  userRoute.post("/signup", signUp)
  
  // Route for sending OTP to the user's email
  userRoute.post("/sendotp", sendotp)
  
  // Route for Changing the password
  userRoute.post("/changepassword", auth, changePassword)
  
  // ********************************************************************************************************
  //                                      Reset Password
  // ********************************************************************************************************
  
  // Route for generating a reset password token
  userRoute.post("/reset-password-token", resetPasswordToken)
  
  // Route for resetting user's password after verification
  userRoute.post("/reset-password", resetPassword)


module.exports = userRoute;