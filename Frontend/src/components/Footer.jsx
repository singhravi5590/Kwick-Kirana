import React from 'react';
import { MdOutlineFacebook } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className='border-t p-4'>
      <div className='container mx-auto p-4 flex flex-col text-center gap-2 lg:flex-row lg:justify-between'>
        <p className=''>© All rights reserved 2024</p>
      <div className='flex items-center gap-4 justify-center text-2xl'>
        <a href="" className='hover:text-primary-100'><MdOutlineFacebook/></a>
        <a href="" className='hover:text-primary-100'><AiFillInstagram/></a>
        <a href="" className='hover:text-primary-100'><AiFillLinkedin/></a>
        <a href="" className='hover:text-primary-100'><RiTwitterXFill/></a>
      </div>
      </div>
    </footer>
  )
}

export default Footer