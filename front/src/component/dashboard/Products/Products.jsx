import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css'
function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await axios.get(`https://ai-o49a.onrender.com/products`, {});
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, [])

  const RemoveProducts = async (id) => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.delete(`https://rmshop-nodejs.onrender.com/categories/${id}`, {}, {});
    console.log('mmm');
    getProducts();
  };

  return (
    <>
      <div className='usersTabel col'>
        <table className="table table-striped" border={6}>
          <thead>
            <th scope="col" className="text-center">Product Name</th>
            <th scope="col" className="text-center">Product ID</th>
            <th scope="col" className="text-center">Product Image</th>
            <th scope="col" className="text-center">Update Product</th>
            <th scope="col" className="text-center">Delete Product</th>
          </thead>
          <tbody>

            {products.map(product =>
              <tr>

                <td>
                  <div className='text-center'><span >{product.title}</span></div>
                </td>
                <td>
                  <div className='text-center'><span >{product.id}</span></div>
                </td>
                <td>
                  <div className='text-center'><span >{product.body}</span></div>
                </td>
                <td>
                  <div className='text-center updateUser'>
                    <Link to={`/UpdateUser/?id=${product.id}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" fill="#86d9f5" /></svg>
                    </Link>


                  </div>
                </td>
                <td>
                  <div className='text-center deleteUsers'>
                    <button className='btn-light' onClick={() => RemoveProducts(product.id)}>


                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" fill="#86d9f5" />
                      </svg>



                    </button>


                  </div>
                </td>
              </tr>

            )}
          </tbody>

          <tfoot >
            <tr >
              <td className='bg-light' colSpan={6}>
                <div className='goToAddUser'>

                  <Link to='/AddProducts'>    <button className='linkAdd' >Add Product</button> </Link>



                </div>

              </td>

            </tr>
          </tfoot>
        </table>


      </div>

    </>
  )
}

export default Products