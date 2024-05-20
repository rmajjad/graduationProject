import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { CartContex } from '../context/Cart.jsx';
import { Bounce, toast } from 'react-toastify';
import { FaStar } from "react-icons/fa";
import './product.css'
export default function Product() {
  const { productsId } = useParams();
  const { addCartContex } = useContext(CartContex);
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [avgrat, setAvgrat] = useState(0);
  let subimg = document.querySelectorAll('.sub-img');
  for (let i = 0; i < subimg.length; i++) {
    subimg[i].addEventListener('click', function () {
      const src = subimg[i].getAttribute('src');
      document.querySelector('.main-img').setAttribute('src', src);
    })

  }
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productsId}`);
      console.log(data);
      setData(data);
      setisLoading(false);
      return data.product;
    }
    catch (error) {

    }
  }
  const getavgrev = async (product) => {
    let sum = 0;
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productsId}`);
    data.product.reviews.map((review) =>
      (sum = sum + review.rating)
    );
    sum = Math.round(sum / data.product.reviews.length);
    setAvgrat(sum);
    return sum;
  }

  const addtocart = async (productid) => {
    const res = await addCartContex(productid);
    console.log(res);

    if (res.message == 'success') {
      toast.success('Product Add successfuly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    return res;


  }
  useEffect(() => {
    getProducts();
    getavgrev();
  }, [])
  return (
    <>
      {isLoading == false ?
        <>
          <section className='product_section'>
            <div className='container-fluid py-5 Products  text-center py-5' >
              <div className='row py-5'>
                <div className='col-6'>
                  <div class="m-auto w-75 p-5">
                    <img src={data.product.mainImage.secure_url} className="main-img img-fluid"></img>
                  </div>
                  <img src={data.product.mainImage.secure_url} className="sub-img img-fluid rounded-5 me-3 "></img>
                  {data.product.subImages.map((img) => <img src={img.secure_url} className="sub-img img-fluid rounded-5 me-3" key={img.public_id} />)}
                </div>
                <div className='col-6 text-center'>
                  <div className="title text-center position-relative">
                    <div className=" d-flex justify-content-center align-items-center">
                      <h2>Welcome</h2>
                      <span className="position-absolute fs-3">{data.product.name}</span>
                    </div>
                    <p className="container-fluid w-75 d-flex mt-4 justify-content-center align-items-center lead">Take care of your body. It's the only place you have to live.</p>
                  </div>
                  <p className='finalPrice'>{data.product.finalPrice}$</p>
                  <p><span className='avg d-block'>avg rating :</span>{[...Array(5)].map((star, index) => { return <FaStar size={50} color={index < avgrat ? '#ffc107' : 'e4e5e9'} key={index} /> })}</p>
                  <button className='mt-5  btn btn-dark d-block px-5 m-auto text-center w-50' onClick={() => addtocart(data.product._id)} ><div className='d-flex justify-content-between'><svg xmlns="http://www.w3.org/2000/svg" width="90" height="25" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                  </svg>Add to Cart</div></button>
                  <Link className='mt-5 btn btn-dark d-block px-5 m-auto text-center w-50' to={`/products/${data.product.id}/review`}>
                    <div className='d-flex justify-content-between'><svg xmlns="http://www.w3.org/2000/svg" width="90" height="25" fill="currentColor" class="bi bi-chat-square-text" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                    </svg>Add review</div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className='review p-5 border-2 border-black  '>
              <div className="title text-center position-relative">
                <div className=" d-flex justify-content-center align-items-center">
                  <h2 className='text-info'>Reviews</h2>
                  <span className="position-absolute fs-3">Avg rating And Feedback</span>
                </div>
              </div>
              <h1 className='text-center py-4'> </h1>
              {data.product.reviews.map((review) => <div key={review._id}>
                {data.product.reviews.map((review) => <div className='bg-white  border border-3 border-black p-5 mt-2' key={review._id}>
                  {<h3>{review.createdBy.userName}</h3>}
                  <p>{review.comment}</p>
                  {[...Array(5)].map((star, index) => { return <FaStar size={50} color={index <= review.rating ? '#ffc107' : 'e4e5e9'} key={index} /> })}
                </div>)}
              </div>)}
            </div>
          </section>
        </>
        : <div className='loading w-100   vh-100 z-3'>
          <span className="loader "></span>
        </div>}

    </>
  )
}


