import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/UserSlice';
import { FaLink } from "react-icons/fa6";
import { IoRestaurant } from 'react-icons/io5'
import IsAdmin from '../utils/IsAdmin'
import { useGLobalContext } from '../provider/GlobalProvider'
import { handleAddItemCart } from '../store/CartSlice'

const Usermenu = ({close}) => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user)
  
    async function handleLogOut(){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,{
                method : "GET",
                headers : {
                  'authorization' : localStorage.getItem('accessToken'),
                }
              })
            
            const result = await response.json();
            const {message, success, error} = result;
            if(success){
              localStorage.clear();
              toast.success(result.message)
              navigate('/login');
              dispatch(logOut());
              dispatch(dispatch(handleAddItemCart([])))
              closeUserMenu();
                return;
            }
            return;
        }
        catch(error){
            toast.error(error);
        }
    }

    function handleClose(){
      if(close){
        close()
      }
    }

  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='flex items-center gap-2'>
          <span className='max-w-52 text-ellipsis line-clap-1'>{user.name} <span className='font-semibold text-red-600'>{user.role == 'Admin' ? '(Admin)' : ''}</span> </span><Link onClick={handleClose} to={'/dashboard/profile'}><FaLink/></Link></div>
        <Divider/>
        <div className='text-sm flex flex-col gap-2'>
          {
            (IsAdmin(user.role)) && (
              <Link onClick={handleClose} className='px-2'to={"/dashboard/category"}>Category</Link>
            )
          }

          {
            (IsAdmin(user.role)) && (
              <Link onClick={handleClose} className='px-2' to={"/dashboard/subcategory"}>Sub Category</Link>
            )
          }
          {
            (IsAdmin(user.role)) && (
              <Link onClick={handleClose} className='px-2' to={"/dashboard/upload-products"}>Upload Products</Link>
            )
          }
          {
            (IsAdmin(user.role)) && (
              <Link onClick={handleClose} className='px-2' to={"/dashboard/products"}>Product</Link>
            )
          }
            {/* <Link onClick={handleClose} className='px-2' to={"/dashboard/orders"}>My Orders</Link> */}

            <Link onClick={handleClose} className='px-2' to={"/dashboard/address"}>Save Address</Link>
            <button onClick={handleLogOut} className='text-left px-2 font-semibold'>Logout</button>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Usermenu