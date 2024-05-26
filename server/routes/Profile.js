const express = require("express")
const router = express.Router()
const { auth, isStudent } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  addToCart,
  removeFromCart,
} = require("../controllers/Profile")

// **************************************************************************************************
//                                      Profile routes
// **************************************************************************************************
// Delete User Account
router.delete("/deleteProfile",auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.post("/addToCart", auth, isStudent, addToCart)
router.post("/removeFromCart", auth, isStudent, removeFromCart)

module.exports = router