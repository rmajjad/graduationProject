import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/User.jsx';
import './SideBar.css'
function SideBar() {
  let { userData } = useContext(UserContext);

  return (
    <div className=' user_bar main vh-100 py-5'>
      <nav className="navbar   navbar-expand-lg bg-body-tertiary1 partnav">
        <div>
          <h2 className=''>{userData?.userName}</h2>
        </div>
        <div className='flex-row user'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" fill="#0074d9"/>
            </svg>
          </div>
          <NavLink className="nav-item nav-link " aria-current="page" to=''>info</NavLink>
        </div>
        <div className='flex-row user'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" fill="#0074d9"/>
            </svg>
          </div>
          <NavLink className="nav-item nav-link" to='order'>Order</NavLink>
        </div>
        <div className='flex-row user'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0074d9" className="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
          </svg>
          <NavLink className="nav-item nav-link" to='contact'>Contact</NavLink>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
