import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const validationSchema = yup.object({
  name: yup.string().required("Product Name is required").min(5, "Must be at least 5 characters").max(50, "Must be at most 50 characters"),
  categoryId: yup.string().required("Category ID is required"),
  price: yup.number().required("Price is required").min(1, "Price must be at least $1"),
  discount: yup.number().required("Discount is required"),
  description: yup.string().required("Description is required"),
  mainImage: yup.mixed().required("Main Image is required"),
  subImages: yup.array().required("Sub Images are required"),
});

function AddProWCate() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const initialValues = {
    mainImage: "",
    subImages: [],
    categoryId: id,
    description: "",
    name: "",
    price: "",
    discount: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const formData = new FormData();
        formData.append("mainImage", values.mainImage);
        values.subImages.forEach((image) => {
          formData.append("subImages", image);
        });
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
          navigate("/dashboard/Category");
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

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    formik.setFieldValue(name, files[0]);
  };

  const handleSubImagesChange = (e) => {
    const { name, files } = e.target;
    formik.setFieldValue(name, Array.from(files)); // Convert FileList to Array
  };

  return (
    <div className="pagesignin flex flex-column">
      <div className="container pagesignin2">
        <div className="signss sign">
          <form onSubmit={formik.handleSubmit} className="addProductss pagesignin33 flex">
            <h1>Add a New Product</h1>

            <div className="contentss">
              <label className="Lab">Product Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.name && formik.errors.name ? "form-control is-invalid" : "form-control"}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>

            <div className="contentss">
              <label className="Lab">Category Id</label>
              <input
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
                className={formik.touched.categoryId && formik.errors.categoryId ? "form-control is-invalid" : "form-control"}
              />
              {formik.touched.categoryId && formik.errors.categoryId && (
                <div className="invalid-feedback">{formik.errors.categoryId}</div>
              )}
            </div>

            <div className="contentss">
              <label className="Lab">Product Price</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.price && formik.errors.price ? "form-control is-invalid" : "form-control"}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="invalid-feedback">{formik.errors.price}</div>
              )}
            </div>

            <div className="contentss">
              <label className="Lab">Product Discount</label>
              <input
                type="number"
                name="discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.discount && formik.errors.discount ? "form-control is-invalid" : "form-control"}
              />
              {formik.touched.discount && formik.errors.discount && (
                <div className="invalid-feedback">{formik.errors.discount}</div>
              )}
            </div>

            <div className="contentss">
              <label className="Lab" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="2"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.description && formik.errors.description ? "form-control is-invalid" : "form-control"}
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <div className="invalid-feedback">{formik.errors.description}</div>
              )}
            </div>

            <div className="contentss">
              <label className="Lab">Product Main Images</label>
              <input
                type="file"
                name="mainImage"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                className={formik.touched.mainImage && formik.errors.mainImage ? "form-control is-invalid" : "form-control"}
              />
              {formik.touched.mainImage && formik.errors.mainImage && (
                <div className="invalid-feedback">{formik.errors.mainImage}</div>
              )}
            </div>

            <div className="contentss">
              <label className="Lab">Product Sub Images</label>
              <input
                type="file"
                name="subImages"
                onChange={handleSubImagesChange}
                onBlur={formik.handleBlur}
                multiple
                className={formik.touched.subImages && formik.errors.subImages ? "form-control is-invalid" : "form-control"}
              />
              {formik.touched.subImages && formik.errors.subImages && (
                <div className="invalid-feedback">{formik.errors.subImages}</div>
              )}
            </div>

            <button
              type="submit"
              className="btnaddP btn btn-outline-success btnaddP"
              disabled={loader}
            >
              {!loader ? "Add Product" : "Wait..."}  
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProWCate;
