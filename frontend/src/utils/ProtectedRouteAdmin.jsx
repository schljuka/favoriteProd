import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuthAdmin } from './UseAuthAdmin';

const ProtectedRouteAdmin = ({ children }) => {
    const isAdmin = useAuthAdmin();
    if (!isAdmin) {
        return <Navigate to='/' replace />;
    }
    return children;
};

export default ProtectedRouteAdmin;
