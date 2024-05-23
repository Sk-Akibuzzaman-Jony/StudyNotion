import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const CourseSlider = ({ courses }) => {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="flex items-center gap-3">
      <button
        className="rounded-full bg-richblack-700 p-3 h-fit"
        onClick={() => swiper.slidePrev()}
      >
        <FaArrowLeft className="text-white"/>
      </button>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        loop={true}
        onSwiper={setSwiper}
        allowTouchMove={false}
      >
        {courses?.map((course) => (
          <SwiperSlide>
            <CourseCard key={course._id} course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="p-3 rounded-full bg-richblack-700 h-fit"
        onClick={() => swiper.slideNext()}
      >
        <FaArrowRight className="text-white"/>
      </button>
    </div>
  );
};

export default CourseSlider;
