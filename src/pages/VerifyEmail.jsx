import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaClock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PacmanLoader } from 'react-spinners'
import OTPInput from 'react-otp-input'
import {signUp, sendOtp} from '../services/operations/authAPI'
import toast from 'react-hot-toast'

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const {loading, signupData} = useSelector((state) => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        // at the first render check if the user have signup data or not. If not then go directly to signup page and collect the data first
        if(!signupData){
            navigate('/signup');
        }
        toast.loading("Signup Page will load now");
    }, [])

    function handleOnSubmit(e) {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }
  return (
    <div className='w-full h-full bg-richblack-900 flex flex-row justify-center items-center'>
        {
            loading ? (
                <div>
                    <PacmanLoader color="white" size={150} loading={loading} />
                </div>
            ) : (
                <div className='mt-[10%] w-1/4'>
                    {/* // actual inner content  */}
                    <div className='flex flex-col gap-4'>
                        {/* heading area  */}
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-4xl font-semibold text-white'>Verify Email</h1>
                            <p className='text-richblack-200 text-lg'>A verification code has been sent to you. Enter the code below</p>
                        </div>

                        {/* input area  */}
                        <form onSubmit={handleOnSubmit}>
                            {/* <input type="text" name='otp' placeholder='123456'
                                className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                            /> */}
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span className='text-white'>-</span>}
                                renderInput={(props) => <input {...props} />}
                                inputStyle='w-full text-center border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                                />

                            {/* button  */}
                            <button type='submit'
                                    className='my-4 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
                            >Verify and Register</button>
                        </form>


                        {/* back to login and resend OTP link */}
                        <div className='flex lg:flex-row md:flex-col sm:flex-col justify-between'>
                            <div className='flex flex-row gap-2 text-white items-center'>
                                <FaArrowLeft/>
                                <Link to={'/login'}>Back to Login</Link>
                            </div>
                            <button 
                                className='flex flex-row gap-2 text-white items-center mx-2 cursor-pointer'
                                onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                                <FaClock/>
                                <div>Resend OTP</div>
                            </button>
                        </div>

                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail