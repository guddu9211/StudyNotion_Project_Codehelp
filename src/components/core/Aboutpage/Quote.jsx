import React from 'react'
import HighlightText from '../Homepage/HighlightText'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

const Quote = () => {
  return (
    <div className='text-4xl font-semibold text-center relative'>
        <span className='absolute -left-10 -top-6 opacity-25'>
          <FaQuoteLeft/>
        </span>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={'combines technology'}/>
        ,
        <span className='text-brown-400'>
            {' '}
            expertise
        </span>
        , and community to create an
        <span className='text-brown-500'>
            {' '}
         unparalleled educational experience.
        </span>
        <span className='absolute right-0 -bottom-2 opacity-25'>
          <FaQuoteRight/>
        </span>
    </div>
  )
}

export default Quote