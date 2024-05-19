import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ACCOUNT_TYPE } from "../../../utils/constants"
import toast from 'react-hot-toast';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    })

    const {firstName, lastName, email, password, confirmPassword} = formData;

    const changeHandler = (event) => {
        setFormData( (prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }

        const signupData = {
            ...formData,
            accountType
        }

        // setting signup data to state, to be used after OTP verfification 
        dispatch(setSignupData(signupData));

        // send OTP to user for verification 
        dispatch(sendOtp(formData.email, navigate));

        // reset the form data 
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: '',
            country: '',
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        }
    ]

  return (
    <div className='w-full'>
        {/* Tab for selecting account type */}
        <div
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
        >
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAccountType(tab.type)}
            className={`${
              accountType === tab.type
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
          >
            {tab?.tabName}
          </button>
        ))}
        </div>
    

        <form onSubmit={handleOnSubmit} className='flex flex-col gap-6 font-inter w-[80%]'>
        
            <div className='flex flex-row gap-2'>
                <label>
                    <p className='text-sm'>First Name<sup>*</sup></p>
                    <input 
                        required
                        type='text'
                        value={firstName}
                        name='firstName'
                        onChange={changeHandler}
                        placeholder='First name'
                        className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                    />
                </label>
                <label>
                    <p className='text-sm'>Last Name<sup>*</sup></p>
                    <input
                        required
                        type='text'
                        value={lastName}
                        name='lastName'
                        onChange={changeHandler}
                        placeholder='Last name'
                        className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                        />
                </label>
            </div>

            <label className='w-full'>
                <p className='text-sm'>Email Address<sup>*</sup></p>
                <input 
                    required
                    type='email'
                    value={email}
                    name='email'
                    onChange={changeHandler}
                    placeholder='sample@example.com'
                    className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                />
            </label>
            
            {/* <p className='text-sm'>Phone number<sup>*</sup></p>
            <label className='flex flex-row gap-2 -mt-6 items-center'>
                <div>
                    <select className='w-full h-full rounded-md px-1 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'>
                        <option value='+91'>+91</option>
                        <option value='0'>0</option>
                    </select>   
                </div>

                <input 
                    required
                    type='tel'
                    value={phone}
                    name='phone'
                    onChange={changeHandler}
                    placeholder='9999999999'
                    className='w-[90%] rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                />
            </label> */}

            <div>
                <div className='flex flex-row gap-2 justify-between'>
                    <label className='relative'>
                        <p className='text-sm'>Create Password<sup>*</sup></p>
                        <input 
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            name='password'
                            onChange={changeHandler}
                            placeholder='Enter a new password'
                            className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                        />
                        <span
                            className='text-lg text-blue-500 font-semibold absolute right-2 top-1/2'
                            onClick={() => setShowPassword(!showPassword)} >
                            {showPassword ? <FiEye/> : <FiEyeOff/>}
                        </span>
                    </label>
                    <label className='relative'>
                        <p className='text-sm'>Confirm Password<sup>*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            name='confirmPassword'
                            onChange={changeHandler}
                            placeholder='Re-enter your password'
                            className='w-full rounded-md px-2 text-sm border-b-[1px] border-solid py-2 my-1 bg-richblack-800 text-richblack-25'
                            />
                        <span className='text-lg text-blue-500 font-semibold absolute right-2 top-1/2'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FiEye/> : <FiEyeOff/>}
                        </span>
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
            </button>
        </form>
    </div>
  )
}

export default SignupForm