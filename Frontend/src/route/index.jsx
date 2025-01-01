import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SearchPage from "../Pages/SearchPage";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import OtpVerify from "../Pages/OtpVerify";
import ResetPassword from "../Pages/ResetPassword";
import UserMenuMobile from "../Pages/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../Pages/Profile";
import Address from "../Pages/Address";
import ProductAdmin from "../Pages/ProductAdmin";
import UploadProducts from "../Pages/UploadProducts";
import Category from "../Pages/Category";
import Subcategory from "../Pages/Subcategory";
import AdminPermission from "../layout/AdminPermission";
import ProductList from "../Pages/ProductList";
import ProductDisplayPage from "../Pages/ProductDisplayPage";
import DisplayCart from "../Pages/DisplayCart";
import Checkout from "../Pages/Checkout";
import Success from "../Pages/Success";
import CancelPayment from "../Pages/CancelPayment";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "/search",
                element : <SearchPage/>
            },
            {
                path : '/login',
                element : <Login/>,
            },
            {
                path : '/register',
                element : <Register/>,
            },
            {
                path : '/forgot-password',
                element : <ForgotPassword/>
            },
            {
                path : '/verify-otp',
                element : <OtpVerify/>
            },
            {
                path : '/reset-password',
                element : <ResetPassword/>
            },
            {
                path : 'user',
                element : <UserMenuMobile/>
            },
            {
                path : '/dashboard',
                element : <Dashboard/>,
                children : [
                    {
                        path : 'profile',
                        element : <Profile/>
                    },
                    // {
                    //     path : 'orders',
                    //     element : <Orders/>
                    // },
                    {
                        path : 'address',
                        element : <Address/>
                    },
                    {
                        path : 'products',
                        element : <AdminPermission> <ProductAdmin/> </AdminPermission> 
                    },
                    {
                        path : 'upload-products',
                        element : <AdminPermission> <UploadProducts/> </AdminPermission>
                    },
                    {
                        path : 'category',
                        element : <AdminPermission> <Category/> </AdminPermission>
                    },
                    {
                        path : 'subcategory',
                        element : <AdminPermission> <Subcategory/> </AdminPermission>
                    }
                ]
            },
            {
                path : ':category',
                children : [
                    {
                        path : ':subcategory',
                        element : <ProductList/>
                    }
                ]
            },
            {
                path : 'product/:productid',
                element : <ProductDisplayPage/>
            },
            {
                path : '/cart',
                element : <DisplayCart/>
            },
            {
                path : '/checkout',
                element : <Checkout/>
            },
            {
                path : '/success',
                element : <Success/>
            },
            {
                path : '/cancel',
                element : <CancelPayment/>
            }
        ]
    },    
])

export default router;