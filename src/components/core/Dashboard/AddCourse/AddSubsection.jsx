import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { setCourse, setEditCourse, setEditSubsection } from "../../../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../services/operations/courseDetailsAPI";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";

const AddSubsection = ({ section }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingVideo, setExistingVideo] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { course, editSubsection } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const toggleModal = () => {
    if (editSubsection) {
      dispatch(setEditSubsection(null));
    }
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (editSubsection) {
      setIsModalOpen(true);
      setValue("title", editSubsection.title);
      setValue("description", editSubsection.description);
      setExistingVideo(editSubsection.videoUrl);
    } else if (!editSubsection){
      setValue("title", "");
      setValue("description", "");
      setExistingVideo(null);
    }
  }, [editSubsection, setValue]);

  const getVideoDuration = (videoFile) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";

      videoElement.onloadedmetadata = function () {
        window.URL.revokeObjectURL(videoElement.src);
        const duration = videoElement.duration;
        resolve(duration);
      };

      videoElement.onerror = function () {
        reject("Error loading video metadata");
      };

      videoElement.src = URL.createObjectURL(videoFile);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const videoFile = data.videoFile[0] || existingVideo;
      const duration = await getVideoDuration(videoFile);
      const formData = new FormData();
      formData.append("sectionId", section._id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("videoFile", videoFile);
      formData.append("timeDuration", duration);
      formData.append("courseId", course._id);

      if (!editSubsection) {
        const result = await createSubSection(formData, token);
        if (result) {
          dispatch(setCourse(result));
          console.log(result);
        }
      } else {
        formData.append("subSectionID", editSubsection._id);
        const result = await updateSubSection(formData, token);
        if (result) {
          dispatch(setCourse(result));
          console.log(result);
          dispatch(setEditCourse(null));
        }
      }
    } catch (error) {
      console.error("Error while submitting form: ", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className={`flex items-center gap-2 text-center text-[13px] px-6 py-2 rounded-md font-bold bg-yellow-800 text-richblack-100 border border-yellow-50 hover:scale-95 transition-all duration-200`}
        type="button"
        disabled={loading} // Disable button during loading
      >
        <GoPlusCircle className="text-2xl text-yellow-50" />
        Add Subsection
      </button>

      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-richblack-900 bg-opacity-75"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-richblack-600 border border-richblack-900 rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-richblack-500">
                <h3 className="text-lg font-semibold text-richblack-25">
                  {editSubsection ? "Edit Subsection" : "Create New Subsection"}
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-richblack-25 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  disabled={loading} // Disable button during loading
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      {...register("title", { required: "Title is required" })}
                      className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
                      placeholder="Enter Subsection Title"
                      disabled={loading} // Disable input during loading
                    />
                    {errors.title && (
                      <p className="text-red-500 mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows="4"
                      className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
                      placeholder="Write product description here"
                      disabled={loading} // Disable input during loading
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="videoFile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Video
                    </label>
                    {editSubsection && (
                      <div>
                        {" "}
                        <Link
                          to={existingVideo}
                          target="_blank"
                          className=" text-blue-200 underline pb-2"
                        >
                          Current video
                        </Link>
                        <div className="text-sm mb-2">
                          To Change Upload the New Video
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      id="videoFile"
                      {...register("videoFile")}
                      className="bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
                      disabled={loading} // Disable input during loading
                    />
                    {errors.videoFile && (
                      <p className="text-red-500 mt-1">
                        {errors.videoFile.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className={`flex items-center text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 ${loading ? "loader-button" : ""}`}
                  disabled={loading}
                >
                  {editSubsection ? "Update Subsection" : "Add Subsection"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubsection;
