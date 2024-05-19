import React, { useState } from 'react'
import FormTemplate from '../components/core/Forms/FormTemplate'
import Image from '../assets/Images/signup.webp'

const Signup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='w-full mx-auto h-full flex justify-center items-center bg-richblack-900'>
      <FormTemplate title={'Welcome onboard'} desc1={'Register yourself'} desc2={'Be unstoppable'} 
              formType={'signup'} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} image={Image} />
    </div>
  )
}

export default Signup