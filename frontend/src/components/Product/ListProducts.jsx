import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllProducts, queryProducts } from "../../redux/slices/ProductSlice";
import Loader from "../layout/Loader";
import Product from "./Product";
import { SearchPageNavigator } from './SearchPageNavigator';


const ListProducts = () => {

    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);
    const location = useLocation();


    useEffect(() => {
        if (location.search) {
            dispatch(queryProducts(location.search));
        } else {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, location.search]);




    return (
        <div className="container container-fluid">
            {loading ? (
                <Loader />
            ) : error ? (
                <div>Error occurred while fetching products.</div>
            ) : (
                <div className='row'>
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
            {/* {location.search ? <SearchPageNavigator /> : <PageNavigator />} */}
            {<SearchPageNavigator />}
        </div>
    );
};

export default ListProducts;

