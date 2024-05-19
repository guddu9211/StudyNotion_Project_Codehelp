import React from 'react'
import * as Icons from 'react-icons/gi'

const SetGiIcon = ({iconName}) => {

    const Icon = Icons[iconName];

  return (
    <Icon className='text-3xl text-richblack-50 ' />
  )
}

export default SetGiIcon