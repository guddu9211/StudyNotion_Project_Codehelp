import React from 'react'
import ReactStars from "react-rating-stars-component";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const RatingBar = ({rating, isEditable}) => {
  return (
    <div>
        <ReactStars 
            count={5}
            value={rating}
            size={26}
            edit={isEditable}
            onClick={() => {
                toast.error("Someone tried to change the rating !!")
            }}
            isHalf={true}
            emptyIcon={<FaStar/>}
            halfIcon={<FaStarHalfAlt/>}
            fullIcon={<FaStar/>}
            activeColor="#ffd700"
        />
    </div>
  )
}
