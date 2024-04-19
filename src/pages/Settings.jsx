import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/core/HomePage/Button";
import { UploadButton } from "../components/common/uploadButton";
import { deleteAccount, uploadProfilePic } from "../services/operations/profileApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ResetPasswordSection from "../components/settings/ResetPasswordSection";

const Settings = () => {
  const profileDetails = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleFileChange = (fileUrl) => {
    setFile(fileUrl);
  };
  const handleUpload = () => {
    dispatch(
      uploadProfilePic(dispatch, file, profileDetails, token, setPreviewImage)
    );
  };
  const [formData, setFormData] = useState({
    firstName: profileDetails.firstName,
    lastName: profileDetails.lastName,
    email: profileDetails.email
  });

  // Function to handle changes in input fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  //function to upload the changes of profile details to server
  const handleProfileSubmit = (e) => {
    console.log(formData.firstName);
    console.log(formData.lastName);
    console.log(formData.email);
    toast.error("The function to save the changes needs to be modified", {
      toastId: "789",
      position: "top-center",
      hideProgressBar: true,
      autoClose: 2000,
    });
  }

  //function to handle deletion of account
  const handleAccountDelete = () => {
    dispatch(deleteAccount(token, navigate));
  }

  return (
    <div className="w-8/12 mx-auto ">
      <div className="font-bold text-4xl text-richblack-5 pb-16">Settings</div>
      <div className="bg-richblack-700 p-10 rounded-lg mb-10">
        <div className="flex items-center">
          <img
            src={profileDetails.image}
            className="h-20 w-20 rounded-full mr-10"
          />
          <div>
            <div className="text-xl text-richblack-25">
              Change profile picture
            </div>
            <div className="flex gap-4 mt-5 text-richblack-5">
              <UploadButton
                setFile={handleFileChange}
                setPreviewImage={setPreviewImage}
              />
              <div onClick={handleUpload}>
                <Button>Upload</Button>
              </div>
            </div>
          </div>
        </div>
        {previewImage && (
          <div className="text-richblack-100 flex items-center font-bold gap-5 mt-8">
            Profile Picture preview →
            <img src={previewImage} className="h-20 w-20 rounded-full mr-10" />
          </div>
        )}
      </div>
      
      <div className="bg-richblack-700 p-10 rounded-lg mb-10">
        <div className="text-richblack-5 font-bold text-2xl pb-5">
          Personal Details
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="fname"
              className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
              value={formData.firstName}
              required
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="lastName"
              id="fname"
              className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
              value={formData.lastName}
              required
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-Mail
            </label>
            <input
              type="text"
              name="email"
              id="fname"
              className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
              value={formData.email}
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="my-auto translate-y-3 w-fit place-self-end" onClick={handleProfileSubmit}>
            <Button active={true}>Update</Button>
          </div>
        </div>
      </div>
      <div className="bg-richblack-700 p-10 rounded-lg mb-10">
      <ResetPasswordSection email={profileDetails.email}/>
      </div>
      <div className="bg-pink-900 p-10 rounded-lg mb-10 flex">
        <div>
          <div className="text-pink-400 text-2xl bg-pink-700 p-4 mr-5 rounded-full inline-block">
            <RiDeleteBin6Line className="mx-auto" />
          </div>
        </div>
        <div>
          <div className="text-richblack-5 font-bold text-2xl pb-5">Delete Account</div>
          <div className="text-richblack-5 mb-2">Would you like to delete account?</div>
          <div className="text-richblack-5 mb-4">This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</div>
          <button className="text-pink-300 italic text-lg" onClick={handleAccountDelete}>I want to delete my account.</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
