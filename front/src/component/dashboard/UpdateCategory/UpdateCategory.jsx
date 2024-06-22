import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { object, string} from 'yup';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {Bounce, toast } from 'react-toastify';
import'./UpdateCategory.css'
import 'bootstrap/dist/css/bootstrap.min.css'



function UpdateCategory() {
  const navigate = useNavigate();

  const[loader,setLoader]=useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const name= urlParams.get('name');
  const status= urlParams.get('status');
  const [category, setCategory] = useState({
    name:name,
    status:status,
    image:''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value
    });
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
   
    setCategory({
        ...category,
        [name]: files[0]
      });
    
  };  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoader(true);
    
   
   try {
    const token = localStorage.getItem('UserToken');
    const formData = new FormData();

    formData.append('name', category.name);
    formData.append('status', category.status);
    formData.append('image', category.image);
    const { data } = await axios.patch(`https://ai-o49a.onrender.com/categories/${id}`,formData,{


    headers:{
      Authorization:`Rama__${token}`
    }
 
    });

    if(data.message == 'success'){
      toast.info('Modified successfully.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
        navigate('/dashboard/Category');
    }
   } 

   finally{
    setLoader(false);
   }
   
    }

  return (
    <>
    <div className='pagesignin flex flex-column'>
     <h1>Update Category</h1>
    <div className='container pagesignin1'>
    
      <div className="sign updateForm">

      <form onSubmit={handleSubmit}>
        
      <label>Category Name</label>
        <input type="text" className='inputText' name="name" value={category.name}  onChange={handleChange} />

        <label>Category Status</label> 
        <select className='selectStatus' name="status" value={category.status} onChange={handleChange}>
         <option value="Active">Active</option>
        <option value="NotActive">Not Active</option>
          </select>

           
    <label>Category Image</label>
        <input type="file" name="image"  onChange={handleImageChange}/>

    <button type='submit' className='btn btn-outline-success' disabled={loader?'disabled':''}>{!loader?'Update Category':'wait..'}</button>
    </form>
      </div>
 
    </div>

    
    </div>
    
    
    </>
  )
}

export default UpdateCategory