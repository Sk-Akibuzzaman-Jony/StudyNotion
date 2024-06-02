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
      window.location.reload();
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
  let result = []
  try {
    //console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      profile.GET_ENROLLED_COURSES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    console.log(response);
    result = response.data.courses == null ? {} : response.data;
  } catch (error) {
    console.error(error)
    toast.error("Could Not Get Enrolled Courses")
  }
  return result
}

export async function addToCart(courseId, token){
  const loading = toast.loading("Adding To Cart", {
    toastId: "123",
    position: "top-center",
    hideProgressBar: true,
    autoClose: false,
  });
  let result = []
  try {
    const response = await apiConnector(
      "POST",
      profile.ADD_TO_CART,
      {courseId:courseId},
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    //console.log(response);
    result = response.data.user == null ? {} : response.data.user;
  } catch (error) {
    console.error("PROBLEM IN ADDING TO CART....",error)
    toast.error("Could Not Add The Course To Cart")
  }
  toast.dismiss(loading)
  return result
}

export async function removeFromCart(courseId, token){
  const loading = toast.loading("Removing From Cart", {
    toastId: "123",
    position: "top-center",
    hideProgressBar: true,
    autoClose: false,
  });
  let result = []
  try {
    const response = await apiConnector(
      "POST",
      profile.REMOVE_FROM_CART,
      {courseId:courseId},
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    //console.log(response);
    result = response.data.user == null ? {} : response.data.user;
  } catch (error) {
    console.error("PROBLEM IN REMOVING TO CART....",error)
    toast.error("Could Not Remove The Course From Cart")
  }
  toast.dismiss(loading)
  return result
}

export async function getInstructorDetails(token){
  // const loading = toast.loading("Getting Instructor Details", {
  //   toastId: "123",
  //   position: "top-center",
  //   hideProgressBar: true,
  //   autoClose: false,
  // });
  let result = []
  try {
    //console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "POST",
      profile.GET_INSTRUCTOR_DETAILS,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    console.log(response);
    result = response?.data?.coursesWithDetails == null ? {} : response?.data?.coursesWithDetails;
  } catch (error) {
    console.error(error)
    toast.error("Could Not Get Instructor Details");
  }
  //toast.dismiss(loading)
  return result
}

export async function editAdditionalDetails(dispatch, data, token) {
    //console.log("Hello From Edit Additional Details");
    const loading = toast.loading("Uploading", {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
      autoClose: false,
    });
    try {
      const response = await apiConnector(
        "POST",
        profile.UPDATE_PROFILE,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.data.success === true) {
        console.log(response.data);
        dispatch(setUser(response?.data?.user));
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        toast.success("Successfully Edited", {
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
    }
  };

  export async function editProfileDetails(dispatch, data, token) {
    //console.log("Hello From Edit Additional Details");
    const loading = toast.loading("Uploading", {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
      autoClose: false,
    });
    try {
      const response = await apiConnector(
        "POST",
        profile.EDIT_PROFILE,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.data.success === true) {
        console.log(response.data);
        dispatch(setUser(response?.data?.user));
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        toast.success("Successfully Edited", {
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
    }
  };

