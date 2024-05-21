// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import 'react-toastify/dist/ReactToastify.css';
// import { fetchAllProducts } from "../../redux/slices/ProductSlice";
// import Loader from "../layout/Loader";
// import Product from "./Product";
// import ProductDetails from './ProductDetails';
// import { CatalogSearchPageNavigator } from './SearchPageNavigator';
// import PageNavigator from "./PageNavigator";
// import { useLocation } from "react-router-dom";
// import {  queryProducts } from '../../redux/slices/ProductSlice';

// const ListProducts = () => {



//     const dispatch = useDispatch();
//     const { products, loading, error } = useSelector(state => state.product);
//     const location = useLocation();




//     useEffect(() => {
//         // Ako postoji pretraga, koristi queryProducts, inače fetchAllProducts
//         if (location.search) {
//             dispatch(queryProducts(location.search));
//         } else {
//             dispatch(fetchAllProducts());
//         }
//     }, [location.search]);



//     return (
//         <div className="container container-fluid">
//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <div>Error occurred while fetching products.</div>
//             ) : (
//                 <div className='row'>
//                     {products.map(product => (
//                         <Product key={product._id} product={product} />
//                     ))}
//                 </div>
//             )}
//             {location.search ? <CatalogSearchPageNavigator /> : <PageNavigator/>}
//         </div>
//     );
// };


// export default ListProducts;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllProducts, fetchProductsByPage } from "../../redux/slices/ProductSlice";
import Loader from "../layout/Loader";
import PageNavigator from "./PageNavigator";
import Product from "./Product";
import { CatalogSearchPageNavigator } from './SearchPageNavigator';
import { queryProducts } from '../../redux/slices/ProductSlice';


const ListProducts = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);
    const location = useLocation();




    useEffect(() => {
        // Ako postoji pretraga, koristi queryProducts, inače fetchAllProducts
        if (location.search) {
            dispatch(queryProducts(location.search));
        } else {

            dispatch(fetchAllProducts());
        }
    }, [location.search]);




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
            {location.search ? <CatalogSearchPageNavigator /> : <PageNavigator />}
        </div>
    );
};

export default ListProducts;

