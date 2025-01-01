import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from '../asset/logo2.png'

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const allValue = Object.values(data).every((i) => i);

    function handleChange(e){
        const {name, value, password, confirmPassword} = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(data.password !== data.confirmPassword){
            toast.error("Password and Confirm Password is not same", {
                position : 'top-right'
            })
        }
        try{            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data),
            })
            const {error, message} = await response.json();
            if(error){
                toast.error(message);
                return;
            }
            toast.success(message);
            setData({
                name : "",
                email : "",
                password : "",
                confirmPassword : "",
            })
            navigate("/login");
        }
        catch(error){
            console.log(error);
        } 
    }

  return (
    <section className='mx-auto container w-full px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-bold text-center text-2xl'>Welcome To</p> <img src={logo2} alt="" />

            <form onSubmit={handleSubmit} className='flex flex-col mt-6 gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor="name">Name :</label>
                    <input
                        onChange={handleChange}
                        placeholder='Enter Your Name' 
                        type="text"
                        id='name' 
                        autoFocus
                        name='name'
                        value={data.name}
                        className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="email">Email :</label>
                    <input
                        onChange={handleChange}
                        placeholder='Enter Your Email' 
                        type="text"
                        id='email' 
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
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="confirm password">Confirm Password :</label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Confirm Password' 
                            type={ showConfirmPassword ? "text" : "password"}
                            id='confirmPassword' 
                            name='confirmPassword'
                            value={data.confirmPassword}
                            className='w-full outline-none'
                        />
                        <div className='cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {
                                showConfirmPassword ? <IoEye/> : <IoMdEyeOff/>
                            }
                        </div>
                    </div>
                </div>

                <button className={` ${allValue ?  "bg-green-800" : "bg-gray-600" } text-white py-2 rounded font-semibold my-3`}>Register</button>

            </form>
            <p>Already have a account? <Link className='font-semibold text-green-600' to={"/login"}>Login</Link> </p>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default Register