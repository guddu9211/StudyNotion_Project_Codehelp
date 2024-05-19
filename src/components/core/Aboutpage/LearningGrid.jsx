import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import CTAButton from '../Homepage/CTAButton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 grid-rows-2 mb-10 lg:w-fit'>
    {
        LearningGridArray.map((card, index) => {
            return (
                <div 
                    key = {index}
                    className={`
                        ${index === 0 && 'lg:col-span-2 bg-transparent'}
                        ${card.order % 2 === 1 ? 'bg-richblack-700' : 'bg-richblack-800' }
                        ${card.order === 3 && 'lg:col-start-2'}
                    `}
                >
                    {
                        card.order < 0 ? (
                            <div className='flex flex-col gap-4 p-4 items-start'>
                                <div className='text-4xl font-semibold text-white'>
                                    <h1 >{card.heading}</h1>
                                    <HighlightText text={card.highlightText}/>
                                </div>
                                <p className='text-richblack-200 text-lg'>
                                    {card.description}
                                </p>
                                <CTAButton active={true} link={card.BottomLink} >
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        ) :  (
                            <div className='flex flex-col gap-8 p-7'>
                                <h1 className='text-xl text-richblack-50'>{card.heading}</h1>
                                <p className='text-richblack-200 font-medium'>{card.description}</p>
                            </div>
                        )
                    }
                </div>
            )
        })
    }

    </div>
  )
}

export default LearningGrid