import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/user/Login'; // Pretpostavka: Imate LoginPage komponentu
import Register from './components/user/Register';
import ListProducts from "./components/ListProducts"

// import { checkAuthentication } from './redux/slices/AuthenticationSlice';

import './App.css';

function App() {
    // const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    // const dispatch = useDispatch();

    // Provjeri autentikaciju čim se aplikacija pokrene
    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         dispatch(checkAuthentication());
    //     }
    // }, [dispatch]);

    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} /> */}
                <Route path="/" element={<HomePage /> }/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ListProducts />} />


            </Routes>
        </Router>
    );
}

export default App;
