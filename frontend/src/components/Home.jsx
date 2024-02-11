import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/home.css';
import Search from './Search';


const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [totalRatings, setTotalRatings] = useState(0);
    const username = localStorage.getItem('username');

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

                setUser(username);
                fetchTotalRatings();
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                navigate('/login');
            }
        };

        const fetchTotalRatings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user-data/total-comments/${user}`);
                setTotalRatings(response.data.totalComments);
            } catch (error) {
                console.error('Failed to fetch total comments: ', error);
            }
        }

        fetchData();
    }, [user, totalRatings, username, navigate]);

    const handleClick = () => {
        if (username === 'guest') {
            setError(<>Error: You must <Link to="/signup">sign up</Link> to add staff</>)
            setTimeout(() => {
                setError(null);
            }, 3000); // Make error message disappear after 3 seconds cooldown
        }
        else {
            navigate('/home/add-staff');
        }
    }

    return (
        <div className="home">
            <header>
                <div className="header-buttons">
                    <Link className="link-to-stats-page" to="/home/stats">View all existing staffs</Link>
                    <Search />
                    <button onClick={handleClick}>Add Staff</button>
                    <p id="error">{error}</p>
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
