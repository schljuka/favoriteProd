

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { clearUpdateStatus, loadUser, updateProfile } from '../../redux/slices/UserSlice';

const UpdateProfile = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.authentication);
    const { isUpdated } = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (isUpdated) {
            toast.success('Profile successfully updated');
            dispatch(loadUser());
            dispatch(clearUpdateStatus());
            navigate("/");
            window.location.reload();

        }
    }, [user, isUpdated, dispatch]);


    // useEffect(() => {
    //     if (user) {
    //         setName(user.name);
    //         setEmail(user.email);
    //         setAvatarPreview(user.avatar.url);
    //     }
    // }, [user]);


    // useEffect(() => {
    //     if (isUpdated) {
    //         toast.success('Profile successfully updated');
    //         dispatch(loadUser()).then(() => {
    //             dispatch(clearUpdateStatus());
    //             window.location.reload();
    //         });
    //     }
    // }, [isUpdated, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData)).then(() => {
            dispatch(loadUser());
        });
    };

    const onChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarPreview(reader.result);
            setAvatar(file);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mt-2 mb-5">Update Profile</h1>
                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Avatar Preview'
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file px-5'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept="image/*"
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn update-btn btn-block mt-4 mb-3 w-100"
                                disabled={loading}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
