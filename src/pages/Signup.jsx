import React from "react";
import StudentImage from "../assets/Images/signup.webp";
import { useState } from "react";
import FrameImage from "../assets/Images/frame.png";
import TeacherImage from "../assets/Images/Frame 22.png";
import CTAButton from "../components/core/HomePage/Button";

const Signup = () => {
  const userTypes = ["Student", "Instructor"];
  const [currentUserType, setCurrentUserType] = useState(userTypes[0]);
  return (
    <div className="flex flex-row w-11/12 mt-24 justify-center gap-16  mx-auto items-center mb-28">
      <div className="flex flex-col items center w-[30%] ">
        <div className="text-white text-bold text-4xl pb-9">Welcome Back</div>
        {currentUserType === "Student" ? (
          <div className="text-richblack-100 text-xl h-16">
            Build skills for today, tomorrow, and beyond.
            <span className="text-blue-100 font-edu-sa">
              {" "}
              Education to future-proof your career
            </span>
          </div>
        ) : (
          <div className="text-richblack-100 text-xl h-16">
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
            <div className="flex flex-row gap-4 text-white">
              <div className="flex flex-col w-[50%]">
                <label
                  for="fname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  class="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600 "
                  placeholder="Enter First Name"
                  required=""
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label
                  for="lname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  class="bg-gray-50 border border-richblack-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-4 bg-richblack-800 dark:border-gray-600 text-richblack-200"
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>
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
                class="bg-gray-50 border border-richblack-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600 text-richblack-200"
                placeholder="Enter Email Address"
                required
              />
            </div>
            
            
            <div className="flex flex-row gap-4 text-white">
              <div className="flex flex-col w-[50%]">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-richblack-200 dark:text-white"
                >
                    Password *
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600 "
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label
                  for="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  class="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-4 bg-richblack-800 dark:border-gray-600"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>
            <div className="mt-2"></div>
            <CTAButton active={true} linkto={"#"}>
              Create Account
            </CTAButton>
            <p class="text-sm font-light text-white">
              Already have an an account{" "}
              <a
                href="/login"
                class="font-medium text-primary-600 hover:underline text-white"
              >
                Sign In
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

export default Signup;
