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
                const mostRatedLecturersResponse = await axios.get(`${API_URL}/api/get-staff-data/most-rated-lecturers`);
                setMostRatedLecturers(mostRatedLecturersResponse.data);

                // Fetch most popular tutor
                const mostRatedTutorsResponse = await axios.get(`${API_URL}/api/get-staff-data/most-rated-tutors`);
                setMostRatedTutors(mostRatedTutorsResponse.data);

                // Fetch highest rated lecturer
                const highestRatedLecturersResponse = await axios.get(`${API_URL}/api/get-staff-data/highest-rated-lecturers`);
                setHighestRatedLecturers(highestRatedLecturersResponse.data);

                // Fetch highest rated tutor
                const highestRatedTutorsResponse = await axios.get(`${API_URL}/api/get-staff-data/highest-rated-tutors`);
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
                <h2>
                    Most Rated Lecturers:
                    <ol>
                        {mostRatedLecturers.map(lecturer => {
                            return (
                                <li key={lecturer.name}>
                                    <a href={`/home/staff/${lecturer.name.toLowerCase().split(' ').join('-')}`}>{lecturer.name}</a> - {lecturer.count} ratings
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
                                    <a href={`/home/staff/${lecturer.name.toLowerCase().split(' ').join('-')}`}>{lecturer.name}</a> - {lecturer.averageRating}/10
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
                                    <a href={`/home/staff/${tutor.name.toLowerCase().split(' ').join('-')}`}>{tutor.name}</a> - {tutor.count} ratings
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
                        {highestRatedTutors.map(tutor => {
                            return (
                                <li key={tutor.name}>
                                    <a href={`/home/staff/${tutor.name.toLowerCase().split(' ').join('-')}`}>{tutor.name}</a> - {tutor.averageRating}/10
                                </li>
                            )
                        })}
                    </ol>
                </h2>
            </div>
        </div>
    );
};

export default Sidebar;

