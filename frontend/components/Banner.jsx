import React from 'react'

const Banner = ({name}) => {
  return (
    <div className='w-4/5 text-5xl p-5 bg-emerald-600 flex justify-center mx-auto mt-2 rounded-md text-amber-50'>
      {name}
    </div>
  )
}

export default Banner
