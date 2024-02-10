import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/home.css';
import Search from './Search';


const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [totalRatings, setTotalRatings] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/login?status=Unauthorized');
                    return;
                }

                await axios.get(`${import.meta.env.VITE_API_URL}/api/verify-login`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const username = localStorage.getItem('username');

                setUser(username);
                fetchTotalRatings();
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                navigate('/login');
            }
        };

        const fetchTotalRatings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-user-data/total-comments/${user}`);
                setTotalRatings(response.data.totalComments);
            } catch (error) {
                console.error('Failed to fetch total comments: ', error);
            }
        }

        fetchData();
    }, [user, totalRatings, navigate]);

    return (
        <div className="home">
            <header>
                <div className="header-buttons">
                    <Link className="link-to-stats-page" to="/home/stats">View all existing staffs</Link>
                    <Search />
                    <button onClick={() => navigate('/home/add-staff')}>Add Staff</button>
                </div>
                <div className="profile">
                    {user && <h2>Hello, {user}</h2>}
                    <p>You have <Link to={`/home/user/${user}`}>{totalRatings} active ratings</Link></p>
                    <button onClick={() => navigate('/logout')}>Log out</button>
                </div>
            </header>
            <div className="main-content">
                <Outlet />
            </div>
            <Sidebar />
        </div>
    );
};

export default Home;
