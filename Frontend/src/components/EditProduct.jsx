import React, { useState } from 'react'
import { uploadCategoryImage } from '../utils/uploadImage';
import { FaCloudUploadAlt } from "react-icons/fa";
import Loading from '../components/Loading';
import Viewimage from '../components/Viewimage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import AddFieldComponent from '../components/AddFieldComponent';
import { toast } from 'react-toastify';
import successAlert from '../utils/successAlert';

const EditProduct = ({data:editData, close, fetchProduct}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const {allCategory, allsubCategory} = useSelector((store) => store.products);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const [moreFields, setMoreFields] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  

  const [data, setData] = useState({
    _id : editData._id,
    name : editData.name,
    image : [...editData.image],
    category : [...editData.category],
    subCategory : [...editData.subCategory],
    unit : editData.unit,
    stock : editData.stock,
    price : editData.price,
    discount : editData.discount,
    description : editData.description,
    more_details : {}
  })

  function handleChange(e){
    const {name, value} = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name] : value,
      }
    })
  }

  
  async function handleUploadChange(e){
    const file = e.target.files[0];
    if(!file){
      return;
    }

    setImageLoading(true);
    const image = await uploadCategoryImage(file);
    const {url} = image.uploadImage;

    setData((prev) => {
      return {
        ...prev,
        image : [...prev.image, url]
      }
    })
    setImageLoading(false);
  }
  
  function handleDeleteImage(index){
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      }
    })
  }

  function handleDeleteCategory(index){
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  function handleDeleteSubCategory(index){
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return{
        ...prev
      }
    })
  }

  function handleAddField(){
    
    setData((prev) => {
      return {
        ...prev,
        more_details : {
          ...prev.more_details,
          [fieldName] : ""
        }
      }
    })
    setFieldName("");
    setOpenAddField(false);
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/update-product-details`, {
        method : "Put",
        headers : {
            'authorization' : localStorage.getItem('accessToken'),
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
      
      const result = await response.json();
      if(result.success){
        successAlert(result.message);
        setData({
          name : "",
          image : [],
          category : [],
          subCategory : [],
          unit : "",
          stock : "",
          price : "",
          discount : "",
          description : "",
          more_details : {}
        });
        fetchProduct();
      }
      
    } 
    catch (error) {
      console.log(error);
    }

  }
  return (
    <section className='fixed top-0 z-50 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-70 p-4'>
        <div className='h-full max-h-[95vh] overflow-y-auto'>
            <div className='bg-white max-w-3xl mx-auto rounded p-4'>
             <div className='py-2 z-10 sticky top-0 bg-white shadow-md flex items-center justify-between'>
                    <h2 className='font-semibold'>Edit Product</h2>
                    <button onClick={() => close()}>{<IoClose size={20}/>}</button>
             </div>
        <div className='grid p-4'>
            <form className='grid gap-4' onSubmit={handleSubmit} action="">
            <div className='grid gap-1'>
                <label htmlFor="name">Name</label>
                <input 
                type="text"
                id='name'
                name='name'
                placeholder='Enter Product Name'
                value={data.name}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200' 
                />
            </div>

            <div className='grid gap-1'>
                <label htmlFor="description">Description</label>
                <textarea 
                type="text"
                id='description'
                name='description'
                placeholder='Enter Product Description'
                value={data.description}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 resize-none'
                rows={3} 
                />
            </div>

            <div>
                <div>
                <p>Image</p>
                <div>
                    <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col'>
                        {
                        imageLoading ? <Loading/> : 
                        <>
                            <FaCloudUploadAlt size={28}/>
                            <p>Upload Image</p>
                        </>  
                        }
                        
                    </div>
                    <input 
                        type="file"
                        id='productImage'
                        className='hidden'
                        onChange={handleUploadChange}
                        accept='image/*'
                    />
                    </label>
                    
                    {/* Display Upload Image */}
                    <div className='flex gap-2 my-2'>
                    {
                        data.image.map((img, index) => {
                        return (
                            <div key={index+img} className='h-20 w-20 min-w-20 bg-blue-50 relative group'>
                            <img
                                src={img} 
                                alt="Product Image" 
                                className='w-full h-full object-scale-down'
                                onClick={() => setViewImageUrl(img)}
                            />
                            <div onClick={() => handleDeleteImage(index)} className='absolute bottom-1 right-0 p-1 bg-white hover:bg-black hover:text-white rounded hidden group-hover:block cursor-pointer'>
                                <MdDelete/>
                            </div>
                            </div>
                        )
                        })
                    }
                    </div>
                </div>
                </div>
            </div>

            <div className='grid gap-1'>
                <label htmlFor="">Category</label>
                <div>
                <select onChange={(e) => {
                    const value = e.target.value;
                    const category = allCategory.find((el) => el._id === value);
                    setData((prev) => {
                    return {
                        ...prev,
                        category : [...prev.category, category],
                    }
                    })
                    setSelectCategory('');
                }} value={selectCategory} className='bg-blue-50 border w-full p-2 rounded' name="" id="" >
                    <option >Select category</option>
                    {
                    allCategory.map((cat, index) => {
                        return(
                        <option key={index+"allcategory"} value={cat._id}>{cat.name}</option>
                        )
                    })
                    }
                </select>
                <div className='flex flex-wrap gap-3'>
                    {
                    data.category.map((c, index) => {
                        return(
                        <div key={index+"category"} className='flex text-sm items-center gap-1 bg-blue-50 mt-2'>
                            <p>{c.name}</p>
                            <div onClick={() => handleDeleteCategory(index)}className='hover:text-red-500 cursor-pointer'>
                            <IoClose size={20}/>
                            </div>
                        </div>
                        )
                    })
                    }
                    </div>
                </div>
            </div>

            <div className='grid gap-1'>
                <label htmlFor="">Sub Category</label>
                <div>
                <select onChange={(e) => {
                    const value = e.target.value;
                    const SubCategory = allsubCategory.find((el) => el._id === value);
                    setData((prev) => {
                    return {
                        ...prev,
                        subCategory : [...prev.subCategory, SubCategory],
                    }
                    })
                    setSelectSubCategory('');
                }} value={selectSubCategory} className='bg-blue-50 border w-full p-2 rounded' name="" id="" >
                    <option >Select Sub category</option>
                    {
                    allsubCategory.map((cat, index) => {
                        return(
                        <option key={index+"allcategory"} value={cat._id}>{cat.name}</option>
                        )
                    })
                    }
                </select>
                <div className='flex flex-wrap gap-3'>
                    {
                    data.subCategory.map((c, index) => {
                        return(
                        <div key={index+"category"} className='flex text-sm items-center gap-1 bg-blue-50 mt-2'>
                            <p>{c.name}</p>
                            <div onClick={() => handleDeleteSubCategory(index)}className='hover:text-red-500 cursor-pointer'>
                            <IoClose size={20}/>
                            </div>
                        </div>
                        )
                    })
                    }
                    </div>
                </div>
                
            </div>

            <div className='grid gap-1'>
                <label htmlFor="unit">Unit</label>
                <input 
                type="text"
                id='unit'
                name='unit'
                placeholder='Enter Product Unit'
                value={data.unit}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200' 
                />
            </div>

            <div className='grid gap-1'>
                <label htmlFor="stock">Number of Stock</label>
                <input 
                type="number"
                id='stock'
                name='stock'
                placeholder='Enter Stock'
                value={data.stock}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200' 
                />
            </div>

            <div className='grid gap-1'>
                <label htmlFor="price">Price</label>
                <input 
                type="text"
                id='price'
                name='price'
                placeholder='Enter Product Price'
                value={data.price}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200' 
                />
            </div>

            <div className='grid gap-1'>
                <label htmlFor="discount">Discount</label>
                <input 
                type="text"
                id='discount'
                name='discount'
                placeholder='Enter Product Discount'
                value={data.discount}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200' 
                />
            </div>
            
            {/* Add More field */}
            <div className='grid gap-2'>
                {
                Object.keys(data.more_details).map((k, index) => {
                    return (
                    <div key={index + "moreDetails"} className='grid gap-1'>
                        <label htmlFor={k}>{k}</label>
                        <input 
                            type="text"
                            id={k}
                            value={data.more_details[k]}
                            onChange={(e) => {
                            const value = e.target.value;
                            setData((prev) => {
                                return {
                                ...prev,
                                more_details : {
                                    ...prev.more_details,
                                    [k] : value
                                }
                                }
                            })
                            }}
                            required
                            className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200' 
                        />
                    </div>
                    )
                })
                }
            </div>

            <div onClick={() => setOpenAddField(true)} className='hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border cursor-pointer'>
                Add Fields
            </div>
            <button className='py-2 bg-primary-100 hover:bg-primary-200 rounded font-semibold'>Submit</button>
            </form>
        </div>
        {
            viewImageUrl && (
            <Viewimage url={viewImageUrl} close={()=> setViewImageUrl("")} />
            )
        }

        {
            openAddField && (
            <AddFieldComponent 
                close={() => setOpenAddField(false)}
                onChange={(e) => setFieldName(e.target.value)}
                submit={() => handleAddField()}
                value={fieldName}
            />
            )
        }
            </div>
        </div>
    </section>
  )
}

export default EditProduct
