import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allOrders, createOrder } from "../../redux/slices/OrderSlice";
import Loader from "../layout/Loader";
import { getProductDetails } from "../../redux/slices/ProductSlice"

const ProductDetails = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.selectedProduct);
    const { loading, error } = useSelector(state => state.product);
    const [quantity, setQuantity] = useState(1);
    const user = useSelector(state => state.authentication);
    const { orders } = useSelector(state => state.order);


    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error occurred while fetching product details.</div>;
    }


    const increaseQty = () => {
        if (quantity >= product.stock) {
            return;
        }
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQty = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(prevQuantity => prevQuantity - 1);
    };

    const addToCart = () => {
        const orderItems = [{
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            quantity: quantity,
            user: user.user._id,
            userName: user.user.name // 
        }];
        dispatch(createOrder({ orderItems })).then(() => {
            dispatch(allOrders());
            toast.success("Item added in favorite cart");
        });
    };

    const isItemInCart = orders.some(order => order.orderItems.some(item => item.product === id));

    return (
        <div>
            {product && (
                <div className="container container-fluid">
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-50" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>
                            <hr />
                            <p id="product_price">{product.price} €</p>
                            <p>Stock : {product.stock}</p>

                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            {isItemInCart ? (
                                <button type="button" id="cart_btn" className="btn btn-primary d-inline" disabled>Item added in favorite cart</button>
                            ) : (
                                <button type="button" id="cart_btn" className="btn btn-primary d-inline" disabled={product.stock === 0} onClick={addToCart}>Add to favorite cart</button>
                            )}

                            <hr />
                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                        </div>
                    </div>
                </div>

            )}
            <ToastContainer />

        </div>
    );
}

export default ProductDetails;
