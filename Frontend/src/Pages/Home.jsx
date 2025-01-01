import React from 'react'
import banner from '../asset/banner.jpg'
import mobileBanner from '../asset/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import validUrlConvert from '../utils/validUrlConvert'
import {useNavigate, Link} from 'react-router-dom'
import CategoryWiseDisplayProduct from '../components/CategoryWiseDisplayProduct'
 
const Home = () => {
  const {allCategory, loading, allsubCategory} = useSelector((store) => store.products)
  const navigate = useNavigate();

  function handleRedirectProductListPage(id, name){
    const subCategory = allsubCategory?.find((sub) => {
      const filterData = sub?.category.some(c => {
        return c._id == id
      })
      return filterData ? true : null
    })

    const url = `/${validUrlConvert(name)}-${id}/${validUrlConvert(subCategory.name)}-${subCategory._id}`
    navigate(url);
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner &&  'animate-pulse my-2'}`}>
          <img 
            src={banner} 
            alt="banner"
            className=' w-full h-full lg:block hidden' 
          />
          <img 
            src={mobileBanner} 
            alt="mobileBanner" 
            className='lg:hidden w-full h-full'
          />
        </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-5 lg:grid-cols-10 gap-2'>
        {
          loading ? (
            new Array(20).fill(null).map((c, index) => {
              return(
                <div key={index+"shimmer"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'></div>
                </div>
              )
            })
          ) : (
            allCategory?.map((cat, index) => {
              return (
                <div key={index+"shimmer"} className='w-full h-full' onClick={() => handleRedirectProductListPage(cat?._id, cat?.name)}>
                 <div>
                    <img 
                      src={cat?.image} 
                      alt={cat?.name}
                      className='h-full w-full object-scale-down'
                    />
                  </div>
                </div>
              )
            })
          )
         
        }
      </div>

      {/* Display Category Product */}
      {
        allCategory.map((cat, index) => {
          return (
            <CategoryWiseDisplayProduct key={index + "categoryWiseProduct"} id={cat?._id} name={cat?.name}/>
          )
        })
      }
      
    </section>
  )
}

export default Home