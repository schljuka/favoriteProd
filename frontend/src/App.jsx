// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

// import HomePage from './components/HomePage/HomePage';
// import LoginPage from './components/user/Login';
// import Register from './components/user/Register';
// import ListProducts from "./components/Product/ListProducts";
// import ProductDetails from './components/Product/ProductDetails';
// import UpdateProfile from './components/user/UpdateProfile';
// import Profile from './components/user/Profile';
// import UpdatedPassword from './components/user/UpdatedPassword';
// import OrdersList from './components/admin/OrdersList';
// import Sidebar from './components/admin/Sidebar';
// import NewProduct from './components/admin/NewProduct';
// import UpdateProduct from './components/admin/UpdateProduct';
// import AdminProductsList from './components/admin/AdminProductList';
// import ProcessOrder from './components/admin/ProcessOrder';
// import UsersList from './components/admin/UsersList';
// import UpdateUser from './components/admin/UpdateUser';
// import Cart from './components/NavBar/Cart';
// import ListOrders from './components/user/ListOrders';
// import ForgotPassword from './components/user/ForgotPassword';
// import NewPassword from './components/user/NewPassword';
// import MainLayout from './components/MainLayout';
// import './App.css';

// function App() {

//     return (
//         <Router>

//             <Routes>
//                 <Route element={<MainLayout />}>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/cart" element={<Cart />} />
//                     <Route path="/me" element={<Profile />} />
//                     <Route path="/me/update" element={<UpdateProfile />} />
//                     <Route path="/password/update" element={<UpdatedPassword />} />
//                     <Route path="/password/forgot" element={<ForgotPassword />} />
//                     <Route path="/password/reset/:token" element={<NewPassword />} />
//                     <Route path="/orders/me" element={<ListOrders />} />

//                     <Route path="/products" element={<ListProducts />} />
//                     <Route path="/products/query" element={<ListProducts />} />
//                     <Route path="/products/all" element={<ListProducts />} />

//                     <Route path="/product/:id" element={<ProductDetails />} />
//                     <Route path="/admin/orders" element={<OrdersList />} />
//                     <Route path="/admin/order/:id" element={<ProcessOrder />} />
//                     <Route path="/admin/users" element={<UsersList />} />
//                     <Route path="/admin/user/:id" element={<UpdateUser />} />
//                     <Route path="/dashboard" element={<Sidebar />} />
//                     <Route path="/admin/product" element={<NewProduct />} />
//                     <Route path="/admin/product/:id" element={<UpdateProduct />} />
//                     <Route path="/admin/products" element={<AdminProductsList />} />

//                 </Route>

//                 {/* Rute koje ne koriste MainLayout */}
//                 <Route path="/register" element={<Register />} />

//                 <Route path="/login" element={<LoginPage />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

















import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, Navigate, useNavigate } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/user/Login';
import Register from './components/user/Register';
import ListProducts from "./components/Product/ListProducts";
import ProductDetails from './components/Product/ProductDetails';
import UpdateProfile from './components/user/UpdateProfile';
import Profile from './components/user/Profile';
import UpdatedPassword from './components/user/UpdatedPassword';
import OrdersList from './components/admin/OrdersList';
import Sidebar from './components/admin/Sidebar';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import AdminProductsList from './components/admin/AdminProductList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import Cart from './components/NavBar/Cart';
import ListOrders from './components/user/ListOrders';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import MainLayout from './components/MainLayout';
import './App.css';

import ProtectedRoute from "./utils/ProtectedRoute"
import ProtectedRouteAdmin from './utils/ProtectedRouteAdmin';

function App() {

    return (
        <Router>
            <Routes>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                    <Route path="/password/update" element={<ProtectedRoute><UpdatedPassword /></ProtectedRoute>} />
                    <Route path="/password/forgot" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
                    <Route path="/password/reset/:token" element={<ProtectedRoute><NewPassword /></ProtectedRoute>} />

                    <Route path="/orders/me" element={<ProtectedRoute><ListOrders /></ProtectedRoute>} />
                    <Route path="/products" element={<ProtectedRoute><ListProducts /></ProtectedRoute>} />
                    <Route path="/products/query" element={<ProtectedRoute><ListProducts /></ProtectedRoute>} />
                    <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />

                    <Route path="/admin/orders" element={<ProtectedRouteAdmin><OrdersList /></ProtectedRouteAdmin>} />
                    <Route path="/admin/order/:id" element={<ProtectedRouteAdmin><ProcessOrder /></ProtectedRouteAdmin>} />
                    <Route path="/admin/users" element={<ProtectedRouteAdmin><UsersList /></ProtectedRouteAdmin>} />
                    <Route path="/admin/user/:id" element={<ProtectedRouteAdmin><UpdateUser /></ProtectedRouteAdmin>} />
                    <Route path="/dashboard" element={<ProtectedRouteAdmin><Sidebar /></ProtectedRouteAdmin>} />
                    <Route path="/admin/product" element={<ProtectedRouteAdmin><NewProduct /></ProtectedRouteAdmin>} />
                    <Route path="/admin/product/:id" element={<ProtectedRouteAdmin><UpdateProduct /></ProtectedRouteAdmin>} />
                    <Route path="/admin/products" element={<ProtectedRouteAdmin><AdminProductsList /></ProtectedRouteAdmin>} />
                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;





