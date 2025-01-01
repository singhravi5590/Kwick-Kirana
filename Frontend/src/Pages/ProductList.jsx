import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import validUrlConvert from '../utils/validUrlConvert'


const ProductList = () => {
  const params = useParams();
  const {allsubCategory} = useSelector((store) => store.products)
  
  
  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subcategory.split("-").slice(-1)[0]

  const subCategorylength = params.subcategory.split("-").length;
  const subCategoryName = params.subcategory.split("-").slice(0, subCategorylength-1).join(" ")

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  async function fetchProductData(){
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product//get-product-by-category-and-subcategory`, {
        method : "Post",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({
          categoryId,
          subCategoryId
        })
      }) 

      const result = await response.json();
      if(result.success){
        if(result.page == 1){
          setData(result.data);
        }
        else{
          setData([...data, ...result.data])
        }
        setTotalPage(result.totalCount)
      }
    } 
    catch (error) {
      toast.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [params])

  useEffect(() => {
    const sub = allsubCategory.filter((s) => {
      const filter = s.category.some((el) => {
        return el._id == categoryId
      })

      return filter ? filter : null
    })

    setDisplaySubCategory(sub)
  }, [params, allsubCategory])
  

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[270px,1fr] sticky top-24 lg:top-20'>
        {/* Subcategory */}
        <div className='min-h-[88vh] p-2 grid gap-2 max-h-[88vh] overflow-y-scroll lg:py-4'>
          {
            displaySubCategory.map((s, index) => {
              const link = `/${validUrlConvert(s?.category[0]?.name)}-${s.category[0]?._id}/${validUrlConvert(s?.name)}-${s?._id}`
              return (
                <Link key={index + "dsp"} to={link} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
                >
                  <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border' >
                    <img
                      src={s.image}
                      alt='subCategory'
                      className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                    />
                  </div>
                  <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>

        {/* Product */}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

          <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
              {
                data.map((p, index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={index + "Product"}
                    />
                  )
                })
              }
            </div>
          </div>

            {
              loading && (
                <Loading/>
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductList