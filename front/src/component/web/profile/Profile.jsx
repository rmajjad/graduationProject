import React, { useContext } from 'react'
import UserContex from '../context/User';
import './SideBar.css';
import { Link, Outlet } from 'react-router-dom';
import SideBar from './SideBar.jsx';
export default function Profile() {

  return (
    <aside className='profile d-flex py-5'>


      <SideBar />
      <Outlet />
    </aside>

  )
}
