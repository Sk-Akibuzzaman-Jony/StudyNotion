import React,{ useEffect } from "react";
import StudentImage from "../assets/Images/login.webp";
import { useState } from "react";
import FrameImage from "../assets/Images/frame.png";
import TeacherImage from "../assets/Images/Frame 22.png";
import CTAButton from "../components/core/HomePage/Button";
import {useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../services/operations/authApi";
import { toast } from 'react-toastify';

const Login = () => {
  const userTypes = ["Student", "Instructor"];
  const [currentUserType, setCurrentUserType] = useState(userTypes[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  })
  const handelOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]:e.target.value,
    }))
  }
  const handelOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate, dispatch));
}


  return (
    <div className="flex flex-row w-11/12 mt-24 justify-center gap-16  mx-auto items-center mb-28">
      <div className="flex flex-col items center w-[30%] ">
        <div className="text-white text-bold text-4xl pb-9">Welcome Back</div>
        {currentUserType === "Student" ? (
          <div className="text-richblack-100 text-xl">
            Build skills for today, tomorrow, and beyond.
            <span className="text-blue-100 font-edu-sa">
              {" "}
              Education to future-proof your career
            </span>
          </div>
        ) : (
          <div className="text-richblack-100 text-xl">
            Discover your passions
            <span className="text-blue-100 font-edu-sa"> Be Unstoppable</span>
          </div>
        )}
        <div>
          <div
            className="mt-11 mb-11 flex flex-row rounded-full bg-richblack-800 border-richblack-100
      px-1 py-1 w-fit "
          >
            {userTypes.map((element, index) => {
              return (
                <div
                  className={`text-[16px] flex flex-row items-center gap-2 
                ${
                  currentUserType === element
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                } rounded-full transition-all duration-200 cursor-pointer
                hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                  key={index}
                  onClick={() => setCurrentUserType(element)}
                >
                  {element}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-richblack-800text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
                placeholder="Enter Email Address"
                required=""
                onChange={handelOnChange}
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password *
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                class="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 bg-richblack-800 "
                required=""
                onChange={handelOnChange}
              />
            </div>
            <div class="flex items-center justify-between pb-4 flex-row-reverse">
              <Link
                to="/reset-password"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-100"
              >
                Forgot password?
              </Link>
            </div>
            <button type="submit" onClick={handelOnSubmit}>
            <CTAButton active={true}>
              Sign In
            </CTAButton>
            </button>
            <p class="text-sm font-light text-white">
              Don’t have an account yet?{" "}
              <a
                href="/signup"
                class="font-medium text-primary-600 hover:underline text-white"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
      <div className="relative p-3 w-[30%]">
        <img
          src={FrameImage}
          alt="ShadowImage"
          className="absolute inset-0 object-cover translate-x-8 translate-y-8"
        />

        <img
          src={currentUserType === "Student" ? StudentImage : TeacherImage}
          alt="LoginImage"
          className="relative z-10  object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
