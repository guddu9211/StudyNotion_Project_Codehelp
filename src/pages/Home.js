import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import Footer from './Footer';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ReviewsSection from '../components/core/Homepage/ReviewsSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <section className='relative mx-auto flex flex-col w-11/12 max-w-maxContent text-white items-center justify-between'>
            <Link to={"/signup"}>   {/* it will take us to /signup route. This is not how we call backend side. */}
                <div className='group  mt-14 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <h1 className="mt-7 text-center text-4xl font-semibold">
                Empower your Future with  
                <HighlightText text={"Coding Skills"}/>
            </h1>
            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkTo={'/signup'}>
                    LearnMore
                </CTAButton>
                <CTAButton active={false} linkTo={'/login'}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='aspect-video mx-3 my-16 bottom-right-shadow'>
                <video
                muted
                loop
                autoPlay
                >
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>


            {/* code section 1  */}
            <div>
                <CodeBlocks
                    position={'lg:flex-row'}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={'coding potential '}/>
                            with our online courses.
                        </div>
                        }
                    subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    ctabtn1={
                        {
                            btnText: 'Try it yourself',
                            linkTo: '/signup',
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: 'Learn more',
                            linkTo: '/login',
                            active: false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">\nTwo</a><ahref="three/">Three</a>`}
                    codeColor={'text-yellow-25'}
                    backgroundGradient={'bg-richblue-200'}
                />
            </div>

            {/* code section 2  */}
            <div>
                <CodeBlocks
                    position={'lg:flex-row-reverse'}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start 
                            <HighlightText text={'coding in seconds'}/>
                        </div>
                        }
                    subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
                    ctabtn1={
                        {
                            btnText: 'Continue Lesson',
                            linkTo: '/signup',
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: 'Learn more',
                            linkTo: '/login',
                            active: false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">\nTwo</a><ahref="three/">Three</a>`}
                    codeColor={'text-yellow-25'}
                    backgroundGradient={'bg-caribbeangreen-200'}
                />
            </div>

            <ExploreMore/>
        </section>


        {/* Section 2 */}
        <section className='bg-pure-greys-5 text-richblack-700 homepage_bg'>
            <div className='h-[310px]'>
                {/* setup div for content  */}
                <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                    {/* 2 buttons to be placed side by side  */}
                    <div className='flex flex-row gap-7 text-white mt-[200px] w-full justify-center'>
                        <CTAButton active={true} linkTo={'/signup'}>
                            <div className='flex items-center gap-2'>
                                Explore full catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkTo={'/about'}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>


            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                <div className='flex flex-row gap-5 justify-between mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skill you need for a 
                        <HighlightText text={'job that is in Demand'}/>
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkTo={'/signup'}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>

                    </div>
                </div>
                

                <TimelineSection/>

                <LearningLanguageSection/>
            </div>
        </section>
        

        {/* Section 3 */}
        <section className='w-11/12 max-w-maxContent mx-auto flex-col items-center justify-between gap-8
                            bg-richblack-900 text-white'>
            <InstructorSection/>
            <h2 className='text-4xl font-semibold text-center mt-10'>Reviews from other learners</h2>
            <ReviewsSection/>
        </section>


        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Home