// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'
// import { loginUser } from "../../redux/slices/AuthenticationSlice";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { isAuthenticated, error } = useSelector(state => state.authentication);

//     const submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(loginUser({ email: email, password: password }));

//     }

//     useEffect(() => {
//         if (isAuthenticated) {
//             toast('User Login successfull');
//             navigate("/");
//         }
//         if (error) {
//             toast.error("Invalid username or password");
//             // dispatch(clearErrors());

//         }
//     }, [isAuthenticated, error, navigate])



//     return (
//         <div className="container container-fluid">
//             <div className="row wrapper">
//                 <div className="col-10 col-lg-5">
//                     <form className="shadow-lg" onSubmit={submitHandler}>
//                         <h1 className="mb-3">Login</h1>
//                         <div className="form-group">
//                             <label htmlFor="email_field">Email</label>
//                             <input
//                                 type="email"
//                                 id="email_field"
//                                 className="form-control"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)} />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="password_field">Password</label>
//                             <input
//                                 type="password"
//                                 id="password_field"
//                                 className="form-control"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)} />
//                         </div>

//                         <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>


//                         <button
//                             id="lgn_btn"
//                             type="submit"
//                             className="btn">
//                             LOGIN
//                         </button>

//                         <Link to="/register" className="float-left mt-3">New User?</Link>
//                     </form>
//                 </div>

//             </div>
//             <ToastContainer />
//         </div>

//     );
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "../../redux/slices/AuthenticationSlice";
import { setCurrentUser } from "../../redux/slices/UserSlice"; // Pretpostavka da postoji slice za korisnika

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, error } = useSelector(state => state.authentication);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: email, password: password }));
    }

    useEffect(() => {
        if (isAuthenticated) {
            toast('User Login successfull');
            navigate("/");
        }
        if (error) {
            toast.error("Invalid username or password");
            // dispatch(clearErrors());
        }
    }, [isAuthenticated, error, navigate])

    const handleLogin = (userData) => {
        dispatch(setCurrentUser(userData));
    };

    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                autoComplete="current-password"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                        <button
                            id="lgn_btn"
                            type="submit"
                            className="btn">
                            LOGIN
                        </button>

                        <Link to="/register" className="float-left mt-3">New User?</Link>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
