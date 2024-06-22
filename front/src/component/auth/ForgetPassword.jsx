import React, { useState } from 'react'

import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Input from '../pages/Input.jsx';
import { forgetpasswordSchema} from '../web/validate/Validate.js';
import './auth.css';
export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  const initialValues={
    userName:'',
    email:'',
    password:'',
    confirmPassword:'',
    code:'',
  };

  const onSubmit=async users=>{
    setIsLoading(true);
   try{
    const {data} = await axios.patch('https://ai-o49a.onrender.com/auth/forgotPassword',users);
    if(data.message == 'success'){
      formik.resetForm();
      toast.success('Password is Update', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        navigate('/login');
    }}catch(error){
      toast.error('Code in Wrong', {
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
      validationSchema:forgetpasswordSchema
    });
  const inputs =[
    { 
      id:'email',
      type: 'email',
      name:'email',
      title:'User Email',
      value:formik.values.email,

    },
    {
      id:'code',
      type:'text',
      name:'code',
      title :'Code',
      value:formik.values.code,
    },
    {
      id:'password',
      type:'password',
      name:'password',
      title :'User Password',
      value:formik.values.password,
    },
    {
      id:'confirmPassword',
      type:'password',
      name:'confirmPassword',
      title :'Confirm Password',
      value:formik.values.confirmPassword,
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
    <div className='form mt-5  py-5'>
    <form className='content ms-3 py-5'  onSubmit={formik.handleSubmit}  >
    <h2 className='mb-3'>Enter Infromation</h2>
      {renderInputs}
      <button type='submit' disabled={!formik.isValid|| isLoading ? "disabled" : ""} className='mt-2 submit' >{!isLoading?"Upadte":"wating.."}</button>
     </form>
    </div>
    

    </>
  )
}

