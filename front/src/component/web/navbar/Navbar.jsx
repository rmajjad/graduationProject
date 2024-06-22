import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../context/User';
import {CartContex} from '../context/Cart.jsx';
import './navbar.css';

export default function Navbar() {
  const { UserToken, setUserToken, userData } = useContext(UserContext);
  const { count } = useContext(CartContex );
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('UserToken');
    setUserToken(null);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.basic_navbar');
      if (window.scrollY > navbar.offsetHeight) {
        navbar.style.backgroundColor = 'white';
        navbar.style.position = 'fixed'
        navbar.style.padding = '5px 0'; 
      } else {
        navbar.style.position = 'static'
        navbar.style.padding = '10px 0'; 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='basic_navbar'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img src='/img/logo.png' alt='Logo' className='nav_logo'/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 navUser">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/products'>Product</NavLink>
              </li>
              {UserToken && (
                <>
                  {userData?.role === 'Admin' && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to='/dashboard'>Admin</NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/chat">
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" className="bi bi-robot" viewBox="0 0 16 16">
                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
                      </svg>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link cart position-relative" to="/cart">
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-cart-plus-fill z-3" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
                      </svg>
                      <span className="position-absolute justify-content-center align-items-center rounded-circle z-1">{count}</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <ul className='navbar-nav me-auto'>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {UserToken != null ? userData?.userName : 'Account'}
                </a>
                <ul className="dropdown-menu">
                  {UserToken == null ? (
                    <>
                      <li><Link className="dropdown-item" to='/register'>Register</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to='/login'>Login</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link className="dropdown-item" to='/profile'>Profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
