import React from 'react'
import Usermenu from '../components/Usermenu'
import { IoCloseCircleSharp } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2'>
        <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto px-5'>
            <IoCloseCircleSharp size={25}/>
        </button>
        <div className='container mx-auto pb-3 px-5'>
            <Usermenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile