import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import '../Orders/OrderStatus.css'
function OrderStatus() {
  const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const status=urlParams.get('status');
    
    const [orderStatus, setOrderStatus] = useState({
        
        status:status
     
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderStatus({
          ...orderStatus,
          [name]: value
        });
      };
      const handleSubmit = async (e) => {
  
        e.preventDefault();
        setLoader(true);
        const token = localStorage.getItem("UserToken");
       try {
        
          const token = localStorage.getItem('UserToken');
          const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/order/changeStatus/${id}`,orderStatus, {
            headers: { Authorization: `Rama__${token}` }
          });
       

        } catch (error) {
          console.log(error);
          setLoader(false); // Ensure the loader is turned off even if there's an error
        }
    finally{
        setLoader(false);
        navigate('/dashboard/Orders');

       }
       
      };
   
  return (
   <>
     <div className='statusignin flex flex-column'>
     <h1>Update Order Status</h1>
    <div className='container statusignin1'>
    
      <div className="sign statusForm">

      <form onSubmit={handleSubmit}>
        
        <label className="labelStatus">Change Order Status</label> 
        <select className="selectStatus" name="status" value={orderStatus.status} onChange={handleChange}>
         <option value="pending">Pending</option>
        <option value="cancelled">Cancelled</option>
        <option value="confirmed">Confirmed</option>
        <option value="onway">Onway</option>
        <option value="delivered">Delivered</option>
          </select>
    

        
    <button type='submit' className='btn btn-outline-success' disabled={loader?'disabled':''}>{!loader?'Change Status':'wait..'}</button>
    </form>
      </div>
 
    </div>

    
    </div>
   
   
   </>
  )
}

export default OrderStatus