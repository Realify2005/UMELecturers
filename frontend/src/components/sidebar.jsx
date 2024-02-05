import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'

const Sidebar = () => {
    const [mostRatedLecturers, setMostRatedLecturers] = useState([]);
    const [highestRatedLecturers, setHighestRatedLecturers] = useState([]);
    const [mostRatedTutors, setMostRatedTutors] = useState([]);
    const [highestRatedTutors, setHighestRatedTutors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch most popular lecturer
                const mostRatedLecturersResponse = await axios.get(`${API_URL}/api/most-popular-lecturers`);
                setMostRatedLecturers(mostRatedLecturersResponse.data);

                // Fetch highest rated lecturer
                const highestRatedLecturersResponse = await axios.get(`${API_URL}/api/highest-rated-lecturers`);
                setHighestRatedLecturers(highestRatedLecturersResponse.data);

                // Fetch most popular tutor
                const mostRatedTutorsResponse = await axios.get(`${API_URL}/api/most-popular-tutors`);
                setMostRatedTutors(mostRatedTutorsResponse.data);

                // Fetch highest rated tutor
                const highestRatedTutorsResponse = await axios.get(`${API_URL}/api/highest-rated-tutors`);
                setHighestRatedTutors(highestRatedTutorsResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="sidebar">
            <div className="section">
                <h2>Most Popular Lecturers: {mostRatedLecturers}</h2>
            </div>
            <div className="section">
                <h2>Highest Rated Lecturers: {highestRatedLecturers}</h2>
            </div>
            <div className="section">
                <h2>Most Popular Tutors: {mostRatedTutors}</h2>
            </div>
            <div className="section">
                <h2>Highest Rated Tutors: {highestRatedTutors}</h2>
            </div>
        </div>
    );
};

export default Sidebar;

