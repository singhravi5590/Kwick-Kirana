import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import validUrlConvert from '../utils/validUrlConvert';

const CategoryWiseDisplayProduct = ({id, name}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const containerRef = useRef();
    const navigate = useNavigate();

    const {allCategory, allsubCategory} = useSelector((store) => store.products);

    function handleRedirectToSubcategoryPage(id, name, e){
      const sub = allsubCategory.find((el) => {
        const filterData = el.category.some((c) => {
          return c._id == id;
        })
        return filterData ? true : null;
      })

      const url = `/${validUrlConvert(name)}-${id}/${validUrlConvert(sub.name)}-${sub._id}`

      navigate(url);
    }

    
    function handleScrollRight(){
      containerRef.current.scrollLeft +=200
    }

    function handleScrollLeft(){
      containerRef.current.scrollLeft -=200
    }
    
    async function fetchProductByCategory(){
        try {
          setLoading(true);    
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/get-product-by-category`, {
            method : "Post",
            headers : {
              'authorization' : localStorage.getItem('accessToken'),
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id : id
            })
          })

          const result = await response.json();
          if(result.success){
            setData(result.product)
          }
          
        } 
        catch (error) {
            toast.error(error)
        }
        finally{
            setLoading(false)
        }
      }

      useEffect(() => {
        fetchProductByCategory()
      }, [])
      
      const loadingCard = new Array(6).fill(null);
      
  return (
    <div>
        <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
          <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
          <div onClick={() => handleRedirectToSubcategoryPage(id,name)} className='text-green-600 hover:text-green-400' to={''}>See All</div>
        </div>
        <div className='relative flex items-center'>

          <div className='flex gap-4 md:gap-6 lg:gap:8 container mx-auto px-4 overflow-x-scroll scroll-smooth' ref={containerRef}>
            {
              loading &&
              loadingCard.map((_, index) => {
                return (
                  <CardLoading key={index + "Shimmer"}/>
                )
              })
            }
            {
              data.map((p, index) => {
                return (
                  <CardProduct data={p} key={index + "CardProduct"}/>
                )
              })
            }
          </div>

          <div className='w-full left-0 right-0 hidden container mx-auto px-2 absolute lg:flex justify-between'>

              <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg rounded-full text-lg p-2'>
                {<FaAngleLeft/>}
              </button>

              <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg rounded-full text-lg p-2'>
                {<FaAngleRight/>}
              </button>
              
          </div>
        </div>
    </div>
  )
}

export default CategoryWiseDisplayProduct