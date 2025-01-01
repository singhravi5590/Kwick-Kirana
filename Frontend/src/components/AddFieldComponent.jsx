import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddFieldComponent = ({close, value, onChange, submit}) => {
  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-70 z-50 flex items-center justify-center p-4'>
        <div className='bg-white rounded p-4 w-full max-w-md'>
            <div className='flex justify-between gap-3'>
                <h1 className='font-semibold'>Add Field</h1>
                <button onClick={close}> <IoClose size={25}/> </button>
            </div>
            <input
                className='bg-blue-50 my-3 p-2 border outline-none focus-within:border-primary-100 rounded w-full' 
                type="text" 
                placeholder='Enter field name'
                value={value}
                onChange={onChange}
            />
            <button onClick={submit} className='bg-primary-200 px-4 py-2 rounded mx-auto w-fit block hover:bg-primary-100'>Add Field</button>
        </div>
    </section>
  )
}

export default AddFieldComponent