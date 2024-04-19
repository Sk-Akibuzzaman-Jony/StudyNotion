import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("submitted");
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="w-2/5 mx-auto">
      <form className="md:col-span-8 p-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="appearance-none rounded-md block w-full bg-richblack-800 text-richblack-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-richblack-700"
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              {...register("firstname", { required: true })}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="appearance-none rounded-md block w-full bg-richblack-800 text-richblack-200 py-3 px-4 leading-tight focus:outline-none focus:bg-richblack-700 focus:border-gray-500"
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              {...register("lastname")}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="appearance-none rounded-md block w-full bg-richblack-800 text-richblack-5 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-richblack-700 focus:border-gray-500"
              id="email"
              type="email"
              placeholder="Enter Email Address"
              name="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
        </div>
        <div className="flex flex-col mb-6">
          <label
            htmlFor="phonenumber"
            className="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
          >
            Phone Number
          </label>

          <div className="flex flex-row gap-1">
            {/* dropdown */}
            <select
              name="dropdown"
              id="dropdown"
              className="appearance-none rounded-md block bg-richblack-800 text-richblack-200 py-3 px-4 leading-tight focus:outline-none focus:bg-richblack-700 focus:border-gray-500 w-[80px]"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((element, index) => {
                return (
                  <option key={index} value={element.code}>
                    {element.code}
                  </option>
                );
              })}
            </select>

            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="appearance-none rounded-md block bg-richblack-800 text-richblack-200 py-3 px-4 leading-tight focus:outline-none focus:bg-richblack-700 focus:border-gray-500  w-[calc(100%-90px)]"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter Phone Number" },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              rows="10"
              className="appearance-none rounded-md block w-full bg-richblack-800 text-richblack-5 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-richblack-700 focus:border-gray-500"
              id="message"
              name="message"
              {...register("message", { required: true })}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
