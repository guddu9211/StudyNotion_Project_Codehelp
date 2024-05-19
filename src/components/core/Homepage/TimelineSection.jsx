import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineImage from '../../../assets/Images/TimelineImage.png'
import TimelineComp from './TimelineComp'

const TimelineSection = () => {
    const timeline = [
        {
            logo: Logo1,
            heading: 'Leadership',
            description: 'Fully committed to the success of company'
        },
        {
            logo: Logo2,
            heading: 'Responsibility',
            description: 'Students will always be our top priority'
        },
        {
            logo: Logo3,
            heading: 'Flexibility',
            description: 'The ability to switch is an important skills'
        },
        {
            logo: Logo4,
            heading: 'Solve the problem',
            description: 'Code your way to a solution'
        }
    ]
  return (
    <div>
        <div className='flex flex-row justify-between gap-10 items-center'>
            {/* left box  */}
            <div className='w-[40%] flex flex-col gap-5'>
                {
                    timeline.map((block, index) => (
                        <TimelineComp key={index} element={block} />
                    ))
                }
            </div>

            {/* right box  */}
            <div className='relative shadow-blue-200'>
                <img src={TimeLineImage} alt={`ladki laptop chala rhi hai`} 
                    className='bottom-right-shadow object-cover h-fit'
                />
                

                {/* overlapped dabba  */}
                <div className='absolute -bottom-10 left-[10%] bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 justify-between'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-200 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-200 text-sm'>Type of Courses</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default TimelineSection