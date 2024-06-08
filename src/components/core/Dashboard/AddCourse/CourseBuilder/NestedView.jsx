import React, {useState} from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector(state => state.course)
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const [addSubSection, setAddSubSection] = useState(false);
    const [viewSubSection, setViewSubSection] = useState(false);
    const [editSubSection, setEditSubSection] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);



  return (
    <div>
        <div>
            {
                course?.courseContent?.map((section, index) => (
                    <details key={section._id} open>
                        <summary>
                            <MdArrowDropDown/>
                            <p>{section.sectionName}</p>
                        </summary>
                    </details>
                ))
            }
        </div>
    </div>
  )
}

export default NestedView