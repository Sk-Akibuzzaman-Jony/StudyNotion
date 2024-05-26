import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileApi';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);


    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            if (response) {
                console.log(response);
            }
            
            setEnrolledCourses(response);
        }
        catch (error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
    },[]);


    //dummy data for initial styling
    // useEffect(() => {
    //     setEnrolledCourses([
    //         {
    //             id: 1,
    //             courseName: "Introduction to React",
    //             courseDescription: "Learn the basics of React.js framework",
    //             thumbnail: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=1060&t=st=1713599547~exp=1713600147~hmac=93dc7321a600463f4b37c78e19c9cbd669d7e226896a69bde14afb68b4dd4f47",
    //             totalDuration: 100,
    //             progressPercentage: 50 // Assuming 50% progress
    //         },
    //         {
    //             id: 2,
    //             courseName: "Advanced JavaScript",
    //             courseDescription: "Explore advanced concepts of JavaScript",
    //             thumbnail: "https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg",
    //             totalDuration: 60,
    //             progressPercentage: 75 // Assuming 75% progress
    //         },
    //     ]);
    // }, [])



    return (
        <div className='text-white w-8/12 mx-auto'>

            <div className='text-richblack-5 text-3xl font-bold pb-20'>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div>
                    Loading...
                </div>)
                    : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
                        : (
                            <div className='w-full inline-block rounded-t-lg border border-richblack-700'>
                            <table className='w-full table-auto border-separate border-spacing-0 inline-table rounded-t-lg border border-richblack-700'>
                                <thead className='bg-richblack-700 '>
                                    <tr className='font-bold text-richblack-50'>
                                        <th className='p-5'>Course Name</th>
                                        <th className='p-5'>Durations</th>
                                        <th className='p-5'>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolledCourses.map((course, index) => (
                                        <tr key={index} className='border-b border-l border-r border-richblack-500 text-richblack-25'>
                                            <td className='flex p-5 items-center'>
                                                <img src={course.thumbnail} className='h-20 w-20 rounded-lg mr-4' alt={course.courseName} />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </td>
                                            <td className='p-5 text-center'>{course?.totalDuration}</td>
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
    )
}

export default EnrolledCourses
