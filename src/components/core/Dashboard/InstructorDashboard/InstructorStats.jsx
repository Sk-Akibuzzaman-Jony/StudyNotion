import React from 'react';

const InstructorStats = ({ instructorDetails }) => {
    // Calculate total number of students
    const totalStudents = instructorDetails.reduce((acc, course) => acc + course.totalStudents, 0);

    // Calculate total number of courses
    const totalCourses = instructorDetails.length;

    // Calculate total income
    const totalIncome = instructorDetails.reduce((acc, course) => acc + (course.totalIncome || 0), 0);

    return (
        <div className='bg-richblack-800 p-7 rounded-3xl w-[35%] h-full flex flex-col '>
            <h2 className='text-richblack-5 text-2xl mb-5 font-bold'>Instructor Stats</h2>
            <div className='text-richblack-100 text-lg mb-3 mt-3'>
                <p>Total Number of Students: <div className='font-bold text-richblack-5'>{totalStudents}</div></p>
            </div>
            <div className='text-richblack-100 text-lg mb-3 mt-3'>
                <p>Total Number of Courses: <div className='font-bold text-richblack-5'>{totalCourses}</div></p>
            </div>
            <div className='text-richblack-100 text-lg mt-3'>
                <p>Total Income: <div className='font-bold text-richblack-5'>₹ {totalIncome.toFixed(2)}</div></p>
            </div>
        </div>
    );
}

export default InstructorStats;
