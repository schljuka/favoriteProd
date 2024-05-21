import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

import { getOrderDetails } from "../../redux/slices/OrderSlice"



const ProcessOrder = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();


    const order = useSelector(state => state.order.selectedOrder);




    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);



    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <div>
                    <div className="container container-fluid tablemdb-w">
                        <div className="row d-flex justify-content-around">
                            <div className="col-12 col-lg-7 order-details">
                                {order ? (
                                    <>
                                        <h2 className="my-5">Order # {order._id}</h2>
                                        <h2 className="my-5">User:  {order.userName}</h2>

                                        <h4 className="my-4">Order Items:</h4>
                                        <hr />
                                        <div className="cart-item my-1">
                                            {order.orderItems && order.orderItems.length > 0 ? (
                                                order.orderItems.map((item) => (
                                                    <div key={item.product} className="row my-5">
                                                        <div className="col-4 col-lg-2">
                                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                                        </div>
                                                        <div className="col-5 col-lg-5">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                            <p>{item.price} €</p>
                                                        </div>
                                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                            <p>{item.quantity} Piece(s)</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No items in this order.</p>
                                            )}
                                        </div>
                                        <hr />
                                    </>
                                ) : (
                                    <p className='mt-5'>No order details available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}

export default ProcessOrder;


