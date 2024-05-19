import React, { useState } from 'react'
import { FaArrowLeft, FaCircleCheck } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { resetPassword } from '../services/operations/authAPI';
import { RingLoader } from 'react-spinners';

const ChooseNewPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const {password, confirmPassword} = formData;

    const dispatch = useDispatch();
    const location = useLocation();

    const [lengthCriteria, setLengthCriteria] = useState(0);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);

    function handleOnChange(event) {
        console.log(event.target.value);
        let str = event.target.value;
        setFormData( (prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name] : str
            }
        });
        // password validation 
        setLengthCriteria(str.length);
        setHasSpecialChar(/[ `!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(str));
        setHasUppercase(/[A-Z]/.test(str));
        setHasLowercase(/[a-z]/.test(str));
        setHasNumber(/[0-9]/.test(str));
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token ));
    }

  return (
    <div className='w-full h-full bg-richblack-900 flex flex-row justify-center items-center text-richblack-5'>
        {
            loading ? (
                <div className='flex justify-center items-center mt-[15%]'>
                    <RingLoader
                        color='white'
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className='mt-[10%] w-1/4'>
                    {/* // actual inner content  */}
                    <div className='flex flex-col gap-4'>
                        {/* heading area  */}
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-4xl font-semibold text-white'>Choose new Password</h1>
                            <p className='text-richblack-200 text-lg'>Almost done. Enter your new password and youre all set.</p>
                        </div>

                        {/* input area  */}
                        <form 
                            onSubmit={handleOnSubmit}
                            className='flex flex-col gap-4'>
                            <div className='relative'>
                                <p className='text-sm'>Password<sup>*</sup></p>
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={password}
                                    placeholder='*********'
                                    onChange={handleOnChange}
                                    className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                                />
                                <span className='text-lg text-blue-500 font-semibold absolute right-2 top-1/2'
                                    onClick={() => setShowPassword(!showPassword)} >
                                    {showPassword ? <FiEye/> : <FiEyeOff/>}
                                </span>
                            </div>

                            <div className='relative'>
                                <p className='text-sm'>Confirm Password<sup>*</sup></p>
                                <input
                                    required
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    placeholder='*********'
                                    onChange={handleOnChange}
                                    className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                                />

                                <span className='text-lg text-blue-500 font-semibold absolute right-2 top-1/2'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                                    {showConfirmPassword ? <FiEye/> : <FiEyeOff/>}
                                </span>
                            </div>
                            
                            <div>
                                <ul className='text-richblack-200 text-md'>
                                    <li className={`flex flex-row gap-2 items-center
                                    ${hasLowercase ? 'text-caribbeangreen-200' : 'text-richblack-200'}`}>
                                        <FaCircleCheck/>
                                        One Lowercase
                                    </li>
                                    <li className={`flex flex-row gap-2 items-center
                                    ${hasUppercase ? 'text-caribbeangreen-200' : 'text-richblack-200'}`}>
                                        <FaCircleCheck/>
                                        One Uppercase
                                    </li>
                                    <li className={`flex flex-row gap-2 items-center
                                    ${hasSpecialChar ? 'text-caribbeangreen-200' : 'text-richblack-200'}`}>
                                        <FaCircleCheck/>
                                        One Special Character
                                    </li>
                                    <li className={`flex flex-row gap-2 items-center
                                        ${lengthCriteria >= 8 ? 'text-caribbeangreen-200' : 'text-richblack-200'}`}>
                                        <FaCircleCheck/>
                                        Minimum 8 Characters
                                    </li>
                                    <li className={`flex flex-row gap-2 items-center
                                        ${hasNumber ? 'text-caribbeangreen-200' : 'text-richblack-200'}`}>
                                        <FaCircleCheck/>
                                        One Number
                                    </li>
                                </ul>
                            </div>

                        
                            {/* button  */}
                            <button type='submit' className='w-full rounded-md px-2 text-md font-semibold border-b-[1px] border-solid py-2 my-4 bg-yellow-100 text-richblack-800'>
                                <p>Reset Password</p>
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
            )
        }
    </div>
  )
}

export default ChooseNewPassword