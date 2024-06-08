import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { CgAdd } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { FaRegCircleLeft, FaRegCircleRight } from 'react-icons/fa6';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

export const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(false);
  const [loading, setLoading] = useState(false);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  }

  const goToNext = () => {
    console.log("going next");
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one section");
      return;
    }
    if(course?.courseContent?.some((section) => section?.subsection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    // at this point everything is good.
    dispatch(setStep(3));
  }

  const goToPrevious = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }

  const onSubmit = async (data) => {
    // this submit operation has the effect of adding and updating a section information 
    setLoading(true);
    let result;
    console.log("performing submit for section information: ", data, course);

    if(editSectionName){
      let obj = {
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }
      console.log("sending the following data while editing section: ", obj);
      // we are going to edit an existig sectionn name 
      result = await updateSection(obj, token);
    }else{
      let obj = {
        sectionName: data.sectionName,
        courseId: course._id,
      }
      console.log("sending the following data while creating a section: ", obj);
      result = await createSection(obj, token);
    }

    // some work to be done post update of values 
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(false);
      setValue("sectionName", "");
    }

    setLoading(false);
  }


  // use this function to be passed to nested view
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='text-richblack-25 bg-richblack-800 mt-4'>
      <p className='text-2xl font-semibold my-4 p-2'>Course Builder</p>
      

      <form className='px-2' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section name <sup>*</sup></label>
          <input 
            type='text'
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required: true})}
            className='w-full bg-richblack-700 text-lg rounded-md py-2 px-4 my-2'
          />
          {
            errors.sectionName && (
              <span>Section name is required</span>
            )
          }
        </div>

        {/* create section ka button  */}
        <div className='mt-2 flex w-full gap-4'>
          <IconBtn type={"submit"} text={editSectionName ? "Edit Section" : "Create Section"} 
                  onclick={handleSubmit(onSubmit)}
                  outline={true}
                  customClasses={'text-white'}
                >
                <CgAdd className='text-yellow-50' size={20}/>
          </IconBtn>
          {
            editSectionName && (
              <button type='button'
                onClick={cancelEdit}
              >
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex justify-end gap-x-3'>
        
        <button onClick={goToPrevious} 
            className='rounded-md cursor-pointer flex items-center'>
          <p className='px-2'>Back</p>
          <FaRegCircleLeft/>
        </button>

        <IconBtn text={"Next"} onclick={goToNext} >
          <FaRegCircleRight/>
        </IconBtn>

      </div>



    </div>
  )
}
