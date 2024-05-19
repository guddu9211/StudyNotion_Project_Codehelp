import React from 'react'

// importing all icons from vsc folder in react-icons [ Manish ]
import * as Icons from 'react-icons/vsc'
// import { useDispatch } from 'react-redux'
import { NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom'

const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName]
    const location = useLocation();
    const navigate = useNavigate();
    // const dispatch = useDispatch();     // going to use it for Log Out functionality

    const matchRoute = (route) => {
        // console.log('param 1 path:route=', {path:route}, 'param 2 location.pathname=', location.pathname);
        return matchPath({path:route}, location.pathname);
    }

  return (
    
        // NavLink
        <NavLink
            to={link.path}
            onClick={() => navigate(link.path)}
            className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
        >
            {/* adding it as a empty span tag to display the selected thing with yellow color in its left side border  */}
            <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
            }`}>
            {/* empty here for a reason */}
            </span>

            <div className='flex items-center gap-2'>
                <Icon className='text-lg' />
                <span>{link.name}</span>
            </div>
        </NavLink>
    
    
  )
}

export default SidebarLink