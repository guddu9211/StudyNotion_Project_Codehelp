import React from 'react'

const FooterList = ({heading, elements}) => {
  return (
    <div>
        <h1 className='mt-10 font-semibold text-lg text-richblack-50'>{heading}</h1>
        <div className='flex flex-col gap-4 my-3'>
            {elements.map((str, index) => (
                <div key={index}>{str}</div>
            ))}
        </div>
    </div>
    
  )
}

export default FooterList