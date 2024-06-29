import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateCategory.css';
import { update_categoryvalidationSchema } from './../validationAdmin/validationAdmin.js';

function UpdateCategory() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const name = urlParams.get('name');
  const status = urlParams.get('status');

  const formik = useFormik({
    initialValues: {
      name: name || '',
      status: status || 'Active',
      image: null,
    },
    validationSchema: update_categoryvalidationSchema,
    onSubmit: async (values) => {
      setLoader(true);

      try {
        const token = localStorage.getItem('UserToken');
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('status', values.status);
        if (values.image) {
          formData.append('image', values.image);
        }

        const { data } = await axios.patch(
          `https://ai-o49a.onrender.com/categories/${id}`,
          formData,
          {
            headers: {
              Authorization: `Rama__${token}`,
            },
          }
        );

        if (data.message === 'success') {
          toast.info('Modified successfully.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
          navigate('/dashboard/Category');
        } else {
          toast.error('Update failed. Please try again.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
        }
      } catch (error) {
        console.error('Error updating category:', error);
        toast.error('Update failed. Please try again.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <>
      <div className="pagesignin flex flex-column">
        <h1>Update Category</h1>
        <div className="container pagesignin1">
          <div className="sign updateForm">
            <form onSubmit={formik.handleSubmit}>
              <label>Category Name</label>
              <input
                type="text"
                className="inputText"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error text-danger">{formik.errors.name}</div>
              ) : null}

              <label>Category Status</label>
              <select
                className="selectStatus"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="Active">Active</option>
                <option value="NotActive">Not Active</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <div className="error text-danger">{formik.errors.status}</div>
              ) : null}

              <label>Category Image</label>
              <div className="text-center">
                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    formik.setFieldValue('image', event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="error text-danger">{formik.errors.image}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn btn-outline-success"
                disabled={loader}
              >
                {!loader ? 'Update Category' : 'Wait..'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCategory;
