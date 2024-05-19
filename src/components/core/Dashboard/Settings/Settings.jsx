import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardIconButton from '../../../common/DashboardIconButton';
import IconBtn from '../../../common/IconBtn';
import { updateProfilePicture, removeDisplayPicture } from '../../../../services/operations/profileAPI';

const Settings = () => {
    const {user} = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const fileUploadHandler = (e) => {
        // console.log("Sending these data: ", user?.token," file: ", e.target.files[0], "userid: ", user?._id);
        const formData = new FormData();
        formData.append('displayPicture', e.target.files[0]);
        formData.append('userId', user?._id);
        formData.append('token',user.token);
        dispatch(updateProfilePicture(formData));   // use redux-thunk here to perform this operation optimally    
    }

    const removeDPHandler = (e) => {
        dispatch(removeDisplayPicture({token: user?.token}));
    }

  return (
    <div className='flex flex-col gap-8 text-richblack-50 w-10/12'>
        <h1 className='text-3xl font-semibold'>Edit Profile</h1>
        {/* change profile picture  */}
        <div className='flex flex-row gap-4 border-[1px] border-richblack-600 rounded-md bg-richblack-800 py-4 px-6'>
            <img src={user?.image} alt="profile"
                className='aspect-square w-[78px] rounded-full object-cover'/>
            <div className='flex gap-2 flex-col'>
                <p>Change profile picture</p>
                <div className='flex gap-2 items-center'>
                    <div className='relative py-1'>
                        <input type="file" 
                            onChange={fileUploadHandler}
                            className='absolute w-full h-full top-0 left-0 right-0 bottom-0 opacity-0' />
                        <DashboardIconButton text={'Change'} iconName={'VscEdit'} />
                    </div>
                    <IconBtn text={'Remove'} onClick={removeDPHandler} />
                </div>
            </div>
        </div>

        {/* update the profile information  */}
        <div className='border-[1px] border-richblack-600 rounded-md bg-richblack-800 py-4 px-6'> 
            <p className='text-xl text-richblack-5'>Profile Information</p>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default Settings