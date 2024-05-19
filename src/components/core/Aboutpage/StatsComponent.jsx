import React from 'react'

// creating new data 

const Stats = [
    {count: '5K', label: 'Active Students'},
    {count: '10+', label: 'Mentors'},
    {count: '200+', label:'Courses'},
    {count: '50+', label: 'Awards'},
]

const StatsComponent = () => {
  return (

        <div className=''>
            <div className='flex justify-evenly gap-8'>
                {
                    Stats.map((data, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-2 items-center'>
                                <h1 className='text-4xl font-semibold'>{data.count}</h1>
                                <h2 className='text-md text-richblack-300 text-center'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
  )
}

export default StatsComponent