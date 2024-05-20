import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
export default function Order() {
  const getorder = async () => {
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, { headers: { Authorization: `Tariq__${token}` } });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const { data, isLoading } = useQuery('orders', getorder);
  if (isLoading) {
    return <div className='loading w-100   vh-100 z-3'><span className="loader "></span></div>

  }


  return (
    <div className='p-5'>
      <div className="title text-center position-relative ">
        <div className=" d-flex justify-content-center align-items-center ">
          <h2>Welcome</h2>
          <span className="position-absolute fs-3">MyOrder</span>
        </div>

      </div>

      <section className='order  w-100 py-5'>
        {data?.orders.length ? data?.orders.map((order, index) =>

          <div key={order._id}>
            <h2 className='bg-white d-inline  border border-3 border-black p-2'>order {index}</h2>
            <table className="table mt-5 mb border border-3 border-black" key={order._id}>
              <thead>
                <tr>
                  <th>address</th>
                  <th>createdAt</th>
                  <th>finalPrice</th>
                  <th>paymentType</th>
                  <th>phoneNumber</th>
                  <th>updatedAt</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.address}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.finalPrice}</td>
                  <td>{order.paymentType}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.updatedAt}</td>
                  <td>{order.status}</td>
                </tr>

              </tbody>
            </table>

          </div>
        ) : <h2>no Orders</h2>}




      </section>

    </div>

  )
}
