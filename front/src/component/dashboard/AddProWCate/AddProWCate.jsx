import axios from "axios";
import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function AddProWCate() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [categorieID, setCategorieID] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const [product, setProduct] = useState({
    mainImage: "",
    subImages: [],
    categoryId:id,
    description: "",
    name: "",
    price: "",
    discount: "",
  });
  const getCategories = async () => {
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`,
        { headers: { Authorization: `Rama__${token}` } }
      );
      console.log(data);
      setCategorieID(data.categories);
      console.log(data.categories);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;

    setProduct({
      ...product,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("mainImage", product.mainImage);
      formData.append("subImages", product.subImages);
      formData.append("categoryId", product.categoryId);
      formData.append("description", product.description);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("discount", product.discount);

      const token = localStorage.getItem("UserToken");
      console.log(token);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        formData,
        {
          headers: { Authorization: `Rama__${token}` }
        }
      );
      setProduct({
        mainImage: "",
        subImages: [],
        categoryId: id,
        description: "",
        name: "",
        price: "",
        discount: "",
      });
      if (data.message == "success") {
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
      if (error.response.status === 409) {
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
  };

  return (
    <>
      {errors.length > 0 ? errors.map((error) => <P>{error}</P>) : ""}
      <div className="pagesignin flex flex-column">
        <div className="container pagesignin2">
          <div className="signss sign">
            <form
              onSubmit={handleSubmit}
              className=" addProductss pagesignin33 flex "
            >
              <h1>Add a New Product</h1>

              <div className="contentss  ">
                <label className="Lab">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </div>

              <div className="contentss">
                <label className="Lab">Category Id</label>

                <input
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleChange}
                disabled/>
               
               
              </div>
              <div className="contentss">
                <label className="Lab">Product Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
              <div className="contentss">
                <label className="Lab">Product Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                />
              </div>
              <div className="contentss">
                <label className="Lab" for="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="2"
                  value={product.description}
                  cols="30"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="contentss">
                <label className="Lab">Product MainImages</label>
                <input
                  type="file"
                  name="mainImage"
                  onChange={handleImageChange}
                />
              </div>
              <div className="contentss">
                <label className="Lab">Product SubImage</label>
                <input
                  type="file"
                  name="subImages"
                  onChange={handleImageChange}
                  multiple
                />
              </div>

              <button
                type="submit"
                className=" btnaddP btn btn-outline-success btnaddP"
                disabled={loader ? "disabled" : ""}
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

export default AddProWCate;
