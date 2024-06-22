import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ToastContainer} from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContexProvider } from './component/web/context/User.jsx'
import CartContexProvider from './component/web/context/Cart.jsx'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <UserContexProvider>
       <CartContexProvider>
         <App/>
      </CartContexProvider>
    </UserContexProvider>
    </QueryClientProvider>
    </>
)
