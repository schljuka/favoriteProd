import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllProducts, selectProducts, selectLoading, selectError } from "../redux/slices/ProductSlice";
import Loader from "./layout/Loader";
import Product from "./Product/Product";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <div>Error occurred while fetching products.</div>
            ) : (
                <div>
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;

