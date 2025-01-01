import React, { useState } from 'react'
import { displayPriceInRuppee } from '../utils/displayPrice'
import { Link } from 'react-router-dom'
import validUrlConvert from '../utils/validUrlConvert'
import { discountedPrice } from '../utils/discountPrice'
import toast, {Toaster} from 'react-hot-toast'
import { useGLobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
    const url = `/product/${validUrlConvert(data?.name)}-${data?._id}`;
    const [loading, setLoading] = useState(false);
    const {fetchCartItems, updateCartQty} = useGLobalContext();


  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
        <Toaster/>
        <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            <img 
                src={data?.image[0]} 
                alt={data?.name} 
                className='w-full h-full object-scale-down lg:scale-125'
            />
        </div>

        <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
            10min
        </div>

        <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
            {data?.name}
        </div>

        <div className='w-fit px-2 gap-1 lg:px-0 text-sm lg:text-base'>
            {data?.unit}
        </div>

        <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
            <div className='font-semibold'>
                {displayPriceInRuppee(discountedPrice(data?.price, data?.discount))}
            </div>

            <div>
                {
                    (data.stock === 0) ? (<p className='text-red-500 text-sm text-center'>Out of Stock</p>) : (
                        <div className='p-3 rounded w-20'>
                           <AddToCartButton data={data}/>
                        </div>
                    )
                }
            </div>
        </div>
    </Link>
  )
}

export default CardProduct