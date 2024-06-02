import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/api';
import ReviewCard from './ReviewCard';
const { GET_ALL_REVIEWS } = courseEndpoints;

const ReviewSwipper = () => {
    const [reviews, setReviews] = useState({});
    useEffect(() => {
        const getReviews = async () => {
            const result = await apiConnector("GET", GET_ALL_REVIEWS);
            //console.log(result);
            setReviews(result?.data?.data);
        }
        getReviews();
    }, [])

    return (
        <div className='mt-10'><Swiper
            spaceBetween={50}
            slidesPerView={4}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
        >
            {reviews.length && reviews.map((review) => (
                <SwiperSlide><ReviewCard review={review} /></SwiperSlide>
            ))}

        </Swiper></div>
    )
}

export default ReviewSwipper