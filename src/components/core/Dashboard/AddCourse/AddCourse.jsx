import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import CourseBuilderForm from "./CourseBuilderForm";
import CourseInformationForm from "./CourseInformationForm";
import PublishForm from "./PublishForm";
import { BsLightningChargeFill } from "react-icons/bs";
import { setEditCourse } from "../../../../slices/courseSlice";
import { useLocation } from "react-router-dom";


const AddCourse = () => {
  const courseDetails = useSelector((state) => state.course);
  const steps = [
    {
      number: 1,
      title: "Course Information",
      component: <CourseInformationForm />,
    },
    {
      number: 2,
      title: "Course Builder",
      component: <CourseBuilderForm />,
    },
    {
      number: 3,
      title: "Publish",
      component: <PublishForm />,
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setEditCourse(false));
  }, []); 
  
  return (
    <div className="flex">
      <div className="w-8/12 mx-auto text-white">
      <h1 className="text-3xl font-bold mb-10">Add Course</h1>
        <div className="flex justify-between w-9/12 mx-auto">
        
          {steps.map((step, index) => (
            <div key={index}>
              {courseDetails.step > step.number ? (
                <div className="">
                  <FaCheckCircle className="w-10 h-10 text-yellow-25 mx-auto m-2" />
                  {step.title}
                </div>
              ) : (
                <div>
                  <div
                    className={`${
                      courseDetails.step === step.number
                        ? "bg-yellow-900 border border-yellow-50"
                        : "bg-richblack-700"
                    } w-10 h-10 rounded-full flex items-center justify-center mx-auto m-2`}
                  >
                    {step.number}
                  </div>
                  {step.title}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rendering the component for the current step */}
        {steps[courseDetails.step - 1].component}
      </div>
      <div className="text-richblack-25 mx-auto w-[30%] p-10 bg-richblack-800 h-fit rounded-xl">
        <div className="text-2xl flex gap-2 items-center pb-4">
        <span className='text-yellow-50'><BsLightningChargeFill /></span>
        Course Upload Tips
        </div>
        <ul className='list-disc ml-7 text-sm'>
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on the course single page.</li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
        
      </div>
    </div>
  );
};

export default AddCourse;
