import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

import { getAdminProducts, deleteProduct } from "../../redux/slices/ProductSlice"


const AdminProductList = () => {

    const navigate = useNavigate();


    const dispatch = useDispatch();

    const { products, loading } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch])


    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        if (products && products.length > 0) {
            products.forEach(product => {
                data.rows.push({
                    id: product._id,
                    name: product.name,
                    price: `${product.price} €`,
                    stock: product.stock,
                    actions:
                        <Fragment>
                            <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-1'>
                                <i className='fa fa-pencil'></i>
                            </Link>
                            <button className="btn btn-danger py-1 px-1 ml-2">
                                <i className='fa fa-trash' onClick={() => deleteProductHandler(product._id)}
                                ></i>
                            </button>
                        </Fragment>
                })
            })
        }

        return data;
    }


    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (



        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="container container-fluid tablemdb-w">
                        <h1 className="my-5">All Products</h1>
                        {loading ? <Loader /> : (

                            <MDBDataTable
                                data={setProducts()}
                                className='px-3 mdbtable'
                                bordered
                                striped
                                hover
                            />
                        )}
                    </div>
                </Fragment>
            </div>
        </div>




    )
}

export default AdminProductList;


