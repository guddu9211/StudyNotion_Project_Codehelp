const express = require('express')
const profileRoutes = express.Router();

const { auth } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  removeDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
profileRoutes.delete("/deleteProfile", auth, deleteAccount)
profileRoutes.put("/updateProfile", auth, updateProfile)
profileRoutes.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
profileRoutes.get("/getEnrolledCourses", auth, getEnrolledCourses)
profileRoutes.put("/updateDisplayPicture", auth, updateDisplayPicture)
profileRoutes.delete("/removeDisplayPicture", auth, removeDisplayPicture)

module.exports = profileRoutes;