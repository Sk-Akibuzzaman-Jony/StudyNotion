import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../HomePage/Button';
import { getCourseProgress, markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { setViewCourseProgress, setViewSection, setViewSubsection } from '../../../slices/viewCourseSlice';
import { useNavigate } from 'react-router-dom';

const ViewVideo = () => {
    const { viewCourse, viewSubsection, viewSection } = useSelector((state) => state.viewCourse);
    const { token } = useSelector((state) => state.auth);
    const [showEndScreen, setShowEndScreen] = useState(false);
    const [courseProgress, setCourseProgress] = useState({});
    const playerRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to be called when video ends
    const handleVideoEnd = () => {
        setShowEndScreen(true);
    };

    const handleReWatchVideo = () => {
        setShowEndScreen(false);
        if (playerRef.current) {
            playerRef.current.seekTo(0);
        }
    };

    const handleMarkVideoComplete = async () => {
        const progress = await markLectureAsComplete({ courseId: viewCourse._id, subSectionId: viewSubsection._id }, token);
        setShowEndScreen(false);
        
        dispatch(setViewCourseProgress(progress));
        
        
    };

    const isFirstVideo = () => {
        const secIdx = viewCourse?.courseContent.findIndex((section) => section._id === viewSection._id);
        const subsecIdx = viewCourse?.courseContent[secIdx]?.subSection.findIndex((subsection) => subsection._id === viewSubsection._id);
        return secIdx === 0 && subsecIdx === 0;
    };

    const isLastVideo = () => {
        const secIdx = viewCourse?.courseContent.findIndex((section) => section._id === viewSection._id);
        const totalSec = viewCourse?.courseContent.length;
        const subsecIdx = viewCourse?.courseContent[secIdx]?.subSection.findIndex((subsection) => subsection._id === viewSubsection._id);
        const totalSubSec = viewCourse?.courseContent[secIdx]?.subSection.length;
        return secIdx === totalSec - 1 && subsecIdx === totalSubSec - 1;
    };

    const handleNextVideo = () => {
        setShowEndScreen(false);
        const secIdx = viewCourse?.courseContent.findIndex((section) => section._id === viewSection._id);
        const subsecIdx = viewCourse?.courseContent[secIdx]?.subSection.findIndex((subsection) => subsection._id === viewSubsection._id);
        const totalSubSec = viewCourse?.courseContent[secIdx]?.subSection.length;

        if (subsecIdx === totalSubSec - 1) {
            const nextSection = viewCourse?.courseContent[secIdx + 1];
            const nextSubSection = nextSection.subSection[0];
            dispatch(setViewSection(nextSection));
            dispatch(setViewSubsection(nextSubSection));
            navigate(`/view-course/course/${viewCourse._id}/section/${nextSection._id}/subsection/${nextSubSection._id}`);
        } else {
            const nextSubSection = viewCourse?.courseContent[secIdx]?.subSection[subsecIdx + 1];
            dispatch(setViewSubsection(nextSubSection));
            navigate(`/view-course/course/${viewCourse._id}/section/${viewSection._id}/subsection/${nextSubSection._id}`);
        }
    };

    const handlePrevVideo = () => {
        setShowEndScreen(false);
        const secIdx = viewCourse?.courseContent.findIndex((section) => section._id === viewSection._id);
        const subsecIdx = viewCourse?.courseContent[secIdx]?.subSection.findIndex((subsection) => subsection._id === viewSubsection._id);

        if (subsecIdx === 0) {
            const prevSection = viewCourse?.courseContent[secIdx - 1];
            const prevSubSection = prevSection.subSection[prevSection.subSection.length - 1];
            dispatch(setViewSection(prevSection));
            dispatch(setViewSubsection(prevSubSection));
            navigate(`/view-course/course/${viewCourse._id}/section/${prevSection._id}/subsection/${prevSubSection._id}`);
        } else {
            const prevSubSection = viewCourse?.courseContent[secIdx]?.subSection[subsecIdx - 1];
            dispatch(setViewSubsection(prevSubSection));
            navigate(`/view-course/course/${viewCourse._id}/section/${viewSection._id}/subsection/${prevSubSection._id}`);
        }
    };

    useEffect(() => {
        const getProgress = async () => {
            const cp = await getCourseProgress({ courseId: viewCourse._id }, token);
            if (cp) {
                setCourseProgress(cp);
                dispatch(setViewCourseProgress(cp));
            }
        };
        getProgress();
    }, [viewCourse, viewSubsection, token, dispatch]);

    return (
        <div>


            <div className='shadow-2xl shadow-richblack-700 rounded-xl overflow-hidden'>
                {viewSubsection?.videoUrl ? (
                    <ReactPlayer
                        ref={playerRef} // Attach the ref to ReactPlayer
                        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                        onContextMenu={e => e.preventDefault()}
                        className="react-player"
                        url={viewSubsection?.videoUrl}
                        controls
                        width='100%'
                        height='100%'
                        onEnded={handleVideoEnd}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-richblack-400">
                        Video not available, please contact support
                    </div>
                )}
                <div className={`${!showEndScreen && 'hidden'}`}>
                    {/* Backdrop for blurring the background */}
                    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10'></div>

                    {/* Modal */}
                    <div className='absolute bg-richblack-500 bg-opacity-0 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 z-20 rounded-lg'>
                        <div className='flex justify-between items-center'>
                            <div className='px-3 py-3 text-richblack-5 font-bold text-xl mx-auto'>Video Has Ended</div>
                        </div>
                        <hr />
                        <div className='flex flex-col gap-4'>
                            <button onClick={handleReWatchVideo}><Button active={true}>Re-Watch</Button></button>
                            <button onClick={handleMarkVideoComplete}><Button active={true}>Mark Video As Completed</Button></button>
                            {!isFirstVideo() && (
                                <button onClick={handlePrevVideo}><Button active={true}>Previous Video</Button></button>
                            )}
                            {!isLastVideo() && (
                                <button onClick={handleNextVideo}><Button active={true}>Next Video</Button></button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div className='text-richblack-50 mt-10 mb-5 text-3xl font-bold '>
                    {viewSubsection?.title}
                </div>
                <div className='text-richblack-100'>
                    {viewSubsection?.description}
                </div>
            </div>
        </div>
    );
};

export default ViewVideo;
