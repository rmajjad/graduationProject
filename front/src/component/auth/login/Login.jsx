import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../web/validate/Validate.js';
import UserContex from '../../web/context/User.jsx';
import Input from '../../pages/Input.jsx';
import '../auth.css';
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  let {UserToken,setUserToken} = useContext(UserContex);
    const navigate = useNavigate();
    if(UserToken){
      navigate(-1);
    }
    const initialValues={
        email:'',
        password:'',
      };
  
      const onSubmit=async users=>{
        setIsLoading(true);
       try{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,users);
        console.log(data)
        if(data.message == 'success'){
         localStorage.setItem("UserToken",data.token);
         setUserToken(data.token);
         toast.success('login successfuly', {
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
        toast.error('Password or Email not vaild', {
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
          validationSchema:loginSchema
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
         onChange={input.onChange||formik.handleChange}
         onBlur={formik.handleBlur}
         touched={formik.touched}
        />
    
      
      );
      return (
        <>
        <div className='form mt-5  py-5'>
        <form  className='content  ms-3 py-5' onSubmit={formik.handleSubmit}>
        <h2 className='mb-3 '>Login account</h2>
          {renderInputs}
          <Link to='/sendcode' >Rest Password ?</Link>
          <button type='submit' className='mt-2 submit'  disabled={!formik.isValid || isLoading ? "disabled" : ""} >{!isLoading?"Login":"wating.."}</button>
         </form>
        </div>
        </>
      )
}
