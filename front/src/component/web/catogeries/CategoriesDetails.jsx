import { useQuery } from 'react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import './catogeries.css';
export default function CategoriesDetails() {
  const { catogoryId } = useParams();

  const getCategoriesDetails = async () => {
    try {
      const token = localStorage.getItem('UserToken');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/category/${catogoryId}`, {}, {
        headers: {
          Authorization: `Rama__${token}`
        }
      });

      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
    }
  }
  const { data, isLoading } = useQuery('CategoriesDetails', getCategoriesDetails);
  if (isLoading) {
    return <div className='loading w-100   vh-100 z-3'><span className="loader "></span></div>
  }

  return (
    <section className='product py-5 mt-5'>
      <div className="title text-center position-relative   ">
        <div className=" d-flex justify-content-center align-items-center ">
          <h2>Welcome</h2>
          <span className="position-absolute fs-3">Our Product</span>

        </div>
        <p className="container-fluid w-75 d-flex mt-4 justify-content-center align-items-center lead">
          Take care of your body. It's the only place you have to live.
        </p>
      </div>
      <div className='container-fluid px-3'>
        <div className='row row-gap-5 py-5'>
          {data?.products.length ? data.products.map((product) =>

            <div className='col-md-4 col-sm-6'>
              <div className=' position-relative products  ' key={product._id}>

                <div
                  className="z-2 overlay position-absolute d-flex justify-content-center rounded align-items-center top-0 bottom-0 start-0 end-0">
                  <Link className='icon main-color z-2 rounded-circle bg-main-color p-3  text-white' to={`/products/${product._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search-heart-fill" viewBox="0 0 16 16">
                      <path d="M6.5 13a6.47 6.47 0 0 0 3.845-1.258h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1A6.47 6.47 0 0 0 13 6.5 6.5 6.5 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13m0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018" />
                    </svg></Link>

                </div>
                <img height='500px' className='position-absolute h-100 z-0 w-100 rounded-3' src={product.mainImage.secure_url} />
                <div
                  className="z-3 info position-absolute s-0 end-0 w-100  d-flex justify-content-between px-3 rounded-bottom pt-2 align-items-center ">
                  <div class="title-project">
                    <h6 className='py-3'>{product.name}</h6>
                    <p>{product.price}$</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="currentColor" className="bi bi-heart " viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </div>




              </div>
            </div>
          ) : <h2>no products</h2>}
        </div>



      </div>
    </section>
  )
}

