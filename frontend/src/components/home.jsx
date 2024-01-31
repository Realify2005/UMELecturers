import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            try {
                // Send the token to your backend for validation
                const response = await axios.post('/api/validate-token', {
                    token: localStorage.getItem('token')
                });
                if (!response.data.valid) {
                    // Token is invalid, redirect to login page
                    navigate('/login');
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                // Handle error (e.g., redirect to login page)
                navigate('/login');
            }
        };

        validateToken();
    }, [navigate]);

    return (
        <>
            <h1>Main Menu</h1>
        </>
    );
};

export default Home;
