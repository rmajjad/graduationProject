import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "./Update.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { object, string } from "yup";
import {updatevalidationSchema} from './../validationAdmin/validationAdmin.js'

function UpdateUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const names = urlParams.get("name");
  const status = urlParams.get("status");
  const email = urlParams.get("email");
  const role = urlParams.get("role");
  const confirmEmail = urlParams.get("confirmEmail");

  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);



  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      userName: names || "",
      status: status || "",
      email: email || "",
      role: role || "",
      confirmEmail: confirmEmail || "",
    },
    validationSchema: updatevalidationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      const token = localStorage.getItem("UserToken");
      try {
        const { data } = await axios.patch(
          `https://ai-o49a.onrender.com/users/${id}`,
          values,
          {
            headers: { Authorization: `Rama__${token}` },
          }
        );

        console.log(data);

        if (data.message === "success") {
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
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <div className="pagesignin flex flex-column ">
      <h1>Update User</h1>
      <div className="container pagesignin1">
        <div className="sign updateForm">
          <form className="Formm" onSubmit={formik.handleSubmit}>
            <div className="contentss">
              <label className="Lab">User Name</label>
              <input
                className="inputText"
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                errors={formik.errors}
                onBlur={formik.handleBlur}
                touched={formik.touched}
              />
            </div>
            {formik.errors.userName && formik.touched.userName && (
                <div className="error text-danger ">{formik.errors.userName}</div>
              )}
            <div className="contentss">
              <label className="Lab">User Email</label>
              <input
                className="inputText"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                errors={formik.errors}
                onBlur={formik.handleBlur}
                touched={formik.touched}
              />
              
            </div>
            {formik.errors.email && formik.touched.email && (
                <div className="error text-danger">{formik.errors.email}</div>
              )}
            <div className="contentss">
              <label className="Lab">Confirm Email</label>
              <select
                className="selectStatusPro"
                name="confirmEmail"
                value={formik.values.confirmEmail}
                onChange={formik.handleChange}
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
                value={formik.values.status}
                onChange={formik.handleChange}
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
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-outline-success"
              disabled={loader}
            >
              {!loader ? "Update User" : "Wait.."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
