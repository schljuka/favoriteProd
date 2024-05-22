import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { allUsers, deleteUser } from "../../redux/slices/UserSlice"
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const UsersList = () => {
    
    const dispatch = useDispatch();
    const { loading, users } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(allUsers());
    }, [dispatch,])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        if (users && users.length > 0) {
            users.forEach(elem => {
                data.rows.push({
                    id: elem._id,
                    name: elem.name,
                    email: elem.email,
                    role: elem.role,
                    actions:
                        <div>
                            <Link to={`/admin/user/${elem._id}`} className='btn btn-primary py-1 px-1'>
                                <i className='fa fa-pencil'></i></Link>
                            <button className="btn btn-danger py-1 px-1 ml-2">
                                <i className='fa fa-trash' onClick={() => deleteUserHandler(elem._id)}></i>
                            </button>
                        </div>
                })
            })
        }

        return data;
    }



    return (
        <div>


            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div>
                        <div className="container container-fluid tablemdb-w">
                            <h1 className="my-5">All Users</h1>
                            {loading ? <Loader /> : (

                                <MDBDataTable
                                    data={setUsers()}
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



        </div>
    )
}

export default UsersList;
