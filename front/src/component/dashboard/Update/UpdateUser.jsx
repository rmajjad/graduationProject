import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { object, string } from "yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "./Update.css";
import "bootstrap/dist/css/bootstrap.min.css";

function UpdateUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const names = urlParams.get("name");
  const status = urlParams.get("status");
  const email = urlParams.get("email");
  const role = urlParams.get("role");
  const confirmEmail = urlParams.get("confirmEmail");

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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const token = localStorage.getItem("UserToken");
    try {
      const { data } = await axios.patch(
        `https://ai-o49a.onrender.com/users/${id}`,
        user,
        {
          headers: { Authorization: `Rama__${token}` },
        }
      );

      console.log(data);

      console.log(data.message);
      if (data.message == "success") {
        toast.info("Account Updated Successfully !", {
          style: {
            color: "white",
          },
          closeButtonStyle: {
            color: "#ADD8E6", 
          },
          progressStyle: {
            backgroundColor: "#ADD8E6", 
          },
          iconTheme: {
            primary: "#ADD8E6", 
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
        navigate("/dashboard/Users");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="pagesignin flex flex-column">
        <h1>Update User</h1>
        <div className="container pagesignin1">
          <div className="sign updateForm">
            <form className="Formm" onSubmit={handleSubmit}>
              <div className="contentss">
                <label className="Lab">User Name</label>
                <input
                  className="inputText"
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="contentss">
                <label className="Lab">User Email</label>
                <input
                  className="inputText"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="contentss">
                <label className="Lab">Confirm Email</label>
                <select
                  className="selectStatusPro"
                  name="confirmEmail"
                  value={user.confirmEmail}
                  onChange={handleChange}
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <div className="contentss">
                <label className="Lab">User Status</label>
                <select
                  className="selectStatusPro"
                  name="status"
                  value={user.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="NotActive">Not Active</option>
                </select>
              </div>
              <div className="contentss">
                <label className="Lab">User Role</label>
                <select
                  className="selectStatusPro"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loader ? "disabled" : ""}
              >
                {!loader ? "Update User" : "wait.."}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
