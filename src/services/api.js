const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API : BASE_URL+"/course/showAllCategories",
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
    CHANGE_PASSWORD : BASE_URL+"/auth/changepassword"
}