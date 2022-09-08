import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import React from "react";
import Home1 from './Home';
import Products from './product';
import About from './Aboutus';
import AddProducts from './Admin/AddProduct';
import EditDeleteProduct from './Admin/EditDeleteProduct';
import OrderListOfProducts from './product/OrderListOfProducts';
import OrderListAdmin from './Admin/OrderList';
import MyOrders from './MyOrders';


const Pages = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/');
    },[])
    return (
        <>
          <Routes>
            <Route path='/' element={<Home1 />} />
            <Route path='/product' element={<Products />} />
            <Route path='/Aboutus' element={<About />} />
            <Route path='/AddProduct' element={<AddProducts />} />
            <Route path='/EditDeleteProduct' element={<EditDeleteProduct />} />
            <Route path='/OrderListOfProducts' element={<OrderListOfProducts />} />
            <Route path='/ListOfOrders' element={<OrderListAdmin/>} />
            <Route path='/MyOrders' element={<MyOrders/>} />
          </Routes>
        </>
    )
}

export default Pages