import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { UServalidationSchema } from './../validationAdmin/validationAdmin.js';
import { useFormik } from "formik";

function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: UServalidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoader(true);
      try {
        const { data } = await axios.post(
          `https://ai-o49a.onrender.com/auth/registor`,
          values
        );
        console.log(data);

        if (data.message === "success") {
          toast.info("Account created Successfully !", {
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
          resetForm();
          navigate("/dashboard/Users");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.info("Email Already Exists !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <>
      <div className="pagesignin flex flex-column ">
        <h1>Add User</h1>
        <div className="container pagesignin1">
          <div className="sign">
            <form onSubmit={formik.handleSubmit}>
              <label>Your Name</label>
              <input
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error text-danger">{formik.errors.userName}</div>
              ) : null}

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-danger">{formik.errors.email}</div>
              ) : null}

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error text-danger">{formik.errors.password}</div>
              ):null}

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error text-danger">{formik.errors.confirmPassword}</div>
              ) : null}

              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loader}
              >
                {!loader? "Sign-up":"wait.."}
              </button>
            </form>
          </div>
          <div className="sign-part1">
            <img className="userLogo" src="/img/pharmacy3.jpg" alt="User Logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
