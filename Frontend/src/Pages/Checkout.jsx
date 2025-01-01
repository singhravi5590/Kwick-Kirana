import React, { useEffect, useState } from 'react'
import { displayPriceInRuppee } from '../utils/displayPrice'
import { useGLobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {

  const {notDiscountPrice, totalPrice, totalQty, fetchAddress, fetchCartItems} = useGLobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const {addressList} = useSelector((store) => store.address);
  const [selectAddress, setSelectAddress] = useState(0);
  const {cart} = useSelector((store) => store.cart);
  const navigate = useNavigate();

  async function handleCashOnDelivery(){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/cash-on-delivery`, {
        method : 'Post',
        headers : {
          'content-type' : 'application/json',
          'authorization' : localStorage.getItem('accessToken')
        },
        body : JSON.stringify({
          list_items :  cart,
          totalAmt : totalPrice,
          addressId : (addressList[selectAddress]._id),
          subTotalAmt : totalPrice,
        })
      })

      const result = await response.json();
      if(result.success){
        toast.success(result.message);
        if(fetchCartItems){
          fetchCartItems();
        }
        navigate('/success', {
          state : {
            text : "Order"
          }
        })
      }
    } 
    catch (error) {
      console.log(error)  
    }
  }
  
  async function handleOnlinePayment(){
    try {
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/checkout`, {
        method : 'Post',
        headers : {
          'content-type' : 'application/json',
          'authorization' : localStorage.getItem('accessToken')
        },
        body : JSON.stringify({
          list_items :  cart,
          totalAmt : totalPrice,
          addressId : (addressList[selectAddress]._id),
          subTotalAmt : totalPrice,
        })
      })

      const result = await response.json();
      stripePromise.redirectToCheckout({sessionId : result.id})
    } 
    catch (error) {
      console.log(error)  
    }
  }

  return (
    <section className=''>
      <div className='container mx-auto flex-col p-4 flex lg:flex-row w-full gap-5 justify-between'>
        <div className='w-full'>
          {/* address */}
          <h3 className='font-semibold text-lg'>Choose your address</h3>
          <div className='bg-white p-4 grid gap-4'>
            {
              addressList.map((item, index) => {
                return (
                  <label className={` ${!item.status && 'hidden'}`} htmlFor={"addressList"+index} key={"index"+item._id}>
                    <div className='border p-3 rounded flex gap-3 hover:bg-blue-50'  >
                      <div>
                        <input id={"addressList"+index} type="radio" name="addressList" value={index} onClick={(e) => setSelectAddress(e.target.value)}/>
                      </div>
                      <div>
                        <p>{item.address_line}</p>
                        <p>{item.city}</p>
                        <p>{item.pincode}</p>
                        <p>{item.state}</p>
                        <p>{item.country}</p>
                        <p>{item.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center cursor-pointer'>
            Add Address
            </div>
          </div>
          
        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          {/* Summary */}
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4 text-sm flex flex-col gap-1'>
                            <h2 className='font-semibold text-base'>Bill Details</h2>
                            <div className='flex gap-4 justify-between ml-1'>
                                <p>Item Total</p>
                                <p className='text-sm flex items-center gap-2'> <span className='line-through'>{displayPriceInRuppee(notDiscountPrice)}</span> <span>{displayPriceInRuppee(totalPrice)}</span> </p>
                            </div>
                            <div className='flex gap-4 justify-between ml-1'>
                                <p>Quantity Total</p>
                                <p className='text-sm flex items-center gap-2'>{totalQty} Item</p>
                            </div>
                            <div className='flex gap-4 justify-between ml-1'>
                                <p>Delivery Charge</p>
                                <p className='text-sm flex items-center gap-2 line-through'>{displayPriceInRuppee(49)}</p>
                            </div>
                            <div className='font-semibold flex items-center justify-between gap-4'>
                                <p>Total Amount</p>
                                <p>{displayPriceInRuppee(totalPrice)}</p>
                            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <button onClick={handleOnlinePayment} className='py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded'>Online Payment</button>
            <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white'>Cash On Delivery</button>
          </div>
        </div>
      </div>
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)}/>
        )
      }
    </section>
  )
}

export default Checkout