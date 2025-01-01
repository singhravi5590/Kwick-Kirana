import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/ConfirmBox';
import { useSelector } from 'react-redux';

const Category = () => {  
  
  const [openCategoryModel, setOpenCategoryModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({});
  const [editData, setEditData] = useState({
    name : "",
    image : ""
  })
  
  const category = useSelector((store) => store.products.allCategory);

  useEffect(() => {
    setCategoryData(category);
  },[category])

  async function handleDeleteCategory(){
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/delete`, {
            method : "Delete",
            headers : {
                "Content-Type" : "application/json",
                'authorization' : localStorage.getItem('accessToken'),
              },
            body : JSON.stringify(deleteCategory),
        })

        const result = await response.json();
        if(result.success){
            toast.success(result.message);
            setOpenConfirm(false);
            fetchCategory();
            return;
        }    
    } 
    catch (error) {
        toast.error(error);
    }
}

  async function fetchCategory(){
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/get`, {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
          },
    })
      const result = await response.json();
      setCategoryData(result.data);
    }
    catch(error){
      toast.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, [])

  return (
    <section>

      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setOpenCategoryModel(!openCategoryModel)} className='text-sm border border-primary-200 hover:bg-primary-200  px-1 py-1 rounded'>Add Category</button>
      </div>
      {
        (!categoryData[0] && !loading) ? (<p className='font-semibold text-center my-20 text-3xl'>No Data</p>) : " "
      }

      <div className='grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 p-4 gap-4'>
        {
          categoryData.map((category, index) => (

            <div className='w-32 h-56 rounded shadow-md' key={category._id}>
              <img 
                className='w-full object-scale-down'
                src={category.image} 
                alt={category.name} 
              />
              <div className='flex items-center h-9 gap-2'>
                <button onClick={() => {setOpenEdit(!openEdit)
                  setEditData(category)
                }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>Edit</button>
                <button onClick={() => {setOpenConfirm(!openConfirm)
                  setDeleteCategory(category)
                }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>Delete</button>
              </div>
            </div>
          ))
        }
      </div>

      {
        loading && (<Loading/>)
      }

      {openCategoryModel && <UploadCategoryModel fetchCategory={() => fetchCategory()} close={() => setOpenCategoryModel(false)}/>}

      {
        openEdit && (<EditCategory categoryData={editData} close={() => setOpenEdit(false)} fetchCategory={() => fetchCategory()}/>)
      }

      {
        openConfirm && (<ConfirmBox close={() => setOpenConfirm(false)}  confirm={handleDeleteCategory} cancel={() => setOpenConfirm(false)}/>)
      }
      
    </section>
  )
}

export default Category