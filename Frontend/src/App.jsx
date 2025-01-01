import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetais } from "./store/UserSlice";
import { fetchUserdetails } from "./utils/fetchUser";
import { setCategory, setSubcategory, setLoading } from "./store/ProductSlice";
import { handleAddItemCart } from "./store/CartSlice";
import GlobalProvider from "./provider/GlobalProvider";
import toast, { Toaster } from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import CartMobile from "./components/CartMobile";
import { addAddressList } from "./store/AddressSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  async function fetchFunction(){
    const result = await fetchUserdetails();
    dispatch(setUserDetais(result.data))
  }

  async function fetchCategory(){
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/get`, {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
          },
    })
      const result = await response.json();
      dispatch(setCategory(result.data));
      // setCategoryData(result.data);
    }
    catch(error){
      toast.error(error);
    }
    finally{
      dispatch(setLoading(false))
    }
  }

  async function fetchSubCategory(){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subcategory/get`, {
        method : "Post",
        headers : {
            'Content-Type' : 'application/json'
          },
    })
      const result = await response.json();
      dispatch(setSubcategory(result.data));
    }
    catch(error){
      toast.error(error);
    }
    finally{
    }
  }

  async function fetchAddress(){
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/address/get-address`, {
        method : "Get",
        headers : {
          'content-type' : 'application/json',
          'authorization' : localStorage.getItem('accessToken')
        }
      })
      
      const result = await response.json();
      if(result.success){
        dispatch(addAddressList(result.data))
      }
    } 
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchFunction();
    fetchSubCategory();
  }, [])



  return (
    <>
    <GlobalProvider>
      <Header/>
      <main className="min-h-[78vh]">
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
      {
        // (location.pathname !== '/checkout') && (<CartMobile/>)
      }
      
    </GlobalProvider>
    </>
    
  )
}

export default App
