import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

import { updateProduct, getSingleProduct, getProductDetails } from '../../redux/slices/ProductSlice';
import Sidebar from './Sidebar';

const UpdateProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();


    const { error, product } = useSelector(state => state.product);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);



    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [dispatch, id]);


    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setPrice(product.price || '');
            setDescription(product.description || '');
            setCategory(product.category || '');
            setStock(product.stock || '');
            setSeller(product.seller || '');
            setOldImages(product.images || []);
        }
    }, [product]);








    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        if (images && images.length > 0) {
            images.forEach(image => {
                formData.append('images', image)
            })
        }

        dispatch(updateProduct(product._id, formData))
        //navigate("/admin/products");
        //toast.success('Product updated successfully')
    }


    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([]);
        setOldImages([]);

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
                <div className="col-12 col-md-2">

                </div>
                <div className="col-12 col-md-10">
                    <Fragment>

                        <div className="wrapper my-5">
                            <form className="shadow-lg"
                                onSubmit={submitHandler}
                                encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

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

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)} />
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
                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2"
                                            width="55" height="52" />
                                    ))}
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
                                    UPDATE
                                </button>

                            </form>
                        </div>


                    </Fragment>
                </div>
            </div >

        </div >
    )
}

export default UpdateProduct;
