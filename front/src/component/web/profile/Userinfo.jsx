import React, { useContext } from 'react';
import UserContext from '../context/User';
import './SideBar.css';

export default function UserInfo() {
  let { userData, isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <div className='loading-container'>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className='user-info'>
      <div className='user-card'>
        <h1>User Name</h1>
        <h2>{userData.userName}</h2>
      </div>
    </div>
  );
}
