import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashboardIconButton from '../../common/DashboardIconButton'


const MyProfile = () => {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-8 text-richblack-50 w-10/12'>
        <h1 className='text-3xl font-semibold'>My Profile</h1>

        {/* section 1  */}
        <div className='border-[1px] rounded-lg border-richblack-600 bg-richblack-800 relative'>
            <div className='flex gap-4 py-4 px-6'>
                <img src={user?.image} alt="profile"
                    className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div>
                    <p className='text-xl text-richblack-5'>{user?.firstName+" "+user?.lastName}</p>
                    <p className='text-lg text-richblack-200'>{user?.email}</p>
                </div>
            </div>

            {/* edit icon button  */}
            <div className='absolute top-4 right-6'>
                <DashboardIconButton 
                    text={"edit"} clickHandler={() => navigate("/dashboard/settings")} iconName={"VscEdit"} />
            </div>
        </div>

        {/* section 2  */}
        <div className='border-[1px] rounded-lg border-richblack-600 bg-richblack-800 relative'>
            <div className='flex gap-2 pt-2 px-6'>
                <p className='text-xl text-richblack-5'>About</p>

                {/* edit icon button  */}
                <div className='absolute top-4 right-6'>
                    <DashboardIconButton 
                        text={"edit"} clickHandler={() => navigate("/dashboard/settings")} iconName={"VscEdit"} />
                </div>
            </div>
            <p className='text-lg text-richblack-200 px-6 py-2'>
                {user?.additionalDetails?.about ?? "Additional Details - taken from profile model- additionalDetails- about"}
            </p>
        </div>

        {/* section 3  */}
        <div className='border-[1px] rounded-lg border-richblack-600 bg-richblack-800 relative'> 
            <div className='flex gap-2 pt-2 px-6'>
                <p className='text-xl text-richblack-5'>Personal Details</p>
                <div className='absolute top-4 right-6'>
                    <DashboardIconButton 
                        text={"edit"} clickHandler={() => navigate("/dashboard/settings")} iconName={"VscEdit"} />
                </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:grid-rows-3 gap-2 p-6'>
                <div>
                    <p className='text-md text-richblack-400'>First Name</p>
                    <p className='text-richblack-5 font-semibold'>{user?.firstName}</p>
                </div>
                <div>
                    <p className='text-md text-richblack-400'>Email</p>
                    <p className='text-richblack-5 font-semibold'>{user?.email}</p>
                </div>
                <div>
                    <p className='text-md text-richblack-400'>Last Name</p>
                    <p className='text-richblack-5 font-semibold'>{user?.lastName}</p>
                </div>
                <div>
                    <p className='text-md text-richblack-400'>Gender</p>
                    <p className='text-richblack-5 font-semibold'>{user?.additionalDetails?.gender ?? "Add your Gender"}</p>
                </div>
                <div>
                    <p className='text-md text-richblack-400'>Phone Number</p>
                    <p className='text-richblack-5 font-semibold'>{user?.additionalDetails?.phone ?? "Add your Phone Number"}</p>
                </div>
                <div>
                    <p className='text-md text-richblack-400'>Date of Birth</p>
                    <p className='text-richblack-5 font-semibold'>{user?.additionalDetails?.dateOfBirth ? new Date(user?.additionalDetails?.dateOfBirth).toLocaleDateString("en-GB") : "Add your Date of Birth"}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile