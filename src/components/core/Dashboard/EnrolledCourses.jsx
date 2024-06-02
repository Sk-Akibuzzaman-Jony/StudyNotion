import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileApi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

// Function to calculate the total duration of a course
const calculateDuration = (courseContent) => {
    let totalDuration = 0;
    var date = new Date(null);
    courseContent.forEach((section) => {
        section.subSection.forEach((subSec) => {
            totalDuration += parseInt(subSec.timeDuration, 10);
        });
    });
    date.setSeconds(totalDuration);
    return date.toISOString().substring(11, 19);
};

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            if (response) {
                // Calculate total duration for each course
                const coursesWithDuration = response.courses.map(course => ({
                    ...course,
                    totalDuration: calculateDuration(course.courseContent)
                }));
                setEnrolledCourses(coursesWithDuration);
            }
        } catch (error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    const handleRowClick = (course) => {
        navigate(`/view-course/course/${course._id}/section/${course?.courseContent[0]?._id}/subsection/${course?.courseContent[0]?.subSection[0]._id}`);
    };

    return (
        <div className='text-white w-11/12 mx-auto'>
            <div className='text-richblack-5 text-3xl font-bold pb-20'>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div className='loader'></div>)
                    : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
                        : (
                            <div className='w-full inline-block rounded-t-lg border border-richblack-700'>
                                <table className='w-full table-auto border-separate border-spacing-0 inline-table rounded-t-lg border border-richblack-700'>
                                    <thead className='bg-richblack-700'>
                                        <tr className='font-bold text-richblack-50'>
                                            <th className='p-5'>Course Name</th>
                                            <th className='p-5'>Duration</th>
                                            <th className='p-5'>Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrolledCourses.map((course, index) => (
                                            <tr
                                                key={index}
                                                className='border-b border-l border-r border-richblack-500 text-richblack-25 cursor-pointer'
                                                onClick={() => handleRowClick(course)}
                                            >
                                                <td className='flex p-5 items-center'>
                                                    <img src={course.thumbnail} className='h-20 rounded-lg mr-4' alt={course.courseName} />
                                                    <div>
                                                        <p>{course.courseName}</p>
                                                        <p>{course.courseDescription}</p>
                                                    </div>
                                                </td>
                                                <td className='p-5 text-center'>{course.totalDuration}</td>
                                                <td className='p-5'>
                                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                                    <ProgressBar
                                                        completed={course.progressPercentage || 0}
                                                        height='8px'
                                                        isLabelVisible={false}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
            }
        </div>
    );
};

export default EnrolledCourses;
