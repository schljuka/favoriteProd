import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <p className="card-text">Price: €{product.price}</p>
                    {/* Add any additional product information you want to display */}
                    <Link to={`/product/${product._id}`} className="btn btn-primary mt-auto">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
