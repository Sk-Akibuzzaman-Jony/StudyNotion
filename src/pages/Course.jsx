import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import StarRatings from "react-star-ratings";
import CourseContentNestedView from "../components/core/CoursePage/CourseContentNestedView";
import Button from "../components/core/HomePage/Button";
import { TiStopwatch } from "react-icons/ti";
import { RiCursorLine } from "react-icons/ri";
import { FaMobileScreenButton } from "react-icons/fa6";
import { HiOutlineDocumentCheck } from "react-icons/hi2";

const Course = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const getAvgRating = (ratingAndReviews = []) => {
    if (ratingAndReviews?.length === 0) return 0;
    const avgRating =
      ratingAndReviews.reduce(
        (accumulator, rating) => accumulator + rating?.rating,
        0
      ) / ratingAndReviews.length;
    return avgRating;
  };

  useEffect(() => {
    const getCourseDetails = async () => {
      const result = await fetchCourseDetails(courseId);
      if (result) {
        setCourseDetails(result.data);
        setLoading(false);
        console.log(result.data);
      }
    };
    getCourseDetails();
  }, [courseId]);

  return (
    <div className="text-richblack-5 mx-auto">
      <div className=''>
        <div className="bg-richblack-700 pt-5 pb-10">
          <div className="w-11/12 mx-auto">
            <div className="flex">
              <div>
                <div className="py-10 text-4xl">
                  {courseDetails?.courseName}
                </div>
                <div>{courseDetails?.courseDescription}</div>
                <div className="my-5">
                  {courseDetails?.ratingAndReviews?.length === 0 ? (
                    <div className="text-richblack-100 text-sm">
                      No Ratings Yet
                    </div>
                  ) : (
                    <div className="text-yellow-50 flex gap-2">
                      <div className="pt-[3px]">
                        {getAvgRating(courseDetails?.ratingAndReviews)}
                      </div>
                      <StarRatings
                        rating={getAvgRating(courseDetails?.ratingAndReviews)}
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="#FFD60A"
                      />
                      <div>
                        {courseDetails?.ratingAndReviews?.length} Ratings
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  Created By {courseDetails?.instructor?.firstName}{" "}
                  {courseDetails?.instructor?.lastName}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <div className="flex w-full gap-5">
            <div>
              <div className="my-10 border border-richblack-500 py-10 px-5">
                <div className="text-2xl">What You Will Learn</div>
                <div className="mt-5 text-richblack-100">
                  {courseDetails?.whatYouWillLearn}
                </div>
              </div>
              <div className="mt-10">
                <div className="text-2xl mb-5">Course Content</div>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  courseDetails?.courseContent?.map((section) => (
                    <CourseContentNestedView
                      key={section._id}
                      section={section}
                    />
                  ))
                )}
              </div>
              <div>
                <div className="text-2xl mt-10 mb-5">Author</div>
                <div className="flex gap-5 items-center">
                  <img
                    src={courseDetails?.instructor?.image}
                    alt="profile pic"
                    className="h-12 rounded-full"
                  />
                  <div>
                    {courseDetails?.instructor?.firstName}{" "}
                    {courseDetails?.instructor?.lastName}
                  </div>
                </div>
                <div className="mt-2 text-richblack-200">
                  I will be your lead trainer in this course. Within no time, I
                  will help you to understand the subject in an easy manner. I
                  have a huge experience in online training and recording
                  videos. Let's get started!
                </div>
              </div>
            </div>
            <div className="-translate-y-[35%] bg-richblack-700">
              <img src={courseDetails?.thumbnail} alt="course thumbnail" />
              <div className=" py-10 px-5 flex flex-col">
                <div className=" text-2xl font-bold">
                  ₹ {courseDetails?.price}
                </div>
                <button className="mt-7">
                  <Button active={true}>Add To Cart</Button>
                </button>
                <button className="mt-5">
                  <Button active={false}>Buy Now</Button>
                </button>
                <div className="mx-auto mt-3 text-richblack-300">
                  30-Day Money-Back Guarantee
                </div>
                <div className="px-2 mt-6 font-semibold">
                  This Course Include :
                  <ul className="text-caribbeangreen-200">
                    <li className="flex gap-1 items-center">
                      <TiStopwatch />8 hours on-demand video
                    </li>
                    <li className="flex gap-1 items-center">
                      <RiCursorLine />
                      Full Lifetime access
                    </li>
                    <li className="flex gap-1 items-center">
                      <FaMobileScreenButton />
                      Access on Mobile and TV
                    </li>
                    <li className="flex gap-1 items-center">
                      <HiOutlineDocumentCheck />
                      Certificate of completion
                    </li>
                  </ul>
                  <div className="text-yellow-50 hover:text-yellow-25 font-bold text-center mt-5">
                    <button>Share</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
