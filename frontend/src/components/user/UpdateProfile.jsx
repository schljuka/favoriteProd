import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

import { fetchUserDetails, updateUser } from '../../redux/slices/UserSlice';



const UpdateProfile = () => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const navigate = useNavigate();



    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.authentication);
   

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
    }, [user]);




    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateUser(formData))

        //dispatch(fetchUserDetails());
    }

    const onChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }


    return (
        <div>

            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mt-2 mb-5">Update Profile</h1>

                            <div className="form-group">
                                <label htmlFor="email_field">Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
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
                                    name='email'
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

                            <button type="submit" className="btn update-btn btn-block mt-4 mb-3 w-100"
                                disabled={loading ? true : false}>Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >


    )
}

export default UpdateProfile;


