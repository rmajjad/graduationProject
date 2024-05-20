import React from 'react'
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from '../component/web/home/Home.jsx';
import Catogeries from '../component/web/catogeries/Catogeries.jsx';
import DashboardCatogeries from '../component/dashboard/Category/Category.jsx';
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
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'sendcode',
        element: <Sendcode />
      },
      {
        path: 'forgetPassword',
        element: <ForgetPassword />
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "catogeries",
        element: <Catogeries />,
      },
      {
        path: "catogory/:catogoryId",
        element: <CategoriesDetails />,
      },
      {
        path: "products/:productsId",
        element: <Product />,
      },
      {
        path: "products",
        element: <Pagination />,
      },
      {
        path: "products/:productsId/review",
        element: <Review />,
      },
      {
        path: "cart",
        element:
          <ProductRoute>
            <Cart />
          </ProductRoute>

      },
      {
        path: 'chat',
        element: <Chat />
      },
      {
        path: "checkout",
        element: <Ckeckout />
      },
      {
        path: "profile",
        element:
          <ProductRoute>
            <Profile />
          </ProductRoute>,
        children: [{
          index: true,
          element: <Userinfo />
        },
        {
          path: 'contact',
          element: <Usercontact />
        },
        {
          path: 'order',
          element: <Order />
        }


        ]
      },
      {
        path: "*",
        element: <h2>404 error not found ... web</h2>,

      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "Category",
        element: <DashboardCatogeries />,
      },
      {
        path: "AddCategory",
        element: <DashboardAddCategory />,
      },
      {
        path: "*",
        element: <h2>404 error not found ... dashboard</h2>,

      }
    ]
  },
]);
