const Profile = require('../models/Profile')
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')

// HW: how do we schedule to delete a profile after 5 days from DB

// create is already done while user creationn, so only try to update the additional details 
exports.updateProfile = async (req, resp) => {
    try {
        // fetch data 
        const {gender, dateOfBirth='', about='', phone} = req.body;
        const userId = req.user.id;

        // validate data [ Manish : i don't think it is needed for this scenario]
        if(!gender || !phone ){
            return resp.status(500).json({
                success: false,
                message: "Missing additional information"
            })
        }

        // find profile 
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // perform update 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.phone = phone;
        await profileDetails.save();

        // return response 
        return resp.status(200).json({
            success: true,
            message: "Profile has been updated successfully",
            data: profileDetails
        })
        
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Profile update failed"
        })
    }
}


// [ Manish (cron job) -> learn about cron jobs and try to delete the user after 5 days ]
// delete account 
exports.deleteAccount = async (req, resp) => {
    try {
        const id = req.user.id;

        // validation 
        const userDetails = await User.findById(id);

        if(!userDetails){
            return resp.status(404).json({
                success: false,
                message: "user not found to delete"
            })
        }
        // [Manish - TODO] un-enroll user from all couerses

        // delete from profile first then delete from user 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id:id});

        // return response 
        return resp.status(200).json({
            success: true,
            message: "User has been deleted successfully"
        })
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "Problem in deletion of this account"
        })
    }
}


// get all user details 
exports.getAllUserDetails = async (req, resp) => {
    try {
        // get id 
        const id = req.user.id;

        // validation and user details 
        const userDetails = await User.findById(id).populate('additionalDetails').exec();
        // return response 
        return resp.status(200).json({
            success: true,
            message: "All user related data is fetched successfully ",
            data: userDetails,
        })
    } catch(err) {
        console.error("error occurred ", err)
        return resp.status(500).json({
            success: false,
            message: "Problem while fetching all details of this account"
        })
    }
}

// copied from babbar's code
exports.updateDisplayPicture = async (req, res) => {
    try {
      // console.log("Trying to update DP")
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
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

exports.removeDisplayPicture = async (req, resp) => {
  try {
    // fetch data 
    const userId = req.user.id;

    // find profile 
    const userDetails = await User.findByIdAndUpdate(userId, {
      image: "",}
    );
    

    // return response 
    return resp.status(200).json({
        success: true,
        message: "DP has been removed successfully",
        data: userDetails
    })
    
} catch(err) {
    return resp.status(500).json({
        success: false,
        message: "DP removal failed"
    })
}
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};