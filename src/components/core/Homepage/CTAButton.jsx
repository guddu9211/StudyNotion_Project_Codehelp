import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkTo}) => {
  return (
    <Link to={linkTo}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
            ${active ? 'bg-yellow-50 text-black':'bg-richblack-800'}
        `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton