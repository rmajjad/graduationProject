import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/web/navbar/Navbar.jsx'
import Footer from '../component/web/footer/Footer.jsx'
import SideBar from '../component/dashboard/SideBar/SideBar.jsx'

export default function DashboardLayout() {
  return (

    <>
      <Navbar />
      <div className='d-flex'>


        <SideBar />
        <Outlet />
      </div>

      <Footer />




    </>
  )
}
