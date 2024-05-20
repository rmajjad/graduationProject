import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { object, string } from 'yup';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import './Update.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function UpdateUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const names = urlParams.get('name');
  const status = urlParams.get('status');
  const email = urlParams.get('email');
  const role = urlParams.get('role');
  const confirmEmail = urlParams.get('confirmEmail');

  console.log(id);
  const [user, setUser] = useState({
    userName: names,
    status: status,
    email: email,
    role: role,
    confirmEmail: confirmEmail,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoader(true);

    try {

      const { data } = await axios.patch(`https://ai-o49a.onrender.com/users/${id}`,
        {
          name: user.name,
        },

        {}

      );
      console.log(data);
      //setUser({
      // name:'',
      //});


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
        navigate('/User');
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

  return (
    <>
      <div className='pagesignin flex flex-column'>
        <h1>Update User</h1>
        <div className='container pagesignin1'>

          <div className="sign">

            <form onSubmit={handleSubmit}>

              <label>User Name</label>
              <input type="text" name="name" value={user.userName} onChange={handleChange} />
              <label>User Email</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} />
              <label>User Confirm Email</label>
              <select name="confirmEmail" value={user.confirmEmail} onChange={handleChange}>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
              <label>User Status</label>
              <select name="status" value={user.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="NotActive">Not Active</option>
              </select>
              <label>User Role</label>
              <select name="role" value={user.role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>

              <button type='submit' className='btn btn-outline-success' disabled={loader ? 'disabled' : ''}>{!loader ? 'Update User' : 'wait..'}</button>
            </form>
          </div>

        </div>


      </div>
    </>
  )
}

export default UpdateUser