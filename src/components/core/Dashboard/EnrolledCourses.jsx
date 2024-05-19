import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {

    const {token} = useSelector(state => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            console.log("collected response ",response);
            setEnrolledCourses(response);
        } catch(err){
            console.log("unable to fetch enrolled courses",err);
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    },[]);

  return (
    <div className='text-white'>
        <h1>Enrolled Courses</h1>
        {
            !enrolledCourses ? (
                <div>
                    Loading...
                </div>
            ) : !enrolledCourses.length ? (
                <div>
                    No Courses Enrolled
                </div>
            ) : (

                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>

                    {/* cards shuru hote hai yaha se  */}
                    {
                        enrolledCourses.map((course, index) => (
                            <div key={index}>
                                <div>
                                    <img src={course.thumbnail} alt='course thumbnail' />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>
                                
                                <div>
                                    <p>Progress: {course?.progressPercentage || 0}%</p>
                                    <ProgressBar completed={course?.progressPercentage || 0} height='8px' isLabelVisible={false} />
                                </div>
                            </div>
                        ))
                    }
                </div>
                
            )
        }
    </div>
  )
}

export default EnrolledCourses