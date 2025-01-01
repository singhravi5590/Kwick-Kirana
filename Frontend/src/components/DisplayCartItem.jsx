import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGLobalContext } from '../provider/GlobalProvider'
import { displayPriceInRuppee } from '../utils/displayPrice'
import { FaCaretRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { discountedPrice } from '../utils/discountPrice'
import emptyCart from '../asset/empty_cart.webp'

const DisplayCartItem = ({close}) => {
    const {notDiscountPrice, totalPrice, totalQty} = useGLobalContext();
    const {cart} = useSelector((store) => store.cart);
    
  return (
    <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800 bg-opacity-70 z-50'>
        <div className='bg-white w-full max-w-sm max-h-screen min-h-screen ml-auto'>
            <div className='flex items-center shadow-md p-4 gap-3 justify-between'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={'/'} className='lg:hidden' onClick={close}>{<IoClose size={25}/>}</Link>
                <button className='lg:block hidden' onClick={close}>{<IoClose size={25}/>}</button>
            </div>

            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 mt-2 p-2 flex flex-col gap-4'>

                {
                    cart[0] ? (
                    <>
                        <div className='flex justify-between items-center px-4 py-2 rounded-full bg-blue-100 text-blue-500 gap-1'>
                            <p>Your Total Savings</p>
                            <p>{displayPriceInRuppee(notDiscountPrice-totalPrice)}</p>
                        </div>

                        <div className='bg-white grid gap-5 p-2 overflow-auto'>
                    {
                        cart[0] && (
                            cart.map((item, index) => {
                                return (
                                    <div className='flex w-full gap-4' key={index + "cart"}>
                                        <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                            <img 
                                                src={item?.productid?.image[0]} 
                                                alt= {item?.productid?.name}
                                                className='object-scale-down'
                                            />
                                        </div>

                                        <div className='w-full max-w-sm text-sm'>
                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productid?.name}</p>
                                            <p className='text-neutral-400'>{item?.productid?.unit}</p>
                                            <p className='font-semibold'>{displayPriceInRuppee(discountedPrice(item?.productid?.price, item?.productid?.discount))}</p>
                                        </div>
                                        <div>
                                            <AddToCartButton data={item?.productid}/>
                                        </div>
                                    </div>
                                    
                                )
                            })
                        )
                    }
                        </div>

                        <div className='bg-white p-4 text-sm flex flex-col gap-1'>
                            <h2 className='font-semibold text-base'>Bill Details</h2>
                            <div className='flex gap-4 justify-between ml-1'>
                                <p>Item Total</p>
                                <p className='text-sm flex items-center gap-2'> <span className='line-through'>{displayPriceInRuppee(notDiscountPrice)}</span> <span>{displayPriceInRuppee(totalPrice)}</span> </p>
                            </div>
                            <div className='flex gap-4 justify-between ml-1'>
                                <p>Quantity Total</p>
                                <p className='text-sm flex items-center gap-2'>{totalQty}</p>
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
                    </>    
                        
                    ) : (
                        <div className='bg-white flex flex-col items-center justify-center'>
                            <img 
                                src={emptyCart} 
                                alt={"emptyCartImage"}
                                className='w-full h-full object-scale-down'
                             />
                             <Link onClick={close} to={'/'} className='block bg-green-600 py-2 text-white rounded px-4'>Shop Now</Link>
                        </div>
                    )
                }

                
            </div>

            {
                cart[0] && (
                    <Link to={'/checkout'} onClick={close} className='bg-green-700 py-4 text-neutral-100 font-bold text-base px-4 sticky bottom-3 rounded mx-1 flex items-center justify-between gap-3'>
                        <div>
                            {displayPriceInRuppee(totalPrice)}
                        </div>
                        <button className='flex items-center gap-1 cursor-pointer'> 
                            Proceed<span>{<FaCaretRight/>}</span>
                        </button>
                    </Link>
                )
            }

           
        </div>
    </section>
  )
}

export default DisplayCartItem