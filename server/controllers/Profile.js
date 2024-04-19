const Profile = require("../model/Profile");
const User = require("../model/Users");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

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
        const courses = User.findById(userId).populate("courses").courses;

        return res.status(200).json({
            success:true,
            message:"Fetched all enrolled Courses",
            courses,
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