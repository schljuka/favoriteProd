import React, { Fragment, useEffect, useState } from 'react'



import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
// import { updatePassword, clearErrors } from '../../actions/userActions';
import { updatedPassword } from '../../redux/slices/UserSlice';
import { authenticateUser } from "../../redux/slices/AuthenticationSlice";
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const UpdatedPassword = () => {
    const { id } = useParams();
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.user)

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            dispatch(authenticateUser({ user: JSON.parse(storedUser), token: storedToken }));
        }
    }, [dispatch]);



    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')



    useEffect(() => {

    }, [])


    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        dispatch(updatedPassword(id, formData))
    }



    return (
        <div>

            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} >
                            <h1 className="mt-2 mb-5">Update Password</h1>
                            <div className="form-group">
                                <label htmlFor="old_password_field">Old Password</label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="new_password_field">New Password</label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn update-btn btn-block mt-4 mb-3 w-100"
                                disabled={loading ? true : false}>Update Password</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdatedPassword;

