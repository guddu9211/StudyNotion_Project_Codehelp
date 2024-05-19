import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    const {loading: authLoading} = useSelector( (state) =>  state.auth );
    const {loading: profileLoading} = useSelector( (state) =>  state.profile );

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
    <div className='relative flex h-[100vh]'>
        {/* sidebar  */}
        <Sidebar/>
        <div className='h-[calc(100vh - 3.5rem)] flex-1 overflow-auto mx-auto'>
            <div className='w-11/12 p-10'>
                <Outlet/>
            </div>
        </div>
    
    </div>
  )
}

export default Dashboard