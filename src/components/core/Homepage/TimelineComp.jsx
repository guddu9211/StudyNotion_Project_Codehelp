import React from 'react'

const TimelineComp = ({element}) => {
  return (
    <div className='flex flex-row items-center gap-5'>
        <div className='w-[50px] h-[50px] bg-white flex items-center justify-center'>
            <img src={element.logo} alt={`timeline component ${element.heading}`} />
        </div>
        <div>
            <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
            <p className='text-base'>{element.description}</p>
        </div>
    </div>
  )
}

export default TimelineComp