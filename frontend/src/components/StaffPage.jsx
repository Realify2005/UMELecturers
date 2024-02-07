import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/staff-page.css';

const API_URL = "http://localhost:3000";

const StaffPage = () => {
    const staffName = useRef(null);
    const { staffNameHyphened } = useParams();
    const navigate = useNavigate();
    const [lecturerComments, setLecturerComments] = useState([]);
    const [tutorComments, setTutorComments] = useState([]);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        navigate('/home/add-staff');
    }

    const addComment = () => {
        navigate(`/home/add-staff?staff=${staffName.current}`);
    }

    const handleEdit = (commentId) => {
        navigate(`/home/edit-staff/${commentId}`);
    }

    const handleDelete = async (commentId) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
            if (!confirmDelete) return;

            await axios.delete(`${API_URL}/api/edit-staff-data/delete-comment`, {
                data: { commentId: commentId, username: username }
            });

            setLecturerComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            setTutorComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            
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

                const lecturerComments = response.data.filter(comment => comment.type === 'lecturer');
                const tutorComments = response.data.filter(comment => comment.type === 'tutor');
                setLecturerComments(lecturerComments);
                setTutorComments(tutorComments);

                setLoading(false); 
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="staff-page">
            <h1>{staffName.current}</h1>
            <h2>Comments:</h2>
            <div className="comments">
                <h3>As lecturer</h3>
                {lecturerComments.map(comment => (
                    <div key={comment._id} className="comment-box">
                        <p>Course Code: {comment.course}</p>
                        <p>Year Taken: {comment.year}</p>
                        <p>Rating: {comment.rating}/10</p>
                        <p>Reviewer: {comment.reviewer}</p>
                        <p className="comment-review">{comment.review}</p>
                        {comment.reviewer === username && (
                            <>
                                <button onClick={() => handleEdit(comment._id)}>Edit</button>
                                <button onClick={() => handleDelete(comment._id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
                <h3>As tutor</h3>
                {tutorComments.map(comment => (
                    <div key={comment._id} className="comment-box">
                        <p>Course Code: {comment.course}</p>
                        <p>Year Taken: {comment.year}</p>
                        <p>Rating: {comment.rating}/10</p>
                        <p>Reviewer: {comment.reviewer}</p>
                        <p className="comment-review">Comment: {comment.review}</p>
                        {comment.reviewer === username && (
                            <div className="staff-page-buttons">
                                <button onClick={() => handleEdit(comment._id)}>Edit</button>
                                <button onClick={() => handleDelete(comment._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="add-comment-button" onClick={addComment}>Add Comment</button>
            <p>* Users will not be able to add a comment on a staff they have an existing comment on.</p>
        </div>
    );
};

export default StaffPage;
