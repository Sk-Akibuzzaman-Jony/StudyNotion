import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/core/HomePage/Button";
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
  const profileDetails = useSelector((state) => state.profile.user);
  return (
    <div className="w-8/12 mx-auto">
      <div className="text-richblack-25 font-bold text-3xl pb-20">
        My Profile
      </div>
      <div className="bg-richblack-700 p-10 rounded-lg mb-10">
        <div className="flex justify-between">
          <div className="flex items-center p-">
            <img
              src={profileDetails.image}
              className="h-20 w-20 rounded-full mr-10"
            />
            <div>
              <div className="font-bold text-richblack-5 text-2xl">
                {profileDetails.firstName} {profileDetails.lastName}
              </div>
              <div className="text-base text-richblack-200">
                {profileDetails.email}
              </div>
            </div>
          </div>
          <div>
            <Button active={true} linkto="/dashboard/settings">
              <div className="flex items-center gap-2">
                <FaRegEdit />
                Edit
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-richblack-700 p-10 rounded-lg mb-10">
        <div className="flex justify-between">
          <div className="text-richblack-5 font-bold text-2xl pb-5">
            Personal Details
          </div>
          <div>
            <Button active={true}>
              <div className="flex items-center gap-2">
                <FaRegEdit />
                Edit
              </div>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className=" text-richblack-300">First Name</div>
            <div className="font-bold text-xl text-richblack-25">
              {profileDetails.firstName}
            </div>
          </div>
          <div>
            <div className=" text-richblack-300">Last Name</div>
            <div className="font-bold text-xl text-richblack-25">
              {profileDetails.lastName}
            </div>
          </div>
          <div>
            <div className=" text-richblack-300">Email</div>
            <div className="font-bold text-lg text-richblack-200">
              {profileDetails.email}
            </div>
          </div>
          {profileDetails.additionalDetails.contactNumber && (
            <div>
              <div className=" text-richblack-300">Phone Number</div>
              <div className="font-bold text-lg text-richblack-200">
                {profileDetails.additionalDetails.contactNumber}
              </div>
            </div>
          )}
        </div>
      </div>
      
        <div className="bg-richblack-700 p-10 rounded-lg mb-10">
          <div className="flex justify-between">
            <div className="flex items-center p-">
              <div className="text-richblack-5 font-bold text-2xl pb-5">
                About
              </div>
            </div>
            <div>
              <Button active={true}>
                <div className="flex items-center gap-2">
                  <FaRegEdit />
                  Edit
                </div>
              </Button>
            </div>
          </div>
          <div className="text-base text-richblack-200">
            {profileDetails.additionalDetails.about ? (profileDetails.additionalDetails.about) : ("Write somethng about yourself")}
          </div>
        </div>
    
    </div>
  );
};

export default MyProfile;
