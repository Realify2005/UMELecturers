import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    navigate('/login?status=logoutSuccess');
  }, [navigate]);

  return null; 
};

export default Logout;
