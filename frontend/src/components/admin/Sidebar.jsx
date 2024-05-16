import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">

                    <li>
                        <div className="ml-4 dropdown">
                            <Link to="#!" className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-product-hunt"></i>Products
                            </Link>
                            <div className="dropdown-menu bg-secondary">
                                <ul className="list-unstyled background-white">
                                    <li>
                                        <Link to="/admin/products">
                                            <i className="fa fa-clipboard"></i>
                                            All
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/product">
                                            <i className="fa fa-plus"></i>
                                            Create
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li>
                        <Link to="/admin/orders">
                            <i className="fa fa-shopping-basket"></i>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users">
                            <i className="fa fa-users"></i>
                            Users
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
