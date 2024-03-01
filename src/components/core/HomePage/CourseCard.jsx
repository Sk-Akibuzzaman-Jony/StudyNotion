import React from 'react';
import { LuNetwork } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";



const CourseCard = ({ key, cardData, currentCard, setCurrentCard }) => {
    return (
        <div>
            <div className={`max-w-sm h-72 ${currentCard === cardData.heading ? "bg-white shadow-[12px_18px_0px_0px_#FFD60A]" : "bg-richblack-800"} shadow flex flex-col text-white `}>
                <div className='flex flex-col' onMouseEnter={() => setCurrentCard(cardData.heading)}>

                    <div className='p-4'>
                        <a href="#" className=''>
                            <h5 className={`mb-2 text-2xl font-bold tracking-tight ${currentCard === cardData.heading ? "text-richblack-800" : "text-white"}`}>{cardData.heading}</h5>
                        </a>
                    </div>
                    <div>
                    </div>
                    <div className='p-4 text-richblack-500'>
                        <p className="mb-3 font-normal">
                            {cardData.description}
                        </p>
                    </div>
                    <div className='border-b-2 border-richblack-600 border-dashed pt-5 '></div>
                    <div className={`flex flex-row p-4`}>
                        <div className={` w-[90%] flex flex-row gap-3 items-center bottom-5 left-6 ${currentCard === cardData.heading ? "text-caribbeangreen-500" : "text-richblack-500"}`}>
                            <FaUserGroup /> {cardData.level}
                        </div>
                        <div className={`bottom-5 flex flex-row items-center gap-3 right-6 ${currentCard === cardData.heading ? "text-caribbeangreen-500" : "text-richblack-500"}`}>
                            <LuNetwork />{cardData.lessionNumber}
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default CourseCard;
