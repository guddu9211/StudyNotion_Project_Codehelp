import React from 'react'
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png'

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col w-11/12 my-20 items-center'>
        {/* heading area  */}
        <div className='flex flex-col items-center'>
            <div className='flex font-semibold text-4xl gap-2'>
                <p>Your swiss knife for </p>
                <HighlightText text={'Learning any Language'}/>
            </div>
            <p className='text-center mx-auto text-richblack-300 w-[70%] my-4'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </p>
        </div>

        {/* 3 images placed with random rotation  */}
        <div className='flex flex-row items-center justify-center mt-2'>
            {/* image 1 rotated 25 degree */}
            <img src={knowYourProgress} alt='know your progress' 
                className='object-contain -mr-32'
            />

            {/* image 2 rotated -12 degrees  */}
            <img src={compareWithOthers} alt='compare with others' 
                className='object-contain z-1'
            />

            {/* image 3 rotated 12 degrees  */}
            <img src={planYourLessons} alt='plan your lessons' 
                className='object-contain -ml-36'
            />

        </div>

        {/* learn more button in the middle  */}
        <div className='w-fit'>
            <CTAButton active={true} linkTo={'/signup'}>
                Learn More
            </CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection