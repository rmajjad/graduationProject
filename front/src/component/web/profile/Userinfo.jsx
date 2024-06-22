import React, { useContext } from 'react'
import UserContex from '../context/User';

export default function Userinfo() {
    let {userData,isLoading} = useContext(UserContex);
    if(isLoading){
        return <div className='loading w-100   vh-100 z-3 '><span className="loader "></span></div>
    }
    
  return (
    <div className='p-5'>
    <h2 className='p-5'>{userData.userName}</h2>
    </div>
  )
}
