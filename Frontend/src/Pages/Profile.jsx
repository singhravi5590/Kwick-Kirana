import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileEditAvatar from '../components/UserProfileEditAvatar';
import { setUserDetais } from '../store/UserSlice';

const Profile = () => {

  const user = useSelector((store) => store.user);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name : user.name,
    email : user.email,
    mobile : user.mobile,
  })

  useEffect(() => {
    setUserData({
      name : user.name,
      email : user.email,
      mobile : user.mobile,
    })
  },[user])

  function handleOnChange(e){
    const {value, name} = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name] : value,
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
    try
    {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update-user`, {
        method : "PUT",
        headers: {
          'authorization' : localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(userData)
      })
      const result = await response.json();
      dispatch(setUserDetais(result.data))
    }
    catch(error){
      toast.error(error)
    }
    finally{
      setLoading(false);
    }

  }

  return (
    <div>

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
      <button onClick={() => setOpenProfileEdit(!openProfileEdit)} className='text-sm w-20 border border-primary-100 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>

        {
          openProfileEdit && (<UserProfileEditAvatar close={() => setOpenProfileEdit(!openProfileEdit)}/>)
        }

        <form onSubmit={handleSubmit} className='my-4 flex flex-col gap-4'>
          <div className='flex flex-col gap-3'>
            <label>Name</label>
            <input
                    type='text'
                    placeholder='Enter your name' 
                    className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
                    value={userData.name}
                    name='name'
                    onChange={handleOnChange}
                    required
            />
            <label>Email</label>
            <input
                    type='text'
                    placeholder='Enter your email' 
                    className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
                    value={userData.email}
                    name='email'
                    onChange={handleOnChange}
                    required
            />
            <label>Mobile</label>
            <input
                    type='text'
                    id='mobile'
                    placeholder='Enter your mobile' 
                    className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
                    value={userData.mobile}
                    name='mobile'
                    onChange={handleOnChange}
                    required
                />
          </div>
          <button className='border py-2 px-4'>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

    </div>
  )
}

export default Profile