import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]

const ExploreMore = () => {
    
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((item) => item.tag === value);

        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='flex flex-col items-center'>
        <div className='text-4xl font-semibold'>
            Unlock the 
            <HighlightText text={'Power of Code'}/>
        </div>

        <p className='text-center text-richblack-300 text-lg mt-3'>
            Learn to build anything you can imagine
        </p>

        {/* tabs  */}
        <div className='flex items-center gap-2 bg-richblack-800 px-6 py-3 my-4 rounded-full '>
            {
                tabsName.map( (element, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setMyCards(element)}
                            className={`font-medium text-lg ${currentTab === element ? 'text-richblack-5 font-medium bg-richblack-900' : 'text-richblack-200'}
                            cursor-pointer transition-all duration-300 rounded-full px-6 py-1 hover:bg-richblack-900 hover:text-richblack-50`}   
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[150px]'></div>

        {/* course cards group  */}

        <div className='w-10/12 flex justify-center items-center relative my-4'>
            <div className='absolute flex flex-row gap-10 justify-between mx-auto'>
                {
                    courses.map( (course, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData = {course}
                                currentCard = {currentCard}
                                setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
        
        
        

    </div>
  )
}

export default ExploreMore