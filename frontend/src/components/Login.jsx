import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/login.css'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        document.body.classList.add('login-page');

        return () => {
            document.body.classList.remove('login-page');
        }
    }, [])

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const statusMessage = searchParams.get('status');
        if (statusMessage === 'Unauthorized') {
            setError('Please login to continue')
        } else if (statusMessage === 'logoutSuccess') {
            setSuccess('Log out Successful')
        }
    }, [location]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, credentials);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username.username);
            navigate('/home/welcome');
        } catch (error) {
            setError(error.response.data.message);
            setSuccess('');
        }
    }

    const handleGuestLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
                username: 'guest',
                password: 'guest'
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username.username);
            navigate('/home/welcome');
        } catch (error) {
            setError(error.response.data.message);
            setSuccess('');
        }
    }

    return (
        <div className="login-container">
            <h2>Welcome back</h2>
            <form onSubmit={handleSubmit} id="login-form">
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </div>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit">Login</button>
            </form>
            <button className="guest-login" onClick={handleGuestLogin}>Login as Guest</button>
            <p>Don't have an account? <Link to='/signup'>Sign up</Link> instead!</p>
            <p className="no-login">* <strong>IMPORTANT: Login is currently not possible</strong> as backend is no longer being paid for. Screenshots of the site can be found in the <a href="https://github.com/Realify2005/UMELecturers">github repository</a>.</p>
        </div>
    )
}

export default Login;
