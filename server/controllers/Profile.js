const Profile = require("../model/Profile");
const User = require("../model/Users");
const courseProgress = require("../model/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");

exports.updateProfile = async (req, res) => {
    try{
            //get data
            const {dateOfBirth="", about="", contactNumber, gender} = req.body;
            //get userId
            const id = req.user.id;

            console.log(id);

            //validation
            if(!contactNumber || !gender) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required',
                });
            } 
            //find profile
            const userDetails = await User.findById(id);

            console.log(userDetails.additionalDetails);

		    const profileDetails = await Profile.findById(userDetails.additionalDetails);
            if(!profileDetails) {
                return res.status(400).json({
                    success:false,
                    message:'profileDetails not found',
                });
            }
            

            //update profile
            profileDetails.dateOfBirth = dateOfBirth;
            profileDetails.about = about;
            profileDetails.gender = gender;
            profileDetails.contactNumber = contactNumber;
            await profileDetails.save();
            //return response
            return res.status(200).json({
                success:true,
                message:'Profile Updated Successfully',
                profileDetails,
            });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};  


//deleteAccount
//Explore -> how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
    try{
        //get id 
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:'User not found',
            });
        } 
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //TOOD: HW unenroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id});
       
        //return response
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            userDetails,
        });
       
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getEnrolledCourses = async(req, res) => {
    try {
        const userId = req.user.id;
        const uid = new mongoose.Types.ObjectId(userId);
        const user = await User.findById(userId).populate("courses").populate("courseProgress");
        console.log(user);
        return res.status(200).json({
            success:true,
            message:"Fetched all enrolled Courses",
            courses:user.courses,
            courseProgress:user.courseProgress,
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            message:error.message,
        })
    }

}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      //console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user?.id;

        if (!courseId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        const cid = new mongoose.Types.ObjectId(courseId);

        const user = await User.findByIdAndUpdate(
            uid,
            { $push: { cart: cid } },
            { new: true } 
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course added to cart",
            user, 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        const cid = new mongoose.Types.ObjectId(courseId);

        const user = await User.findByIdAndUpdate(
            uid,
            { $pull: { cart: cid } },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course removed from cart",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

