import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import ListProducts from "../Product/ListProducts";
import { logout } from "../../redux/slices/AuthenticationSlice";

import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


import { useState } from 'react';
import { fetchAllProducts, queryProducts } from '../../redux/slices/ProductSlice';


const NavBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const { user, error, loading } = useSelector(state => state.authentication);
    const nameRef = useRef(null);

    const location = useLocation();




    const logoutHandler = () => {
        dispatch(logout());
        toast.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch(queryProducts(location.search));
    }, [location.search]);


    const searchHandler = (e) => {
        e.preventDefault();
        let query = "";
        if (nameRef && nameRef.current && nameRef.current.value !== " ") {
            query += query === '' ? `?name=${nameRef.current.value}` : `&name=${nameRef.current.value}`
        }
        dispatch(queryProducts(query));
        navigate(`/products/query${query}`);
    };




    return (
        <div>
            <div className="home-page-container">
                <nav className="navbar row">
                    <div className="col-12 col-md-3">
                        <div className="navbar-brand">
                            <Link to="/">
                                <img src="/images/logo.png" alt="logo" />
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                        <form onSubmit={searchHandler}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="search_field"
                                    className="form-control"
                                    placeholder="Enter Product Name ..."
                                    name="keyword"
                                    value={keyword}
                                    ref={nameRef}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button id="search_btn" className="btn">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-12 col-md-3 mt-4 mt-md-2 text-center cart">
                        <Link to="/cart" style={{ textDecoration: 'none' }}>
                            <span id="cart" className="ml-3">Cart</span>
                            <span id="cart_count">33</span>
                        </Link>

                        {user ? (

                            <div className="ml-4 dropdown">
                                <Link to="#!" className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <figure className="avatar avatar-nav">
                                        <img src={user.avatar && user.avatar.url} alt={user && user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>
                                    <span>{user && user.name}</span>
                                </Link>

                                <div className="dropdown-menu">
                                    {
                                        user && user.role === 'admin' && (
                                            <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                        )
                                    }
                                    <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                    <Link className="dropdown-item" to="/me">Profile</Link>
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Logout</Link>
                                </div>
                            </div>
                        ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                    </div>
                    <Toaster />
                </nav>

            </div>

        </div>
    )
}

export default NavBar
