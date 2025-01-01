import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { toast } from 'react-toastify';

const ConfirmBox = ({close, cancel, confirm}) => {

  return (
    <div className='fixed p-4 z-50 top-0 bottom-0 right-0 left-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center'>
        <div className='bg-white w-full max-w-md p-4 rounded'>
            <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold'>Permanent Delete</h1>
                <button onClick={cancel}>
                    <IoClose size={25}/>
                </button>
            </div>
            <p className='my-4'>Are you sure you want to delete?</p>
            <div className='w-fit ml-auto flex items-center gap-2'>
                <button onClick={close} className='px-3 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>Cancel</button>
                <button onClick={confirm} className='px-3 py-1 border rounded border-green-500 text-green-500 hover:bg-green-500 hover:text-white'>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmBox