import React from 'react'
import{
  createBrowserRouter,
}from "react-router-dom";
import Home from '../component/web/home/Home.jsx';
import Catogeries from '../component/web/catogeries/Catogeries.jsx';
import  DashboardCatogeries from '../component/dashboard/Category/Category.jsx';
import DashboardLayout from './DashboardLayout.jsx';
import Cart from '../component/web/cart/Cart.jsx';
import Product from '../component/web/products/Product.jsx';
import CategoriesDetails from '../component/web/catogeries/CategoriesDetails.jsx'
import ProductRoute from '../component/web/productedroute/ProductRoute.jsx';
import Profile from '../component/web/profile/Profile.jsx';
import Userinfo from '../component/web/profile/Userinfo.jsx';
import Usercontact from '../component/web/profile/Usercontact.jsx';
import Login from '../component/auth/login/Login.jsx';
import Register from '../component/auth/register/Register.jsx';
import Sendcode from '../component/auth/Sendcode.jsx';
import ForgetPassword from '../component/auth/ForgetPassword.jsx';
import Ckeckout from '../component/ckeckout/Ckeckout.jsx';
import Order from '../component/web/profile/Order.jsx';
import Layouts from './Layouts.jsx';
import Pagination from '../component/web/pagination/Pagination.jsx';
import Review from '../component/web/products/Review.jsx';
import Chat from '../component/web/chat/Chat.jsx';
import DashboardAddCategory from '../component/dashboard/AddCategory/AddCategory.jsx';
import LoginUser from "../component/dashboard/Login/Login.jsx";
import UserPage from "../component/dashboard/Users/Users.jsx";
import UpdateUser from "../component/dashboard/Update/UpdateUser.jsx";
import AllProducts from "../component/dashboard/Products/Products.jsx";
import UpdateCategory from "../component/dashboard/UpdateCategory/UpdateCategory.jsx";
import AddProducts from "../component/dashboard/AddProduct/AddProducts.jsx";
import Orders from "../component/dashboard/Orders/Orders.jsx";
import OrderProduct from "../component/dashboard/OrderProduct/OrderProduct.jsx";
import OrderStatus from "../component/dashboard/OrderStatus/OrderStatus.jsx"
import UpdateProducts from '../component/dashboard/UpdateProduct/UpdateProducts.jsx';
import CategoryProducts from '../component/dashboard/ProductWithCate/CategoryProducts.jsx';
import AddProWCate from '../component/dashboard/AddProWCate/AddProWCate.jsx';
import Admin from '../component/dashboard/Admin/Admin.jsx'
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts/>,
    children :[
      {
        path:'register',
        element:<Register/>
      },
      {
        path:'login',
        element:<Login />
      },
      {
        path:'sendcode',
        element:<Sendcode/>
      },
      {
        path:'forgetPassword',
        element:<ForgetPassword/>
      },
    {
      index:true,
      element:<Home/>,
    },
    {
      path: "catogeries",
      element: <Catogeries/>,
    },
    {
      path: "catogeries/:catogoryId",
      element: <CategoriesDetails/>,
    },
    {
      path: "products/:productsId",
      element: <Product/>,
    },
    {
      path: "products",
      element: <Pagination/>,
    },
    {
      path: "products/:productsId/review",
      element: <Review/>,
    },
    {
      path:"cart",
      element:
      <ProductRoute>
          <Cart/>
      </ProductRoute>
      
    },
    {
      path:'chat',
      element:<Chat/>
    },
    {
      path:"checkout",
      element:<Ckeckout/>
    },
    {
      path: "profile",
      element: 
      <ProductRoute>
         <Profile />
      </ProductRoute>,
      children:[{
        index:true,
        element:<Userinfo/>
      },
      {
        path:'contact',
        element:<Usercontact/>
      },
      {
        path:'order',
        element:<Order/>
      }


      ]
    },
    {
      path:"*",
      element:<h2>404 error not found ... web</h2>,

    }
  ]
},
{
  path: "/dashboard",
  element:<DashboardLayout/>,
  children:[
    {
      path:"/dashboard/",
      element:<Admin/>,
    },
    {
      path:"Category",
      element:<DashboardCatogeries/>,
    },

    {
      path:"AddProWCate",
      element:<AddProWCate/>,
    },
    {
      path:"AddCategory",
      element:<DashboardAddCategory/>,
    },
    {
      path:"CategoryProducts",
      element:<CategoryProducts/>,
    },
    {
      path:"AddProducts",
      element:<AddProducts/>,
    },
    {
      path:"AddUser",
      element:<LoginUser/>,
    },
    {
      path:"AllProducts",
      element:<AllProducts/>,
    },
    {
      path:"UpdateUser",
      element:<UpdateUser/>,
    },
    {
      path:"UpdateCategory",
      element:<UpdateCategory/>,
    },
    {
      path:"UpdateProducts",
      element:<UpdateProducts/>,
    },
    {
      path:"Users",
      element:<UserPage/>,
    },
    {
      path:"Orders",
      element:<Orders/>,
    },
    {
      path:"OrderProduct",
      element:<OrderProduct/>,
    },
    {
      path:"OrderStatus",
      element:<OrderStatus/>,
    },
    {
      path:"*",
      element:<h2>404 error not found ... dashboard</h2>,

    }
]},
]);