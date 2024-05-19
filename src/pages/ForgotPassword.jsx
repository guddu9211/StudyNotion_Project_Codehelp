import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';
import {  PropagateLoader } from 'react-spinners';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch()

    const {loading} = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

  return (
    <div>
        {
            loading ? (
                <div className='flex justify-center items-center mt-[15%]'>
                    <PropagateLoader
                        color='white'
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className='w-full h-full bg-richblack-900 flex flex-row justify-center items-center'>
                    <div className='mt-[10%] w-1/4'>
                        {/* // actual inner content  */}
                        <div className='flex flex-col gap-4'>
                            {/* heading area  */}
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-4xl font-semibold text-white'>
                                    {
                                        !emailSent ? 'Reset your Password' : 'Check your Email'
                                    }
                                </h1>
                                <p className='text-richblack-200 text-lg'>
                                    {
                                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                        : "Check your email and click on the link to reset your password"
                                    }
                                </p>
                            </div>

                            {/* input area  */}
                            <form onSubmit={handleOnSubmit}>
                                {
                                    !emailSent && (
                                        <label>
                                            <p className='text-sm text-richblack-5'>Email Address<sup>*</sup></p>
                                            <input 
                                                type="email" 
                                                name='email' 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='Email Address'
                                                className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                                            />
                                        </label>
                                    )
                                }
                                {/* button  */}
                                <button type='submit' className='w-full rounded-md px-2 text-md font-semibold border-b-[1px] border-solid py-2 my-4 bg-yellow-100 text-richblack-800'>
                                    {
                                        !emailSent ? (
                                            <p>Reset Password</p>
                                        ) : (
                                            <p>Resend Email</p>
                                        )
                                    }
                                </button>
                            </form>


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
    </div>
    
  )
}

export default ForgotPassword