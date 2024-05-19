import React from 'react'
import { FaPeopleGroup } from 'react-icons/fa6'
import { ImTree } from 'react-icons/im'

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div onClick={() => setCurrentCard(cardData.heading)}>
      <div className={`flex flex-col w-[20rem] h-[20rem] 
                ${currentCard === cardData.heading ? 'bg-richblack-5 text-richblack-800 card-shadow' : 'bg-richblack-700 text-richblack-50'} `}>
        <div className='p-4'>
          <h1 className='text-2xl font-semibold'>{cardData.heading}</h1>
          <p className='my-4'>{cardData.description}</p>
        </div>
        <div className='w-full border-[1px] border-dashed border-richblack-200 mt-14'></div>
        <div className='flex flex-row justify-between mx-6 py-4'>
          <div className='flex gap-2'>
            <FaPeopleGroup/>
            <p>{cardData.level}</p>
          </div>
          <div className='flex gap-2'>
            <ImTree/>
            <p>{cardData.lessionNumber} Lessons</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard