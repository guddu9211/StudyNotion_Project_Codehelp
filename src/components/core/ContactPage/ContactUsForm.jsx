import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoints } from '../../../services/apis';
import CountryCode from '../../../data/countrycode.json'
import { PacmanLoader } from 'react-spinners';

const ContactUsForm = () => {
  
  const [loading, setLoading] = useState(false);

   // doing this for first time is difficult...  but then it becomes easy to do
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful}
  } = useForm();

  useEffect( () => {
    if(isSubmitSuccessful) {
      reset( {
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        phoneNo: '',
      })
    }
}, [isSubmitSuccessful, reset]);

  const submitContactForm = async (data) => {
    // on submit of contact form we need to submit the data to the backend
    console.log('logging the input data', data);
    try{
      setLoading(true);
      const res = await apiConnector("POST", contactusEndpoints.CONTACTUS_API, data); // [Manish: add contactus api]
      console.log('logging the response', res);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      console.log('logging the error', err);
    }

  }

  return (
    <>
      {
        loading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <PacmanLoader/>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitContactForm)}
            className='flex flex-col gap-4'
          >

            <div className='flex gap-4'>
              {/* first name  */}
              <div className='flex flex-col'>
                <label htmlFor='firstname' className='text-richblack-200'>First Name</label>
                <input 
                  type='text'
                  name='firstname'
                  id='firstname'
                  placeholder='Enter first name'
                  {...register('firstname', {required: true})}    // this is something new to learn from useForm hook
                  className='px-2 py-1 border-b-[1px] border-solid bg-richblack-800 text-richblack-25 rounded-md'

                />
                {
                  errors.firstname && (
                    <span className='text-pink-200'>
                      Please enter your name
                    </span>
                  )
                }
              </div>

              {/* last name  */}
              
              <div className='flex flex-col'>
                <label htmlFor='lastname' className='text-richblack-200'>Last Name</label>
                <input 
                  type='text'
                  name='lastname'
                  id='lastname'
                  placeholder='Enter last name'
                  {...register('lastname')}    // this is something new to learn from useForm hook
                  className='px-2 py-1 border-b-[1px] border-solid bg-richblack-800 text-richblack-25 rounded-md'

                />
              </div>
              
            </div>

            {/* email  */}
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-richblack-200'>Email Address</label>
              <input 
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                {...register('email', {required: true})}    
                className='px-2 py-1 border-b-[1px] border-solid bg-richblack-800 text-richblack-25 rounded-md'
              />
              {
                errors.email && (
                  <span className='text-pink-200'>
                    Please enter your email address
                  </span>
                )
              }
            </div>

            {/* phone number [ pay attention here ] */}
            <div className='flex flex-col gap-1'>
              <label htmlFor='phonenumber' className='text-richblack-200'>
                Phone Number
              </label>

              <div className='flex gap-4'>
                {/* dropdown banao  */}
                <select 
                  className='px-2 py-1 border-b-[1px] border-solid bg-richblack-800 text-richblack-25 w-[5rem] rounded-md'
                  name='dropdown'
                  id='dropdown'
                  >
                  {
                    CountryCode.map( (element, index) =>  {
                      return (
                        <option key={index} value={element.code}>
                          {element.code} - {element.country}
                        </option>
                      )
                    })
                  }
                </select>

                <input 
                  type='number'
                  name='phonenumber'
                  id='phonenumber'
                  placeholder='Enter your phone number'
                  {...register('phoneNo', 
                    {
                      required: {value: true, message: 'Please enter your phone number'},
                      minLength: {value: 8, message: 'Please enter a valid phone number'}, 
                      maxLength: {value: 10, message: 'Please enter a valid phone number'}
                    }
                  )}    
                  className='px-2 py-1 border-b-[1px] border-solid bg-richblack-800 text-richblack-25 w-full rounded-md'
                />
                {
                  errors.phoneNo && (
                    <span className='text-pink-200'>
                      {errors.phoneNo.message}
                    </span>
                  )
                }
              </div>
            </div>

            {/* message  */}
            <div className='flex flex-col'>
              <label htmlFor='message' className='text-richblack-200'>Message</label>
              <textarea
                name='message'
                id='message'
                cols={30}
                rows={7}
                placeholder='Enter your message'
                {...register('message')}    
                className='px-2 py-1 border-b-[1px] border-solid bg-richblack-800 text-richblack-25 rounded-md'
              />
            </div>

            <button type='submit'
              className='bg-yellow-200 text-richblack-800 px-4 py-2 rounded-md'>
              Send Message
            </button>

          </form>
        )
      }
    </>
  )
}

export default ContactUsForm