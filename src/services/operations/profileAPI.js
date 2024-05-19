import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import { settingEndpoints } from "../apis";



export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await apiConnector(
        "GET",
        courseEndpoints.GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
      // console.log(
      //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      //   response
      // )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = await response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function updateProfilePicture(formData){
    const toastId = toast.loading("Uploading new DP");
    try {
      const response = await apiConnector(
        "PUT",
        settingEndpoints.UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          contentType: 'multipart/form-data',
          Authorization: `Bearer ${formData.token}`,
        }
      )

      console.log("UPDATE PROFILE PICTURE API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Profile Picture Updated");
    }catch (err) {
      console.log("Error caught", err);
      toast.error("Could not upload profile picture");
    }
    toast.dismiss(toastId);
}

export async function removeDisplayPicture({token}){
    const toastId = toast.loading("Removing DP");
    try {
      const response = await apiConnector(
        "DELETE",
        settingEndpoints.REMOVE_DISPLAY_PICTURE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("REMOVE DISPLAY PICTURE API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Picture Removed");
    }catch (err) {
      console.log("Error caught", err);
      toast.error("Could not remove profile picture");
    }
    toast.dismiss(toastId);
}