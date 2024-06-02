import React from 'react'
import CourseSlider from '../../CategoryPage/CourseSlider'

const InstructorCourses = ({instructorDetails}) => {
  return (
    <div className='bg-richblack-800 p-7 rounded-3xl h-full flex flex-col mt-10 w-full'>
    <div className='mb-8 ml-3 text-richblack-5 font-bold text-2xl'>Your Courses</div>
        <CourseSlider courses={instructorDetails}/>
    </div>
  )
}

export default InstructorCourses