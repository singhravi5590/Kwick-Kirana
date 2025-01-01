import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useGLobalContext } from '../provider/GlobalProvider';
import Loading from '../components/Loading'
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({data}) => {
    

    const [loading, setLoading] = useState(false);
    const {fetchCartItems, updateCartQty, deleteCartItem} = useGLobalContext();
    const {cart} = useSelector((store) => store.cart)
    const [isAvailable, setIsAvailable] = useState(false);
    const [cartQty, setCartQty] = useState(0);
    const [cartItemsDetails, setCartItemsDetails] = useState();

    
    async function handleAddToCart(e){
        e.preventDefault();
        e.stopPropagation();
        
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/create`, {
                method : "Post",
                headers : {
                    'content-type' : 'application/json',
                    'authorization' : localStorage.getItem('accessToken')
                },
                body : JSON.stringify({
                    productId : data._id
                })
            })
            
            const result = await response.json();

            if(result.success){
                toast.success(result.message);
                if(fetchCartItems){
                    fetchCartItems();
                }
            }
            if(result.error){
                throw new Error(result.message)
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    function increaseQty(e){
        e.preventDefault();
        e.stopPropagation();
        updateCartQty(cartItemsDetails?._id, cartQty+1)
    }

    function decreaseQty(e){
        e.preventDefault();
        e.stopPropagation();  
        if(cartQty == 1){
            deleteCartItem(cartItemsDetails?._id)
        }
        else{
            updateCartQty(cartItemsDetails?._id, cartQty-1)
        }  
    }

    useEffect(() => {
        const checkItem = cart.some((item) => item?.productid?._id == data?._id)
        const product = cart.find((item) => item?.productid?._id == data?._id)
        setCartQty(product?.quantity)
        setCartItemsDetails(product);
        setIsAvailable(checkItem);
    }, [cart, data])
  return (
    <div className='w-full max-w-[150px]'>
        {
            isAvailable ? (
                <div className='flex w-full h-full'>
                    <button className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center' onClick={decreaseQty}>{<FaMinus/>}</button>
                    <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{cartQty}</p>
                    <button className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center' onClick={increaseQty}>{<FaPlus/>}</button>
                </div>
            ) : (
            <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
            {loading ? (<Loading/>) : "Add"}
         </button>
            )
        }
    </div>
  )
}

export default AddToCartButton