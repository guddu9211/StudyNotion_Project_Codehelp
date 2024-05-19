import React from 'react'
import CTAButton from '../components/core/Homepage/CTAButton';
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const ResetComplete = () => {
  return (
    <div className='w-full h-full bg-richblack-900 flex flex-row justify-center items-center'>
        <div className='mt-[10%] w-1/4'>
            {/* // actual inner content  */}
            <div className='flex flex-col gap-4'>
                {/* heading area  */}
                <div className='flex flex-col gap-2'>
                    <h1 className='text-4xl font-semibold text-white'>Reset Complete!</h1>
                    <p className='text-richblack-200 text-lg'>All done! We have sent an email to m***********@gmail.com to confirm</p>
                </div>


                {/* button  */}
                <CTAButton active={true} linkTo={'/login'}>Return to Login</CTAButton>

                {/* back to login and resend OTP link */}
                <div>
                    <div className='flex flex-row gap-2 text-white items-center'>
                        <FaArrowLeft/>
                        <Link to={'/login'}>Back to Login</Link>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ResetComplete