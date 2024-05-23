import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice.js";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../services/operations/courseDetailsAPI.js";
import InputTag from "./InputTag";
import RequirementsField from "./RequirementsField.jsx";
import { COURSE_STATUS } from "../../../../utils/constants.js";
import Button from "../../HomePage/Button.jsx";

const isValidJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const CourseInformationForm = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const { course, editCourse } = useSelector((state) => state.course);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await fetchCourseCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setSelectedCategory(course.category);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("courseThumbnail", course.thumbnail);

      if (isValidJSON(course.tag)) {
        setTags(JSON.parse(course.tag));
      } else {
        setTags(course.tag);
      }
      if (isValidJSON(course.instructions)) {
        setRequirements(JSON.parse(course.instructions));
      } else {
        setRequirements(course.instructions);
      }
    }
  }, [course, editCourse, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.price !== course.price ||
      tags.toString() !== course.tag.toString() ||
      currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
      currentValues.category !== course.category ||
      currentValues.courseThumbnail !== course.thumbnail ||
      requirements.toString() !== course.instructions.toString()
    );
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.price);
        if (data.courseThumbnail.length) {
          formData.append("thumbnailImage", data.courseThumbnail[0]);
        }
        formData.append("tag", JSON.stringify(tags));
        formData.append("whatYouWillLearn", data.whatYouWillLearn);
        formData.append("category", data.category);
        formData.append("instructions", JSON.stringify(requirements));

        const result = await editCourseDetails(formData, token);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No Changes Made So Far");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("thumbnailImage", data.courseThumbnail[0]);
    formData.append("tag", JSON.stringify(tags));
    formData.append("category", data.category);
    formData.append("instructions", JSON.stringify(requirements));
    formData.append("status", COURSE_STATUS.DRAFT);

    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
  };

  const handleContinueWithoutSave = (event) => {
    event.preventDefault();
    dispatch(setEditCourse(null));
    dispatch(setStep(2));
  };

  return (
    <div className="w-8/12 mx-auto">
      <div className="mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="courseTitle"
            className="block mb-2 text-sm font-medium text-richblack-5"
          >
            Course Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
          />
          {errors.courseTitle && (
            <p className="text-red-400 mt-2 mb-2">This field is required</p>
          )}

          <label
            htmlFor="courseDescription"
            className="block mb-2 mt-4 text-sm font-medium text-richblack-5"
          >
            Course Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter Course Description"
            {...register("courseDescription", { required: true })}
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
          />
          {errors.courseDescription && (
            <p className="text-red-400 mt-2 mb-2">This field is required</p>
          )}

          <label
            htmlFor="price"
            className="block mb-2 mt-4 text-sm font-medium text-richblack-5"
          >
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Price"
            {...register("price", { required: true })}
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
          />
          {errors.price && (
            <p className="text-red-400 mt-2 mb-2">This field is required</p>
          )}

          <label
            htmlFor="category"
            className="block mb-2 mt-4 text-sm font-medium text-richblack-5"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category", { required: true })}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 mt-2 mb-2">This field is required</p>
          )}

          <InputTag tags={tags} setTags={setTags} />

          <label
            htmlFor="courseThumbnail"
            className="block mb-2 mt-4 text-sm font-medium text-richblack-5"
          >
            Course Thumbnail <span className="text-red-500">*</span>
          </label>
          {editCourse && (
            <div className="flex pb-2 gap-2">
              <Link
                to={editCourse.thumbnail}
                target="_blank"
                className="text-blue-200 underline pb-2"
              >
                Current Image
              </Link>
              <div>To change upload thumbnail</div>
            </div>
          )}
          <input
            type="file"
            {...register("courseThumbnail", { required: false })}
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
          />
          {errors.courseThumbnail && (
            <p className="text-red-400 mt-2 mb-2">This field is required</p>
          )}

          <label
            htmlFor="whatYouWillLearn"
            className="block mb-2 mt-4 text-sm font-medium text-richblack-5"
          >
            What You Will Learn <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter What You Will Learn"
            {...register("whatYouWillLearn", { required: true })}
            className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
          />
          {errors.whatYouWillLearn && (
            <p className="text-red-400 mt-2 mb-2">This field is required</p>
          )}

          <RequirementsField
            requirements={requirements}
            setRequirements={setRequirements}
          />

          <div className="flex h-fit justify-end gap-3">
            <input
              type="submit"
              className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-2000 mt-10"
              value={editCourse ? "Save Changes" : "Next"}
            />
          </div>
        </form>
        <div className="justify-end flex">
          {editCourse && (
            <button
              type="button"
              onClick={handleContinueWithoutSave}
              className="bg-richblack-300 h-fit text-white text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-2000 mt-5"
            >
              Continue Without Saving
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInformationForm;
