import React, {useState} from 'react'
import { MdArrowDropDown, MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice';
import { BiSolidDownArrow } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector(state => state.course)
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const [addSubSection, setAddSubSection] = useState(false);
    const [viewSubSection, setViewSubSection] = useState(false);
    const [editSubSection, setEditSubSection] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        });
        console.log("Result after deleting section: ", result);

        if(result){
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token,
        })

        console.log("Result after deleting subSection: ", result);
        
        if(result){
            // kya yaha pe kuch extra bhi krna chahiye tha ?
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
              )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }   

  return (
    <div>

        <div className='rounded-lg bg-richblack-700 p-6 px-8'>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-x-3'>
                                <MdArrowDropDown/>
                                <p>{section.sectionName}</p>
                            </div>

                            <div className='flex items-center gap-x-3' >
                                {/* edit button  */}
                                <button
                                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                >
                                    <MdEdit/>
                                </button>

                                {/* delete button  */}
                                <button
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => {
                                                handleDeleteSection(section._id);
                                            },
                                            btn2Handler: () =>  {
                                                setConfirmationModal(null);
                                            }
                                        })
                                    }}
                                >
                                    <MdDelete/>
                                </button>

                                <span>|</span>

                                
                                <BiSolidDownArrow/>
                                
                            </div>
                        </summary>

                        <div>
                            {
                                section?.subSection?.map((data) => (
                                    <div key={data._id}
                                        onClick={() => setViewSubSection(data)}
                                        className='flex items-center justify-between gap-x-3 border-b-2'
                                    >
                                        <div className='flex items-center gap-x-3'>
                                            <MdArrowDropDown/>
                                            <p>{data.title}</p>
                                        </div>

                                        <div className='flex items-center gap-x-3'>
                                            <button onClick={() => setEditSubSection({...data, sectionId: section._id}) }>
                                                <MdEdit/>
                                            </button>

                                            {/* delete button  */}
                                            <button
                                                onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub-Section",
                                                        text2: "Selected sub-section will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => {
                                                            handleDeleteSubSection(data._id, section._id);
                                                        },
                                                        btn2Handler: () =>  {
                                                            setConfirmationModal(null);
                                                        }
                                                    })
                                                }}
                                            >
                                                <MdDelete/>
                                            </button>
                                        </div>

                                        
                                    </div>
                                ))
                            }

                            <button 
                                onClick={() => setAddSubSection(section._id)}
                                className='mt-4 flex items-center gap-x-3 text-yellow-50'
                            >
                                <AiOutlinePlus/>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>

        {
            addSubSection ? (<SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />)

             : viewSubSection ? (<SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
             />) 

             : editSubSection ? (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
             />) 
             : <div></div>
        }

        {
            confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal}/>
            ):(
                <div></div>
            )
        }
    </div>
  )
}

export default NestedView