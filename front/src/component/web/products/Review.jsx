import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { reviewSchema } from '../validate/Validate';

export default function Review() {
  const { productsId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    comment: '',
    rating: 1, // Ensure rating has an initial value as a number
  };

  const onSubmit = async (review) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productsId}/review`,
        review,
        { headers: { Authorization: `Rama__${token}` } }
      );
      if (data.message === 'success') {
        toast.success('Review submitted successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Your order is not delivered yet!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: reviewSchema,
  });

  return (
    <div className='form mt-5 py-5 bg'>
      <form className='content ms-3 py-5' onSubmit={formik.handleSubmit}>
        <h2 className='mb-3'>Review Product</h2>
        <label>User comment</label>
        <input
          type='text'
          id='comment'
          name='comment'
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.comment && formik.touched.comment && (
          <div className='error'>{formik.errors.comment}</div>
        )}
        <label className='d-block'>User rating</label>
        <select
          className='d-block m-auto px-2'
          name="rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {formik.errors.rating && formik.touched.rating && (
          <div className='error'>{formik.errors.rating}</div>
        )}
        <button
          type='submit'
          className='mt-2 submit'
          disabled={!formik.isValid || isLoading}
        >
          {!isLoading ? "Review" : "waiting.."}
        </button>
      </form>
    </div>
  );
}
