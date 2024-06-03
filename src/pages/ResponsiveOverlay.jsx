import React, { useState, useEffect } from 'react';
import { TbMoodSad } from "react-icons/tb";


const ResponsiveOverlay = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setShowOverlay(true);
            } else {
                setShowOverlay(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!showOverlay) return null;

    return (
        <div className="fixed bg-richblack-900 h-full w-full z-50">
            <div className="relative top-1/3 text-center">
                <div className='mb-10'>
                    <TbMoodSad className='text-yellow-25 mx-auto text-9xl' />
                </div>
                <p className='text-white'>This website is a work in progress and has not yet been made responsive. Please use a larger screen.</p>
            </div>
        </div>
    );
};

export default ResponsiveOverlay;
