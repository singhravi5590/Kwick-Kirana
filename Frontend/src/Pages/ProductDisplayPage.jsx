import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { displayPriceInRuppee } from '../utils/displayPrice';
import Divider from '../components/Divider'
import image1 from '../asset/minute_delivery.png'
import image2 from '../asset/Best_Prices_Offers.png'
import image3 from '../asset/Binkeyit.png'
import { discountedPrice } from '../utils/discountPrice.js';
import AddToCartButton from '../components/AddToCartButton';

const ProductDisplayPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const [data, setData] = useState({
    name : "",
    image : [],
  })
  
  const productId = params.productid.split("-").slice(-1)[0];
  
  async function fetchProduct(){
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/get-product-details`, {
        method : "Post",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({
          id : productId
        })
      })

      const result = await response.json();
      if(result.success){
        setData(result.data);
      }
    } 
    catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchProduct();
  }, [params])
  
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2'>
      <div>
        <div className='bg-white rounded lg:min-h-[70vh] lg:max-h-[70vh] min-h-56 max-h-56 w-full h-full'>
          <img 
            src={data.image[image]} 
            alt={'ProductImg'} 
            className='w-full h-full object-scale-down'
          />
        </div>
        
        <div className='flex items-center justify-center gap-3 my-4'>
          {
            data.image.map((img, index) => {
              return (
                <div key={index+"Img"} className={`bg-slate-200 w-5 h-5 rounded-full ${index == image && 'bg-slate-500'}`}></div>
              )
            })
          }
        </div>
        <div className='grid'>
          <div className='flex gap-4 w-full overflow-y-auto'>
          {
              data.image.map((img, index) => {
                return (
                  <div key={"img"+index} className='w-20 min-h-20 min-w-20 h-20 shadow-md'>
                    <img 
                      src={img} 
                      alt={"img"+index}
                      onClick={() => setImage(index)}
                      className='h-full w-full object-scale-down' 
                    />
                  </div>
                )
              })
          }
          </div>
        </div>

          {/* Description and Additional Information */}
        {/* <div className='my-2 grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base '>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data.more_details && Object.keys(data.more_details).map((element, index) => {
              return (
                <div key={index+"more details"}>
                  <p>{element}</p>
                  <p>{data.more_details[element]}</p>
                </div>
              )
            })
          }
        </div> */}
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className='bg-green-300 w-fit rounded-full px-2'>{data.unit}</p>
        <Divider/>
        <div>
          <p>Price</p>
          <div>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{displayPriceInRuppee(discountedPrice(data.price, data.discount))}</p>
            </div>
            {
              data.discount ? (<p className='mt-5'>{data.discount}% Discount on this product</p>) : ("")
            }
          </div>
        </div>
        {
          data.stock == 0 ? (<p className='text-lg text-red-500'>Out of stock</p>) : 
          (<AddToCartButton data={data}/>)
        }

        
        <h2 className='font-semibold'>Why Shop from binkeyit?</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img 
              src={image1} 
              alt={"minute_delivery"}
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your order deliver to your door step</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img 
              src={image2} 
              alt={"minute_delivery"}
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>Best Price Destination</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img 
              src={image3} 
              alt={"minute_delivery"}
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 1000+ Product across household and other category</p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default ProductDisplayPage