import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { validationOrderSchema } from '../web/validate/Validate';
import Input from '../pages/Input';
import { useNavigate } from 'react-router-dom';
import { CartContex } from '../web/context/Cart.jsx';
import { Bounce, toast } from 'react-toastify';

export default function Ckeckout() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    let{setCount} = useContext(CartContex);
    const initialValues={
        address:'',
        phone:'',
      };
const onSubmit = async orders =>{
  setIsLoading(true);

    try{
        const token =  localStorage.getItem('UserToken');
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`,orders,
    {headers:{authorization:`Rama__${token}`}});
    setCount(0);
    console.log(data);
    if(data.message == 'success'){
        toast.success('The Order create successfully', {
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
    }catch(error){
        console.log(error);
    }finally{
      setIsLoading(false);
    }
    navigate('/products');
}
const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:validationOrderSchema
  });
  const inputs =[
    {
      id:'phone',
      type:'text',
      name:'phone',
      title :'User phone',
      value:formik.values.phone,
    },
    {
      id:'address',
      type:'text',
      name:'address',
      title :'User Address',
      value:formik.values.address,
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
        <form className='content ms-3 py-5' onSubmit={formik.handleSubmit}>
        <h2 className='mb-3'>Ckeckout Cart</h2>

          {renderInputs}
          <button type='submit' className='mt-2 submit' disabled={!formik.isValid || isLoading ? "disabled" : ""}>{!isLoading?"Order":"wating.."}</button>
         </form>
         </div>
    </>
  )
}
