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
                <Route path="/" element={<HomePage />} />
              

              

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />

                <Route path="/me" element={<Profile />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/password/update" element={<UpdatedPassword />} />


                <Route path="/products" element={<ListProducts />} />
                <Route path="/products/query" element={<ListProducts />} />

                <Route path="/product/:id" element={<ProductDetails />} />

            </Routes>
        </Router>
    );
}

export default App;
