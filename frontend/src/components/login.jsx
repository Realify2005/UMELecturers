import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

const API_URL = 'http://localhost:3000'

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

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/login`, credentials);
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError('Invalid username or password');
        }
    }

    return (
        <div className="login-container">
            <h2>Welcome back</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Username: </label>
                <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href='signup'>Sign up</a> instead!</p>
        </div>
    )
}

export default Login;