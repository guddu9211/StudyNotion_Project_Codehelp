// Manish -> using this to define the endpoints to interact with Backend and collect the data 

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
}

export const settingEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`,
    REMOVE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/removeDisplayPicture`,
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
    RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
    SEND_OTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    SIGN_OUT_API: BASE_URL + "/auth/logout",
}

export const contactusEndpoints = {
    CONTACTUS_API: BASE_URL + "/course/contactus",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
  }
