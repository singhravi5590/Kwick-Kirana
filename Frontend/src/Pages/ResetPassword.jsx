import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";


const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        email : "",
        password : "",
        confirmPassword : ""
    })

    const allValue = Object.values(data).every((i) => i);

    useEffect(() => {
        if(!(location?.state?.data?.success)){
            navigate('/')
        }

        if(location?.state?.email){
            setData((prev) => {
                return {
                    ...prev,
                    email : location?.state?.email,
                }
            })
        }
    }, [])

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

        if(data.confirmPassword !== data.password){
            toast.error("New Password and Confirm password is not same");
        }

        try{            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password`, {
                method : "PUT",
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
            navigate('/login');
            setData({
                email : "",
                password : "",
                confirmPassword : ""
            })
        }
        catch(error){
            console.log(error);
        } 
    }


  return (
    <section className='mx-auto container w-full px-2'>
        <div className='bg-white my-3 w-full max-w-lg mx-auto rounded p-7'>
            <p className='font-semibold '>Enter Your Password</p>
            <form onSubmit={handleSubmit} className='flex flex-col mt-6 gap-4'>

            <div className='flex flex-col'>
                    <label htmlFor="password">New Password :</label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Password' 
                            type={ showPassword ? "text" : "password"}
                            id='password' 
                            autoFocus
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
                    <label htmlFor="ConfirmPassword">Confirm Password :</label>
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
                        <div className='cursor-pointer' onClick={() =>                setShowConfirmPassword(!showConfirmPassword)}>
                            {
                                showConfirmPassword ? <IoEye/> : <IoMdEyeOff/>
                            }
                        </div>
                    </div>
            </div>

            <button className={` ${allValue ?  "bg-green-800" : "bg-gray-600" } text-white py-2 rounded font-semibold my-2`}>Change Password</button>

            </form>
            <p>Already have an account? <Link className='font-semibold text-green-600' to={"/login"}>Login</Link> </p>
        <ToastContainer/>
        </div>
    </section>
  )
}

export default ResetPassword