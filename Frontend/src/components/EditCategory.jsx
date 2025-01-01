import React, { useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import { uploadCategoryImage } from '../utils/uploadImage';
import { toast, ToastContainer } from 'react-toastify';



const EditCategory = ({close, categoryData, fetchCategory}) => {
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        _id : categoryData._id,
        name : categoryData.name,
        image : categoryData.image ,
    })

    function handleChange(e){
        const {name, value} = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/update`, {
            method : "PUT",
            headers : {
                'authorization' : localStorage.getItem('accessToken'),
                'Content-Type' : 'application/json'
              },
            body : JSON.stringify(data),
        })
            const result = await response.json();
            console.log(result);
            if(result.success){
                toast.success(result.message);
                close();
                fetchCategory();
                return;
            }  
        } 
        catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    async function handleUploadCategory(e){
        const file = e.target.files[0];
        if(!file){
            return;
        }

        setLoading(true);
        const response = await uploadCategoryImage(file);
        const {url} = response?.uploadImage;
        setData((prev) => {
            return {
                ...prev,
                image : url,
            }
        })
        setLoading(false);
    }

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-800 z-50 bg-opacity-70 p-4'>
        
        <div className='bg-white max-w-6xl w-full'>
            <section className='fixed top-0 left-0 right-0 p-4 bottom-0 bg-neutral-800 bg-opacity-60 flex justify-center items-center'>
            <div className='bg-white w-full p-4 rounded max-w-4xl'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Update Category</h1>
                    <button onClick={close} className='block ml-auto w-fit'> <IoCloseCircleSharp size={25}/></button>
                </div>

                <form onSubmit={handleSubmit} className='my-3 flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label id='categoryName'>Name</label>
                        <input 
                            type="text"
                            id='categoryName'
                            placeholder='Enter Category Name'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            className='p-2 bg-blue-50 border outline-none border-blue-100 focus-within:border-primary-200 rounded'
                        />
                    </div>
                    <div>
                        <p className='mb-1'>Image</p>
                        <div className='flex gap-3 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                                {
                                    data.image ? (
                                        <img 
                                            src={data.image} 
                                            alt="category"
                                            className='w-full h-full object-scale-down' 
                                        />
                                    ) : (
                                        <p>No Image</p>
                                    )
                                }
                                
                            </div>
                            <label htmlFor='uploadCategory'>
                                <div disabled={!data.name} className={`${!data.name ? "bg-gray-400" : "bg-primary-200"} p-2 rounded cursor-pointer`}>{loading ? "Uploading..." : "Upload Image"}</div>
                                <input
                                    disabled={!data.name}
                                    onChange={handleUploadCategory} 
                                    type="file"
                                    id='uploadCategory'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>
                    <button className={`${data.name && data.image ? "bg-primary-200" : "bg-slate-200 font-semibold"} py-2`}>Update Category</button>
                    </form>
                    </div>
            </section>
        </div>
    </div>
  )
}

export default EditCategory