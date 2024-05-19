import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'

const LoadingBar = ({percentage,isLabelVisible=false}) => {
  return (
    <div>
        <ProgressBar 
            completed={percentage} 
            maxCompleted={101} 
            bgColor='#ffd700'
            baseBgColor='gray'
            labelColor='black'
            labelAlignment='center'
            animateOnRender={true}
            isLabelVisible={isLabelVisible}
        />
    </div>
  )
}

export default LoadingBar