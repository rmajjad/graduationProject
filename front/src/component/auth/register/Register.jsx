import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { validationSchema } from '../../web/validate/Validate.js';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Bounce, toast } from 'react-toastify';
import '../auth.css';
export default function Register() {
  const initialValues={
    userName:'',
    email:'',
    password:'',
  };
  const onSubmit=async users=>{
  try{
    const {data} = await axios.post('https://ai-o49a.onrender.com/auth/registor',users);
    console.log(data)
    if(data.message == 'success'){
      formik.resetForm();
      toast.success('Account Creating successfully, Plase verify your email to login', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }}catch(error){
      toast.error('Email already exist', {
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

  const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:validationSchema
    });
  const inputs =[
    {
      id:'userName',
      type:'text',
      name:'userName',
      title:'User Name',
      value: formik.values.userName,
    },
    { 
      id:'email',
      type: 'email',
      name:'email',
      title:'User Email',
      value:formik.values.email,

    },
    {
      id:'password',
      type:'password',
      name:'password',
      title :'User Password',
      value:formik.values.password,
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
    <div className='form container'>
    <form className='content ms-3 py-5' onSubmit={formik.handleSubmit} >
    <h2 className='mb-3'>create account</h2>
      {renderInputs}
      <button type='submit' className='mt-2 submit'  disabled={!formik.isValid} >Register</button>
     </form>
    </div>
    

    </>
  )
}

