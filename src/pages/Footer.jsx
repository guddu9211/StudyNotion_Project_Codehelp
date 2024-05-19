import React from 'react'
import LogoStudyNotion from '../assets/Logo/Logo-Full-Light.png'
import FooterList from '../components/core/Homepage/FooterList';
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";

const Footer = () => {
    const basicLinks = ['About','Careers','Affiliates'];
    const resourceList = ['Articles','Blog','Chart Sheet','Code challenges','Docs','Projects','Videos','Workspaces'];
    const plansList = ['Paid memberships','For students','Business solutions'];
    const communityList = ['Forums','Chapters','Events'];
    const subjectsList = ['AI','Cloud Computing','Code Foundations','Computer Science','Cybersecurity','Data Analytics','Data Science','Data Visualization','Developer Tools','DevOps','Game Development','IT','Machine Learning','Math','Mobile Development','Web Design','Web Development'];
    const langList = ['SwiftBash','C','C++','C#','Go','HTML & CSS','Java','JavaScript','Kotlin','PHP','Python','R','Ruby','SQL','Swift'];
    const careerBuildingList = ['Career paths','Career services','Interview prep','Professional certification','-','Full Catalog','Beta Content'];


    return (
        <div className='bg-richblack-800 text-richblack-300 font-inter flex flex-col w-full mt-4 py-8'>
            <div className='w-11/12 mx-auto max-w-maxContent'>
                {/* footer hero section  */}
                <div>
                    <div className='flex justify-between'>
                        {/* left section  */}
                        <div className='flex gap-14'>
                            <div>
                                <img src={LogoStudyNotion} alt='Logo of Study Notion'/>
                                <FooterList heading={'Company'} elements={basicLinks}/>
                                {/* redirect to popular website using icons  */}
                                <div className='flex gap-4 items-center text-2xl mt-6'>
                                    <FaInstagram/>
                                    <FaGoogle/>
                                    <FaGithub/>
                                    <TbBrandLeetcode/>
                                </div>
                            </div>
                            <div>
                                <FooterList heading={'Resources'} elements={resourceList} />
                                <FooterList heading={'Support'} elements={['Help Center']} />
                            </div>
                            <div>
                                <FooterList heading={'Plans'} elements={plansList} />
                                <FooterList heading={'Community'} elements={communityList} />
                            </div>
                        </div>

                        {/* separator  */}
                        <div className='w-[1px] max-h-max bg-richblack-400'></div>

                        {/* right section  */}
                        <div className='flex gap-14'>
                            <div>
                                <FooterList heading={'Subjects'} elements={subjectsList} />
                            </div>
                            <div>
                                <FooterList heading={'Languages'} elements={langList} />
                            </div>
                            <div>
                                <FooterList heading={'Career building'} elements={careerBuildingList} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* horizontal footer separator */}
                <div className='my-12 w-full h-[1px] bg-richblack-100'></div>

                {/* bottom line  */}
                <div className='flex justify-between mb-10'>
                    <div className='flex gap-2'>
                        <p>Privacy Policy</p>
                        <div className='w-[1px] bg-richblack-600 h-full'></div>
                        <p>Cookie Policy</p>
                        <div className='w-[1px] bg-richblack-600 h-full'></div>
                        <p>Terms</p>
                    </div>
                    <p>Made with ❣️ by Manish Prajapati © 2024 Studynotion</p>
                </div>
            </div>
        </div>
    )
}

export default Footer