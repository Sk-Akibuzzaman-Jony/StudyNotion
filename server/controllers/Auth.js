const User = require("../model/Users");
const OTP = require("../model/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../model/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// send otp controller 
exports.sendOTP = async(req, res) => {
    try {
        // fetch email from request's body
        const {email} = req.body;
        
        // check if user is already present
        const foundUser = await User.findOne({email});

        //if user alreadt exists then return a resposnse
        if(foundUser){
            return res.status(401).json({
                success : false,
                message : "user already present",
            })
        }

        //generate otp 
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
        });
        console.log("OTP Generated - ", otp);

        //check unique otp or not 
        let result = await OTP.findOne({otp : otp});

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            });
            result = await OTP.findOne({otp : otp});
        }
        const otpPayLoad = {email, otp};

        //create and entry for otp
        const otpBody = await OTP.create(otpPayLoad);
        console.log(otpBody);

        //return response success
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message, 
        })
    }
}

//signup
exports.signUp = async(req, res) => {
    try {
        //fetch data from request's body
        const {
            firstName, 
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
    
        //checking if value is entered
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success : true,
                message:"All fields are required",
            })
        }
    
        //match confirm pass and pass
        if(confirmPassword != password){
            return res.status(400).json({
                success : false,
                message : "Password & ConfirmPassword values dont match",
            })
        }
    
        //check if user alreadt exists or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.update(409).json({
                success : false,
                message : "User is already registered",
            }) 
        }
    
        //find the most recent otp stored for that user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
    
        if(recentOtp.length == 0){
            //otp not found
            return res.status(400).json({
                success : false,
                message : "OTP not found",
            })
        } else if(otp !== recentOtp[0].otp){
            //invalilid otp
            return res.status(401).json({
                succes : false,
                message : "Invalid OTP",
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName, 
            lastName,
            email,
            password : hashedPassword,
            accountType,
            additionalDetails : profileDetails._id,
            image : `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`
        });
        
        //return res
        return res.status(200).json({
            success : true,
            message : "User is successfully registered",
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

//login
exports.login = async(req, res) => {
    console.log("Hello From Login");
    try {
        // get data from req body
        const {email, password} = req.body;

        //validation data
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required, please try again",
            })
        }

        //check user exists or not
        const user = await User.findOne({ email });

        if(!user){
            return res.status(403).json({
                success:false,
                message:"User is not registered with us, please signup first",
            })
        }

        //generate jwt, after password matcing
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"12h",
            })
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        } else {
            return res.status(401).json({
                success:false,
                message:"Password Incorrect",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failed, please try again later"
        })
    }
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "Your Password has been updated",
				passwordUpdated(
					updatedUserDetails.email,
					`${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};