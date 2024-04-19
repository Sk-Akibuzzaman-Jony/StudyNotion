import React, { useState } from "react";
import Button from "../core/HomePage/Button";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../services/operations/profileApi";

const ResetPasswordSection = () => {
  const profileDetails = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    reNewPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = () => {
    dispatch(
      changePassword(
        token,
        formData.currentPassword,
        formData.newPassword,
        formData.reNewPassword
      )
    );
    setFormData(()=>({
        currentPassword : "",
        newPassword : "",
        reNewPassword : "",
    }));
  };

  return (
    <div>
      <div className="text-richblack-5 font-bold text-2xl pb-5">
        Change Password
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="currentPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
            value={formData.currentPassword}
            required
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
            value={formData.newPassword}
            required
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label
            htmlFor="reNewPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Re-Enter New Password
          </label>
          <input
            type="password"
            name="reNewPassword"
            id="reNewPassword"
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
            value={formData.reNewPassword}
            required
            onChange={handleOnChange}
          />
        </div>
        <div
          className="my-auto translate-y-3 w-fit place-self-end"
          onClick={handlePasswordChange}
        >
          <Button active={true}>Update</Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSection;
