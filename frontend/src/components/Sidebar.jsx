import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/sidebar.css';
import star from '../assets/star.png';

const Sidebar = () => {
    const [loading, setLoading] = useState(true);
    const [mostRatedLecturers, setMostRatedLecturers] = useState([]);
    const [highestRatedLecturers, setHighestRatedLecturers] = useState([]);
    const [mostRatedTutors, setMostRatedTutors] = useState([]);
    const [highestRatedTutors, setHighestRatedTutors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch most popular lecturer
                const mostRatedLecturersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff-data/most-rated-lecturers`);
                setMostRatedLecturers(mostRatedLecturersResponse.data);

                // Fetch most popular tutor
                const mostRatedTutorsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff-data/most-rated-tutors`);
                setMostRatedTutors(mostRatedTutorsResponse.data);

                // Fetch highest rated lecturer
                const highestRatedLecturersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff-data/highest-rated-lecturers`);
                setHighestRatedLecturers(highestRatedLecturersResponse.data);

                // Fetch highest rated tutor
                const highestRatedTutorsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff-data/highest-rated-tutors`);
                setHighestRatedTutors(highestRatedTutorsResponse.data);

                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <aside>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="section">
                        <h1>Statistics:</h1>
                        <h2>
                            Most Rated Lecturers:
                            <ol>
                                {mostRatedLecturers.map(lecturer => {
                                    return (
                                        <li key={lecturer.name}>
                                            <Link to={`/home/staff/${lecturer.name.toLowerCase().split(' ').join('-')}`}>{lecturer.name}</Link> - {lecturer.count} ratings
                                        </li>
                                    )
                                })}
                            </ol>
                        </h2>
                    </div>
                    <div className="section">
                        <h2>
                            Highest Rated Lecturers:
                            <ol>
                                {highestRatedLecturers.map(lecturer => {
                                    return (
                                        <li key={lecturer.name}>
                                            <Link to={`/home/staff/${lecturer.name.toLowerCase().split(' ').join('-')}`}>{lecturer.name}</Link> - {lecturer.averageRating.toFixed(1)}<img className="star-icon" src={star} alt="star icon" /> / 10
                                        </li>
                                    )
                                })}
                            </ol>
                        </h2>
                    </div>
                    <div className="section">
                        <h2>
                            Most Rated Tutors:
                            <ol>
                                {mostRatedTutors.map(tutor => {
                                    return (
                                        <li key={tutor.name}>
                                            <Link to={`/home/staff/${tutor.name.toLowerCase().split(' ').join('-')}`}>{tutor.name}</Link> - {tutor.count} ratings
                                        </li>
                                    )
                                })}
                            </ol>
                        </h2>
                    </div>
                    <div className="section">
                        <h2>
                            Highest Rated Tutors:
                            <ol>
                                {highestRatedTutors.map(tutor => {
                                    return (
                                        <li key={tutor.name}>
                                            <Link to={`/home/staff/${tutor.name.toLowerCase().split(' ').join('-')}`}>{tutor.name}</Link> - {tutor.averageRating.toFixed(1)}<img className="star-icon" src={star} alt="star icon" /> / 10
                                        </li>
                                    )
                                })}
                            </ol>
                        </h2>
                    </div>
                    <p>Data updates every 60 seconds</p>
                </>
            )}
        </aside>
    );
};

export default Sidebar;
