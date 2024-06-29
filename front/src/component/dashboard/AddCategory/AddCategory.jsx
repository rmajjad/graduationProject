import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddCategory.css";
import { CategoryValidationSchema } from "../validationAdmin/validationAdmin.js";

function AddCategory() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
    },
    onSubmit: async (values) => {
      try {
        setLoader(true);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.image);

        const token = localStorage.getItem("UserToken");
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/categories`,
          formData,
          {
            headers: {
              Authorization: `Rama__${token}`,
            },
          }
        );

        if (data.message === "success") {
          toast.info("Category added successfully.", {
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
          navigate("/dashboard/Category");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.info("The Category Already Exists!", {
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
    validationSchema:CategoryValidationSchema
  });

  const handleImageChange = (e) => {
    formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  return (
    <>
      <div className="pagesignin flex flex-column">
        <h1>Add Category</h1>
        <div className="container pagesignin1">
          <div className="sign">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="name">Category Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                errors={formik.errors}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error text-danger">{formik.errors.name}</div>
              ) : null}

              <label htmlFor="image">Category Image</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                errors={formik.errors}
              />
              {formik.touched.image && formik.errors.image ? (
                <div className="error text-danger  ">{formik.errors.image}</div>
              ) : null}

              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loader}
              >
                {!loader ? "Add Category" : "Wait..."}
              </button>
            </form>
          </div>
          <div className="sign-part1">
            <img className="userLogo" src="/img/medicin.jpg" alt="Category" />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
