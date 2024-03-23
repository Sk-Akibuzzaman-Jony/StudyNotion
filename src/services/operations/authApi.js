import { apiConnector } from '../apiconnector';
import { auth } from '../api';
import { setUser } from '../../slices/profileSlice';
import { setToken } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function login(email, password, navigate, dispatch) {
  return async () => {
    const loggingIn = toast.loading('Logging In', {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
      autoClose: 5000,
    });
    try {
      const bodyData = {
        email: email,
        password: password
      };
      const response = await apiConnector("POST", auth.LOGIN_API, bodyData);
      if (response.data.success === true) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        dispatch(setToken(token));
        navigate("/");
        toast.dismiss(loggingIn);
        toast.success('Logged In', {
          toastId: "456",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 1000,
        })
      }
    } catch (error) {
      let errorMessage = "Login Failed, please try again later";
        if (error.request.status === 400) {
          errorMessage = "All fields are required, please try again";
        } else if (error.request.status === 401) {
          errorMessage = "Password Incorrect";
        } else if (error.request.status === 403) {
          errorMessage = "User is not registered with us, please signup first";
        }
        toast.error(errorMessage, {
          toastId: "789",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 2000,
        });
    } finally {
      toast.dismiss(loggingIn);
    }
  }
}

export function sendOTP(firstName, lastName, email, password, confirmPassword, currentUserType, dispatch, navigate) {
  return async () => {
    const loggingIn = toast.loading('Loading', {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
      autoClose: false,
    });
    try {
      //console.log(firstName, lastName, email, password, confirmPassword);
      //make a json of the details and store them in the session storage 
      const tempUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        accountType: currentUserType,
        otp: ""
      }
      sessionStorage.setItem("tempUser", JSON.stringify(tempUser));

      //send OTP 
      const response = await apiConnector("POST", auth.SEND_OTP, { email: email });
      if (response.data.success !== true) {
        console.error("OTP Generation failed");
      }
      navigate("/verify-otp");
    } catch (error) {
      let errorMessage = "Sending OTP failed, please try again later";
      if (error.request.status === 401) {
        errorMessage = "User is already signed up";
      }
      toast.error(errorMessage, {
        toastId: "789",
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      });
    } finally {
      toast.dismiss(loggingIn);
    }
  }
}


export function signup(otp, dispatch, navigate) {
  const loggingIn = toast.loading('Loading', {
    toastId: "123",
    position: "top-center",
    hideProgressBar: true,
    autoClose: false,
  });
  return async () => {
    try {
      //get tempUser date from session storage
      const tempUser = JSON.parse(sessionStorage.getItem("tempUser"));
      tempUser.otp = otp;
      const response = await apiConnector("POST", auth.SIGNUP_API, tempUser);
      sessionStorage.clear();
      navigate("/login")
      toast.success('Successfully signed up, please login with the new credentials', {
        toastId: "456",
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      })
    } catch (error) {
      let errorMessage = "Signup Failed, please try again later";
        if (error.request.status === 403) {
          errorMessage = "Please enter OTP";
        } else if (error.request.status === 400) {
          errorMessage = "Invalid OTP";
        }
        toast.error(errorMessage, {
          toastId: "789",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 2000,
        });
    } finally {
      toast.dismiss(loggingIn);
    }
  }
}

export function resetPasswordToken(email, setEmailSent){
  return async() =>{
    const loading = toast.loading('Please Wait', {
      toastId: "123",
      position: "top-center",
      hideProgressBar: true,
    });
    try {
      const response = await apiConnector("POST", auth.RESET_PASSWORD_TOKEN_API, { email: email });
      setEmailSent(true);
    } catch (error) {
      let errorMessage = "This service is not available, please try again later";
      if(error.request.status == 401){
        errorMessage = "The email is not registered with us";
      }
      toast.error(errorMessage, {
        toastId: "789",
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      });
    } finally {
      toast.dismiss(loading);
    }
  }
}

export function resetPassword(newPassword, confirmNewPassword, token, navigate){
  const loading = toast.loading('Please Wait', {
    toastId: "123",
    position: "top-center",
    hideProgressBar: true,
  });
  return async()=>{
    try {
      const response = await apiConnector("POST", auth.RESET_PASSWORD_API, { password: newPassword, confirmPassword:confirmNewPassword, token:token });
      if(response.status == 200){
        toast.success('Successfully changed password, please login again by using new password', {
          toastId: "456",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 1000,
        })
      }
    } catch (error) {
      let errorMessage = "Password reset unsuccessfull, please try again later";
      if(error.request.status === 401){
        errorMessage = "The token provided is invalid or is expired";
      }
      toast.error(errorMessage, {
        toastId: "789",
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      });
    } finally {
      toast.dismiss(loading);
      navigate("/login");
    }
  }
}