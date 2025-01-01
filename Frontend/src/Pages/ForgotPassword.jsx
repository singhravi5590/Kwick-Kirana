import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email : "",
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`, {
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
            navigate('/verify-otp', {
                state : {
                    email : data,
                }
            });
            setData({
                email : "",
            })
        }
        catch(error){
            console.log("error", error);
        } 
    }

  return (
    <section className='mx-auto container w-full px-2'>
        <div className='bg-white my-3 w-full max-w-lg mx-auto rounded p-7'>
            <p className='font-semibold '>Forgot Password</p>
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

                <button className={` ${allValue ?  "bg-green-800" : "bg-gray-600" } text-white py-2 rounded font-semibold my-2`}>Send OTP</button>

            </form>
            <p>Already have an account? <Link className='font-semibold text-green-600' to={"/login"}>Login</Link> </p>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default ForgotPassword