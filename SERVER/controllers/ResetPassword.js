const User = require("../models/User")
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

// reset password token  [ generates a link which will bring user to a page used for resetting his password ]
exports.resetPasswordToken = async (req, resp) => {
    try {
        // get email from req body 
        const email = req.body.email;

        // check user for this email, email validation 
        const user = await User.findOne({email: email});
        if(!user){
            return resp.status(400).json({
                success: false,
                message: "Your email is not registered in our DB"
            });
        }
        
        // generate random URL(unique token url) for reset password (install library crypto)
        const token = crypto.randomUUID();

        // update token url and expiration time to User model 
        const updateDetails =  await User.findOneAndUpdate(
                                                            {email: email},
                                                            {
                                                                token: token,
                                                                resetPasswordExpires: Date.now() + (5*60*1000),
                                                            },
                                                            {new: true}
                                                        );
        
        console.log("Updated details are: ",updateDetails)
        // send mail                                                            
        const uniqueUrl = `http://localhost:3000/update-password/${token}`;     // [ Manish: use actual frontend URL as base url ]

        // send mail containing the url 
        await mailSender(email,
                        "Password Reset Link",
                        `Password reset link is ${uniqueUrl}`);

        // return the response 
        return resp.status(200).json({
            success: true,
            message: "Email sent successfully. Please check your mailbox"
        })
    } catch(error){
        console.error("Error occurred while resetting password ",error);
        return resp.status(500).json({
            success: false, 
            message: "Something went wrong while performing reset of password"
        })
    }
}



// perform reset password [ update new password to DB ]
exports.resetPassword = async (req, resp) => {
    try {
        // token, password and confirm password will be retrieved from request 
        // [ Manish : make sure that frontend will send token in the body ]
        const { password, confirmPassword, token } = req.body;
        
        console.log("Inputs received as: ",token, password, confirmPassword);
        // validate 2 passwords 
        if(password !== confirmPassword){
            console.log(password, 'and ', confirmPassword, ' does not match');
            return resp.status(400).json({
                success: false, 
                message: "Password mismatch occurred"
            });
        }

        // identify the token is valid or not. by identifying 'user' using this token (check expiration too)
        const userDetails = await User.findOne({token: token});
        if(!userDetails){
            return resp.status(400).json({
                success: false,
                message: "Token is invalid bro. Request for a new URL"
            })
        }
        
        if(userDetails.resetPasswordExpires < Date.now() ){
            // token expiry check 
            return resp.status(500).json({
                success: false,
                message: "token has been expired"
            })
        }
        
        // hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // update the password in DB
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true},
        );

        // return the response
        return resp.status(200).json({
            success: true,
            message: "Reset password is successfully done"
        })
    } catch(error){
        return resp.status(400).json({
            success: false,
            message: "Problem while updating the password to DB. Either URL expired, or invalid, or password mismatch"
        })
    }
}


