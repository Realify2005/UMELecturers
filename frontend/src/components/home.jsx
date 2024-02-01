import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get JWT token from localStorage (assuming it's stored there upon login)
                const token = localStorage.getItem('token');

                if (!token) {
                    // If token is not present, redirect to login
                    navigate('/login');
                    return;
                }

                // Make a request to a protected backend route
                await axios.get(`${API_URL}/api/verify-login`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const username = localStorage.getItem('username');

                setUser(username);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // Handle error (e.g., redirect to login page)
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <>
            <h1>Main Menu</h1>
            {user && <h2>Hello, {user}</h2>}
            <a href="logout">Logout</a>
        </>
    );
};

export default Home;
