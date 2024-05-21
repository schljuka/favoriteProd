import React, { Fragment, useEffect, useState } from 'react'


import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import { resetPassword } from '../../redux/slices/UserSlice';
const NewPassword = () => {



    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const { token } = useParams();

    const navigate = useNavigate();



    const dispatch = useDispatch();


    const { error, success } = useSelector(state => state.user)

    useEffect(() => {
        // if (error) {
        //     toast.error(error);
        //     dispatch(clearErrors());
        // }

        // if (success) {
        //     toast.success('Password updated successfully')
        //     navigate('/login')
        // }

    }, [dispatch, error, navigate, success])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword({token:token, formData:formData}))
    }





    return (
        <div>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">New Password</h1>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm_password_field">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                id="new_password_button"
                                type="submit"
                                className="btn btn-block py-3">
                                Set Password
                            </button>

                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default NewPassword;
