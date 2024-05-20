import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
import { Bounce, toast } from "react-toastify";


export const CartContex = createContext(null);

export default function CartContexProvider({ children }) {
  let [count, setCount] = useState(0);
  const addCartContex = async (productId) => {
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } });
      getCartContext();
      setCount(++count);
      return data;
    } catch (error) {

    }

  }
  const getCartContext = async () => {
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        { headers: { Authorization: `Tariq__${token}` } });
      return data;
    } catch (error) {

    }
  }
  const getcountCartContext = async () => {
    try {
      let countproduct = 0;
      const data = await getCartContext();
      await data.products.map((product) => {
        countproduct = countproduct + product.quantity
        console.log(product);
        setCount(countproduct);
      })
      console.log(count);
      return count;

    } catch (error) {

    }
  }
  const removeCartContext = async (productId) => {
    try {
      const products = await getCartContext();
      const getproduct = products.products.find((ele) => {
        console.log(ele);
        return ele.productId == productId;
      })
      let countproduct = count - getproduct.quantity;

      const token = localStorage.getItem('UserToken');
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } });
      setCount(countproduct);
      return data;
    } catch (error) {
      console.log(error);
    }

  }
  const clearCart = async () => {
    if (count <= 0) {
      toast.error('The cart is empty', {
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
    }
    else {
      try {
        const token = localStorage.getItem('UserToken');
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, {},
          { headers: { authorization: `Tariq__${token}` } })
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
  const incraseQuantityContext = async (productId) => {
    const token = localStorage.getItem('UserToken');
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, { productId },
      { headers: { authorization: `Tariq__${token}` } });
    getCartContext();
    setCount(++count);
    return data;

  }
  const decraseQuantityContext = async (productId) => {
    const token = localStorage.getItem('UserToken');
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, { productId },
      { headers: { authorization: `Tariq__${token}` } });
    setCount(--count);
    return data;
  }

  useEffect(
    () => {
      getcountCartContext();
    }, [])



  return <CartContex.Provider value={{ addCartContex, getCartContext, removeCartContext, count, setCount, getcountCartContext, clearCart, incraseQuantityContext, decraseQuantityContext }}>
    {children}
  </CartContex.Provider>;
}

