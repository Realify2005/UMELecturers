// StaffDetails.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../styles/staff-page.css'

const API_URL = "http://localhost:3000"

const StaffPage = () => {
    const staffName = useRef(null);
    const { staffNameHyphened } = useParams();
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username'));

    const handleClick = () => {
        navigate('/home/add-staff');
    }

    const addComment = () => {
        navigate(`/home/add-staff?staff=${staffName.current}`)
    }

    const handleEdit = (commentId) => {
        navigate(`/home/edit-staff/${commentId}`)
    }

    const handleDelete = async (commentId) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
            if (!confirmDelete) return;

            await axios.delete(`${API_URL}/api/edit-staff-data/delete-comment`, {
                data: { commentId: commentId, username: username }
            });
            setStaffData(prevData => prevData.filter(comment => comment._id != commentId));
            console.log(`Deleted comment with ID: ${commentId}`);
        } catch (error) {
            console.error('Error deleting comment: ', error);
        }
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
        <div className="staff-page">
            <h1>{staffName.current}</h1>
            <h2>Comments:</h2>
            <div className="comments">
                {staffData.map(data => {
                    return (
                        <div key={data._id} className="comment-box">
                            <p>Reviewing as {data.type}</p>
                            <p>Course code: {data.course}</p>
                            <p>Year Taken: {data.year}</p>
                            <p>Rating: {data.rating}/10</p>
                            <p>Comment: {data.review}</p>
                            <p>Reviewed by {data.reviewer}</p>
                            {data.reviewer === username && (
                            <>
                                <button onClick={() => handleEdit(data._id)}>Edit</button>
                                <button onClick={() => handleDelete(data._id)}>Delete</button>
                            </>
                            )}
                        </div>
                    )
                })}
            </div>
            <button className="add-comment-button" onClick={addComment}>Add Comment</button>
            <p>* Users will not be able to add a comment on a staff they have an existing comment on.</p>
        </div>
    );
};

export default StaffPage;
