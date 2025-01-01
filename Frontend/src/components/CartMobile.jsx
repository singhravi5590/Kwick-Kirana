import React from 'react'
import { FaAngleRight, FaCartShopping } from "react-icons/fa6";
import { useGLobalContext } from '../provider/GlobalProvider';
import { displayPriceInRuppee } from '../utils/displayPrice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartMobile = () => {
    const {totalQty, totalPrice} = useGLobalContext();
    const {cart} = useSelector((store) => store.cart);

  return (
    <>
    {
        cart[0] && (
            <div className='p-2 sticky bottom-4'>
                <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 flex justify-between gap-3 lg:hidden">
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-green-500 text-neutral-100 text-sm w-fit'>
                            <FaCartShopping/>
                        </div>
                        <div className='text-xs'>
                            <p>{totalQty} Items</p>
                            <p>{displayPriceInRuppee(totalPrice)}</p>
                        </div>
                    </div>
                    <Link to={'/cart'} className='flex items-center gap-1'>
                        <span>View Cart</span>
                        <FaAngleRight/>
                    </Link>
                </div>
    </div>
        )
    }
    </>
    
  )
}

export default CartMobile