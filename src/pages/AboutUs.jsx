import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";

const AboutUs = () => {
  return (
    <div className='self-center'>
        <div className='bg-richblack-800 w-screen'>
        <div className='text-center text-richblack-200 pt-32 pb-24 text-lg  w-11/12 mx-auto'>
            About us
        </div>
        <div className='text-richblack-5 text-center text-5xl'>
        Driving Innovation in Online Education for a <br/><HighlightText text="Brighter Future"/>
        </div>
        <p className='text-richblack-200 w-2/5 pt-8 mx-auto text-center pb-48'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>
        <div className='flex flex-row'>
            <img src={image1} className=''/>
        </div>
    </div>
  )
}

export default AboutUs