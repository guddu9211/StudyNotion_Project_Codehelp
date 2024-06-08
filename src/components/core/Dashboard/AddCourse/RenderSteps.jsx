import React from 'react'
import { FaCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformationForm';
import { CourseBuilderForm } from './CourseBuilder/CourseBuilderForm';
import { PublishCourses } from './PublishCourse/PublishCourses';

const RenderSteps = () => {

  const {step} = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    }
  ]

  return (
    <>
      <div className='w-full border-[1px] border-dashed border-yellow-200 rounded-md p-4 text-richblack-25'>
        <div className='flex flex-row items-center justify-between px-10'>
          {
            steps.map( (item, index) => (
              <div key={index}>
                <div >
                  <div className={` ${step >= item.id ? 'bg-yellow-800 border-yellow-50 text-yellow-50' 
                  : 'bg-richblack-800 border-richblack-700 text-richblack-200'}  
                  flex items-center justify-center w-10 h-10 rounded-full border-2
                  `}>
                      {
                        step > item.id ? (<FaCheck/>) : (
                          item.id
                        )
                      }
                  </div>
                </div>
                {/* add code for making dashed lines between each step count items  */}
                {/* {
                  item.id !== steps.length 
                } */}
              </div>
            ))  
          }
        </div>
        <div className='flex flex-row items-center justify-between'>
          {
            steps.map( (item, index) => (
              <div key={index}>
                <>
                  <p className='text-richblack-100'>
                    {item.title}
                  </p>
                </>
              </div>
            ))
          }
        </div>
      </div>


      {/* render the actual page component on the basis of selected step  */}
      {
        step === 1 && <CourseInformationForm/>
      }
      {
        step === 2 && <CourseBuilderForm/>
      }
      {
        step === 3 && <PublishCourses/>
      }
    </>
  )
}

export default RenderSteps