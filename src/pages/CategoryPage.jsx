import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
import { getFullCategoryDetails } from "../services/operations/categoryAPI";
import CourseSlider from "../components/core/CategoryPage/CourseSlider";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false); // Fixed typo here
  const location = useLocation();
  const fetchCategoryId = async (categoryName) => {
    const allCategories = await fetchCourseCategories();
    if (allCategories) {
      for (const category of allCategories) {
        if (category?.name === categoryName) {
          setCategoryDescription(category.description);
          return category._id;
        }
      }
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    const getCategoryDetails = async () => {
      const categoryId = await fetchCategoryId(categoryName);
      if (categoryId) {
        const fullDetails = await getFullCategoryDetails(categoryId);
        setCategoryDetails(fullDetails);
        setLoading(false);
      }
    };

    getCategoryDetails();
  }, [location.pathname]);

  return (
    <>
      {loading ? (<div className="mt-36">
        <div className='loader'>
        </div></div>) : (
        <div className="">
          <div className="bg-richblack-700">
            <div className="w-11/12 mx-auto p-5">
              <div className="text-richblack-5 p-10 text-4xl">{categoryName}</div>
              <div className="text-richblack-100 pl-10">{categoryDescription}</div>
            </div>
          </div>
          <div className='w-11/12 mx-auto p-5'>
            <div className="text-richblack-5 text-3xl px-12 py-8 mx-auto">Courses To Get You Started</div>
            <div className="">
              {categoryDetails?.selectedCourses?.length > 0 ? (
                <CourseSlider courses={categoryDetails.selectedCourses} />
              ) : (
                <div className="text-richblack-500 px-12 pb-10">No courses found</div>
              )}
            </div>
            <div className="text-richblack-5 text-3xl px-12 py-8 mx-auto">Top Courses</div>
            <div className="">
              {categoryDetails?.mostSellingCourses?.length > 0 ? (
                <CourseSlider courses={categoryDetails.mostSellingCourses} />
              ) : (
                <div className="text-richblack-500 px-12 pb-10">No top courses found</div>
              )}
            </div>
            <div className="text-richblack-5 text-3xl px-12 py-8 mx-auto">Frequently Bought Together</div>
            <div className="">
              {categoryDetails?.differentCourses?.length > 0 ? (
                <CourseSlider courses={categoryDetails.differentCourses} />
              ) : (
                <div className="text-richblack-500 px-12 pb-10">No frequently bought together courses found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
