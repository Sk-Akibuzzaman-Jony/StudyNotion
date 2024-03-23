import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../services/operations/authApi";

const UpdatePassword = () => {
  const routeParams = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
  if (name === "newPassword") {
    setNewPassword(value);
  } else if (name === "confirmNewPassword") {
    setConfirmNewPassword(value);
  }
    console.log("Pass -> ", newPassword);
    console.log("Pass -> ", confirmNewPassword);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    try {
        if (newPassword !== confirmNewPassword) {
          toast.error("New Passwords and Confirm New Passwords don't match", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true
          });
        } else {
            dispatch(resetPassword(newPassword, confirmNewPassword, routeParams.token, navigate));
        }
    } catch (error) {
        console.error(error);
    }
  };
  return (
    <div className="text-richblack-5 w-1/5 mx-auto my-auto">
      <div className="font-bold text-3xl mb-8">Choose new password</div>
      <p className="text-richblack-100 pb-8">
        Almost done. Enter your new password and youre all set.
      </p>
      <div>
        <form className="flex flex-col" onSubmit={handleOnSubmit}>
          <label for="newPassword" className="pb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            class="mb-6 rounded-md flex-1 bg-richblack-800 py-1.5 pl-1 text-richblack-100 placeholder:text-richblack-100 sm:text-sm sm:leading-6"
            required
            placeholder="********"
            onChange={handleOnChange}
          />
          <label for="confirmNewPassword" className="pt-2 pb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            class="mb-6 rounded-md flex-1 bg-richblack-800 py-1.5 pl-1 text-richblack-100 placeholder:text-richblack-100 sm:text-sm sm:leading-6"
            required
            placeholder="********"
            onChange={handleOnChange}
          />
          <button
            class="bg-yellow-50 hover:bg-yellow-100 transition-all text-richblack-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
