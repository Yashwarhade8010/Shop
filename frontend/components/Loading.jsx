import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
        <span className="loading loading-ring loading-lg"></span>
    </div>
  )
}

export default Loading
