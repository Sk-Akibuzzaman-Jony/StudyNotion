import React from "react";
import { TiMessages } from "react-icons/ti";
import { FaGlobeAsia } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Button from "../components/core/HomePage/Button";
import ReviewRow from "./ReviewRow";
import Footer from "../components/common/Footer";
import ReviewSwipper from "../components/common/ReviewSwipper";
const ContactUs = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto mt-10">
        <div className="flex place-content-center">
          <div classNamew="">
            <div className=" bg-richblack-800 rounded-lg p-8">
              <div className="p-5 items-center flex">
                <TiMessages className=" text-5xl pr-2 text-richblack-300" />
                <div>
                  <div className=" text-richblack-5">Chat on us</div>
                  <span className="text-richblack-200">
                    Our friendly team is here to help, @mail address
                  </span>
                </div>
              </div>
              <div className="p-5 items-center flex">
                <FaGlobeAsia className=" text-5xl pr-2 text-richblack-300" />
                <div>
                  <div className=" text-richblack-5">Visit us</div>
                  <span className="text-richblack-200">
                    Come and say hello at our office HQ, in Kolkata
                  </span>
                </div>
              </div>
              <div className="p-5 items-center flex">
                <IoCall className=" text-5xl pr-2 text-richblack-300" />
                <div>
                  <div className=" text-richblack-5">Call us</div>
                  <span className="text-richblack-200">
                    Mon - Fri From 8am to 5pm <br /> +123 456 7890
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%] pl-20">
            <div className="ml-8 mr-8 rounded-lg border border-solid border-richblack-800 p-10">
              <h1 className="text-richblack-5 text-4xl font-bold">
                Got a Idea? We’ve got the skills. Let’s team up
              </h1>
              <p className=" text-richblack-300 mt-3 mb-10">
                Tell us more about yourself and what you’re got in mind.
              </p>
              <div className="">
                <form class="w-full max-w-lg text-richblack-5">
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        First Name
                      </label>
                      <input
                        class="appearance-none block w-full bg-richblack-800 text-richblack-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label
                        class="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Last Name
                      </label>
                      <input
                        class="appearance-none block w-full bg-richblack-800 text-richblack-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                      <label
                        class="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        E-mail
                      </label>
                      <input
                        class="appearance-none block w-full bg-richblack-800 text-richblack-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                      <label
                        class="block uppercase tracking-wide text-richblack-5 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Message
                      </label>
                      <textarea
                        class=" no-resize appearance-none block w-full bg-richblack-800 text-richblack-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none h-48"
                        id="message"
                        placeholder="Enter message"
                      ></textarea>
                    </div>
                  </div>
                  <Button active={true}>Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-28"></div>
      <div>
        <div className='text-3xl mt-5 text-richblack-25 text-center'>
          Rating and Reviews
        </div>
        <ReviewSwipper />
      </div>
      <div className="pt-44">
        <Footer />
      </div>
    </div>

  );
};

export default ContactUs;
