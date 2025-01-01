import React, { useState } from 'react'
import {FaUserCircle} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAvatar } from '../store/UserSlice';
import { IoCloseCircleSharp } from "react-icons/io5";

const UserProfileEditAvatar = ({close}) => {
    const user = useSelector((store) => store.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function handleSubmit(e){
        e.preventDefault();
    }

    async function handleUploadAvatar(e){
        const file = e.target.files[0];
        if(!file){
            return;
        }
        const formData = new FormData();

        formData.append('avatar', file);

        try{
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/upload-avatar`,{
                method : "PUT",
                headers : {
                    'authorization' : localStorage.getItem('accessToken'),
                  },
                body : formData,
            })
            const result = await response.json();
            dispatch(updateAvatar(result.data));
        }
        catch(error){
            toast.error(error);
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 p-4 flex justify-center items-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center'>

            <button onClick={close} className='block ml-auto w-fit text-neutral-800'>
                <IoCloseCircleSharp size={25}/>
            </button>

            <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
            user?.avatar ? (
                <img 
                src={user.avatar} 
                alt={user.name}
                className='w-full h-full object-center' 
                />
            ):(
                <FaUserCircle size={60}/>
            )
            }
            </div>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="uploadProfile">
                <div className='border hover:bg-secondary-200 bg-primary-100 border-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer'>
                    {
                        loading ? "Loading..." : "Upload"
                    }
                </div>
                </label>
                <input
                    onChange={handleUploadAvatar} 
                    type="file"
                    id='uploadProfile'
                    className='hidden' 
                />
            </form>

        </div>
    </section>
  )
}

export default UserProfileEditAvatar

