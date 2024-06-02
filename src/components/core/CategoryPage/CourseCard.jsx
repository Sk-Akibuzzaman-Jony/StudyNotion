import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const CourseCard = ({ course }) => {
  const getAvgRating = (ratingAndReviews) => {
    if (!Array.isArray(ratingAndReviews) || ratingAndReviews.length === 0) {
      return 0;
    }
    const avgRating =
      ratingAndReviews.reduce(
        (accumulator, current) => accumulator + (current.rating || 0),
        0
      ) / ratingAndReviews.length;
    return avgRating;
  };

  const averageRating = getAvgRating(course?.ratingAndReviews);

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
          {course?.ratingAndReviews?.length === 0 ? (
            <div className="text-richblack-100 text-sm">No Ratings Yet</div>
          ) : (
            <div className="text-yellow-50 flex gap-2">
              <div className="pt-[3px]">
                {averageRating.toFixed(1)}
              </div>
              <StarRatings
                rating={parseFloat(averageRating.toFixed(1))}
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
