import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

 const UserContex = createContext();
export default  UserContex;

export  function UserContexProvider({children}) {
    const [UserToken,setUserToken] = useState(null);
    const [userData,setUserData] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
   

    const getUserData = async ()=>{
      if(UserToken){
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/users/userData`,{headers:{authorization:`Rama__${UserToken}`}})
        setUserData(data.user);
        console.log(data);
        setIsLoading(false);
      }
      else{
        return <div className='loading w-100   vh-100 z-3'><span className="loader "></span></div>
      }
    }
    useEffect(()=>{
      getUserData();
    },[UserToken])
  return <UserContex.Provider value={{UserToken,setUserToken,userData,setUserData,isLoading,setIsLoading}} >
       {children}
    </UserContex.Provider>
  
}
