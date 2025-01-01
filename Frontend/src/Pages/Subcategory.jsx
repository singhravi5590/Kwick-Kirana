import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory';
import { toast } from 'react-toastify';
import DisplayTable from '../components/DisplayTable';
import {createColumnHelper} from '@tanstack/react-table'
import Viewimage from '../components/Viewimage';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from '../components/ConfirmBox';

const Subcategory = () => {
  const [openAddSubCategory, setAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const columnHelper = createColumnHelper();
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id : "",
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id : "",
  });
  const [openDelete, setOpenDelete] = useState(false);



  async function fetchSubcategory(){
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subcategory/get`, {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
    })

    const result = await response.json();
    if(result.success){
      setData(result.data);
    }
    } 
    catch (error) {
      toast.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubcategory();
    
  }, [])

  async function deleteSubCategoryConfirm() {
    try {
      const response = await fetch("http://localhost:8080/api/subcategory/delete", {
        method : "Delete",
        headers : {
            "Content-Type" : "application/json",
            'authorization' : localStorage.getItem('accessToken'),
          },
        body : JSON.stringify(deleteSubCategory),
    })
    const result = await response.json();
    if(result.success){
      toast.success(result.message);
      setOpenDelete(false);
      fetchSubcategory();
      setDeleteSubCategory({_id : ""});
      return;
    }
      
    } 
    catch (error) {
      toast.error(error);
    }
  }

  const column = [
    columnHelper.accessor('name', {
      header : "Name"
    }),
    columnHelper.accessor('image', {
      header : "Image",
      cell : ({row})=>{
        return <div className='flex justify-center items-center'>
          <img 
                src={row.original.image} 
                alt={row.original.name} 
                className='w-8 h-8'
                onClick={() => {
                  setImageUrl(row.original.image)
                }}
            />
        </div> 
      }
    }),
    columnHelper.accessor('category', {
      header : "Category",
      cell : ({row})=> {
        return (
        <>
          {
            row.original.category.map((c, index) => {
              return (
                <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
              )
            })
          }
        </>)
      }
    }),
    columnHelper.accessor('_id', {
      header : "Action",
      cell : (({row}) => {
        
        return(
          <div className='flex justify-center items-center gap-3'>
            <button onClick={() => {
              setOpenEdit(!openEdit);
              setEditData(row.original)
            }} className='p-2 bg-green-100 hover:text-green-600 rounded-full'><FaPencil size={20} /></button>
            <button onClick={() => {
              setOpenDelete(true);
              setDeleteSubCategory(row.original)
            }} className='p-2 bg-red-100 hover:text-red-600 rounded-full'><MdDelete size={20}/></button>
          </div>
        )
      })
    })
  ]

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={() => setAddSubCategory(!openAddSubCategory)} className='text-sm border border-primary-200 hover:bg-primary-200  px-2 py-1 rounded'>Add Sub Category</button>
      </div>

      <div className='overflow-auto w-full max-w-[90vw]'>
        <DisplayTable data={data} column={column} />
      </div>

      {
        openAddSubCategory && <UploadSubCategory fetchData={() => fetchSubcategory()} close={() => setAddSubCategory(false)}/>
      }

      {
        imageUrl && (
        <Viewimage url={imageUrl} close={()=> setImageUrl('')}/>)
      }

      {
        openEdit && (
        <EditSubCategory fetchData={() => fetchSubcategory()} data={editData} close={() => setOpenEdit(false)}/>)
      }

      {
        openDelete && (
        <ConfirmBox close={() => setOpenDelete(false)} confirm={deleteSubCategoryConfirm} cancel={() => setOpenDelete(false)} />
        )
      }

    </section>
  )
}

export default Subcategory