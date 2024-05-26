import React, { useEffect } from "react";
import StarRatings from "react-star-ratings";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from "../../../../services/operations/profileApi";
import { setUser } from "../../../../slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
const CartCourseCard = ({ course }) => {
    const {token} = useSelector((state) => (state.auth));
    const dispatch = useDispatch();
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
    console.log(course);
  }, []);

  const handleRemoveFromCart = async () => {
    const newUser = await removeFromCart(course._id, token);
    console.log(newUser);
    if(newUser){
        dispatch(setUser(newUser));
    } 
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-5 my-10">
          <img
            src={course.thumbnail}
            alt="courseThumbnail"
            className="h-48 w-80  rounded-2xl"
          />
          <div>
            <div className="text-2xl mb-2">{course?.courseName}</div>

            <div className="text-richblack-100 text-base">
              By {course?.instructor?.firstName} {course?.instructor?.lastName}
            </div>
            <div>
              {course?.ratingAndReviews?.length === 0 ? (
                <div className="text-richblack-100 text-sm">No Ratings Yet</div>
              ) : (
                <div className="text-yellow-50 flex gap-2">
                  <div className="pt-[3px]">
                    {getAvgRating(course?.ratingAndReviews)}
                  </div>
                  <StarRatings
                    rating={getAvgRating(course?.ratingAndReviews)}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="#FFD60A"
                  />
                  <div>{course?.ratingAndReviews?.length} Ratings</div>
                </div>
              )}
              <button className='text-red-300 bg-red-800 my-5 p-2 rounded-full' onClick={handleRemoveFromCart}>
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>
        </div>
        <div className="my-10 text-3xl text-yellow-50 font-semibold">
          ₹ {course?.price}
        </div>
      </div>

      <hr className="text-richblack-400" />
    </div>
  );
};

export default CartCourseCard;
