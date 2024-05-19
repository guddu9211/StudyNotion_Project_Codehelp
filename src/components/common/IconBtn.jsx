import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        type={type}
        className='border-2 text-richblack-200 py-1 px-2 rounded-md'
    >
        {
            children ? (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ) : (
                text
            )
        }
    </button>
  )
}

export default IconBtn