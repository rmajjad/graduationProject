import React from 'react'
import Navbar from '../component/web/navbar/Navbar.jsx'
import Footer from '../component/web/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import './Layouts.css'
export default function Layouts() {
    

    return (
        <>
            <Navbar />
            <Outlet className="mt-5" />
            <Footer/>
        </>
    )
}
