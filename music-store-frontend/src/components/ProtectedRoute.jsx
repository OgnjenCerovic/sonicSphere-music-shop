import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredStatus }) => {
    const { user } = useContext(AuthContext);

    // If user data is still loading or not yet fetched
    if (user === null) {
        return <p>Loading...</p>; // You might want to add a proper loading indicator
    }

    // Redirect if user is not logged in or doesn't have the required status
    if (!user || user.u_status !== requiredStatus) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
