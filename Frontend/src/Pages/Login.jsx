import React, { useState, useEffect } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetais } from '../store/UserSlice';
import { fetchUserdetails } from '../utils/fetchUser';
import logo2 from '../asset/logo2.png'

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email : "",
        password : "",
    })

    const allValue = Object.values(data).every((i) => i);

    function handleChange(e){
        const {name, value} = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data),
            })
            const result = await response.json();
            console.log(result);
            localStorage.setItem('accessToken', result.data.accessToken);
            localStorage.setItem('refreshToken', result.data.refreshToken);

            const UserData = await fetchUserdetails();
            dispatch(setUserDetais(UserData.data))

            const {error, message} = result;
            if(error){
                toast.error(message);
                return;
            }
            toast.success(message);
            setData({
                email : "",
                password : "",
            })
            navigate("/");
        }
        catch(error){
            toast.success(error);
        } 
    }

  return (
    <section className='mx-auto container w-full px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

            <p className='font-bold text-center text-2xl'>Welcome To</p> <img src={logo2} alt="" />

            <form onSubmit={handleSubmit} className='flex flex-col mt-6 gap-4'>

                <div className='flex flex-col'>
                    <label htmlFor="email">Email :</label>
                    <input
                        onChange={handleChange}
                        placeholder='Enter Your Email' 
                        type="text"
                        id='email' 
                        autoFocus
                        name='email'
                        value={data.email}
                        className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="password">Password :</label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Password' 
                            type={ showPassword ? "text" : "password"}
                            id='password' 
                            name='password'
                            value={data.password}
                            className='w-full outline-none'
                        />
                        <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <IoEye/> : <IoMdEyeOff/>
                            }
                        </div>
                    </div>
                    <Link className='block ml-auto hover:text-primary-100' to={'/forgot-password'}>Forgot Password?</Link>
                </div>

                <button className={` ${allValue ?  "bg-green-800" : "bg-gray-600" } text-white py-2 rounded font-semibold my-2`}>Login</button>

            </form>
            <p>Not have an account? <Link className='font-semibold text-green-600' to={"/register"}>Register</Link> </p>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default Login