import React, { useState } from 'react'
import FormTemplate from '../components/core/Forms/FormTemplate'
import Image from '../assets/Images/login.webp'

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='w-full mx-auto h-full flex justify-center items-start bg-richblack-900'>
      <FormTemplate title={'Welcome back'} desc1={'Discover your passion'} desc2={'Be unstoppable'} 
              formType={'login'} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} image={Image} />
    </div>
  )
}

export default Login