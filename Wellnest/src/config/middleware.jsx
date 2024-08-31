import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{height: '93vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation="grow" variant="info" style={{width: 100, height: 100}} />
            </div>
        );
    }

    return isAuthenticated ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;