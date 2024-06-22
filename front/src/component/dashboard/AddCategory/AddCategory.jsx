import axios from "axios";
import React, { useState } from "react";
import { object, string } from "yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddCategory.css";

function AddCategory() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;

    setCategory({
      ...category,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("image", category.image);
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
      setCategory({
        name: "",
        image: "",
      });
      if (data.message == "success") {
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
      if (error.response.status === 409) {
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
  };

  return (
    <>
      {errors.length > 0 ? errors.map((error) => <P>{error}</P>) : ""}
      <div className="pagesignin flex flex-column">
        <h1>Add Category</h1>
        <div className="container pagesignin1">
          <div className="sign">
            <form onSubmit={handleSubmit}>
              <label>Category Name</label>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
              />

              <label>Category Image</label>
              <input type="file" name="image" onChange={handleImageChange} />

              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loader ? "disabled" : ""}
              >
                {!loader ? "Add Category" : "wait.."}
              </button>
            </form>
          </div>
          <div className="sign-part1">
            <img className="userLogo" src="/img/medicin.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
