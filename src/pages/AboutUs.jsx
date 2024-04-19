import React from "react";
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import foundingImage from "../assets/Images/FoundingStory.png";
import Footer from "../components/common/Footer";
import Button from "../components/core/HomePage/Button";
import ReviewRow from "./ReviewRow";
import ContactForm from "../components/core/AbouPage/contactForm";

const AboutUs = () => {
  return (
    <div className="self-center">
      <div className="bg-richblack-800 w-screen">
        <div className="text-center text-richblack-200 pt-32 pb-24 text-3xl  w-11/12 mx-auto">
          About us
        </div>
        <div className="text-richblack-5 text-center text-5xl font-semibold">
          Driving Innovation in Online Education for a <br />
          <span className="about-text-gradient1 text-transparent bg-clip-text">
            Brighter Future
          </span>
        </div>
        <p className="text-richblack-200 w-2/5 pt-8 mx-auto text-center pb-48">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </p>
      </div>
      <div className="-translate-y-[40%] flex flex-row">
        <div className="flex flex-row mx-auto gap-28">
          <img src={image1} className="" />
          <img
            src={image2}
            className=""
            style={{ boxShadow: "0px -12px 40px -19px #e65e00" }}
          />
          <img src={image3} className="" />
        </div>
      </div>
      <div className="text-richblack-100 w-11/12 mx-auto text-center text-4xl font-semibold">
        <span className="text-richblack-400">"</span> We are passionate about
        revolutionizing the way we learn. Our innovative platform{" "}
        <span className="about-text-gradient1 text-transparent bg-clip-text">
          combines technology
        </span>
        ,{" "}
        <span className="about-text-gradient2 text-transparent bg-clip-text">
          expertise
        </span>
        , and community to create an{" "}
        <span className="about-text-gradient3 text-transparent bg-clip-text">
          unparalleled educational experience
        </span>
        .<span className="text-richblack-400">"</span>
      </div>
      <div className="h-28"></div>
      <div className="flex w-11/12 mx-auto">
        <div className="w-[50%] text-richblack-500 p-32 font-semibold">
          <span className="about-text-gradient4 text-transparent bg-clip-text text-5xl font-bold">
            Our Founding Story
          </span>
          <br />
          <br />
          Our e-learning platform was born out of a shared vision and passion
          for transforming education. It all began with a group of educators,
          technologists, and lifelong learners who recognized the need for
          accessible, flexible, and high-quality learning opportunities in a
          rapidly evolving digital world.
          <br />
          <br />
          As experienced educators ourselves, we witnessed firsthand the
          limitations and challenges of traditional education systems. We
          believed that education should not be confined to the walls of a
          classroom or restricted by geographical boundaries. We envisioned a
          platform that could bridge these gaps and empower individuals from all
          walks of life to unlock their full potential.
        </div>
        <div className="w-[50%] place-self-center">
          <img
            src={foundingImage}
            className="mx-auto"
            style={{ boxShadow: "-11px -7px 38px -15px #ec008c" }}
          />
        </div>
      </div>
      <div className="flex w-11/12 mx-auto">
        <div className="w-[50%] text-richblack-500 p-32 font-semibold">
          <span className="about-text-gradient2 text-transparent bg-clip-text text-5xl font-bold">
            Our Vision
          </span>
          <br />
          <br />
          With this vision in mind, we set out on a journey to create an
          e-learning platform that would revolutionize the way people learn. Our
          team of dedicated experts worked tirelessly to develop a robust and
          intuitive platform that combines cutting-edge technology with engaging
          content, fostering a dynamic and interactive learning experience.
          <br />
        </div>
        <div className="w-[50%] text-richblack-500 p-32 font-semibold">
          <span className="about-text-gradient1 text-transparent bg-clip-text text-5xl font-bold">
            Our Mission
          </span>
          <br />
          <br />
          our mission goes beyond just delivering courses online. We wanted to
          create a vibrant community of learners, where individuals can connect,
          collaborate, and learn from one another. We believe that knowledge
          thrives in an environment of sharing and dialogue, and we foster this
          spirit of collaboration through forums, live sessions, and networking
          opportunities.
          <br />
        </div>
      </div>
      <div className="bg-richblack-800 p-28 ">
        <div className="flex">
          <div className="text-richblack-5 font-semibold text-5xl w-[25%] text-center">
            5K
            <div className="h-3"></div>
            <span className="text-sm text-richblack-500 pt-0 align-top">
              Active Students
            </span>
          </div>
          <div className="text-richblack-5 font-semibold text-5xl w-[25%] text-center">
            10+
            <div className="h-3"></div>
            <span className="text-sm text-richblack-500 pt-0 align-top">
              Mentors
            </span>
          </div>
          <div className="text-richblack-5 font-semibold text-5xl w-[25%] text-center">
            200+
            <div className="h-3"></div>
            <span className="text-sm text-richblack-500 pt-0 align-top">
              Courses
            </span>
          </div>
          <div className="text-richblack-5 font-semibold text-5xl w-[25%] text-center">
            50+
            <div className="h-3"></div>
            <span className="text-sm text-richblack-500 pt-0 align-top">
              Awards
            </span>
          </div>
        </div>
      </div>
      <div className="h-28"></div>
      <div className="w-8/12 mx-auto text-richblack-500 grid lg:grid-cols-4">
        <div className="col-span-2 mr-36">
          <span className="text-5xl font-bold text-richblack-5">
            World-Class Learning for{" "}
            <span className="about-text-gradient1 text-transparent bg-clip-text">
              Anyone, Anywhere
            </span>
          </span>
          <br />
          <br />
          Studynotion partners with more than 275+ leading universities and
          companies to bring flexible, affordable, job-relevant online learning
          to individuals and organizations worldwide.
          <div className="mt-10 absolute">
            <Button active={true}>Learn More</Button>
          </div>
        </div>
        <div class="h-[294.5px] p-6 bg-richblack-700  shadow hover:bg-gray-100 ">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Curriculum Based on Industry Needs
          </h5>
          <p class="font-normal text-richblack-100 text-xs   dark:text-gray-400">
            Save time and money! The Belajar curriculum is made to be easier to
            understand and in line with industry needs.
          </p>
        </div>
        <div class="h-[294.5px] p-6 bg-richblack-800  shadow hover:bg-gray-100 ">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our Learning Methods{" "}
          </h5>
          <p class="font-normal text-richblack-100 text-xs   dark:text-gray-400">
            The learning process uses the namely online and offline.
          </p>
        </div>
        <div className=""></div>
        <div class="h-[294.5px] p-6 bg-richblack-700  shadow hover:bg-gray-100 ">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Certification{" "}
          </h5>
          <p class="font-normal text-richblack-100 text-xs   dark:text-gray-400">
            You will get a certificate that can be used as a certification
            during job hunting.
          </p>
        </div>
        <div class="h-[294.5px] p-6 bg-richblack-800  shadow hover:bg-gray-100">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rating "Auto-grading"{" "}
          </h5>
          <p class="font-normal text-richblack-100 text-xs   dark:text-gray-400">
            You will immediately get feedback during the learning process
            without having to wait for an answer or response from the mentor.
          </p>
        </div>
        <div class="h-[294.5px] p-6 bg-richblack-700  shadow hover:bg-gray-100">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ready to Work{" "}
          </h5>
          <p class="font-normal text-richblack-100 text-xs dark:text-gray-400">
            Connected with over 150+ hiring partners, you will have the
            opportunity to find a job after graduating from our program.
          </p>
        </div>
      </div>
      <div className="h-28"></div>

      {/* FORM */}
      <div className=" text-richblack-5 w-11/12 text-center mx-auto font-bold text-5xl">
        Get In Touch
      </div>
      <div className="text-richblack-300 w-11/12 text-center mx-auto p-10 font-bold">
        We’d love to here for you, Please fill out this form.
      </div>
      <ContactForm/>
      <div className="h-28"></div>
      <ReviewRow />
      <div className="pt-44">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
