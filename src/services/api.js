const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API : BASE_URL+"/course/showAllCategories",
    GET_CATEGORY_PAGE_DETAILS : BASE_URL+"/course/getCategoryPageDetails"
}

export const auth = {
    LOGIN_API : BASE_URL+"/auth/login",
    SEND_OTP : BASE_URL+"/auth/sendotp",
    SIGNUP_API : BASE_URL+"/auth/signup",
    RESET_PASSWORD_TOKEN_API : BASE_URL+"/auth/reset-password-token",
    RESET_PASSWORD_API : BASE_URL+"/auth/reset-password",
}

export const profile ={
    UPLOAD_PROFILE_PIC : BASE_URL+"/profile/updateDisplayPicture",
    DELETE_ACCOUNT : BASE_URL+"/profile/deleteProfile",
    CHANGE_PASSWORD : BASE_URL+"/auth/changepassword",
    GET_ENROLLED_COURSES : BASE_URL+"/profile/getEnrolledCourses",
    ADD_TO_CART : BASE_URL+"/profile/addToCart",
    REMOVE_FROM_CART : BASE_URL+"/profile/removeFromCart",
    GET_INSTRUCTOR_DETAILS : BASE_URL + "/profile/getInstructorDetails",
    UPDATE_PROFILE : BASE_URL + "/profile/updateProfile",
    EDIT_PROFILE : BASE_URL + "/profile/editProfile",
}

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
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    GET_COURSE_PROGRESS_API : BASE_URL + "/course/getCoureseProgress",
    GET_ALL_REVIEWS : BASE_URL + "/course/getReviews"
  }

export const paymentEndpoints = {
    CAPTURE_PAYMENT: BASE_URL + "/payment/capturePayment",
    VERIFY_SIGNATURE: BASE_URL + "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL: BASE_URL + "/payment/success",
}
