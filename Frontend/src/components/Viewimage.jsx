import React from 'react'
import { IoClose } from 'react-icons/io5'

const Viewimage = ({url, close}) => {
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 z-50 bg-neutral-900 bg-opacity-70 flex items-center justify-center p-4'>
        <div className='w-full max-w-md max-h-[120vh] p-4'>
            <button onClick={close} className='text-black m-5 rounded-full bg-white w-fit block ml-auto '><IoClose size={25}/></button>
            <img 
                src={url} 
                alt='view'
                className='w-full h-full object-scale-down'
            />
        </div>
    </div>
  )
}

export default Viewimage