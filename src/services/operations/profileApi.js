import { profile } from "../api";
import { toast } from "react-toastify";
import { apiConnector } from "../apiconnector";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../slices/profileSlice";

export function uploadProfilePic(dispatch, picture, token, setPreviewImage) {
  return async () => {
    const loading = toast.loading("Uploading", {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
      autoClose: false,
    });
    try {
      const formData = new FormData();
      formData.append("displayPicture", picture);
      formData.append("token", token);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await apiConnector(
        "PUT",
        profile.UPLOAD_PROFILE_PIC,
        formData,
        config
      );
      if (response.data.success === true) {
        dispatch(setUser(response.data.data));
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.success("Uploaded Successfully", {
          toastId: "456",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("A problem occured", {
        toastId: "456",
        position: "top-center",
        hideProgressBar: true,
        autoClose: 1000,
      });
    } finally {
      toast.dismiss(loading);
      setPreviewImage(null);
    }
  };
}

export function deleteAccount(token, navigate) {
  return async () => {
    const loading = toast.loading("Deleting Account", {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
      autoClose: false,
    });
    try {
      const response = await apiConnector("DELETE", profile.DELETE_ACCOUNT, {
        token: token,
      });
      if (response.data.success === true) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Your Account has been deleted successfully", {
          toastId: "456",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("A problem occured", {
        toastId: "456",
        position: "top-center",
        hideProgressBar: true,
        autoClose: 1000,
      });
    } finally {
      toast.dismiss(loading);
      navigate("/");
    }
  };
}

export function changePassword(
  token,
  oldPassword,
  newPassword,
  confirmNewPassword
) {
  return async () => {
    const loading = toast.loading("Changing Password", {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
      autoClose: false,
    });
    try {
      const response = await apiConnector("POST", profile.CHANGE_PASSWORD, {
        token: token,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      });
      if(response.data.success === true){
        toast.success("The Password Has Been Modified Successfully", {
          toastId: "456",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        toastId: "456",
        position: "top-center",
        hideProgressBar: true,
        autoClose: 1000,
      });
    } finally {
      toast.dismiss(loading);
    }
  };
}


export async function getUserEnrolledCourses(token) {
  const loading = toast.loading("Getting Enrolled Courses", {
    toastId: "123",
    position: "top-center",
    hideProgressBar: true,
    autoClose: false,
  });
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      profile.GET_ENROLLED_COURSES,
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.courses == null ? {} : response.data.courses;
  } catch (error) {
    console.error(error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(loading)
  return result
}
