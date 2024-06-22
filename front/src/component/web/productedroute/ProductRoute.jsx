import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProductRoute({children}) {
    if(localStorage.getItem("UserToken")==null){
      return  <Navigate   to='/login' />
    }

    return children
       
  
}
