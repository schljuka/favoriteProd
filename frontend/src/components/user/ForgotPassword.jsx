import React, { useEffect, useState } from 'react';



import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { clearMessage, forgotPassword } from '../../redux/slices/UserSlice';
const ForgotPassword = () => {


    const [email, setEmail] = useState('')

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const { message } = useSelector(state => state.user?.message)
    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch(clearMessage);
        }
    }, [dispatch, message])


    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData));
    }





    return (
        <div>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                        </button>

                    </form>
                </div>
                <ToastContainer />

            </div>

        </div>

    )
}

export default ForgotPassword;
