import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import ProductCardAdmin from './ProductCardAdmin';
import { IoSearch } from "react-icons/io5";
import EditProduct from '../components/EditProduct';

const ProductAdmin = () => {

  const [productData , setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  async function fetchProduct(){
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/get-product`, {
        method : "Post",
        headers : {
            'authorization' : localStorage.getItem('accessToken'),
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({page : page,
          limit : 12,
          search : search
        })
    })
      
      const result = await response.json();
      if(result.success){
        setProductData(result.data);
        setTotalPageCount(result.totalNoPage)
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
  }, [page])

  function handleNext(){
    if(page !== totalPageCount){
      setPage((prev) => prev+1)
    }
  }
  
  function handlePrevious(){
    if(page != 1){
      setPage((prev) => prev-1)
    }
  }

  function handleChange(e){
    setSearch(e.target.value)
    setPage(1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProduct();
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [search])
  
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className='h-full flex items-center px-4 py-2 gap-3 bg-blue-50 border focus-within:border-primary-200 rounded'>
          <IoSearch size={25}/>
          <input 
            type="text"
            placeholder='Search Product Here'
            className=' h-full bg-transparent outline-none' 
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
      {
        loading ? <Loading/> : (
        <div className='p-4 bg-blue-50'>
          <div className='min-h-[55vh]'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 '>
              {
                productData.map((p, index) => {
                  return (
                      <ProductCardAdmin key={"productData"+index} fetchProduct={fetchProduct} data={p}/>
                  )
                })
              }
            </div>
          </div>
        <div className='flex justify-between my-4'>
          <button onClick={handlePrevious} className='border border-primary-100 px-4 py-1 hover:bg-primary-200'>Previous</button>
          <button>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border border-primary-100 px-4 py-1 hover:bg-primary-200'>Next</button>
        </div>
        
      </div>
        )
      }
      
    </section>
    
  )
}

export default ProductAdmin