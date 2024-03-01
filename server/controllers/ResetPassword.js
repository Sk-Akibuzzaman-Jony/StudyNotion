const User = require("../model/Users");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resets password token - this controller just makes a unique token 
//against an user in case of resetting the password and sends it to its mail
//it also saves this to the user model along with the expiration time
exports.resetPasswordToken = async (req, res) => {
    try {
        //getting the email from the body
        const email = req.body.email;
        //check user for this email
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}

        //generate token
        const token = crypto.randomUUID(); //this creates a radom token

        //update user with token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email}, {
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000, //5mins expiration time
        },
        {new:true}); //this new : true means the record with the updated details will be stored in "updatedDetails"
        console.log("DETAILS", updatedDetails);
        //create frontEnd url
        const url = `http://localhost:3000/update-password/${token}`

        //send mail using mailSender with the details
        await mailSender(email, 
            "Password Reset Link",
            `Password Reset Link: ${url}`);
        
        //return response 
        return res.status(200).json({
            success:true,
            message:"Email sent successfully, please check email and change pwd"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset pwd mail"
        })
    }
}


//now this controller actually resets the password 
exports.resetPassword = async (req, res) => {
    try {
        //data fetch from request
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password != confirmPassword){
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }

        //check user with token
        const userDetails = await User.findOne({token:token});
        
        //if token is invalid
        if(!userDetails){
            return res.status(401).json({
                success : false,
                message:"token is invalid"
            })
        }

        //if token is valis but is expired
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success : false,
                message:"token is expired, please create a new token"
            })
        }

        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);
        //password update
        await User.findOneAndUpdate({token:token},{
            password:hashedPassword
        },{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset successful"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating password"
        })
    }
}