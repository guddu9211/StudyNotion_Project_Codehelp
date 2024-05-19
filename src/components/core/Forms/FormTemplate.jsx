import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import BackgroundImg from '../../../assets/Images/bghome.svg'

// const tabsName = ["Student", "Instructor"]

const FormTemplate = ({title, desc1, desc2, image, formType, isLoggedIn, setIsLoggedIn}) => {

    // const [currentTab, setCurrentTab] = useState(tabsName[0])

    // function clickHandler(value) {
    //     setCurrentTab(value);
    // }

  return (
    // full page wala div 
    <div className='w-11/12 max-w-maxContent mt-32'>
        {/* andar wala div jo content area ko denote krta hai  */}
        <div className='mx-auto text-white flex flex-row justify-between gap-2'>
            {/* left section jisme form hota hai  */}
            <div className='w-[45%] flex flex-col items-start gap-4'>
                <h1 className='text-4xl font-semibold'>{title}</h1>
                <div className='my-4'>
                    <p className='text-xl text-richblack-200'>{desc1}</p>
                    <span className='text-blue-400 font-pacifico text-lg'>{desc2}</span>
                </div>

                {/* <div className='flex items-center gap-1 bg-richblack-800 px-1 py-1 my-4 rounded-full '>
                    {
                        tabsName.map( (element, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => clickHandler(element)}
                                    className={`font-medium text-lg ${currentTab === element ? 'text-richblack-5 font-medium bg-richblack-900' : 'text-richblack-200'}
                                    cursor-pointer transition-all duration-300 rounded-full px-6 py-1 hover:bg-richblack-900 hover:text-richblack-200`}   
                                >
                                    {element}
                                </div>
                            )
                        })
                    }

                </div> */}

                
                    {
                        formType === 'signup' ? 
                            (<SignupForm/>) : (<LoginForm/>)
                    }
                

            </div>


            {/* right section jisme image hota hai  */}
            <div className='w-[45%] relative flex'>
                <div className='text-black absolute bottom-0 w-full h-full'>
                    <img src={BackgroundImg} loading='lazy' alt='background for login or signup page'
                        className='w-full h-full object-cover translate-x-4 translate-y-4'
                    />
                </div>
                <img src={image} alt="login or signup page related illustration" loading='lazy' className='w-full z-10 object-cover'/>
            </div>
        </div>
    </div>
  )
}

export default FormTemplate