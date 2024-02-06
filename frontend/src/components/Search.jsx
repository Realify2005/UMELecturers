import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const SearchStaff = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate(`/home/search?query=${searchTerm}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchStaff;
