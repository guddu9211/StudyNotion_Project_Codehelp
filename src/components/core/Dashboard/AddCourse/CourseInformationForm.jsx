import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';
import { HiCurrencyRupee } from 'react-icons/hi2';
import RequirementField from './RequirementField';
import {setCourse, setStep} from '../../../../slices/courseSlice';
import IconBtn from '../../../common/IconBtn';
import toast from 'react-hot-toast';
import {COURSE_STATUS} from '../../../../utils/constants'
import { MdNavigateNext } from "react-icons/md"
import ChipInput from './ChipInput';
import UploadThumbnail from './UploadThumbnail'

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector(state => state.course)
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([])
    const {token} = useSelector(state => state.auth)

    useEffect( () => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }
        getCategories();

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseThumbnail", course.thumbnail);
        }

    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName || 
            currentValues.courseShortDesc !== course.courseDescription || 
            currentValues.coursePrice !== course.price || 
            currentValues.courseTags !== course.tag || 
            currentValues.courseBenefits !== course.whatYouWillLearn || 
            currentValues.courseCategory !== course.category || 
            currentValues.courseRequirements.toString() !== course.instructions.toString()  
            || currentValues.courseThumbnail !== course.thumbnail
            ){
            return true;
        }
        return false;
    }

    // handle next button click
    const onSubmit = async (data) => {
        console.log("Form submitted ", data);
        if(editCourse) {
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle);
                }
                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice);
                }
                if(currentValues.courseTags !== course.tag){
                    formData.append("tag", JSON.stringify(data.courseTags));
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if(currentValues.courseCategory !== course.category){
                    formData.append("category", data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if(currentValues.courseThumbnail !== course.thumbnail){
                    formData.append("thumbnail", data.courseThumbnail);
                }

                setLoading(true);
                console.log("Calling Edit Course Details API");
                const result = await editCourseDetails(formData, token);
                console.log("Final result of Course edit: ", result);
                setLoading(false);
                
                if(result){
                    console.log("Dispatching to next step with course details: ", result);
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                }
                return;     
            }  else{
                toast.error("No changes made to the form")
            }
        }
                
        console.log("Creating a new course")
        createNewCourse(data);
    }

    const createNewCourse = async (data) => {
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseThumbnail);
        formData.append("status", COURSE_STATUS.DRAFT)

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result){
            console.log("Response of Course Creation collected :) ", result);
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
    }

  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 text-richblack-200'
        >
        <div>
            <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
            <input 
                id='courseTitle'
                name='courseTitle'
                placeholder='Enter course title'
                {...register("courseTitle", {required: true})}
                className='w-full bg-richblack-900 rounded-md py-2 px-4 my-2'
            />
            {
                errors.courseTitle && (
                    <span>Course title is required</span>
                )
            }
        </div>

        <div>
            <label htmlFor='courseShortDesc'>Course Short Description</label>
            <textarea
                id='courseShortDesc'
                name='courseShortDesc'
                placeholder='Enter course short description'
                {...register("courseShortDesc", {required: true})}
                className='w-full min-h-[140px]  bg-richblack-900 rounded-md py-2 px-4 my-2'
            />
            {
                errors.courseShortDesc && (
                    <span>Course short description is required</span>
                )
            }
        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
            <input 
                id='coursePrice'
                type='number'
                placeholder='Enter course price'
                {...register("coursePrice", {
                    required: true,
                    valueAsNumber: true,
                    })}
                className='w-full  bg-richblack-900 rounded-md py-2 px-8 my-2'
            />
            
            <HiCurrencyRupee className='text-richblack-200 absolute top-[50%] left-1 text-2xl'/>

            {
                errors.courseTitle && (
                    <span>Course title is required</span>
                )
            }
        </div>

        <div>
            <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
            <select 
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory", {required: true})}
                className='w-full  bg-richblack-900 rounded-md py-2 px-4 my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                >
                    <option value="" disabled className='py-2'>Choose a category</option>
                    {
                        !loading && courseCategories.map( (category, index) => (
                            <option key={index} value={category._id} className='py-2'>
                                {category.name}
                            </option>
                        ))
                    }
            </select>
            {
                errors.courseCategories && (
                    <span>Course category is required</span>
                )
            }
        </div>


        {/* create a custom component for handling tag inputs  */}
        <ChipInput 
            label="tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            />

        {/* create a component of uploading and displaying thumbnail for course  */}
        <UploadThumbnail 
            name="courseThumbnail"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
        />

        <div>
            <label htmlFor='courseBenefits'>Course Benefits</label>
            <textarea 
                id='courseBenefits'
                name='courseBenefits'
                placeholder='Enter benefits of the course'
                {...register("courseBenefits", {required: true})}
                className='w-full  bg-richblack-900 rounded-md py-2 px-4 my-2'
            />
            {
                errors.courseBenefits && (
                    <span>Benefits of the course are required</span>
                )
            }
        </div>

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />


        <div>
            {
                editCourse && (
                    <button
                        onClick={ () => dispatch(setStep(2)) }
                        disabled={loading}
                        className='flex items-center gap-x-2 bg-richblack-300'
                    >
                        Continue without saving
                    </button>
                )
            }
            
            <IconBtn
                disabled={loading}
                text={!editCourse ? "Next" : "Save Changes"}
            >
                <MdNavigateNext />
            </IconBtn>

        </div>
    </form>
  )
}

export default CourseInformationForm