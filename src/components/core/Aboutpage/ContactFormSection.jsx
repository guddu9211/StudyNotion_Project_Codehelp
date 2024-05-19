import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col gap-4 items-center mt-20'>
        <h1 className='text-4xl font-semibold'>Get in touch</h1>
        <p className='font-medium text-richblack-200'>
            We’d love to here for you, Please fill out this form.
        </p>
        <div>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection