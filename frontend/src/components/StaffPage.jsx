// StaffDetails.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const API_URL = "http://localhost:3000"

const StaffPage = () => {
    const staffName = useRef(null);
    const { staffNameHyphened } = useParams();
    const navigate = useNavigate();

    const [staffData, setStaffData] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = () => {
        navigate('/home/add-staff');
    }

    const addComment = () => {
        navigate(`/home/add-staff?staff=${staffName.current}`)
    }

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.post(`${API_URL}/api/get-staff-data/staff-page`, {staffNameHyphened: staffNameHyphened});
                staffName.current = response.data[0].name;
                console.log(response.data);
                setStaffData(response.data);
            } catch (error) {
                setError(error);
            }
        }

        fetchStaffData();
    }, [staffNameHyphened])

    if (error && error.response.status === 404) {
        return (
        <div className="no-staff-data">
            <p>It seems like no one has commented on this staff. Be the first one!</p>
            <button className="addStaff" onClick={handleClick}>Create Staff</button>
        </div>    
        )
    }

    if (!staffData) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{staffName.current}</h1>
            <h2>Comments:</h2>
            <div className="comments">
                {staffData.map(data => {
                    return (
                        <div key={data._id} className="comment-box">
                            <p>Course code: {data.course}</p>
                            <p>Year Taken: {data.year}</p>
                            <p>Rating: {data.rating}/10</p>
                            <p>Comment: {data.review}</p>
                            <p>Reviewed by {data.reviewer}</p>
                        </div>
                    )
                })}
            </div>
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default StaffPage;
