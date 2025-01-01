import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress';
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddress from '../components/EditAddress';
import toast from 'react-hot-toast';
import { useGLobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const {addressList} = useSelector((store) => store.address);
  const {fetchAddress} = useGLobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [editData, setEditData] = useState({});

  async function handleDeleteAddress(_id){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/address/delete-address`, {
        method : "Delete",
        headers : {
          'content-type' : 'application/json',
          'authorization' : localStorage.getItem('accessToken'),
        },
        body : JSON.stringify({
          _id : _id
        })
      })

      const result = await response.json();
      if(result.success){
        toast.success(result.message);
        fetchAddress();
      }
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <div className='bg-white p-2 shadow-lg flex items-center justify-between'>
        <h2 className='font-semibold'>Address</h2>
        <button onClick={() => setOpenAddress(true)} className='border border-primary-100 px-2 py-1 rounded hover:bg-primary-200 hover:text-black'>Add Address</button>
      </div>
      <div className='bg-blue-50 p-4 grid gap-4'>
            {
              addressList.map((item, index) => {
                return (
                    <div className={`border p-3 rounded flex gap-3  bg-white`} key={"addressList"+index}>
                      <div className='w-full'>
                        <p>{item.address_line}</p>
                        <p>{item.city}</p>
                        <p>{item.pincode}</p>
                        <p>{item.state}</p>
                        <p>{item.country}</p>
                        <p>{item.mobile}</p>
                      </div>
                      <div className='flex flex-col justify-between'>
                        <button onClick={() => handleDeleteAddress(item._id)} className='border  p-1 rounded hover:text-white hover:bg-green-500'>
                          <MdDelete size={20}/>
                        </button>
                        <button onClick={() => {
                          setOpenEditAddress(true) 
                          setEditData(item)}} className='border p-1 rounded hover:text-white hover:bg-red-500'>
                          <MdEdit size={20}/>
                        </button>
                      </div>
                    </div>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center cursor-pointer'>
            Add Address
            </div>
          </div>
            {
              openAddress && (<AddAddress close={() => setOpenAddress(false)}/>)
            }

            {
              openEditAddress && (<EditAddress data={editData} close={() => setOpenEditAddress(false)}/>)
            }
    </div>
  )
}

export default Address