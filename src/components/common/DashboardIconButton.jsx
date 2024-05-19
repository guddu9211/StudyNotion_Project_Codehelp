import React from 'react'
import * as Icons from 'react-icons/vsc'

const DashboardIconButton = ({text, iconName, clickHandler}) => {

    const Icon = Icons[iconName]
    
  return (
    <button className='flex items-center gap-2 px-2 py-1 bg-yellow-100 text-richblack-900 rounded-md'
        onClick={clickHandler}>
        <Icon className='text-lg' />
        <span>{text}</span>
    </button>
  )
}

export default DashboardIconButton