import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCourseCard from "./CartCourseCard";
import Button from "../../HomePage/Button";
import { displayRazorpay } from "../../../../services/operations/paymentAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Calculate the total price of all courses in the cart
  const totalPrice =
    user?.cart.reduce((acc, course) => acc + course.price, 0) || 0;

  const handleBuyCourse = () => {
    // Extracting course IDs from the cart
    const courseIds = user?.cart.map(course => course._id);
    console.log(courseIds);

    if (token) {
      displayRazorpay(courseIds, user, token, navigate, dispatch);
      return;
    } else {
      toast.error("Please Login To Buy the course");
    }
    
  };
  return (
    <div className="text-richblack-5">
      <div className="text-4xl">Checkout</div>
      <div className="text-richblack-300 py-8">Order Summary</div>
      <div className="flex gap-10">
        <div className="w-[70%]">
          {user?.cart.map((course, index) => (
            <div key={index}>
              <CartCourseCard course={course} />
            </div>
          ))}
        </div>
        <div className="w-[30%] bg-richblack-800 p-4 rounded-2xl h-fit px-5 py-10">
          <div className="flex justify-between text-lg font-semibold mb-20">
            <div>Total</div>
            <div className="text-yellow-50 font-bold text-3xl">
              ₹ {totalPrice.toFixed(2)}
            </div>
          </div>
          <div className="flex flex-col">
            <button className="mt-5" onClick={handleBuyCourse}>
              <Button active={true}>Buy Now</Button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
