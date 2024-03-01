import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png";
import CTAButton from './Button';
import HighlightText from "./HighlightText";

const InstructorSection = () => {
    return (
        <div className='flex flex-row items-center gap-24 mx-auto'>
            <div className='p-16 w-[60%]'>
                <img src={InstructorImage} alt="InstructorImage" className='object-cover shadow-white' />
            </div>
            <div>
                <div className='w-[80%] flex flex-col gap-10 text-left'>
                    <div className='text-4xl font-semobold'>
                        Become an
                        <HighlightText text={"Instructor"} />
                    </div>

                    <p className='font-medium text-[16px] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>

                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex flex-row gap-2 items-center'>
                                Start Learning Today
                            </div>
                        </CTAButton>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default InstructorSection