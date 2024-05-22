import { MDBDataTable } from 'mdbreact';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { allOrders, deleteOrder } from '../../redux/slices/OrderSlice';
import Loader from "../layout/Loader";
import Sidebar from './Sidebar';

const OrdersList = () => {

    const { orders, loading } = useSelector(state => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allOrders());
    }, [dispatch]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));

    }


    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name User',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        };

        if (orders && orders.length > 0) {
            orders.forEach(order => {
                data.rows.push({
                    id: order._id,
                    name: order.userName,
                    actions:
                        <div>
                            <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-2'>
                                <i className='fa fa-eye'></i>
                            </Link>
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </div>
                });
            });
        }

        return data;
    };






    return (

        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">

                <div>
                    <div className="container container-fluid tablemdb-w">
                        <h1 className="my-5">All Orders</h1>
                        {loading ? <Loader /> : (

                            <MDBDataTable
                                data={setOrders()}
                                className='px-3 mdbtable'
                                bordered
                                striped
                                hover
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OrdersList;
