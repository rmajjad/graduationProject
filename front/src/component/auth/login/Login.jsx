import React, { useContext } from 'react'
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../web/validate/Validate.js';
import UserContex from '../../web/context/User.jsx';
import Input from '../../pages/Input.jsx';
import '../auth.css';
export default function Login() {
  let { UserToken, setUserToken } = useContext(UserContex);
  const navigate = useNavigate();
  if (UserToken) {
    navigate(-1);
  }
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async users => {
    try {
      const { data } = await axios.post(`http://localhost:4000/auth/login`, users);
      console.log(data)
      if (data.message == 'success') {
        localStorage.setItem("UserToken", data.token);
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
        console.log(data);
        if (data.role == "Admin") {
          navigate('/dashboard');
        }
        else {
          navigate('/');
        }

      }
    } catch (error) {
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

    }


  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginSchema
  });
  const inputs = [
    {
      id: 'email',
      type: 'email',
      name: 'email',
      title: 'User Email',
      value: formik.values.email,

    },
    {
      id: 'password',
      type: 'password',
      name: 'password',
      title: 'User Password',
      value: formik.values.password,
    }
  ];
  const renderInputs = inputs.map((input, index) =>
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={input.onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />


  );
  return (
    <>
      <div className='form mt-5  py-5'>
        <form className='content ms-3 py-5' onSubmit={formik.handleSubmit}>
          <h2 className='mb-3'>Login account</h2>
          {renderInputs}
          <Link to='/sendcode' >Rest Password ?</Link>
          <button type='submit' className='mt-2 submit'  >Login</button>
        </form>
      </div>
    </>
  )
}
