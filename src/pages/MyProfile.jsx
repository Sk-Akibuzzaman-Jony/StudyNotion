import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/core/HomePage/Button";
import { FaRegEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { editAdditionalDetails } from "../services/operations/profileApi";

const MyProfile = () => {
  const profileDetails = useSelector((state) => state.profile.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      about: profileDetails.additionalDetails.about || "",
      contactNumber: profileDetails.additionalDetails.contactNumber || "",
      dateOfBirth: profileDetails.additionalDetails.dateOfBirth || "",
      gender: profileDetails.additionalDetails.gender || "",
    },
  });



  const onSubmit = async (data) => {
    const result = await editAdditionalDetails(dispatch, data, token);
    console.log(result);
    console.log(data);
    setIsModalOpen(false);
  };

  return (
    <div className="w-8/12 mx-auto">
      <div className="text-richblack-25 font-bold text-3xl pb-20">My Profile</div>
      <div className="bg-richblack-700 p-10 rounded-lg mb-10">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              src={profileDetails.image}
              className="h-20 w-20 rounded-full mr-10"
              alt="Profile"
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
            <Button active={true} linkto="/dashboard/settings">
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
        </div>
      </div>

      <div className="bg-richblack-700 p-10 rounded-lg mb-10">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="text-richblack-5 font-bold text-2xl pb-5">
              Additional Details
            </div>
          </div>
          <div onClick={() => setIsModalOpen(true)}>
            <Button active={true}>
              <div className="flex items-center gap-2" >
                <FaRegEdit />
                Edit
              </div>
            </Button>
          </div>
        </div>
        <div>
          <div className=" text-richblack-300">About</div>
          <div className="text-base text-richblack-200">
            {profileDetails.additionalDetails.about || "Write something about yourself"}
          </div>
        </div>

        <div className="flex justify-between gap-10">
          <div className="w-[50%]">
            <div className=" text-richblack-300 mt-8">Phone Number</div>
            <div className="font-bold text-lg text-richblack-200">
              {profileDetails.additionalDetails.contactNumber || "Enter Your Phone Number"}
            </div>
          </div>

          <div className="w-[50%]">
            <div className=" text-richblack-300 mt-8">Date Of Birth</div>
            <div className="font-bold text-lg text-richblack-200">
              {profileDetails.additionalDetails.dateOfBirth || "Enter Your Date Of Birth"}
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className=" text-richblack-300 mt-8">Gender</div>
          <div className="font-bold text-lg text-richblack-200">
            {profileDetails.additionalDetails.gender || "Enter Your Gender"}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-richblack-700 p-5 rounded-lg w-1/2">
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <h2 className="text-2xl text-richblack-5 font-bold mb-4">Edit Additional Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-richblack-50">About</label>
                <textarea
                  {...register("about", { required: "About is required" })}
                  className="w-full p-2 rounded bg-richblack-500"
                />
                {errors.about && (
                  <span className="text-red-500 text-sm">{errors.about.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-richblack-50">Phone Number</label>
                <input
                  type="text"
                  {...register("contactNumber", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  className="w-full p-2 rounded bg-richblack-500"
                />
                {errors.contactNumber && (
                  <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-richblack-50">Date Of Birth</label>
                <input
                  type="date"
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                  className="w-full p-2 rounded bg-richblack-500"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-richblack-50">Gender</label>
                <input
                  type="text"
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full p-2 rounded bg-richblack-500"
                />
                {errors.gender && (
                  <span className="text-red-500 text-sm">{errors.gender.message}</span>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-yellow-50 text-black px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
