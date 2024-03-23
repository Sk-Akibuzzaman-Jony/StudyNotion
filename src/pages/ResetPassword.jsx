import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswordToken } from "../services/operations/authApi";

const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSent));
  };

  return (
    <div className="text-richblack-5 w-1/5 mx-auto my-auto">
      <div className="font-bold text-3xl mb-8">
        {emailSent ? "Check Email" : "Reset your password"}
      </div>
      <p className="text-richblack-100 pb-8">
        {emailSent
          ? `We have sent the reset email to ${email}`
          : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
      </p>
      {!emailSent ? (
        <div>
          <form className="flex flex-col" onSubmit={handleOnSubmit}>
            <label for="email" className="pb-2">
              Enter Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              class="mb-6 rounded-md flex-1 bg-richblack-800 py-1.5 pl-1 text-richblack-100 placeholder:text-richblack-100 sm:text-sm sm:leading-6"
              required
              placeholder="Enter your email"
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
      ) : (
        <form onSubmit={handleOnSubmit}>
          <button
            class="bg-yellow-50 hover:bg-yellow-100 transition-all text-richblack-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Resend Email
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
