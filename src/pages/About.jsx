import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Quote from '../components/core/Aboutpage/Quote'
import StatsComponent from '../components/core/Aboutpage/StatsComponent'
import LearningGrid from '../components/core/Aboutpage/LearningGrid'
import ContactFormSection from '../components/core/Aboutpage/ContactFormSection'
import Footer from './Footer'

const About = () => {
  return (
    <div className='flex flex-col items-center text-richblack-50'>

        {/* section 1  */}
        <section className='w-full pt-20 bg-richblack-800 flex flex-col items-center'>
            <div className='w-11/12 max-w-maxContent'>
                <header className='flex flex-col items-center gap-1 text-4xl font-semibold'>
                    <p>Driving Innovation in Online Education for a</p>
                    <HighlightText text={'Brighter Future'}/>
                    <p className='text-lg font-medium text-richblack-300 w-3/4 text-center mt-8'>
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                <div className='relative h-[15rem]'>
                    <p className='absolute -z-1 text-center w-[80%] top-20 h-[5%] bg-yellow-5 blur-xl'>
                        {' '}
                    </p>
                    <div className='absolute z-1 top-10 flex gap-x-3 mt-10'>
                        <img src={BannerImage1} alt='first banner '/>
                        <img src={BannerImage2} alt='second banner' />
                        <img src={BannerImage3} alt='third banner' />
                    </div>
                </div>
            </div>
        </section>

        {/* section 2  */}
        <section className='w-full pt-20 bg-richblack-900 flex flex-col items-center mt-36'>
            <div className='w-11/12 max-w-maxContent'>
                <Quote/>
            </div>
        </section>

        {/* section 3  */}
        <section className='w-full pt-20 bg-richblack-900 flex flex-col items-center my-24'>
            {/* top level div containing 2 rows  */}
            <div className='flex flex-col gap-20 w-11/12 max-w-maxContent'>
                {/* first row related div. it contains text in left side and image in right side  */}
                <div className='flex gap-4 justify-between items-center'>
                    {/* left wala box containing text  */}
                    <div className='w-1/2 flex flex-col gap-2 px-10'>
                        <div className='text-4xl font-semibold'>
                            <HighlightText text={'Our Founding Story'}/>
                        </div>

                        <p className='text-md text-richblack-300'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        
                        <p className='text-md text-richblack-300'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>

                    {/* right wala box containing image  */}
                    <div className='w-1/2 flex items-center justify-center'>
                        <img src={FoundingStory} alt='founding story'/>
                    </div>
                </div>

                {/* second row related div. it contains 2 boxes only  */}
                <div className='flex gap-4 justify-center items-center'>
                    {/* vision  */}
                    <div className='w-1/2 px-10 flex flex-col gap-4'>
                        <div className='text-4xl font-semibold'>
                            <HighlightText text={'Our Vision'}/>
                        </div>
                        <p className='text-md text-richblack-300'   >
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>
                    {/* missionn  */}
                    <div className='w-1/2 px-10 flex flex-col gap-4'>
                        <div className='text-4xl font-semibold'>
                            <HighlightText text={'Our Mission'}/>
                        </div>
                        <p className='text-md text-richblack-300'>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>


        {/* section 4  */}
        <section className='w-full bg-richblack-800 py-8 flex justify-center'>
            <div className='w-11/12 max-w-maxContent'>
                <StatsComponent />
            </div>
        </section>

        {/* section 5  [ used grids and good learning on grid ] */}
        <section className='w-11/12 max-w-maxContent my-20'>
            <LearningGrid/>
            {/* section 6 [ most important section of about us page. using hooks for handling forms] */}
            <ContactFormSection/>
        </section>

        <section className='w-full bg-richblack-800 flex flex-col items-center'>
            <div className='w-11/12 max-w-maxContent'>
                <Footer/>
            </div>
        </section>

    </div>
  )
}

export default About