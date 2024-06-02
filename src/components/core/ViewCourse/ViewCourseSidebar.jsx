import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import { FaAngleDown, FaCheckCircle } from "react-icons/fa";
import clsx from 'clsx';
import Button from "../HomePage/Button";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setViewCourse, setViewCourseProgress, setViewSection, setViewSubsection } from '../../../slices/viewCourseSlice';
import StarRatings from 'react-star-ratings';
import { IoChevronBackCircle, IoClose } from 'react-icons/io5';
import { createRating, getCourseProgress } from '../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import ErrorPage from '../../../pages/ErrorPage';

const ViewCourseSidebar = () => {
    const { viewCourse, viewSection, viewSubsection, viewCourseProgress } = useSelector((state) => state.viewCourse);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [rating, setRating] = useState(0);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [experience, setExperience] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const [courseProgress, setCourseProgress] = useState({});

    const handleNavigation = (course, section, subsection) => {
        dispatch(setViewCourse(course));
        dispatch(setViewSection(section));
        dispatch(setViewSubsection(subsection));
        navigate(`/view-course/course/${course._id}/section/${section._id}/subsection/${subsection._id}`);
    };

    const changeRating = (newRating) => {
        setRating(newRating);
    };

    const toggleReviewModal = () => {
        setShowReviewModal(!showReviewModal);
    };

    const handleExperienceChange = (event) => {
        setExperience(event.target.value);
    };

    const handleSubmitReview = async () => {
        try {
            const data = { courseId: viewCourse._id, rating: rating, review: experience };
            const result = await createRating(data, token);
            toast.success("Review submitted successfully!");
            setShowReviewModal(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleBackButton = () => {
        navigate('/dashboard/enrolled-courses');
    }

    const getProgress = async () => {
        const cp = await getCourseProgress({ courseId: viewCourse._id }, token);
        if (cp) {
            //console.log(cp);  // Debug: Log course progress
            setCourseProgress(cp);
            dispatch(setViewCourseProgress(cp));
        }
    };

    useEffect(() => {
        getProgress();
    }, [dispatch, token, location.pathname]);

    
    
        
    return (
        <div className='flex'>
            <div className='flex w-56 flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 pt-5 pb-8 justify-between'>
                <div>
                    <div className='mx-2'>
                        <button className='transition-transform transform hover:scale-110' onClick={handleBackButton}><IoChevronBackCircle className='text-3xl text-richblack-50' />
                        </button>
                    </div>
                    <div className='py-2 px-3 text-richblack-5 font-bold text-xl'>{viewCourse?.courseName}</div>
                    <hr className='text-richblack-700' />
                    {viewCourse?.courseContent.map((section) => (
                        <Disclosure key={section._id} defaultOpen={viewSection._id === section._id}>
                            {({ open }) => (
                                <>
                                    <DisclosureButton
                                        className="flex items-center justify-between py-3 text-richblack-5 bg-richblack-800 border-richblack-700 border-b w-full text-left px-4"
                                    >
                                        {section.sectionName}
                                        <FaAngleDown className={clsx('w-5 transition-transform', open && 'rotate-180')} />
                                    </DisclosureButton>
                                    <Transition
                                        enter="transition duration-200 ease-out"
                                        enterFrom="transform -translate-y-2 opacity-0"
                                        enterTo="transform translate-y-0 opacity-100"
                                        leave="transition duration-200 ease-out"
                                        leaveFrom="transform translate-y-0 opacity-100"
                                        leaveTo="transform -translate-y-2 opacity-0"
                                    >
                                        <DisclosurePanel className="overflow-hidden">
                                            {section.subSection.map((subsection) => (
                                                <div
                                                    key={subsection._id}
                                                    className={clsx(
                                                        'py-1 pl-5 mx-2 rounded-lg cursor-pointer flex items-center justify-between',
                                                        viewSubsection._id === subsection._id ? 'bg-yellow-50 text-richblack-900' : 'text-richblack-50'
                                                    )}
                                                    onClick={() => handleNavigation(viewCourse, section, subsection)}
                                                >
                                                    {subsection.title}
                                                    {viewCourseProgress?.completedVideos?.includes(subsection._id) && (
                                                        <FaCheckCircle className="text-caribbeangreen-300 mr-3" />
                                                    )}
                                                </div>
                                            ))}
                                        </DisclosurePanel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>
                <button className='mx-3' onClick={toggleReviewModal}><Button active={true}>Add Review</Button></button>
            </div>
            {showReviewModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center'>
                    <div className='relative bg-richblack-500 rounded-lg'>
                        <div className='flex justify-between items-center px-3 py-3 text-richblack-5 font-bold text-xl'>
                            <span>Add Review</span>
                            <button className='text-3xl p-3 text-richblack-50 hover:text-richblack-5 transition-all' onClick={toggleReviewModal}><IoClose /></button>
                        </div>
                        <hr />
                        <div className='py-3 px-20 flex items-center gap-2'>
                            <img src={user?.image} className='w-14 h-14 rounded-full' alt='profilePic' />
                            <div className='text-richblack-25'>
                                {user?.firstName} {user?.lastName}
                                <div className='text-richblack-50 text-sm'>Posting Publicly</div>
                            </div>
                        </div>
                        <div className='py-3 px-20'>
                            <StarRatings
                                rating={rating}
                                starRatedColor='rgb(230, 67, 47)'
                                changeRating={changeRating}
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>
                        <div className='py-3 px-2'>
                            <label className='block text-richblack-50 mb-2' htmlFor='experience'>Add your experience</label>
                            <textarea
                                id='experience'
                                name='experience'
                                rows='4'
                                className='w-full p-2 border border-richblack-700 rounded-md bg-richblack-600 text-richblack-50'
                                value={experience}
                                onChange={handleExperienceChange}
                            ></textarea>
                        </div>
                        <button className='w-full p-5' onClick={handleSubmitReview}><Button active={true}>Submit</Button></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCourseSidebar;
