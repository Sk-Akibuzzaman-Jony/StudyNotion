import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import ViewCourseSidebar from '../components/core/ViewCourse/ViewCourseSidebar'
import { getCourseProgress, getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setViewCourse, setViewCourseProgress, setViewSection, setViewSubsection } from '../slices/viewCourseSlice';
import ErrorPage from './ErrorPage';

const ViewCourse = () => {
    const {viewCourse} = useSelector((state) => state.viewCourse);
    const { courseId, sectionId, subsectionId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [seed, setSeed] = useState(1);
    const [loading, setLoading] = useState(false); // Add loading state

    const resetSidebar = () => {
        setSeed(Math.random());
    };

    useEffect(() => {
        const getCourse = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const course = await getFullDetailsOfCourse({ courseId: courseId }, token);
                dispatch(setViewCourse(course));

                //if(course?.success === false) return <ErrorPage/> // if the student hasn't bought the course

                console.log(course);

                // Find the section that matches the sectionId
                const foundSection = course?.courseContent.find(section => section._id === sectionId) || course?.courseContent[0];
                dispatch(setViewSection(foundSection));

                // Find the subsection that matches the subsectionId within the found section
                const foundSubsection = foundSection?.subSection.find(subsection => subsection._id === subsectionId) || foundSection?.subSection[0];
                dispatch(setViewSubsection(foundSubsection));

                // const cp = await getCourseProgress({ courseId: courseId }, token);
                // dispatch(setViewCourseProgress(cp));

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Failed to fetch course details:", error);
                setLoading(false); // Set loading to false in case of an error
            }
        };
        getCourse();
    }, [location.pathname]);

    useEffect(() => {
        resetSidebar();
    }, [sectionId]);

    // if (viewCourse?.success === false) {
    //     navigate(`/course/${courseId}`);
    //     return;
    // }

    return (
        <div className='relative flex'>
            {loading ? (
                <div className='mx-auto h-screen'>
                    <div className="loader mt-36"></div>
                </div>
            ) : (
                <>
                    <ViewCourseSidebar key={seed} />
                    <div className="w-full h-[calc(100vh-3.5rem)] overflow-auto">
                        <div className="mx-auto w-11/12 py-10">
                            <Outlet />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewCourse;
