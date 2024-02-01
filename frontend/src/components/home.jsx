import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000'

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a request to a protected backend route
                const response = await axios.get(`${API_URL}/api/user-data`);
                console.log("RESPONSE IS ", response);
                setUser(response.data.user);
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
            <h2>Hello, {user}</h2>
        </>
    );
};

export default Home;
