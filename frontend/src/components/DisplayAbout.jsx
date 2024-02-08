import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/display-about.css'

const DisplayAbout = () => {
    const { username } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-user-data/all-comments/${username}`);
                setComments(response.data.allComments);
            } catch (error) {
                console.error('Failed to fetch comments: ', error);
            }
        };

        fetchComments();
    }, [username]);

    return (
        <div className="display-about">
            <h2>{username}'s active comments:</h2>
            {comments.length === 0 ? (
            <p>Looks like you have no active comments at the moment. You can add one by clicking <Link to="/home/add-staff">here</Link>, though!</p>
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

export default DisplayAbout;