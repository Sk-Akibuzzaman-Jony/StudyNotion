import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../utils/constants";
import { FaCheckCircle } from "react-icons/fa";
import { BsStopwatch } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import {
  resetCourseState,
  setCourse,
  setEditCourse,
  setStep,
} from "../../../slices/courseSlice";
import { Link, useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.course);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      setLoading(true); // Set loading to true before fetching courses
      const result = await fetchInstructorCourses(token);
      setCourses(result);
      setLoading(false); // Set loading to false after fetching courses
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    dispatch(resetCourseState());
    if (token) {
      fetchCourses();
    }
  }, [token]);

  const handleDeleteCourse = async (course) => {
    const result = await deleteCourse({ courseId: course._id }, token);
    fetchCourses();
  };

  const calculateDuration = (courseContent) => {
    let totalDuration = 0;
    var date = new Date(null);
    courseContent.forEach((section) => {
      section.subSection.forEach((subSec) => {
        totalDuration += parseInt(subSec.timeDuration, 10);
      });
    });
    date.setSeconds(totalDuration);
    return date.toISOString().substring(11,19);
  };

  return (
    <div className="text-richblack-5">
      <h1 className="text-3xl font-bold mb-10">My Courses</h1>
      <div className="overflow-x-auto">
        {loading ? (         
            <div className="loader mt-20"></div>
        ) : (
          <>
            {courses.length > 0 ? (
              <table className="min-w-full bg-richblack-800 border border-richblack-500 rounded-xl">
                <thead className="border-b border-richblack-500 rounded-t-xl">
                  <tr>
                    <th className="py-2 px-4 w-[50%]">Course</th>
                    <th className="py-2 px-4">Duration <span className="text-xs font-thin">(HH:MM:SS)</span></th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-richblack-700">
                      <td className="py-2 px-4">
                        <div className="flex">
                          <img
                            src={course.thumbnail}
                            className="h-48 rounded-3xl shadow-richblack-800 shadow-2xl mr-8"
                            alt={course.courseName}
                          />
                          <div className="flex flex-col justify-between">
                            <div className="">
                              <div className="text-2xl font-bold">
                                {course.courseName}
                              </div>
                              <p className="text-richblack-300 w-44 truncate">
                                {course.courseDescription}
                              </p>
                            </div>
                            <div
                              className={`${
                                course.status === COURSE_STATUS.PUBLISHED
                                  ? "text-caribbeangreen-400"
                                  : "text-red-300"
                              } bg-richblack-500 py-1 px-2 w-fit rounded-full flex gap-2 items-center mb-5`}
                            >
                              {course.status === COURSE_STATUS.PUBLISHED ? (
                                <FaCheckCircle />
                              ) : (
                                <BsStopwatch />
                              )}
                              {course.status}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center">{calculateDuration(course.courseContent)}</td>
                      <td className="py-2 px-4 text-center"> ₹ {course.price}</td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2 justify-center text-3xl text-richblack-300">
                          <button
                            type="button"
                            onClick={() => handleDeleteCourse(course)}
                            className="focus:outline-none"
                          >
                            <RiDeleteBin5Line />
                          </button>
                          <button
                            type="button"
                            onClick={() => {navigate(`/dashboard/edit-course/${course._id}`)}}
                            className="focus:outline-none"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div> You haven't created any courses go to <Link to="/dashboard/add-course" className="text-blue-200 underline">Add Course</Link> to create one</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
