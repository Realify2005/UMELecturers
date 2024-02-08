import React, { useEffect } from 'react';
import '../styles/welcome.css';
const Welcome = () => {

    useEffect(() => {
        document.body.classList.add('welcome-page');

        return () => {
            document.body.classList.remove('welcome-page');
        }
    }, [])

    return (
        <div className="welcome-container">
            <h1 className="welcome-heading">Welcome to UNIMELecturers</h1>
            <p className="welcome-text">Please <a href="login">Log in</a> to continue</p>
        </div>
    );
};

export default Welcome;
