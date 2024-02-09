import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import '../styles/signup.css'

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const statusMessage = searchParams.get('status');
    if (statusMessage === 'Unauthorized') {
        setError('An account is required to create staff pages')
    }
}, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, credentials);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message); // Display error message to the user
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up to access UMELecturers</h2>
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
      <p>Already have an account? <Link to='/login'>Log in</Link> instead!</p>
    </div>
  );
};

export default Signup;
