import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading';
import CardProduct from '../components/CardProduct';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, useParams } from 'react-router-dom';
import noDataImage from '../asset/nothing here yet.webp'

const SearchPage = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingArr = new Array(12).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  
  const searchText = params?.search?.slice(3);
  

  async function fetchSearchProduct(){
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/search-product`, {
        method : "Post",
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify({
          search : searchText,
          page : page,
          limit : 10,
        })
      })

      const result = await response.json();
      
      if(result.success){
        if(result.page == 1){
          setData(result.products);
        }
        else{
          setData((prev) => {
            return [
              ...prev, ...result.products
            ]
          })
        }
        setTotalPage(result.totalPage)
      }

      
    } 
    catch (error) {
      console.log(error);
      
    }
    finally{
      setLoading(false);
    }
  }

  function fetchMoreData(){
    if(totalPage > page){
      setPage((prev) => prev+1);
    }
  }

  useEffect(() => {
    fetchSearchProduct();
  }, [page])

  useEffect(() => {
    const time = setTimeout(() => {
      fetchSearchProduct();
    }, 300)


    return () => {
      clearTimeout(time)
    }
  }, [searchText])

  return (
    <section className='bg-gray'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Result : {data?.length}</p>

      <InfiniteScroll dataLength={data.length} hasMore={true} next={fetchMoreData} >
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>

          {
            data.map((d, index) => {
              return (
                <CardProduct key={index+"productData"} data={d} />
              )
            })
          }
          {
            loading && (
              loadingArr.map((_,index) => {
                return(
                  <CardLoading key={index+"loadingarr"}/>
                )
              })
            )
          }
        </div>
      </InfiniteScroll>
          {
            !data[0] && !loading && (
              <div className=' flex flex-col justify-center w-full items-center mx-auto'>
                <img 
                  src={noDataImage} 
                  alt="nodata" 
                  className='w-full h-full max-w-xs max-h-xs block'
                />
                <p className='font-semibold my-2'>No Data Found</p>
              </div>
            )
         }
    </div>  
    </section>
  )
}

export default SearchPage