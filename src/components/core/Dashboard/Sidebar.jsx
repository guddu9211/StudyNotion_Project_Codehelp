import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import {signout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { PacmanLoader } from 'react-spinners'
import SidebarLink from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector( (state) =>  state.profile );
    const {loading: authLoading} = useSelector( (state) =>  state.auth );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){
        
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <PacmanLoader
                    color="#36d7b7"
                    loading={profileLoading || authLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

  return (
    <>
        <div>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
                            h-[100vh] bg-richblack-800 py-10'>
                {/* sidebar links here  */}
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type)    return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })
                    }
                </div>

                {/* horizontal line in between  */}
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'>
                </div>

                {/* settings and logout  */}
                <div className='flex flex-col'>
                    <SidebarLink link={{name:"Settings", path:"/dashboard/settings"}} iconName="VscSettingsGear" />

                    {/* handle logout differently because it has to create a modal  */}
                    <div onClick={() => signout()} className='cursor-pointer'>
                        <button
                            onClick={() =>
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(signout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                            }
                            className="px-8 py-2 text-sm font-medium text-richblack-300"
                        >
                            <div className='flex items-center gap-x-2'>
                                <VscSignOut className='text-lg'/>
                                <span>Logout</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {
                confirmationModal && 
                    <ConfirmationModal modalData={confirmationModal} />
            }

        </div>
    </>
  )
}

export default Sidebar