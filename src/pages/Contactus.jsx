import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import Footer from './Footer'
import ReviewPanel from '../components/common/ReviewPanel'
import SetGiIcon from '../components/common/SetGiIcon'

const contactusData = [
    {
        icon: 'GiChatBubble',
        title: 'Chat on us',
        desc1: 'our friendly team is here to help',
        desc2: 'mkprajapati1614@gmail.com'
    },
    {
        icon: 'GiGlobe',
        title: 'Visit us',
        desc1: 'Come and say hello at our office HQ.',
        desc2: 'Here is the location/ address'
    },
    {
        icon: 'GiPhone',    
        title: 'Call us',
        desc1: 'Mon - Fri From 8am to 5pm',
        desc2: '+91 8210134128'
    }
]

const Contactus = () => {
  return (
    <div className='w-full bg-richblack-900'>

        {/* section 1  */}
        <section className='w-11/12 mx-auto mt-[5rem]'>
            <div className='flex flex-row gap-20 justify-center items-start '>
                {/* left wala dabba  */}
                <div className='flex flex-col rounded-md bg-richblack-700 gap-2'>
                    {
                        contactusData.map((data, index) => {
                            return (
                                <div key={index} className='flex flex-row gap-2 justify-start items-start p-4'>
                                    <div>
                                        <SetGiIcon iconName={data.icon} />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <h1 className='text-richblack-50 text-md'>{data.title}</h1>
                                        <p className='text-richblack-200 text-sm'>{data.desc1}</p>
                                        <p className='text-richblack-300 text-sm font-semibold'>{data.desc2}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* right wala dabba  */}
                <div className='w-1/3 flex flex-col border-2 border-richblack-300 rounded-lg p-8 gap-4'>
                    <h1 className='text-3xl font-semibold text-richblack-50'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                    <p className='text-md text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>
                    <ContactUsForm/>
                </div>

            </div>
        </section>

        {/* section 2 - review wala  */}
        <section className='w-11/12 mx-auto mt-[5rem]'>
            <div className='flex flex-col gap-4 items-center'>
                <h1 className='text-richblack-50 text-4xl font-semibold'>
                    Reviews from other learners
                </h1>
                <div>
                    <ReviewPanel/>
                </div>
            </div>
        </section>

        {/* section 3 - footer  */}
        <section className='w-full mx-auto mt-[5rem]'>
            <Footer/>
        </section>
    </div>
  )
}

export default Contactus