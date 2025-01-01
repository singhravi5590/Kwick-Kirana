import React from 'react'
import { useSelector } from 'react-redux'

const AdminPermission = ({children}) => {
    const user = useSelector((store) => store.user);
  return (
    <>
        {
            user.role == "Admin" ? (children) : <p className='text-red-600 bg-red-100 p-4'>Do not have Permission</p>
        }
    </>
  )
}

export default AdminPermission