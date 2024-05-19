import React from 'react'
import * as Icons from 'react-icons/gi'

const SetIcon = ({iconName}) => {

    const Icon = Icons[iconName];

  return (
    <Icon className='text-3xl text-richblack-50 ' />
  )
}

export default SetIcon