import React, { useEffect, useRef, useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerify = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(['', '', '', '', '', '']);
    const inputRef = useRef([]);
    const location = useLocation();
    const allValue = data.every((i) => i);

    useEffect(() => {
        if(!location?.state?.email){
            navigate('/forgot-password');
        }
    } ,[])


    async function handleSubmit(e){
        const bodyData = {
            email : location?.state?.email?.email,
            otp : data.join("")
        }
        e.preventDefault();
        try{            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/verify-forgot-password-otp`, {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(bodyData),
            })
            const result = await response.json();
            const {error, message} = result;
            if(error){
                toast.error(message);
                return;
            }
            toast.success(message);
            navigate("/reset-password", {
                state : {
                    data : result,
                    email : location?.state?.email?.email
                }
            });
            setData(["", "", "", "", "", ""]);
        }
        catch(error){
            console.log(error);
        } 
    }

  return (
    <section className='mx-auto container w-full px-2'>
        <div className='bg-white my-3 w-full max-w-lg mx-auto rounded p-7'>
            <p className='font-semibold '>OTP Verification</p>
            <form onSubmit={handleSubmit} className='flex flex-col mt-6 gap-4'>

                <div className='flex flex-col'>
                    <label htmlFor="otp">Enter You OTP :</label>
                    <div className='flex items-center gap-2 justify-between mt-3'>
                        {
                            data.map((ele, index) => (
                                <input
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        let newData = [...data];
                                        newData[index] = value;
                                        setData(newData);

                                        if(value && index < 5){
                                            inputRef.current[index+1].focus();
                                        }
                                    }}
                                    ref={(ref) => {
                                        inputRef.current[index] = ref;
                                        return ref;
                                    }}
                                    key={index}
                                    maxLength={1}
                                    type="text"
                                    id='otp' 
                                    className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center'
                                />
                            ))
                        }
                    </div>
                    
                </div>

                <button className={` ${allValue ?  "bg-green-800" : "bg-gray-600" } text-white py-2 rounded font-semibold my-2`}>Verify OTP</button>

            </form>
            <p>Already have an account? <Link className='font-semibold text-green-600' to={"/login"}>Login</Link> </p>
        </div>
        <ToastContainer/>
    </section>
  )
}

export default OtpVerify