import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;


    function changeHandler(event) {
        setFormData( (prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    }

  return (
    <form onSubmit={handleOnSubmit} className='flex flex-col gap-6 font-inter  w-[70%]'>
        
        <label>
            <p className='text-sm'>Email Address<sup>*</sup></p>
            <input 
                required
                type='email'
                value={email}
                name='email'
                onChange={changeHandler}
                placeholder='Enter your email address'
                className='w-full rounded-md px-2 text-md border-b-[1px] border-solid py-1 my-1 bg-richblack-800 text-richblack-25'
            />
        </label>

        <label className='relative '>
            <p className='text-sm'>Password<sup>*</sup></p>
            <input 
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                name='password'
                onChange={changeHandler}
                placeholder='Enter your password'
                className='w-full rounded-md px-2 text-md border-b-[1px] border-solid py-1 my-1 bg-richblack-800 text-richblack-25'
            />
        

            <span className='text-lg text-blue-300 font-semibold absolute right-2 top-1/2'
                onClick={() => setShowPassword(!showPassword)} >
                {showPassword ? <FiEye/> : <FiEyeOff/>}
            </span>
            <Link to={'/forgot-password'} className='text-sm text-blue-300 font-semibold absolute right-0 -bottom-5 '>
                Forgot Password?
            </Link>
        </label>


        <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Log In
        </button>
    </form>
  )
}

export default LoginForm