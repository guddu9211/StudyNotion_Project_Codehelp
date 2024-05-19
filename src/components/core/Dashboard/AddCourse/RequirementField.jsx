import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const { editCourse, course } = useSelector(state => state.course)
    const [ requirement, setRequirement ] = useState("");
    const [ requirementsList, setRequirementsList] = useState([]);
    // const [totalSum, setTotalSum] = useState(0);

    useEffect( () => {
        if(editCourse){
            setRequirementsList(course?.instructions);
        }
        register(
            name, { 
                required: true, 
                validate: (value) => value.length > 0 
            }
        )
    }, [])

    useEffect( () => {
        setValue(name, requirementsList);
    }, [requirementsList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement("");
        }
        // if(!isNaN(requirement) && isFinite(requirement)){
        //     // this means it is numeric in nature, added this as a part of learning for my budget planner app 
        //     setTotalSum(totalSum + parseInt(requirement));
        // }
        // console.log("added to requirement list, ", requirementsList, requirement);
    }

    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementsList]
        
        // const targetElement = updateRequirementList[index]; 

        updateRequirementList.splice(index, 1);
        setRequirementsList(updateRequirementList);
        
        // if(!isNaN(targetElement) && isFinite(targetElement)){
        //     setTotalSum(totalSum - parseInt(targetElement));
        // }
    }

  return (
    <div>
        <label htmlFor={name}>{label}<sup>*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                name={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full border-2 border-richblack-700 bg-richblack-800 text-richblack-200 py-1 rounded-md"
            />
            <button
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold text-yellow-50 py-2'
            >
                Add
            </button>
        </div>

        {
            requirementsList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {
                        requirementsList.map((req, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span>{req}</span>
                                <button
                                    type='button'
                                    onClick={() => handleRemoveRequirement(index)}
                                    className='px-2 text-xs text-pink-200'
                                >
                                    clear
                                </button>
                            </li>
                        )) 
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )
        }

    </div>
  )
}

export default RequirementField