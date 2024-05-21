// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useSelector } from 'react-redux';


// function AdminRoute({ children }) {
//     const { token } = useAuth();
//     const user = useSelector(state => state.authentication);

//     return user.role === "admin" ? children : <Navigate to="/login" replace />;
// }

// export default AdminRoute;
