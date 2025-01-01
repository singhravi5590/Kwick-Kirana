import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/CartSlice";
import toast from "react-hot-toast";
import { discountedPrice } from "../utils/discountPrice";
import { addAddressList } from "../store/AddressSlice";


export const GlobalContext = createContext(null);

export const useGLobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
  const {cart} = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountPrice, setNotDiscountPrice] = useState(0);

    const dispatch = useDispatch();

    async function fetchCartItems(){
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/get`, {
            method : "Get",
            headers : {
              'content-type' : 'application/json',
              'authorization' : localStorage.getItem('accessToken'),
            }
          })
    
          const result = await response.json();
          dispatch(handleAddItemCart(result.cartItems))      
        } 
        catch (error) {
          console.log(error);  
        }
    }

    async function updateCartQty(id, quantity){
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update-qty`, {
          method : 'Put',
          headers : {
            'content-type' : 'application/json',
            'authorization' : localStorage.getItem('accessToken')
          },
          body : JSON.stringify({
            _id : id,
            quantity : quantity
          })
        })
        

        const result = await response.json();
        console.log(result);
        if(result.success){
          toast.success(result.message);
          fetchCartItems();
        }
      } 
      catch (error) {
        console.log(error);
      }
    }

    async function deleteCartItem(id){
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/delete-item`, {
          method : 'Delete',
          headers : {
            'content-type' : 'application/json',
            'authorization' : localStorage.getItem('accessToken')
          },
          body : JSON.stringify({_id : id})
        })

        const result = await response.json();
        if(result.success){
          toast.success(result.message);
          fetchCartItems();
        }  
      } 
      catch (error) {
        console.log(error);
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

    function handleLogout(){
      localStorage.clear();
      dispatch(handleAddItemCart([]))
    }
      useEffect(() => {
        fetchCartItems();
        fetchAddress();
      }, [user])

      useEffect(() => {
        const quantity = cart.reduce((prev, curr) => {
          return prev + curr.quantity
        },0)

        const tPrice = cart.reduce((prev, curr) => {
          return prev + (discountedPrice(curr.productid?.price, curr.productid?.discount) * curr?.quantity);
        }, 0)

        const withoutDisP = cart.reduce((prev, curr) => {
          return prev + (curr?.productid?.price * curr.quantity)
        }, 0)

        
        
        
        setTotalQty(quantity);
        setTotalPrice(tPrice);
        setNotDiscountPrice(withoutDisP)


        
      },[cart])
    return (
        <GlobalContext.Provider value={{fetchCartItems, updateCartQty, deleteCartItem, totalPrice, totalQty, notDiscountPrice, handleLogout, fetchAddress}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;
