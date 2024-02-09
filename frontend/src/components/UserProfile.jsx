import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/user-profile.css';
import star from '../assets/star.png';

const UserProfile = () => {
    const { username } = useParams();
    const [comments, setComments] = useState([]);
    const [sortBy, setSortBy] = useState('alphabetical')

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-user-data/all-comments/${username}`);
                console.log(response.data);
                const sortedComments = response.data.allComments.sort((a, b) => a.name.localeCompare(b.name));
                setComments(sortedComments);
            } catch (error) {
                console.error('Failed to fetch comments: ', error);
            }
        };

        fetchComments();
    }, [username]);

    const sortComments = (option) => {
        let sortedComments = [...comments];
        switch (option) {
            case 'rating':
                sortedComments.sort((a, b) => b.rating - a.rating);
                break;
            case 'alphabetical':
                sortedComments.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'course':
                sortedComments.sort((a, b) => a.course.localeCompare(b.course));
                break;
            default:
                break;
        }
        setComments(sortedComments);
    }

    return (
        <div className="user-profile">
            <h2>{username}'s active comments:</h2>
            {comments.length === 0 && localStorage.getItem('username') === username ? (
                <p>Looks like you have no active comments at the moment. You can add one by clicking <Link to="/home/add-staff">here</Link>, though!</p>
            ) : comments.length === 0 && localStorage.getItem('username') !== username ? (
                <p>This user has no active comments.</p>
            ) : (
                <>
                    <div>
                        Sort by:{' '}
                        <select value={sortBy} onChange={(e) => {setSortBy(e.target.value); sortComments(e.target.value);}}>
                            <option value="rating">Rating</option>
                            <option value="alphabetical">Alphabetical Order</option>
                            <option value="course">Course</option>
                        </select>   
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>{username}'s rating</th>
                                <th>Course rated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment) => (
                                <tr key={comment.nameHyphened}>
                                    <td><Link to={`/home/staff/${comment.nameHyphened}`}>{comment.name}</Link></td>
                                    <td>{comment.rating}<img className="star-icon" src={star} alt="star icon" /> / 10</td>
                                    <td><Link to={`/home/course/${comment.course}`}>{comment.course}</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
     );
};

export default UserProfile;
