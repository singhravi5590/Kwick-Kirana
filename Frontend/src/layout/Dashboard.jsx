import React from 'react'
import Usermenu from '../components/Usermenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
                <div className='py-4 sticky max-h-[calc(100vh-96px)] top-24 overflow-auto hidden lg:block border-r'>
                    <Usermenu/> 
                </div>


                <div className='bg-white min-h-[76vh]'>
                    <Outlet/>
                </div>
            </div>
    </section>
  )
}

export default Dashboard