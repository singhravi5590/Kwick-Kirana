import React from 'react'
import { Link } from 'react-router-dom'

const CancelPayment = () => {
  return (
    <div className='bg-red-200 m-2 p-4 py-6 max-w-md w-full mx-auto flex flex-col items-center justify-center gap-5'>
        <p className='text-red-900 text-lg font-bold text-center'>Order Cancel</p>
        <Link className='border border-red-900 text-red-900 hover:bg-red-900 hover:text-white px-4 py-1'>Go to Home</Link>
    </div>
  )
}

export default CancelPayment