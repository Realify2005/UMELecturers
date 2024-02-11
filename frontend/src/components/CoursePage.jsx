import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import star from '../assets/star.png';
import '../styles/course-page.css';

const CoursePage = () => {
    const { courseCode } = useParams();
    const [lecturers, setLecturers] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [sortBy, setSortBy] = useState('alphabetical')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/course-data/${courseCode.toUpperCase()}`);
                setLecturers(response.data.lecturers);
                setTutors(response.data.tutors);
            } catch (error) {
                console.error('Error fetching course data: ', error);
            }
        }

        fetchData();
    }, [courseCode]);

    const sortStaffs = (option) => {
        let sortedLecturers = [...lecturers];
        let sortedTutors = [...tutors];
        switch (option) {
            case 'rating':
                sortedLecturers.sort((a, b) => b.rating - a.rating);
                sortedTutors.sort((a, b) => b.rating - a.rating);
                break;
            case 'alphabetical':
                sortedLecturers.sort((a, b) => a.name.localeCompare(b.name));
                sortedTutors.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
        setLecturers(sortedLecturers);
        setTutors(sortedTutors);
    }

    return (
        <div className="course-page">
            <h1>{courseCode.toUpperCase()}</h1>
            <div className="sort-selector">
                Sort by:{' '}
                <select value={sortBy} onChange={(e) => {setSortBy(e.target.value); sortStaffs(e.target.value);}}>
                    <option value="rating">Rating</option>
                    <option value="alphabetical">Alphabetical Order</option>
                </select>   
            </div>
            <div className="lecturers-table">
                <h2>Lecturers</h2>
                {lecturers.length === 0 ? (
                    <p>Looks like no one has posted a rating on a staff that teaches this course. If you've taken this course before, please post your ratings <Link to={`/home/add-staff?type='lecturer'&courseCode=${courseCode.toUpperCase()}`}>here!</Link></p>
                ) : (
                    <>
                        <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Average Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lecturers.map((lecturer) => (
                                <tr key={lecturer.nameHyphened}>
                                    <td><Link to={`/home/staff/${lecturer.nameHyphened}`}>{lecturer.name}</Link></td>
                                    <td>{lecturer.averageRating.toFixed(1)}<img className="star-icon" src={star} alt="star icon" /> / 10</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </>
                )}
            </div>
            <div className="tutors-table">
                <h2>Tutors</h2>
                {tutors.length === 0 ? (
                    <p>Looks like no one has posted a rating on a staff that teaches this course. If you've taken this course before, please post your ratings <Link to={`/home/add-staff?type='tutor'&courseCode=${courseCode.toUpperCase()}`}>here!</Link></p>
                ) : (
                    <>
                        <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Average Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutors.map((tutor) => (
                                <tr key={tutor.nameHyphened}>
                                    <td><Link to={`/home/staff/${tutor.nameHyphened}`}>{tutor.name}</Link></td>
                                    <td>{tutor.averageRating.toFixed(1)}<img className="star-icon" src={star} alt="star icon" /> / 10</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </>
                )}
            </div>
            <p>Taken the subject before? Click <Link to={`/home/add-staff?courseCode=${courseCode.toUpperCase()}`}>here</Link> to become an awesome contributor and add an entry!</p>
        </div>
    )
}

export default CoursePage;
