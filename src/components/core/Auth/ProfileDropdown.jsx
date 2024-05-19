import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signout } from '../../../services/operations/authAPI';
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';

export default function ProfileDropdown() {
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if(!user){
    console.log('User data does not exist',user);
    return null;
  }
  if(user){
    console.log("User data exists as ",user);
  }

  const handleSignOut = () => {
    dispatch(signout(navigate))
  }

  return (
    <div className='relative' onClick={() => setOpen(true)}>
      <div className='flex items-center gap-x-1'>
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className='aspect-square w-[30px] rounded-full object-cover'
        />
        <AiOutlineCaretDown className='text-sm text-richblack-200'/>
      </div>
      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
            ref={ref}
          >
            <Link to='/dashboard/my-profile' onClick={() => setOpen(false)}>
              <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-200 hover:bg-richblack-700 hover:text-richblack-25'>
                <VscDashboard className='text-lg text-richblack-200'/>
                <p>Dashboard</p>
              </div>
            </Link>
            <div onClick={() => {
                dispatch(signout(navigate));
                setOpen(false);
              }}
              className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-200 hover:bg-richblack-700 hover:text-richblack-25'
            >
              <VscSignOut className='text-lg'/>
              <p onClick={handleSignOut}>Logout</p>
            </div>
          </div>
        )
      }
    </div>
  )
}
