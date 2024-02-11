import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/staff-page.css';
import star from '../assets/star.png';

const StaffPage = () => {
    const staffName = useRef(null);
    const username = localStorage.getItem('username');
    const { staffNameHyphened } = useParams();
    const navigate = useNavigate();
    const [lecturerComments, setLecturerComments] = useState([]);
    const [tutorComments, setTutorComments] = useState([]);
    const [lecturerRating, setLecturerRating] = useState(null);
    const [tutorRating, setTutorRating] = useState(null);
    const [error, setError] = useState(null);
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

            await axios.delete(`${import.meta.env.VITE_API_URL}/api/staff-data/delete-comment`, {
                data: { commentId: commentId, username: username }
            });

            setLecturerComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            setTutorComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            
        } catch (error) {
            if (error.response.request.status === 403) {
                alert("Well you tried, but that comment isn't yours, so you're not allowed to delete it, smh.");
            }
        }
    }

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/staff-data/staff-page`, {staffNameHyphened: staffNameHyphened});
                staffName.current = response.data[0].name;
                
                const convertedData = response.data.map(comment => ({
                    ...comment,
                    createdAt: new Date(comment.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})
                }))

                const lecturerComments = convertedData.filter(comment => comment.type === 'lecturer');
                const tutorComments = convertedData.filter(comment => comment.type === 'tutor');

                setLecturerComments(lecturerComments);
                setTutorComments(tutorComments);

                setLoading(false); 
            } catch (error) {
                setError(error);
            }
        }

        fetchStaffData();
    }, [staffNameHyphened])

    useEffect(() => {
        const lecturerRatings = lecturerComments.map(comment => comment.rating);
        const lecturerTotalRating = lecturerRatings.reduce((a, b) => a + b, 0);
        const lecturerAvgRating = lecturerTotalRating / lecturerComments.length;
        setLecturerRating(lecturerAvgRating);

        const tutorRatings = tutorComments.map(comment => comment.rating);
        const tutorTotalRating = tutorRatings.reduce((a, b) => a + b, 0);
        const tutorAvgRating = tutorTotalRating / tutorComments.length;
        setTutorRating(tutorAvgRating);   
    }, [lecturerComments, tutorComments])

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
            <h3>As lecturer: {!isNaN(lecturerRating) ? `${lecturerRating.toFixed(1)}` : ''}{!isNaN(lecturerRating) && <img className="star-icon" src={star} alt="star icon" />} {!isNaN(lecturerRating) && "/ 10"}</h3>
                {lecturerComments.slice().reverse().map(comment => (
                    <div key={comment._id} className="comment-box">
                        <div className="left-side">
                            <p>Course Code: <Link to={`/home/course/${comment.course}`}>{comment.course}</Link></p>
                            <p>Year Taken: {comment.year}</p>
                            <p>Rating: {comment.rating}<img className="star-icon" src={star} alt="star icon" /> / 10</p>
                            <p>Reviewer: <Link to={`/home/user/${comment.reviewer}`}>{comment.reviewer}</Link></p>
                            <p className="comment-review">{comment.review}</p>
                            {(comment.reviewer === username || username === 'admin') && (
                                <>
                                    <button onClick={() => handleEdit(comment._id)}>Edit</button>
                                    <button onClick={() => handleDelete(comment._id)}>Delete</button>
                                </>
                            )}
                        </div>
                        <div className="right-side">
                            <p>{comment.createdAt}</p>
                        </div>
                    </div>
                ))}
                <h3>As tutor: {!isNaN(tutorRating) ? `${tutorRating.toFixed(1)}` : ''}{!isNaN(tutorRating) && <img className="star-icon" src={star} alt="star icon" />} {!isNaN(tutorRating) && "/ 10"}</h3>
                {tutorComments.slice().reverse().map(comment => (
                    <div key={comment._id} className="comment-box">
                        <div className="left-side">
                            <p>Course Code: <Link to={`/home/course/${comment.course}`}>{comment.course}</Link></p>
                            <p>Year Taken: {comment.year}</p>
                            <p>Rating: {comment.rating}<img className="star-icon" src={star} alt="star icon" /> / 10</p>
                            <p>Reviewer: <Link to={`/home/user/${comment.reviewer}`}>{comment.reviewer}</Link></p>
                            <p className="comment-review">{comment.review}</p>
                            {(comment.reviewer === username || username === 'admin') && (
                                <>
                                    <button onClick={() => handleEdit(comment._id)}>Edit</button>
                                    <button onClick={() => handleDelete(comment._id)}>Delete</button>
                                </>
                            )}
                        </div>
                        <div className="right-side">
                            <p>{comment.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="add-comment-button" onClick={addComment}>Add Comment</button>
            <p>* Users will not be able to add a comment on a staff they have an existing comment on.</p>
        </div>
    );
};

export default StaffPage;
