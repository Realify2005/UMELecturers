import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/user-profile.css'

const UserProfile = () => {
    const { username } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-user-data/all-comments/${username}`);
                const sortedComments = response.data.allComments.sort((a, b) => a.name.localeCompare(b.name));
                setComments(sortedComments);
            } catch (error) {
                console.error('Failed to fetch comments: ', error);
            }
        };

        fetchComments();
    }, [username]);

    return (
        <div className="user-profile">
            <h2>{username}'s active comments:</h2>
            {comments.length === 0 && localStorage.getItem('username') === username ? (
                <p>Looks like you have no active comments at the moment. You can add one by clicking <Link to="/home/add-staff">here</Link>, though!</p>
            ) : comments.length === 0 && localStorage.getItem('username') !== username ? (
                <p>This user has no active comments.</p>
            ) : (
                <ul>
                    {comments.map(comment => (
                        <li key={comment._id}>
                            <Link to={`/home/staff/${comment.nameHyphened}`}>{comment.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
     );
};

export default UserProfile;
