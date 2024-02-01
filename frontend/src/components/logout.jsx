import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token from localStorage upon logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return null; // This component doesn't render anything, it just handles logout logic
};

export default Logout;
