import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [product, setProduct] = useState({
    name: name,
    status: status,
    stock: stock,
    price: price,
    description: description,
    mainImage: [],
    subImages: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === 'mainImage') {
      setProduct({
        ...product,
        [name]: [files[0]] // Ensure mainImage is an array with one file
      });
    } else if (name === 'subImages') {
      setProduct({
        ...product,
        [name]: Array.from(files) // Convert FileList to array
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const token = localStorage.getItem('UserToken');
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('status', product.status);
      formData.append('stock', product.stock);
      formData.append('price', product.price);
      formData.append('description', product.description);

      // Append files from mainImage and subImages
      product.mainImage.forEach((file) => {
        formData.append('mainImage', file);
      });
      product.subImages.forEach((file) => {
        formData.append('subImages', file);
      });

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Rama__${token}`
          }
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
          transition: Bounce
        });
        navigate('/dashboard/AllProducts');
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className='pagesignin flex flex-column'>
        <h1>Update Product</h1>
        <div className='container pagesignin1'>
          <div className='sign updateForm'>
            <form className='Formm' onSubmit={handleSubmit}>
              <div className='contentss'>
                <label>Product Name</label>
                <input
                  type='text'
                  className='inputText'
                  name='name'
                  value={product.name}
                  onChange={handleChange}
                />
              </div>
              <div className='contentss'>
                <label>Product Stock</label>
                <input
                  type='number'
                  className='inputText'
                  name='stock'
                  value={product.stock}
                  onChange={handleChange}
                />
              </div>
              <div className='contentss'>
                <label>Product Price</label>
                <input
                  type='number'
                  className='inputText'
                  name='price'
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
              <div className='contentss'>
                <label className='Lab' htmlFor='description'>
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows='2'
                  value={product.description}
                  cols='35'
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className='contentss'>
                <label>Product Status</label>
                <select
                  className='selectStatusPro'
                  name='status'
                  value={product.status}
                  onChange={handleChange}
                >
                  <option value='Active'>Active</option>
                  <option value='NotActive'>Not Active</option>
                </select>
              </div>
              <div className='contentss'>
                <label>Product MainImage</label>
                <div style={{ textAlign: 'center' }}>
                  <input
                    type='file'
                    name='mainImage'
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className='contentss'>
                <label>Product SubImages</label>
                <div style={{ textAlign: 'center' }}>
                  <input
                    type='file'
                    name='subImages'
                    onChange={handleImageChange}
                    multiple
                  />
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-outline-success'
                disabled={loader ? 'disabled' : ''}
              >
                {!loader ? 'Update Product' : 'wait..'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProducts;
