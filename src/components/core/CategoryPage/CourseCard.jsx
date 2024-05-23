import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const CourseCard = ({ course }) => {
  console.log(course);
  const getAvgRating = (ratingAndReviews) => {
    if (ratingAndReviews.length === 0) return 0;
    const avgRating =
      ratingAndReviews.reduce(
        (accumulator, rating) => (accumulator + rating?.rating, 0)
      ) / ratingAndReviews.length();
    return avgRating;
  };
  return (
    <div className="">
      <Link to={`/course/${course._id}`}>
        <img
          src={course.thumbnail}
          alt="course thumbnail"
          className="h-50 rounded-xl"
        />
        <div className="text-richblack-5 mt-4 text-lg">
          {course?.courseName}
        </div>
        <div className="text-richblack-25 text-sm">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </div>
        <div className='mt-2'>
          {course?.ratingAndReviews.length === 0 ? (
            <div className="text-richblack-100 text-sm">No Ratings Yet</div>
          ) : (
            <div className="text-yellow-50  flex gap-2">
              <div className="pt-[3px]">
                {getAvgRating(course?.ratingAndReviews)}
              </div>
              <StarRatings
                rating={getAvgRating(course?.ratingAndReviews)}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#FFD60A"
              />
            </div>
          )}
        </div>

        <div className="text-richblack-5 mt-2 text-xl">₹ {course?.price}</div>
      </Link>
    </div>
  );
};

export default CourseCard;
