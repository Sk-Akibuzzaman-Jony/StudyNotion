import React, { useEffect, useState } from 'react';
import { getInstructorDetails } from '../../../../services/operations/profileApi';
import { useSelector } from 'react-redux';
import InstructorChart from './InstructorChart';
import InstructorStats from './InstructorStats';
import InstructorCourses from './InstructorCourses';

const Instructor = () => {
    const [loading, setLoading] = useState(false);
    const [instructorDetails, setInstructorDetails] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const details = await getInstructorDetails(token);
                setInstructorDetails(details);
                console.log(details);
            } catch (error) {
                console.error("Failed to fetch instructor details:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [token]);

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <div className='loader'>
                    </div></div>
            ) : (
                <>
                    <div className='text-richblack-5 text-4xl font-semibold mb-2'>Hi {user?.firstName} 👋</div>
                    <div className='text-richblack-100 mb-10'>Let's Build Something New...</div>
                    <div className='flex gap-10 h-[500px] '>
                        {/* PI-Chart Area */}

                        <InstructorChart instructorDetails={instructorDetails} />
                        <InstructorStats instructorDetails={instructorDetails} />

                    </div>
                    <div>
                        <InstructorCourses instructorDetails={instructorDetails} />
                    </div>
                </>
            )}
        </>
    )
}

export default Instructor;
