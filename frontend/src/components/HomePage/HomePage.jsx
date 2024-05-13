import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import ListProducts from "../ListProducts"


import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { user, error, loading } = useSelector(state => state.authentication);






    const searchHandler = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value.trim();
        if (keyword) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    }

    return (
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
                                <Link className="dropdown-item text-danger" to="/">Logout</Link>
                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                </div>
                <Toaster />
            </nav>
<ListProducts/>
        </div>
        
    );
}



// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';

// export default function HomePage() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { user, loading } = useSelector(state => state.authentication);
  
//     const isAuthenticated = user && !loading;

//     const searchHandler = (e) => {
//         e.preventDefault();
//         const keyword = e.target.elements.keyword.value.trim();
//         if (keyword) {
//             navigate(`/search/${keyword}`);
//         } else {
//             navigate('/');
//         }
//     };

//     return (
//         <div className="home-page-container">
//             <nav className="navbar row">
//                 <div className="col-12 col-md-3">
//                     <div className="navbar-brand">
//                         <Link to="/">
//                             <img src="/images/logo.png" alt="logo" />
//                         </Link>
//                     </div>
//                 </div>

//                 <div className="col-12 col-md-6 mt-2 mt-md-0">
//                     <form onSubmit={searchHandler}>
//                         <div className="input-group">
//                             <input
//                                 type="text"
//                                 id="search_field"
//                                 className="form-control"
//                                 placeholder="Enter Product Name ..."
//                                 name="keyword"
//                             />
//                             <div className="input-group-append">
//                                 <button id="search_btn" className="btn">
//                                     <i className="fa fa-search" aria-hidden="true"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>

//                 <div className="col-12 col-md-3 mt-4 mt-md-2 text-center cart">
//                     {isAuthenticated ? (
//                         <div className="ml-4 dropdown">
//                             <Link
//                                 to="#!"
//                                 className="btn btn-secondary dropdown-toggle"
//                                 role="button"
//                                 data-bs-toggle="dropdown"
//                                 aria-expanded="false"
//                             >
//                                 <figure className="avatar avatar-nav">
//                                     <img
//                                         src={user.avatar && user.avatar.url}
//                                         alt={user && user.name}
//                                         className="rounded-circle"
//                                     />
//                                 </figure>
//                                 <span>{user && user.name}</span>
//                             </Link>

//                             <div className="dropdown-menu">
//                                 {user.role === 'admin' && (
//                                     <Link className="dropdown-item" to="/dashboard">
//                                         Dashboard
//                                     </Link>
//                                 )}
//                                 <Link className="dropdown-item" to="/orders/me">
//                                     Orders
//                                 </Link>
//                                 <Link className="dropdown-item" to="/me">
//                                     Profile
//                                 </Link>
//                                 <Link className="dropdown-item text-danger" to="/">
//                                     Logout
//                                 </Link>
//                             </div>
//                         </div>
//                     ) : (
//                         !loading && (
//                             <Link to="/login" className="btn ml-4" id="login_btn">
//                                 Login
//                             </Link>
//                         )
//                     )}
//                 </div>
//                 <Toaster />
//             </nav>
//         </div>
//     );
// }
