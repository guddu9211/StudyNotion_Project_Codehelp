import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    edit = false,
    view = false,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);

    useEffect( () => {
        if( view || edit ){
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    const handleEditSubSection = () => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.lectureDesc){
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);

        // api call maro edit subsection wali 
        const result = updateSubSection(formData, token);
        console.log("Edit Subsection result: ", result);
        if(result){
            // todo: same check for edit and add
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ){
            return true;
        }else{
            return false;
        }
    }

    const onSubmit =  async (data) => {
        if(view){
            return;
        }

        if(edit){
            if(!isFormUpdated){
                toast.errors("No changes detected");
                return;
            }else{
                // edit kar do store me 
                handleEditSubSection();
            }
            return;
        }

        // we will reach this point at the time of "add"
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoUrl", data.lectureVideo);

        setLoading(true);

        // perform the api call
        const result = await createSubSection(formData, token);

        console.log("collected create subsecction result",result);
        if(result){
            // todo: kuch toh karna baki hai yaha pe
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[35%] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
            <div className='flex justify-between items-center px-2'>
                <p>
                    {
                        view && "Viewing "
                    }
                    {
                        add && "Adding "
                    }
                    {
                        edit && "Editing "
                    }
                    Lecture
                </p>
                <button onClick={() => (!loading ? setModalData(null) : {} )}>
                    <RxCross1/>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload 
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    video={true}
                    viewData={ view ? modalData.videoUrl : null}
                    editData={ edit ? modalData.videoUrl : null}
                />

                <div>
                    <label htmlFor='lectureTitle'>Lecture Title</label>
                    <input
                        id='lectureTitle'
                        placeholder='Enter lecture title'
                        {...register("lectureTitle", {required: true})}
                        className='w-full bg-richblack-900 rounded-md py-2 px-4 my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                     />
                     {
                        errors.lectureTitle && (
                            <span>Lecture title is required</span>
                        )
                     }
                </div>

                <div>
                    <label>Lecture Description</label>
                    <textarea
                        id='lectureDesc'
                        placeholder='Enter lecture description'
                        {...register("lectureDesc", {required: true})}
                        className='w-full min-h-[130px] bg-richblack-900 rounded-md py-2 px-4 my-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'  
                    />
                    {
                        errors.lectureDesc && (
                            <span>Lecture description is required</span>
                        )
                    }
                </div>

                {
                    !view && (
                        <div>
                            <IconBtn
                                text={ loading ? "Loading..." : edit ? "Save Changes": "Save" }
                             />
                        </div>
                    )
                }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal