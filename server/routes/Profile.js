const express = require("express")
const router = express.Router()
const { auth, isStudent, isInstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  addToCart,
  removeFromCart,
  getInstructorDetails,
  editProfile,
} = require("../controllers/Profile")

// **************************************************************************************************
//                                      Profile routes
// **************************************************************************************************
// Delete User Account
router.delete("/deleteProfile",auth, deleteAccount)
router.post("/updateProfile", auth, updateProfile)
router.post("/editProfile", auth, editProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.post("/addToCart", auth, isStudent, addToCart)
router.post("/removeFromCart", auth, isStudent, removeFromCart)
//get instructor details
router.post("/getInstructorDetails", auth, isInstructor, getInstructorDetails);

module.exports = router