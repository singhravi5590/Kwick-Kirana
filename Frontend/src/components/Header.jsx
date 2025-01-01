import React, { useContext, useEffect, useState } from 'react'
import logo2 from '../asset/logo2.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Usermenu from './Usermenu';
import { displayPriceInRuppee } from '../utils/displayPrice';
import { GlobalContext, useGLobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {

  const [isMobile] = useMobile();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const isSearchPage = location.pathname === "/search";
  const {cart} = useSelector((store) => store.cart);
  const {totalPrice, totalQty} = useGLobalContext();
  const [openCartPage, setOpenCartPage] = useState(false);
  
  const redirectToLoginPage = () => {
    navigate('/login')
  }

  function closeUserMenu(){
    setOpenUserMenu(false);
  }

  function handleMobileUser(){
    if(!user._id){
      navigate('/login')
      return
    }

    navigate('/user');
  }

  return (
    <header className='lg:h-20 h-24 sticky z-40 top-0 lg:shadow-md flex  flex-col justify-center gap-1 bg-white'>

      {
        !(isSearchPage && isMobile) && (
          <div className='container flex mx-auto items-center px-4 justify-between'>

            <div className='h-full'>
                <Link to={'/'} className='h-full flex items-center justify-center'>
                  <img 
                    src={logo2} 
                    alt="logo"
                    width={300}
                    height={100}
                    className='hidden lg:block'
                    />
                  <img 
                    src={logo2} 
                    alt="logo"
                    width={200}
                    height={100}
                    className='lg:hidden'
                    />
                </Link>
            </div>

            <div className='hidden lg:block'>
              {<Search/>}
            </div>

          <div>
            {/* user icon only displays in mobile version */}
            <button className='text-slate-600 lg:hidden' onClick={handleMobileUser}>
             {FaCircleUser({size : 26})}
            </button>
            
            {/* this is displays in desktop version */} 
            <div className='hidden lg:flex gap-10 items-center'>
              {
                user?._id ? (
                  <div className='relative'>
                    <div onClick={() => setOpenUserMenu(!openUserMenu)} className='flex items-center gap-1 cursor-pointer'>
                      <p>Account</p>
                      {
                        openUserMenu ? <GoTriangleDown size={25}/> : <GoTriangleUp size={25}/>
                      } 
                      
                    </div>
                    {
                      openUserMenu && (
                      <div className='absolute right-0 top-12'>
                        <div className='bg-white rounded p-4 min-w-52 shadow-lg'>
                          <Usermenu close={() => setOpenUserMenu(!openUserMenu)}/>
                        </div>
                      </div>
                      )
                    }                    
                  </div>
                ) : (
                  <div>
                    <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                  </div>
                )
              }
              <button onClick={() => setOpenCartPage(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 text-white rounded'>
                <div className='animate-bounce'>
                  <MdShoppingCart size={26}/>
                </div>
                <div className='font-semibold'>
                  {
                    cart[0] ?
                    (<div> 
                      <p>{totalQty} Items</p> 
                      <p>{displayPriceInRuppee(totalPrice)}</p>

                    </div>)
                    :   
                    (<p>My Cart</p>)
                  }
                </div>
              </button>
            </div>
          </div>
        </div>
        )
      }
      

      <div className='container mx-auto px-2 lg:hidden'>
        <Search/>
      </div>

      {
        openCartPage && (<DisplayCartItem close={() => setOpenCartPage(false)} />)
      }

    </header>
  )
}

export default Header