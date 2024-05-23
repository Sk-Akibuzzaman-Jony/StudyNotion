import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../slices/courseSlice.js";
import Button from "../../HomePage/Button.jsx";
import { useForm } from "react-hook-form";
import { editCourseDetails } from "../../../../services/operations/courseDetailsAPI.js";
import { COURSE_STATUS } from "../../../../utils/constants.js";
import { useNavigate } from "react-router-dom";

const PublishForm = () => {
  const courseDetails = useSelector((state) => state.course);
  const { course } = useSelector((state)=>(state.course));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNextStep = () => {
    dispatch(setStep((courseDetails.step % 3) + 1));
  };
  const handlePrevStep = () => {
    dispatch(setStep(2));
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const publish = getValues('publish') ? COURSE_STATUS.PUBLISHED: COURSE_STATUS.DRAFT;
    data = {status:publish, courseId:course._id};
    const result = await editCourseDetails(data, token);
    if(result){
      dispatch(setCourse(result));
      navigate("/dashboard/my-courses");
    }
  };

  useEffect(() => {
    setValue("publish", false);
  }, []);

  const publishValue = watch("publish", false);

  return (
    <div className="bg-richblack-600 m-5 rounded-xl p-5">
      <span className="font-bold text-3xl">Publish Settings</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 mt-5">
          <input type="checkbox" {...register("publish")} />
          <div>Make this course public</div>
        </div>
        <input
          type="submit"
          className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-2000 mt-5 mb-5"
          value={publishValue ? "Publish" : "Save as Draft"}
        />
      </form>
      <div>
      <div className="m-10" onClick={handlePrevStep}>
          <Button active={false}>Go Back</Button>
        </div>
        <div className="m-10" onClick={handleNextStep}>
          <Button active={true}>Next Step</Button>
        </div>
      </div>
    </div>
  );
};

export default PublishForm;
