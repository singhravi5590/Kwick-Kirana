import React, { useState } from 'react'
import EditProduct from '../components/EditProduct'
import ConfirmBox from '../components/ConfirmBox';

const ProductCardAdmin = ({data, fetchProduct}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  async function handleDeleteProduct(){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/delete-product`, {
        method : 'Delete',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          _id : data._id,
        })
      })

      const result = await response.json();

      if(result.success){
        fetchProduct();
        setOpenDelete(false);
      }
      
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-36 p-4 bg-white rounded'>
        <div>
            <img 
                src={data?.image[0]} 
                alt={data.name} 
                className='w-full h-full object-scale-down'
            />
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>
        <div className='flex items-center justify-between gap-3 py-2'>
          <button onClick={()=> setOpenEdit(true)} className='border py-1 px-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit</button>
          <button onClick={()=> setOpenDelete(true)} className='border py-1 px-1 text-sm border-red-500 bg-red-100 text-red-600 hover:bg-red-200 rounded'>Delete</button>
        </div>
        {
          (openEdit && (<EditProduct fetchProduct={fetchProduct} close={() => setOpenEdit(false)} data={data}/>))
        }

        {
          (openDelete && (<ConfirmBox close={() => setOpenDelete(false)} cancel={() => setOpenDelete(false)} confirm={handleDeleteProduct}/>))
        }
    </div>
  )
}

export default ProductCardAdmin