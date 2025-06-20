import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
    const studentToken = localStorage.getItem('studentToken');
    const ownerToken = localStorage.getItem('ownerToken');
    const adminToken = localStorage.getItem('adminToken');

    if (role === 'student' && !studentToken) {
        return <Navigate to="/student/login" />;
    }

    if (role === 'owner' && !ownerToken) {
        return <Navigate to="/owner/login" />;
    }

    if (role === 'admin' && !adminToken) {
        return <Navigate to="/admin/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;