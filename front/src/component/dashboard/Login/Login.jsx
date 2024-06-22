import React from "react";
import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
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
      const { data } = await axios.post(
        `https://ai-o49a.onrender.com/auth/registor`,
        user
      );
      console.log(data);
      setUser({
        userName: "",
        password: "",
        email: "",
        confirmPassword: "",
      });
      console.log(data.message);

      if (data.message == "success") {
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
        navigate("/dashboard/Users");
      }
    } catch (error) {
      if (error.response.status === 409) {
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
  };

  return (
    <>
      {errors.length > 0 ? errors.map((error) => <P>{error}</P>) : ""}
      <div className="pagesignin flex flex-column">
        <h1>Add User</h1>
        <div className="container pagesignin1">
          <div className="sign">
            <form onSubmit={handleSubmit}>
              <label>Your Name</label>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loader ? "disabled" : ""}
              >
                {!loader ? "Sign-up" : "wait.."}
              </button>
            </form>
          </div>
          <div className="sign-part1">
            <img className="userLogo" src="/img/pharmacy3.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
