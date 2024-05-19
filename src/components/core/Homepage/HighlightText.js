import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-richblue-100'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText