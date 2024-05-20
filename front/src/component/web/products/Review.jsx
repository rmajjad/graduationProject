import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { reviewSchema } from '../validate/Validate';
import axios from 'axios';

export default function Review() {
  const { productsId } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    comment: '',

  };
  const onSubmit = async (review) => {
    const token = localStorage.getItem("UserToken");
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productsId}/review`, review,
      { headers: { Authorization: `Tariq__${token}` } });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: reviewSchema
  });
  const inputs = [
    {
      id: 'comment',
      type: 'text',
      name: 'comment',
      title: 'User comment',
      value: formik.values.comment,

    }
  ];
  const renderInputs = inputs.map((input, index) =>
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />


  );
  return (
    <>
      <div className='form mt-5  py-5'>


        <form className='content ms-3 py-5 ' onSubmit={formik.handleSubmit}>
          <h2 className='mb-3'>Review Product</h2>

          {renderInputs}
          <label className='d-block '>User rating</label>
          <select className='d-block m-auto px-2' name="rating" value={formik.values.rating} onChange={formik.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type='submit' className='mt-2 submit'>Review</button>
        </form>

      </div>
    </>
  )
}
