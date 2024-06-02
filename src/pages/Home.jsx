import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSwipper from '../components/common/ReviewSwipper';

const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 '>
                        <div className='flex flex-row items-center gap- rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor<span>&nbsp;&nbsp;</span></p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='text-center font-semibold text-4xl mt-7'>
                    Empower Your Future With <span className='text-blue-50'>Coding Skills</span>
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/signup"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className=' shadow-blue-200 max-3 my-12'>
                    <video muted loop autoPlay>
                        <source src={Banner} type='video/mp4' />
                    </video>
                </div>

                {/* Code Section 1 */}
                <div>
                    <CodeBlocks
                        position={"flex-row"}
                        heading={
                            <div>
                                Unlock your <span className='text-blue-50'>coding potential </span> with our online courses
                            </div>
                        }
                        body={
                            <div>
                                Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                            </div>
                        }
                        button1={
                            {
                                active: true,
                                linkto: "/signup",
                                text: "Try It Yourself"
                            }
                        }
                        button2={
                            {
                                active: false,
                                linkto: "/signup",
                                text: "Learn more"
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                        codeColor={"text-white"}
                    />
                </div>
                {/* Code Section 2 */}
                <div>
                    <CodeBlocks
                        position={"flex-row-reverse"}
                        heading={
                            <div>
                                Start <span className='text-blue-50'>coding in seconds </span>
                            </div>
                        }
                        body={
                            <div>
                                Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                            </div>
                        }
                        button1={
                            {
                                active: true,
                                linkto: "/signup",
                                text: "Continue Lesson"
                            }
                        }
                        button2={
                            {
                                active: false,
                                linkto: "/signup",
                                text: "Learn more"
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                        codeColor={"text-white"}
                    />
                </div>
                <div>
                    <ExploreMore/>
                </div>
            </div>

            {/* Section 2 */}
            <div className=' bg-pure-greys-5'>
                <div className='hompage_bg h-[333px]'>
                    <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                        <div className='flex flex-row gap-7 mx-auto text-white mt-48'>
                            <CTAButton linkto={"/signup"} active={true}>
                                Explore Full Catelog →
                            </CTAButton>
                            <CTAButton linkto={"/signup"} active={false}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                    <div className='flex flex-row gap-20 mb-10 mt-[95px] ml-28'>
                        <div className='text-4xl font-semibold w-[50%]'>
                            Get the Skills you need for a
                            <span className='text-blue-50'> Job that is in demand</span>
                        </div>

                        <div className='flex flex-col gap-10 w-[50%] items-start'>
                            <div className='text-[16px] font-bold'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                    <TimelineSection />
                <LearningLanguageSection />
                </div>

                
            </div>
            
            <div className='w-11/12 flex flex-col items-center mt-14 mx-auto text-white'>
                <InstructorSection/>
            </div>
            <div>
                <div className='text-3xl mt-5 text-richblack-25 text-center'>
                    Rating and Reviews
                </div>
                <ReviewSwipper/>
            </div>
            <div className='pt-44'>
                <Footer/>
            </div>
        </div>
    )
}

export default Home