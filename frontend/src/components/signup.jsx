import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../styles/signup.css'

const API_URL = 'http://localhost:3000'

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    document.body.classList.add('signup-page');

    return () => {
        document.body.classList.remove('signup-page');
    }
  }, [])

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/signup`, credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Failed to sign up'); // Display error message to the user
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href='login'>Log in</a> instead!</p>
    </div>
  );
};

export default Signup;
