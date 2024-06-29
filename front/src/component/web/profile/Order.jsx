import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

export default function Order() {
  const getorder = async () => {
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order/userOrder`, {
        headers: { Authorization: `Rama__${token}` }
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  const { data, isLoading } = useQuery('orders', getorder);
  
  if (isLoading) {
    return (
      <div className='loading w-100 vh-100 z-3'>
        <span className="loader"></span>
      </div>
    );
  }
   
  return (
    <div className='userorder vh-100 overflow-auto bg-white'>
      <div className="title text-center position-relative">
        <div className="d-flex justify-content-center align-items-center">
          <h2>Welcome</h2>
          <span className="position-absolute fs-3">MyOrder</span>
        </div>
      </div>

      <section className='order text-center w-100 mt-5   px-5 '>
        <div className="table-container ">
          {data?.orders.length ? data?.orders.map((order, index) => (
            <div key={order._id}>
              <h2 className='bg-white d-inline border border-3 border-black p-2'>Order {index + 1}</h2>
              <table className="table my-5 mb border border-3 border-black text-center  ">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Created At</th>
                    <th>Final Price</th>
                    <th>Payment Type</th>
                    <th>Phone Number</th>
                    <th>Updated At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Address">{order.address}</td>
                    <td data-label="Created At">{order.createdAt}</td>
                    <td data-label="Final Price">{order.finalPrice}</td>
                    <td data-label="Payment Type">{order.paymentType}</td>
                    <td data-label="Phone Number">{order.phoneNumber}</td>
                    <td data-label="Updated At">{order.updatedAt}</td>
                    <td data-label="Status">{order.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )) : <h2>No Orders</h2>}
        </div>
      </section>
    </div>
  );
}
