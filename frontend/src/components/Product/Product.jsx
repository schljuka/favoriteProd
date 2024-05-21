import React from 'react';
import { Link } from 'react-router-dom';


const Product = ({ product }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${4} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto w-auto"
                    src={product.images[0].url}
                    alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <p className="card-text">Price: €{product.price}</p>
                    <Link to={`/product/${product._id}`} className="btn btn-primary mt-auto">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;