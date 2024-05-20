import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { object, string } from 'yup';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Signup.css';
function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    name: '',
    password: '',
    email: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const validation = async () => {
    const RejisterSchema = object({
      userName: string().min(8).max(20).required(),
      email: string().email(),
      password: string().min(8).max(20).required(),
      age: string().required(),

    });
    try {
      await RejisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);

      setLoader(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoader(true);


    try {

      const { data } = await axios.post(`https://ai-o49a.onrender.com/auth/registor`, user);
      console.log(data);
      setUser({
        name: '',
        password: '',
        email: '',

      });
      console.log(data.message);
      if (data.massege == 'success') {
        toast.success('Account created Successfully !', {
          style: {

            color: 'white',
          },
          closeButtonStyle: {
            color: '#ADD8E6', // لون علامة التحقق (الصح) بجانب الإشعار
          },
          progressStyle: {
            backgroundColor: '#ADD8E6', // لون الخط السفلي للإشعار
          },
          iconTheme: {
            primary: '#ADD8E6', // لون اللوجو للإشعار
          },
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate('/');
      }

      else if (data.massege == 'email already exists') {
        toast.warn('Email Already Exists !', {
          style: {

            color: 'white',
          },
          closeButtonStyle: {
            color: '#ADD8E6', // لون علامة التحقق (الصح) بجانب الإشعار
          },
          progressStyle: {
            backgroundColor: '#ADD8E6', // لون الخط السفلي للإشعار
          },
          iconTheme: {
            primary: '#ADD8E6', // لون اللوجو للإشعار
          },
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

      }
    } finally {
      setLoader(false);
    }

  }


    ;

  return (
    <>
      {errors.length > 0 ? errors.map(error =>
        <P>{error}</P>
      ) : ''}
      <div className='pagesignin flex flex-column'>
        <h1>Add User</h1>
        <div className='container pagesignin1'>

          <div className="sign">

            <form onSubmit={handleSubmit}>
              <label>Your Name</label>
              <input type="text" name="name" value={user.userName} onChange={handleChange} />

              <label>Email</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} />

              <label>Password</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} />



              <button type='submit' className='btn btn-outline-success' disabled={loader ? 'disabled' : ''}>{!loader ? 'Sign-up' : 'wait..'}</button>
            </form>
          </div>
          <div className="sign-part1">

            <img className='userLogo' src="src/pages/Login/img/pharmacy3.jpg" />



          </div>
        </div>


      </div>

    </>
  )
}

export default Login