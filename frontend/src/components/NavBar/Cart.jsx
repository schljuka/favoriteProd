import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemFromOrder, myOrders } from '../../redux/slices/OrderSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {

    const id = useParams();
    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.order);

    const navigate = useNavigate();
    // useEffect(() => {
    //     dispatch(myOrders())
    // }, [dispatch])

    const removeCartItemHandler = (orderId, itemId) => {
        dispatch(deleteItemFromOrder({ orderId, itemId })).then(() => {
            dispatch(myOrders());
            toast.success("Item successfully deleted from favorite cart")
        });
    }

    return (
        <div>
            <div className="container container-fluid">
                <div>
                    {/* <h2 className="mt-5">Your Favorite Item: <b>{orders.length} items</b></h2> */}
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {orders && orders.length > 0 ? (
                                orders.map(order => (
                                    <div key={order._id}>
                                        <h2 className="my-5">Order # {order._id}</h2>
                                        <h2 className="my-5">User: {order.userName}</h2>
                                        <h4 className="my-4">Order Items:</h4>

                                        {order.orderItems.map(item => (
                                            <div key={item.product}>
                                                <hr />
                                                <div className="cart-item">
                                                    <div className="row">
                                                        <div className="col-4 col-lg-3">
                                                            <img src={item.image} alt={item.name} height="90" width="115" />
                                                        </div>
                                                        <div className="col-5 col-lg-3">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                            <p id="card_item_price">{item.price} €</p>
                                                        </div>
                                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(order._id, item._id)}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                ))
                            ) : (
                                <div className='mt-5'>Your Favorite Cart is empty</div>
                            )}
                            <hr />
                            <ToastContainer />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;







// orders.orderItems.map(item => (
//     <div key={item.product}>
//         <hr />


//         <div className="cart-item">
//             <div className="row">
//                 <div className="col-4 col-lg-3">
//                     <img src={item.image} alt="Laptop" height="90" width="115" />
//                 </div>

//                 <div className="col-5 col-lg-3">
//                     <Link to={`/products/${item.product}`}>{item.name}</Link>
//                 </div>


//                 <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                     <p id="card_item_price">{item.price} €</p>
//                 </div>


//                 <div className="col-4 col-lg-1 mt-4 mt-lg-0">
//                     <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}></i>
//                 </div>

//             </div>
//         </div>
//     </div>
// ))
// }