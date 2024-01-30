import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', credentials);
            const { token } = response.data;
        } catch (error) {
            console.error('Login failed:', error.response.data);
            setError('Invalid email or password');
        }
    }

    return (
        <div>
            <h2>Login to UMELecturers</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;