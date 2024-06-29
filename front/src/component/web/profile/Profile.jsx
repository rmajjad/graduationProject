import { Link, Outlet } from 'react-router-dom';
import SideBar from './SideBar.jsx';
import  './profile.css';
export default function Profile() {
  return (
    <aside className='profilePage d-flex'>
        
       
        <SideBar className="py-5  "/>

        <Outlet/>
    </aside>
   
  )
}
