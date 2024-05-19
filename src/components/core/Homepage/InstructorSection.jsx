import React from 'react'
import InstructorImg from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa6'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            {/* left image content area  */}
            <div className='w-[50%]'>
                <img src={InstructorImg} alt='instructor aunty ji' 
                    className='top-left-shadow' />
            </div>

            {/* right 3 layer text area  */}
            <div className='flex flex-col w-[50%] gap-8 items-start'>
                <div className='text-4xl font-semibold w-[50%]'>
                    <p>Become an</p>
                    <HighlightText text={'Instructor'}/>
                </div>

                <p className='text-lg text-richblack-200 w-[80%]'> 
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <CTAButton active={true} linkTo={'/signup'}>
                    <div className='flex items-center gap-2'>
                        <p>Start Teaching Today</p>
                        <FaArrowRight/>
                    </div>   
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection