import React, { useState } from 'react';
import {toast} from 'react-toastify';
import { IoClose } from 'react-icons/io5'
import { uploadCategoryImage } from '../utils/uploadImage';
import { useSelector } from 'react-redux';

const UploadSubCategory = ({close, fetchData}) => {

    const [subCategoryData, setSubCategoryData] = useState({
        name : "",
        image : "",
        category : [],
    })

    function handleChange(e){
        const {name, value} = e.target;

        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name] : value,
            }
        })
    }


    const allCategory = useSelector((store) => store.products.allCategory)
    

    async function handleUploadCategoryImage(e){
        const file = e.target.files[0];
        if(!file){
            return
        }
        const response = await uploadCategoryImage(file);
        const {url} = response?.uploadImage;

        setSubCategoryData((prev) => {
            return {
                ...prev,
                image : url,
            }
        })
    }

    async function handleSubmitCategory(e){
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/subcategory/create", {
                method : "Post",
                headers : {
                    'authorization' : localStorage.getItem('accessToken'),
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(subCategoryData)
            })

            const result = await response.json();
            if(result.success){
                toast.success(result.message)
                close()
                if(fetchData){
                    fetchData();
                }
            }
        } 
        catch (error) {
            toast.error(error);
        }
    }

    function handleRemoveCategory(id){
        const index = subCategoryData.category.findIndex((el) => (el._id) === id);
        subCategoryData.category.splice(index, 1);
        setSubCategoryData((prev) => {
            return {
                ...prev
            }
        })
    }

    

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-70 z-50 p-4 flex justify-center items-center'>
        <div className='bg-white max-w-5xl w-full p-4 rounded'>

            <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold'>Add Sub Category</h1>
                <button onClick={() => close()}>
                    <IoClose size={25}/>
                </button>
            </div>

                <form className='my-3 flex flex-col gap-3' onSubmit={handleSubmitCategory}>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={handleChange}
                                id='name'
                                name='name'
                                value={subCategoryData.name} 
                                type="text"
                                className='p-3 border bg-blue-50 outline-none focus-within:border-primary-100 rounded' 
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Image</p>
                            <div className='flex flex-col lg:flex-row items-center gap-3'>
                                <div className='h-36 w-full lg:w-36 border bg-blue-50 flex items-center justify-center'>
                                    {
                                        subCategoryData.image ? ( 
                                        <img 
                                        className='w-full h-full object-scale-down' src={subCategoryData.image} 
                                        alt={subCategoryData.name} /> ) : ( 
                                        <p>No Image</p> )
                                    }
                                </div>

                                <label htmlFor="uploadSubcategoryImage">
                                    <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-black cursor-pointer '>Upload Image</div>
                                    <input 
                                        type="file" 
                                        id='uploadSubcategoryImage'
                                        className='hidden'
                                        onChange={handleUploadCategoryImage}
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">Select Category</label>
                            <div className='border focus-within:border-primary-200'>

                                {/* Display Value */}
                                <div className='flex flex-wrap gap-2'>

                                    {
                                        subCategoryData.category.map((cat, index) => {
                                            return (
                                                <p className='bg-white shadow-md px-1 m-1 flex items-center gap-2' key={cat._id+"selectedValue"}>{cat.name}
                                                <button className='cursor-pointer' onClick={() => handleRemoveCategory(cat._id)}><IoClose/></button>
                                                </p>

                                            )
                                        })
                                    }
                                </div>

                                {/* Select Category */}
                                <select className='w-full p-2 bg-transparent outline-none border' onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryIndex = allCategory.find((el) => el._id == value);
                                    setSubCategoryData((prev) => {
                                        return {
                                            ...prev,
                                            category : [...prev.category, categoryIndex]
                                        }
                                    })
                                }} name="" id="">
                                    <option value={""} >Select Category</option>
                                    {
                                        allCategory.map((category, index) => {
                                            return (
                                                <option key={category._id + "sub"} value={category._id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <button className={`px-4 py-1 border ${subCategoryData.name && subCategoryData.image && subCategoryData.category[0] ? 'bg-primary-200' :'bg-gray-200' } `}>Submit</button>    
                </form>
        </div>
    </section>
  )
}

export default UploadSubCategory