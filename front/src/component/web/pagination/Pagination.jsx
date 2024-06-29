import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './../catogeries/catogeries.css';
import { CartContex } from '../context/Cart.jsx';
import { Bounce, toast } from 'react-toastify';
import UserContext from './../context/User.jsx'
export default function Pagination() {
  const { UserToken} = useContext(UserContext);
    let [product,setproduct] = useState([]);
    let [page,setPage] = useState(1);
    let [limit,setlimit] = useState(6);
    let[loading,setLoading] = useState(true);
    const paginationNumbers = [];
    const {addCartContex}= useContext(CartContex);
    const addtocart  = async (productid)=>{
     try{
      const res = await addCartContex(productid);
      console.log(res);
      
      if(res.message == 'success'){
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
     }catch(error){
      toast.error('Product already exist', {
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
    
  
  }
    const getPagination =  async(Page=1,limit=6)=>{
      setLoading(true);
       try{
        const token = localStorage.getItem('UserToken');
       const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`);
       // const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${Page}&limit=${limit}`);
        console.log(data);
        setproduct(data);
        console.log(loading);
        setLoading(false);
        return data;
       }catch(error){
        console.log(error)
       }finally{
        setLoading(false);
       }
    }
    for (let i = 1; i <= Math.ceil(product.count / limit); i++) {
           paginationNumbers.push(i);
    }
   
   
    useEffect(()=>{
       getPagination(); 
    },[]);
    if(loading){
      return <div className='loading w-100 vh-100    vh-100 z-3'><span className="loader "></span></div>
    }

  return (
    <div >
        <section className='product h-100 py-5'>
        <div className="title text-center position-relative   ">
            <div className=" d-flex justify-content-center align-items-center ">
              <h2>Welcome</h2>
              <span className="position-absolute fs-3">Our Product</span>
              
            </div>
            <p className="container-fluid w-75 d-flex mt-4 justify-content-center align-items-center lead">
            Take care of your body. It's the only place you have to live.
              </p>
        </div>
    <div className='container py-5'>
    <div className='row row-gap-5' >
    {loading == false ?product?.products?.map((product)=>
     <div className='col-md-4  col-sm-6' key={product._id} >
        <div className=' position-relative products  ' key={product._id}>
    
    <div
     className="z-2 overlay position-absolute d-flex justify-content-center rounded align-items-center top-0 bottom-0 start-0 end-0">
       <Link  className='icon main-color z-2 rounded-circle bg-main-color p-3  text-white' to={ UserToken != null?`/products/${product._id}`:'/login'}> 
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search-heart-fill" viewBox="0 0 16 16">
<path d="M6.5 13a6.47 6.47 0 0 0 3.845-1.258h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1A6.47 6.47 0 0 0 13 6.5 6.5 6.5 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13m0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
</svg></Link>
      
     </div>
   <img height='500px' className='position-absolute h-100 z-0 w-100 rounded-3'    src={product.mainImage.secure_url}/>
      <div
     className="z-3 info position-absolute s-0 end-0 w-100  d-flex justify-content-between px-3 bg-white rounded-bottom pt-2 align-items-center ">
      <div className="title-project">
      <h6 className='py-3'>{product.name}</h6>
      <p>{product.price}$</p>
     </div>
    <Link  className='text-white'  onClick={()=>addtocart(product._id)} >
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
    </svg>
    </Link>
     </div>
     
      

      
</div>
     </div>
   ):<h2>no product</h2>}
    </div>
    
  <nav aria-label="Page navigation example" className='d-flex justify-content-center'> 
  <ul className="pagination py-5">
    <li className="page-item">
      <button className="page-link" onClick={
        async()=>{
         await setPage(--page);
         await getPagination(page);
         }} aria-label="Previous" disabled={page==1}>
        <span aria-hidden="true">«</span>
      </button>
    </li>
    {paginationNumbers.map((index)=>      
    <li className="page-item" key={index}><button className="page-link"
     onClick={ async() =>{
      await setPage(index);
      await getPagination(index);} }>
      {index}</button></li>
)
     
}
    <li className="page-item">
      <button className="page-link"
       onClick={async()=>{
        await setPage(++page);
        await getPagination(page);

      }} aria-label="Next" disabled={page== paginationNumbers.length}>
        <span aria-hidden="true">»</span>
      </button>
    </li>
  </ul>
</nav>




   </div>
   </section>
    </div>
 

  )
}
