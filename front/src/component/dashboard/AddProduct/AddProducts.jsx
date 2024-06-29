import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProducts.css";
import { product_validationSchema } from "../validationAdmin/validationAdmin.js";

function AddProducts() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [categorieID, setCategorieID] = useState([]);

  const getCategories = async () => {
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`,
        { headers: { Authorization: `Rama__${token}` } }
      );
      setCategorieID(data.categories);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      mainImage: "",
      subImages: [],
      categoryId: "",
      description: "",
      name: "",
      price: "",
      discount: "",
    },
    validationSchema: product_validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const formData = new FormData();
        formData.append("mainImage", values.mainImage);
        for (let i = 0; i < values.subImages.length; i++) {
          formData.append("subImages", values.subImages[i]);
        }
        formData.append("categoryId", values.categoryId);
        formData.append("description", values.description);
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("discount", values.discount);

        const token = localStorage.getItem("UserToken");
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/products`,
          formData,
          {
            headers: { Authorization: `Rama__${token}` },
          }
        );

        if (data.message === "success") {
          toast.info("Product added successfully.", {
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
          navigate("/dashboard/AllProducts");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.info("The Product Already Exists!", {
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
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <div className="pagesignin flex flex-column">
        <div className="container pagesignin2  flex flex-column">
          <div className="signss sign  flex flex-column">
            <form
              onSubmit={formik.handleSubmit}
              className=" addProductss pagesignin33 flex "
            >
              <h1>Add a New Product</h1>

              <div className="contentss">
                <label className="Lab">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error text-danger">{formik.errors.name}</div>
                ) : null}
              </div>
              

              <div className="contentss">
                <label className="Lab">Category Name</label>
                <select
                  name="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="select_id"
                >
                  {categorieID.map((category) => (
                    <option className="idOption" key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                  {formik.touched.categoryId && formik.errors.categoryId ? (
                      <div className="error text-danger">{formik.errors.categoryId}</div>
                    ) : null}
              </div>
              
              <div className="contentss">
                <label className="Lab">Product Price</label>
                <input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                  {formik.touched.price && formik.errors.price ? (
                      <div className="error text-danger">{formik.errors.price}</div>
                    ) : null}
              </div>
              
              <div className="contentss">
                <label className="Lab">Product Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.discount && formik.errors.discount ? (
                  <div className="error text-danger">{formik.errors.discount}</div>
                ) : null}
              </div>
              

              <div className="contentss">
                <label className="Lab" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="2"
                  cols="30"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                  <div className="error text-danger">{formik.errors.description}</div>
                ) : null}
              </div>
              

              <div className="contentss">
                <label className="Lab">Product Main Image</label>
                <input
                  type="file"
                  name="mainImage"
                  onChange={(event) => {
                    formik.setFieldValue("mainImage", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mainImage && formik.errors.mainImage ? (
                  <div className="error text-danger">{formik.errors.mainImage}</div>
                ) : null}
              </div>
              

              <div className="contentss">
                <label className="Lab">Product Sub Images</label>
                <input
                  type="file"
                  name="subImages"
                  onChange={(event) => {
                    formik.setFieldValue("subImages", Array.from(event.currentTarget.files));
                  }}
                  onBlur={formik.handleBlur}
                  multiple
                />
                {formik.touched.subImages && formik.errors.subImages ? (
                    <div className="error text-danger">{formik.errors.subImages}</div>
                  ) : null}
              </div>
              

              <button
                type="submit"
                className="btnaddP btn btn-outline-success btnaddP"
                disabled={loader}
              >
                {!loader ? "Add Product" : "wait.."}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProducts;
