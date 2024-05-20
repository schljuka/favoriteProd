// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// import HomePage from './components/HomePage/HomePage';
// import LoginPage from './components/user/Login'; // Pretpostavka: Imate LoginPage komponentu
// import Register from './components/user/Register';
// import ListProducts from "./components/Product/ListProducts";
// import ProductDetails from './components/Product/ProductDetails';
// import NavBar from './components/NavBar/NavBar';
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
// // import { authenticateUser } from "./redux/slices/AuthenticationSlice";

// import './App.css';

// function App() {

//     // const dispatch = useDispatch();

//     // const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);


//     // useEffect(() => {
//     //     const storedUser = localStorage.getItem('user');
//     //     const storedToken = localStorage.getItem('token');

//     //     if (storedUser && storedToken) {
//     //         dispatch(authenticateUser({ user: JSON.parse(storedUser), token: storedToken }));
//     //     }
//     // }, [dispatch]);

//     return (
//         <Router>
//             <NavBar />

//             <Routes>
//                 {/* <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} /> */}



//                 <Route path="/" element={<HomePage />} />

//                 <Route path="/cart" element={<Cart />} />



//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/register" element={<Register />} />

//                 <Route path="/me" element={<Profile />} />
//                 <Route path="/me/update" element={<UpdateProfile />} />
//                 <Route path="/password/update" element={<UpdatedPassword />} />
//                 <Route path="/orders/me" element={<ListOrders />} />


//                 <Route path="/products" element={<ListProducts />} />
//                 <Route path="/products/query" element={<ListProducts />} />

//                 <Route path="/product/:id" element={<ProductDetails />} />



//                 <Route path="/admin/orders" element={<OrdersList />} />

//                 <Route path="/admin/order/:id" element={<ProcessOrder />} />
//                 <Route path="/admin/users" element={<UsersList />} />
//                 <Route path="/admin/user/:id" element={<UpdateUser />} />



//                 <Route path="/dashboard" element={<Sidebar />} />
//                 <Route path="/admin/product" element={<NewProduct />} />
//                 <Route path="/admin/product/:id" element={<UpdateProduct />} />
//                 <Route path="/admin/products" element={<AdminProductsList />} />



//             </Routes>
//         </Router>


//     );
// }

// export default App;





import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/user/Login'; // Pretpostavka: Imate LoginPage komponentu
import Register from './components/user/Register';
import ListProducts from "./components/Product/ListProducts";
import ProductDetails from './components/Product/ProductDetails';
import NavBar from './components/NavBar/NavBar';
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
// import { authenticateUser } from "./redux/slices/AuthenticationSlice";

import './App.css';

function App() {

    // const dispatch = useDispatch();

    // const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);


    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     const storedToken = localStorage.getItem('token');

    //     if (storedUser && storedToken) {
    //         dispatch(authenticateUser({ user: JSON.parse(storedUser), token: storedToken }));
    //     }
    // }, [dispatch]);

    return (
        <Router>
            <NavBar />

            <Routes>
                {/* <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} /> */}

                <Route path='/' element={<MainLayout />}>

                <Route path="/" element={<HomePage />} />

                <Route path="/cart" element={<Cart />} />



                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />

                <Route path="/me" element={<Profile />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/password/update" element={<UpdatedPassword />} />
                <Route path="/orders/me" element={<ListOrders />} />


                <Route path="/products" element={<ListProducts />} />
                <Route path="/products/query" element={<ListProducts />} />

                <Route path="/product/:id" element={<ProductDetails />} />



                <Route path="/admin/orders" element={<OrdersList />} />

                <Route path="/admin/order/:id" element={<ProcessOrder />} />
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/admin/user/:id" element={<UpdateUser />} />



                <Route path="/dashboard" element={<Sidebar />} />
                <Route path="/admin/product" element={<NewProduct />} />
                <Route path="/admin/product/:id" element={<UpdateProduct />} />
                <Route path="/admin/products" element={<AdminProductsList />} />



            </Routes>
        </Router>


    );
}

export default App;















