import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice.js";
import Button from "../../HomePage/Button.jsx";
import { useForm } from "react-hook-form";
import NestedView from "./NestedView.jsx";
import { createSection, updateSection } from "../../../../services/operations/courseDetailsAPI.js";

const CourseBuilderForm = () => {
  const { editCourse, course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(setStep(3));
  };
  const handlePrevStep = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editCourse) {
      setValue("sectionName", editCourse.sectionName || "");
    }
  }, [editCourse, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!editCourse) {
      data = { ...data, courseId: course._id };
      const result = await createSection(data, token);

      dispatch(setCourse(result));
      //console.log(course);
    } else {
      data = {...data, sectionId:editCourse._id, courseId:course._id};
      const result = await updateSection(data, token);
      if(result){
      dispatch(setCourse(result)) 
      setValue('sectionName', '');
      }
      dispatch(setEditCourse(null));
    }
    setLoading(false);
  };

  return (
    <div className="bg-richblack-700 mt-7 px-7 py-2 rounded-xl">
      <h1 className=" font-bold text-3xl mt-10 mb-5">Course Builder</h1>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="sectionName"
              className="block mb-2 text-sm font-medium text-richblack-5"
            >
              Section Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 pb-7">
              <input
                type="text"
                placeholder="Enter Section Name"
                {...register("sectionName", { required: true })}
                className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-12 p-4 bg-richblack-800 dark:border-gray-600"
              />
              {errors.courseTitle && (
                <p className="text-red-400 mt-2 mb-2">This field is required</p>
              )}
              <input
                type="submit"
                className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${loading ? ('bg-richblack-500') : ('bg-yellow-50')} text-black hover:scale-95 transition-all duration-2000 mt-5 mb-5`}
                value={editCourse ? "save changes" : "Add Section"}
                disabled={loading}
              />
              {editCourse && (<button onClick={()=>{dispatch(setEditCourse(null)); setValue('sectionName', '');}} className="bg-richblack-500 w-content text-[13px] mt-5 mb-5 px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-2000">Cancel</button>)}
              
            </div>
          </div>
        </form>
      </div>

      {/* Course Countent Nested View */}
      <div className="bg-richblack-600 p-7 rounded-xl">
        {course && course.courseContent && course.courseContent.length > 0 ? (
          course.courseContent.map((section, index) => (
            <NestedView key={index} section={section} setEditCourse={setEditCourse} course={course}/>
          ))
        ) : (
          <div>You have not yet created any sections</div>
        )}
      </div>

      <div className="flex gap-3 justify-end">
      <div className="my-10" onClick={handlePrevStep}>
          <Button active={false}>Prevous Step</Button>
        </div>
        <div className="my-10" onClick={handleNextStep}>
          <Button active={true}>Next Step</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseBuilderForm;