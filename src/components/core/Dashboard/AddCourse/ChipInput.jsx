import React, { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function ChipInput({
    // Props to be passed to the component
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
  }) 
{

  const { editCourse,  course } = useSelector(state => state.course)

  // setting up state for managing each chip 
  const [chips, setChips] = useState([])

  useEffect( () => {
    if(editCourse) {
      console.log(course);
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect( () => {
    setValue(name, chips);
  }, [chips])

  const handleKeyDown = (e) => {
    // check if user pressed Enter or a comma  
    if(e.key === 'Enter' || e.key === ',') {
      // prevent default behavior 
      e.preventDefault();

      // get value of input 
      const chipValue = e.target.value.trim();

      // if value is not empty 
      if(chipValue && !chips.includes(chipValue)) {
        // add value to chips
        const newChips = [...chips, chipValue];
        setChips(newChips);
        e.target.value = "";
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className='text-sm text-richblack-5' htmlFor={name}>
        {label}<sup>*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {
          chips.map((chip, index) => (
            <div key={index}
                className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
            >
              {chip}
              <button
                type='button'
                className='ml-2 focus-outline-none'
                onClick={() => handleDeleteChip(index)}
                >
                <MdClose className='text-sm'/>
              </button>
            </div>
          ))
        }
        
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )}
      </div>
    </div>
  )
}