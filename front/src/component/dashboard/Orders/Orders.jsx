import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderStatus.css"
function Orders() {
  const [loader, setLoader] = useState(true);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try{
      const token = localStorage.getItem('UserToken');
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order/all`,
    {headers:{Authorization: `Rama__${token}`}});
    console.log(data);
    setOrders(data.orders);
    setLoader(false);
    }catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
    {loader == false ? (
      <div className="usersTabel col " style={{
        height: 550, backgroundColor: " #e7eff1" }
   }>
         <div class="table-responsive" style={{
         height: 700, backgroundColor: " #e7eff1" }
    }> 
        <table className="table table-striped Orderss" border={6} style={{
         height:700, backgroundColor: " #e7eff1" }
    }>
          <thead>
            <th scope="col" className="text-center">
              Order ID
            </th>
            <th scope="col" className="text-center">
              User ID
            </th>
            <th scope="col" className="text-center">
            Address
            </th>
            <th scope="col" className="text-center">
              Final Price

            </th>
            <th scope="col" className="text-center">
            Phone Number
            </th>
            <th scope="col" className="text-center">
            Order Products
            </th>
            <th scope="col" className="text-center">
            Order Status
            </th>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr  key={order._id}>
                <td>
                  <div className="text-center">
                    <span>{order._id}</span>
                  </div>
                </td>
                <td>
                  <div className="text-center">
                    <span>{order.userId}</span>
                  </div>
                </td>
                <td>
                  <div className="text-center">
                    <span>{order.address}</span> 
                  </div>
                </td>
                <td>
                <div className="text-center">
                    <span>{order.finalPrice} $</span> 
                  </div>
              
                </td>
                <td>
                <div className="text-center">
                    <span>{order.phoneNumber}</span> 
                  </div>
              
                </td>
                <td>
                    <div className="text-center updateUser">
                      <Link
                        to={`/dashboard/OrderProduct/?id=${order._id}`}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" fill="#86d9f5"/>
</svg>
                      </Link>
                    </div>
                  </td>
                <td>
                  <div className="text-center divstatus">
                    <Link
                      className="btn-light btnStatus"
                      to={`/dashboard/OrderStatus/?id=${order._id}&&status =${order.status}`}
                  
                      >
                        {order.status}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
                <tr>
                  <td className="bg-light" colSpan={7}></td>
                </tr>
              </tfoot>
        </table>
        </div>
    
      </div>
    ) : (
      <div className="loading w-100   vh-100 z-3">
        <span className="loader "></span>
      </div>
    )}
  </>
  )
}

export default Orders