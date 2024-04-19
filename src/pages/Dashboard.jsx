import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
const Dashboard = () => {
  return (
    <div className='relative flex'>
        <Sidebar/>
        <div className=" w-full h-[calc(100vh-3.5rem)] overflow-auto">
            <div className="mx-auto w-11/12 py-10">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard