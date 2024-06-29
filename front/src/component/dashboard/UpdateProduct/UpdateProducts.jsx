import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProduct_validationSchema } from '../validationAdmin/validationAdmin.js';

function UpdateProducts() {
  const [loader, setLoader] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const id = urlParams.get('id');
  const name = urlParams.get('name');
  const status = urlParams.get('status');
  const stock = urlParams.get('stock');
  const price = urlParams.get('price');
  const description = urlParams.get('description');

  const formik = useFormik({
    initialValues: {
      name: name,
      status: status,
      stock: stock,
      price: price,
      description: description,
      mainImage: [],
      subImages: [],
    },
    validationSchema: updateProduct_validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const token = localStorage.getItem('UserToken');
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('status', values.status);
        formData.append('stock', values.stock);
        formData.append('price', values.price);
        formData.append('description', values.description);

        // Append files from mainImage and subImages
        values.mainImage.forEach((file) => {
          formData.append('mainImage', file);
        });
        values.subImages.forEach((file) => {
          formData.append('subImages', file);
        });

        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
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
          navigate('/dashboard/AllProducts');
        }
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <>
      <div className='pagesignin flex flex-column'>
        <h1>Update Product</h1>
        <div className='container pagesignin1'>
          <div className='sign updateForm'>
            <form className='Formm' onSubmit={formik.handleSubmit}>
              <div className='contentss'>
                <label>Product Name</label>
                <input
                  type='text'
                  className='inputText'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
               
              </div>
               {formik.errors.name && <div className='text-danger'>{formik.errors.name}</div>}
              <div className='contentss'>
                <label>Product Stock</label>
                <input
                  type='number'
                  className='inputText'
                  name='stock'
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                />
               
              </div>
              {formik.errors.stock && <div className='text-danger'>{formik.errors.stock}</div>}
              <div className='contentss'>
                <label>Product Price</label>
                <input
                  type='number'
                  className='inputText'
                  name='price'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                
              </div>
              {formik.errors.price && <div className='text-danger'>{formik.errors.price}</div>}
              <div className='contentss'>
                <label className='Lab' htmlFor='description'>
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows='2'
                  value={formik.values.description}
                  cols='35'
                  onChange={formik.handleChange}
                ></textarea>
               
              </div>
              {formik.errors.description && <div className='text-danger'>{formik.errors.description}</div>}
              <div className='contentss'>
                <label>Product Status</label>
                <select
                  className='selectStatusPro'
                  name='status'
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <option value='Active'>Active</option>
                  <option value='NotActive'>Not Active</option>
                </select>
                
              </div>
              {formik.errors.status && <div className='text-danger'>{formik.errors.status}</div>}
              <div className='contentss'>
                <label>Product MainImage</label>
                <div style={{ textAlign: 'center' }}>
                  <input
                    type='file'
                    name='mainImage'
                    onChange={(e) => {
                      formik.setFieldValue('mainImage', [e.target.files[0]]);
                    }}
                  />
                </div>
              </div>
              <div className='contentss'>
                <label>Product SubImages</label>
                <div style={{ textAlign: 'center' }}>
                  <input
                    type='file'
                    name='subImages'
                    onChange={(e) => {
                      formik.setFieldValue('subImages', Array.from(e.target.files));
                    }}
                    multiple
                  />
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-outline-success'
                disabled={loader}
              >
                {!loader ? 'Update Product' : 'Wait...'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProducts;
