import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { handleAddItemCart } from '../store/CartSlice';

const Success = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {cart} = useSelector((store) => store.cart);

    console.log(cart);
    
    useEffect(() => {
    }, [])
    
  return (
    <div className='max-w-md m-2 bg-green-200 p-4 w-full rounded mx-auto flex flex-col items-center justify-between gap-5'>
        <p className='text-green-800 text-center font-bold text-lg'>{location?.state?.text == 'Order' ? "Order" : "Payment" } Successful</p>
        <Link to={'/'} className='border border-green-900 text-green-900 hover:bg-green-900 hover:text-white px-4 py-1'>Go To Home</Link>
    </div>
  )
}

export default Success