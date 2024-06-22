import React, { useState }  from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { reviewSchema } from '../validate/Validate';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

export default function Review() {
  const {productsId} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues={
    comment:'',
  
  };
  const onSubmit=async(review)=>{
    setIsLoading(true);
  try{
    const token = localStorage.getItem("UserToken");
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productsId}/review`,review,
    {headers:{Authorization:`Rama__${token}`}});
    if(data.message == 'success'){
     toast.success('review successfuly', {
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
          navigate('/');
        
       
    }
  }catch(error){
    toast.error('Your order isnot delivered yet !', {
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
  }finally{
    setIsLoading(false);
  }
  
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:reviewSchema
  });
  const inputs =[
    { 
      id:'comment',
      type: 'text',
      name:'comment',
      title:'User comment',
      value:formik.values.comment,

    }
  ];
  const renderInputs = inputs.map((input,index)=>
        <Input 
        type={input.type} 
        id={input.id} 
         name={input.name} 
         title={input.title}
         value={input.value}  
         key={index} 
         errors={formik.errors}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         touched={formik.touched}
        />
    
      
      );
  return (
    <>
    <div className='form mt-5  py-5 bg'>
    
     
    <form className='content ms-3 py-5 ' onSubmit={formik.handleSubmit}>
    <h2 className='mb-3'>Review Product</h2>

      {renderInputs}
      <label className='d-block '>User rating</label> 
        <select className='d-block m-auto px-2' name="rating" value={formik.values.rating} onChange={formik.handleChange}>
         <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
          </select>
      <button type='submit' className='mt-2 submit'disabled={!formik.isValid || isLoading ? "disabled" : ""} >{!isLoading?"Review":"wating.."}</button>
     </form>
   
    </div>
    </>
  )
}
