import React from 'react'

const BackdropGradient = ({colorOption}) => {
  return (
    <div>
        <div className={`absolute left-28 top-20 w-[10rem] h-[10rem] blur-2xl ${colorOption} opacity-60`}></div>
    </div>
  )
}

export default BackdropGradient