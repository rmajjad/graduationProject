import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderProduct() {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const getOrderProducts = async () => {
    try {
      const token = localStorage.getItem('UserToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order/all`, {
        headers: { Authorization: `Rama__${token}` }
      });

      // Filter orders by userId and gather all products
      const userOrders = data.orders.filter(order => order._id === id);
      const allProducts = userOrders.flatMap(order => order.products);
    

      console.log(allProducts);

      setProducts(allProducts);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false); // Ensure the loader is turned off even if there's an error
    }
  };

  useEffect(() => {
    getOrderProducts();
  }, [id]); // Include `id` in the dependency array if it's used in the function



  return (
    <>
    {loader == false ? (
      <div className="usersTabel col" style={{
         backgroundColor: " #e7eff1" }
   }>
    <div class="table-responsive" style={{
         height: 700, backgroundColor: " #e7eff1" }
    }> 
        <table className="table table-striped" border={6}>
          <thead>
          <th scope="col" className="text-center">
              Product Image
            </th>
            <th scope="col" className="text-center">
              Product Name
            </th>
            <th scope="col" className="text-center">
              Product ID
            </th>
            <th scope="col" className="text-center">
            Product Quantity

            </th>
            <th scope="col" className="text-center">
              Product Price

            </th>
           
            </thead>
          <tbody>
            {products?.map((product) => (
              <tr  key={product.productId}>
                 <td>
                    <div className="text-center cateimg">
                      <img src={product.mainImage.secure_url} />
                    </div>
                  </td>
                <td>
                  <div className="text-center">
                    <span>{product.productName}</span>
                  </div>
                </td>
                
                <td>
                  <div className="text-center">
                    <span>{product.productId}</span>
                  </div>
                </td>
                <td>
                  <div className="text-center">
                    <span>{product.quantity}</span> 
                  </div>
                </td>
                <td>
                <div className="text-center">
                    <span>{product.finalPrice} $</span> 
                  </div>
              
                </td>
          
              
                
              
              
              </tr>
            ))}
          </tbody>



     

<tfoot>

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
   
   
  );
}

export default OrderProduct;
