import React, { useEffect } from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
