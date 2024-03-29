import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import star from '../assets/star.png';
import '../styles/statistics-page.css';

const Statistics = () => {
    const [originalStaffData, setOriginalStaffData] = useState([])
    const [staffData, setStaffData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [sortBy, setSortBy] = useState('count');
    const [searchSubject, setSearchSubject] = useState('')

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const staffDataResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff-data/staff-statistics`);
                const sortedStaffData = staffDataResponse.data.sort((a, b) => b.count - a.count); // Sort by default count
                setStaffData(sortedStaffData);
                setOriginalStaffData(sortedStaffData);

                const fullDataResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff-data/full-statistics`);
                setFullData(fullDataResponse.data);
            } catch (error) {
                console.error('Error fetching staff data: ', error);
            }
        }

        fetchStaffData();
    }, [])

    const sortStaffData = (option) => {
        let sortedData = [...staffData];
        switch (option) {
            case 'rating':
                sortedData.sort((a, b) => b.averageRating - a.averageRating);
                break;
            case 'alphabetical':
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'course':
                sortedData.sort((a, b) => a.course.localeCompare(b.course));
                break;
            case 'count':
                sortedData.sort((a, b) => b.count - a.count)
                break;
            default:
                break;
        }
        setStaffData(sortedData);
    }

    const handleSearch = (e) => {
        setSearchSubject(e.target.value);
        const filteredData = originalStaffData.filter(staff => staff.course.toLowerCase().includes(e.target.value.toLowerCase()));
        setStaffData(filteredData);
    }

    return (
        <div className="statistics-page">
            <div className="overall-statistics">
                <h1>Website Statistics:</h1>
                <ul>
                    <li>This website holds a total of <strong>{originalStaffData.length}</strong> unique staff pages.</li>
                    <li>A whopping count of <strong>{fullData.length}</strong> ratings across all staffs have been placed. </li>
                </ul>
            </div>
            <div className="sort-filter-bar">
                <div className="sort-bar">
                    Sort by:{' '}
                    <select value={sortBy} onChange={(e) => {setSortBy(e.target.value); sortStaffData(e.target.value);}}>
                        <option value="rating">Rating</option>
                        <option value="alphabetical">Alphabetical Order</option>
                        <option value="course">Course</option>
                        <option value="count">Popularity</option>
                    </select>   
                </div>
                <div className="filter-bar">
                    Search for courses:{' '}
                    <input type="text" placeholder="e.g. COMP10001" value={searchSubject} onChange={handleSearch} />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Course*</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {staffData.map((staff) => (
                        <tr key={staff.nameHyphened}>
                            <td><Link to={`/home/staff/${staff.nameHyphened}`}>{staff.name}</Link></td>
                            <td>{staff.averageRating.toFixed(1)}<img className="star-icon" src={star} alt="star icon" /> / 10</td>
                            <td><Link to={`/home/course/${staff.course}`}>{staff.course}</Link></td>
                            <td>{staff.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>* Course field may not include all the courses for which the staff members have received ratings on</p>
        </div>
    )
}

export default Statistics