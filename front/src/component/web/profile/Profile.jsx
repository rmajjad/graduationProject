
import { Link, Outlet } from 'react-router-dom';
import SideBar from './SideBar.jsx';
export default function Profile() {
  return (
    <aside className='profile d-flex'>
        
       
        <SideBar className="py-5 "/>
              <Outlet/>
    </aside>
   
  )
}
