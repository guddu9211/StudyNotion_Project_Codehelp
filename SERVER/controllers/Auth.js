const User = require('../models/User')
const Profile = require('../models/Profile')
const OTP = require('../models/Otp')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const mailSender = require('../utils/mailSender')
require('dotenv').config();

// send OTP
exports.sendotp = async (req, resp) => {

    try{
        // fetch email from request body
        const {email} = req.body;

        // check if user already exists or not 
        const checkUserPresent = await User.findOne({email});

        // if user already exist, then return a response 
        if(checkUserPresent) {
            return resp.status(401).json({
                success: false, 
                message: "User is already present. You should be making a new account with a new email ID bro"
            })
        }

        // generate otp [ Manish : this function requires attention, never loop over DB calls (find a package for resolving this problem)]
        var result = undefined;
        do{
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            console.log("OTP  has been generated : ",otp);

            // check unique otp or not 
            result = await OTP.findOne({otp: otp});
        }while(result)

        const otpPayload = {email, otp};

        // create an entry in DB for this otp, here we are using PRE middleware hook to send emails
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP body of new entry: ",otpBody);

        // return a successful response 
        resp.status(200).json({
            success: true, 
            message: "OTP has been sent successfully !!"
        })

    }
    catch(error) {
        console.error("error occurred while sending OTP ",error);
        return resp.status(500).json({
            success: false, 
            message: `Error occurred while registering OTP ${otp}`
        })
    }
    
}





// sign up 
exports.signUp = async (req, resp) => {

    try{
        // fetch data from request body 
        const {
            firstName,
            lastName, 
            email,
            password, 
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        // validate it
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return resp.status(403).json({
                success: false, 
                message: "Please provide mandatory field related information"
            })
        }

        // match the 2 passwords 
        if(password !== confirmPassword){
            return resp.status(400).json({
                success: false, 
                message: "Password values does not match, kindly recheck before submitting"
            })
        }

        // check if user already exists 
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return resp.status(400).json({
                success: false,
                message: "This email is already registered"
            })
        }

        // find most recent OTP for this user 
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);     // [ Manish:  find why -1 is used ]
        // console.log("Recent otp is ",recentOtp);

        // console.log("All fields are ",firstName,lastName,email,password,confirmPassword,accountType,otp)
        // validate OTP
        if(recentOtp.length === 0){
            return resp.status(400).json({
                success: false, 
                message: "OTP is not found "
            })
        }

        
        recentOtp.otp = parseInt(recentOtp.otp);
        // console.log("OTP is ",otp, " and recent OTP is ",recentOtp.otp, ' are they not equal ? ',(parseInt(otp) !== recentOtp.otp));
        if(parseInt(otp) !== recentOtp.otp) {
            // invalid otp is entered by user 
            return resp.status(400).json({
                success: false,
                message: "OTP didn't match, kindly check again"
            })
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
        });

        // entry to be created in DB 
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}` // try to check dicebear website 
        })

        // send response to user
        return resp.status(200).json({
            success: true, 
            message: "User has been created successfully",
            user,
        })
    } catch(err){
        console.error("Error encountered while signing up ",err);
        return resp.status(500).json({
            success: false, 
            message: "User has not been created due to some issues. Check logs "
        })
    }
}




// login 
exports.login = async (req, resp) => {
    try {
        // get data from req body 
        const {email, password} = req.body;

        // validate data 
        if(!email || !password){
            return resp.success(403).json({
                success: false, 
                message: "All fields are requied, please try again"
            })
        }

        // check existing user 
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return resp.status(401).json({
                success: false, 
                message: "user is not registered"
            });
        }

        // generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:'2h',
            });
            user.token = token;
            user.password = undefined;

            // create cookie and send response 
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            resp.cookie("token", token, options).status(200).json({
                success: true, 
                token,
                user,
                message: "Logged in Successfully :D ",
            })
        }else{
            return resp.status(401).json({
                success: false, 
                message: "Password is incorrect. Kindly re-enter the password"
            })
        }

        

    } catch(err){
        console.error("Error occurred in login ", err);
        return resp.status(400).json({
            success: false, 
            message: "Error occurred in login"
        })
    }
}



// TODO
// change password
exports.changePassword = async (req, resp) => {
    try {
        // get data from request body 
        // get old password, new password and confirm new password 
        const {email, password, confirmPassword} = req.body;

        // validation check 
        if(password !== confirmPassword){
            return resp.status(400).json({
                success: false,
                message: "Password mismatch"
            });
        }

        // update password in database
        const hashedPassword = bcrypt.hash(password, 10);
        const userDetails = User.findOneAndUpdate({email: email},
                    {password: hashedPassword},
                    {new: true}
                );

        // send mail about password update
        mailSender(email, "Password Update confirmation", `The password has been updated for ${userDetails.firstName}`);

        // send response to user 
        return resp.status(200).json({
            success: true,
            message: "Password updated"
        })
    } catch(err){
        console.error("Error occurred while updating password");
        return resp.status(500).json({
            success: false, 
            message: "Error occurred while changing the password"
        })
    }
}