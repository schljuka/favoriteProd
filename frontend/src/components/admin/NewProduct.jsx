import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, clearCreatedStatus, clearErrorStatus } from '../../redux/slices/ProductSlice'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

const NewProduct = () => {


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const created = useSelector(state => state.product.created)
    const error = useSelector(state => state.product.error)

    useEffect(() => {
        if (created) {
            toast.success("New product successfully created")
            dispatch(clearCreatedStatus());
            navigate("/admin/products")
        }  
        if (error) {
            toast.error("Please, fill in all fields")
            dispatch(clearErrorStatus());
        }

    }, [dispatch, created,error])



    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Books',
        'Clothes/shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);

        if (images && images.length > 0) {
            images.forEach(image => {
                formData.append('images', image)
            })

        }
        dispatch(addProduct(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)
        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })

    }

    return (
        <div>

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>

                        <div className="wrapper my-5">
                            <form className="shadow-lg"
                                onSubmit={submitHandler}
                                encType='multipart/form-data'>
                                <h1 className="mb-4">New Product</h1>

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
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field"
                                        value={category} onChange={(e) => setCategory(e.target.value)} >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>



                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={onChange} />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview"
                                            className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"

                                >
                                    CREATE
                                </button>

                            </form>
                        </div>


                    </Fragment>
                </div>

            </div >
        </div >
    )
}

export default NewProduct;


