import React from 'react'
import StarRatings from 'react-star-ratings';

const ReviewCard = ({ review }) => {
    console.log(review);
    return (
        <div className='bg-richblack-700 p-4 rounded-xl text-sm'>
            <div className='mr-40'>
                <div className='flex gap-3'>
                    <img src={review?.user?.image} alt='user image' className='w-8 h-8 rounded-full' />
                    <div className='text-richblack-50'>
                        {review?.user?.firstName} {review?.user?.lastName}
                        <div className='text-xs text-richblack-200'>
                            {review?.user?.email}
                        </div>
                    </div>

                </div>

            </div>
            <div className='text-richblack-50 mt-2'>
                {review?.review}
            </div>
            <div className='flex gap-2 items-center mt-4 text-yellow-50'>
            <div>
            {review?.rating}
            </div>
            <StarRatings
                rating={review?.rating}
                starDimension="15px"
                starSpacing="2px"
                starRatedColor="yellow"
            />
            </div>
            
        </div>
    )
}

export default ReviewCard