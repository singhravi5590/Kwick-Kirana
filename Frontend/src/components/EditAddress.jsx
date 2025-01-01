import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useGLobalContext } from '../provider/GlobalProvider'

const EditAddress = ({data, close}) => {

    const {fetchAddress} = useGLobalContext();

    const {register,handleSubmit,watch,formState: { errors },} = useForm({
        defaultValues : {
            _id : data._id,
            address_line : data.address_line,
            city : data.city,
            country : data.country,
            state : data.state,
            pincode : data.pincode,
            mobile : data.mobile
        }
    })

    async function onSubmit(editData){
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/address/update-address`, {
                method : "Put",
                headers : {
                    'content-type' : "application/json",
                    'authorization' : localStorage.getItem('accessToken')
                },
                body : JSON.stringify({
                    _id : editData._id,
                    address_line : editData.address_line,
                    city : editData.city,
                    country : editData.country,
                    state : editData.state,
                    pincode : editData.pincode,
                    mobile : editData.mobile
                })
            })

            const result = await response.json();
            if(result.success){
                toast.success(result.message),
                fetchAddress();
                close();
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    

  return (
    <div>
        <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 overflow-auto h-screen'>
            <div className='bg-white w-full max-w-lg p-4 mt-8 mx-auto rounded'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold'>Edit Address</h2>
                    <div className='cursor-pointer' onClick={close}><IoClose size={25}/></div>
                </div>

                <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-1'>
                        <label htmlFor="address_line">Address Line : </label>
                        <input 
                            type="text"
                            id='addressLine'
                            className='border bg-blue-50 p-2 rounded' 
                            {...register("address_line", {required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="city">City : </label>
                        <input 
                            type="text"
                            id='city'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("city", {required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="state">State: </label>
                        <input 
                            type="text"
                            id='state'
                            className='border bg-blue-50 p-2 rounded' 
                            {...register("state", {required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="pincode">Pincode: </label>
                        <input 
                            type="text"
                            id='pincode'
                            className='border bg-blue-50 p-2 rounded' 
                            {...register("pincode", {required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="country">Country: </label>
                        <input 
                            type="text"
                            id='country'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("country", {required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="mobile">Mobile No: </label>
                        <input 
                            type="text"
                            id='mobile'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("mobile", {required : true})}
                        />
                    </div>

                    <button className='bg-primary-200 w-full mt-2 py-2 hover:bg-primary-100' type='submit'>Submit</button>
                </form>

            </div>
        </section>
    </div>
  )
}

export default EditAddress