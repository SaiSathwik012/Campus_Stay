import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ restricted = false }) => {
    const studentToken = localStorage.getItem('studentToken');
    const ownerToken = localStorage.getItem('ownerToken');
    const adminToken = localStorage.getItem('adminToken');


    if (restricted && (studentToken || ownerToken || adminToken)) {
        if (studentToken) return <Navigate to="/room" />;
        if (ownerToken) return <Navigate to="/owner/dashboard" />;
        if (adminToken) return <Navigate to="/admin/rooms" />;
    }

    return <Outlet />;
};

export default PublicRoute;