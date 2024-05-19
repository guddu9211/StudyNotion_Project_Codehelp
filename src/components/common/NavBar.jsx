import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from 'react-icons/io'

const NavBar = () => {
    const loc = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, loc.pathname);
    }

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Prinnting sublinks:",result.data,result.data.categories);
            setSubLinks(result.data.categories);
        } catch(err) {
            console.log("Error occurred, Could not fetch the category list");
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, []);

  return (
    <div className='flex h-14 py-1 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* logo here  */}
            <Link to={'/'}>
                <img src={logo} alt="logo" className='object-cover'/>
            </Link>

            {/* links here  */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-200'>
                    {
                        NavbarLinks.map( (link,index) => (
                            <li key={index}>
                                {
                                    link.title === 'Catalog' ? (
                                        <div className='flex gap-1 items-center group relative'>
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/>

                                            <div className='z-20 invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[15%]
                                                            flex flex-col rounded-md bg-richblack-200
                                                            text-richblack-900 opacity-0 transition-all
                                                            duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                                <div className='absolute z-1 left-[50%] translate-x-[80%] 
                                                                top-0 translate-y-[-15%]
                                                                h-6 w-6 rotate-45 rounded-sm bg-richblack-200'>
                                                    {/* this is a diamond shaped div to act like an arrow */}
                                                </div>
                                                <div className='mt-6'>
                                                    {/* this is an invisible area with only some margin added, in order to remove the ponted arrow appearing on top listed item      */}
                                                </div>

                                                {
                                                    subLinks.length ? (
                                                        subLinks.map((subLink, index) => (
                                                            <Link to={`/category/${subLink.link}`} key={index}>
                                                                <p className='text-md h-full text-richblack-600 px-4 py-2 rounded-md transition-all duration-100 hover:bg-richblack-400 hover:text-richblue-5'>
                                                                    {subLink.name}
                                                                </p>
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <p className='text-sm text-richblack-800'>No sublinks</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path} >
                                            {/* [Manish] update the color of selected link on the basis of route in browser URL  */}
                                            <p className={`${matchRoute(link?.path) ? 'text-yellow-200' : 'text-richblack-200'}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>



            {/* login logout signup dashboard button and profile picture icon */}
            <div className='flex items-center gap-x-4'>
                {
                    user && user?.accountType !== 'Instructor' && (
                        <Link to='/dashboard/cart' className='relative'>
                            <AiOutlineShoppingCart className='text-richblack-200 text-xl'/>
                            {
                                totalItems > 0 && (
                                    <div className='absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 font-bold text-white'>
                                        {totalItems}
                                    </div>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/login'>
                            <button className='border-1 border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-200 rounded-md'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/signup'>
                            <button className='border-1 border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-200 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropdown/>
                }
            </div>

        </div>
    </div>
  )
}

export default NavBar