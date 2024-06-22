import { RouterProvider } from "react-router-dom";
import { router } from "./layouts/Router.jsx";
import React, { useContext, useEffect } from "react";
import UserContex from "./component/web/context/User.jsx";
import { CartContex } from "./component/web/context/Cart.jsx";
export default function App(){
  let {setUserToken} = useContext(UserContex);
  let{getcountCartContext} = useContext(CartContex);
  useEffect(()=>{
    if(localStorage.getItem("UserToken") != null){
      setUserToken(localStorage.getItem("UserToken"));
      getcountCartContext();
    }
  },[])
  return (
      <RouterProvider router={router} />
    )
}
