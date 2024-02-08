import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'
import '../styles/add-edit-staff.css'

const EditStaff = () => {
    const { commentId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [staffData, setStaffData] = useState({
        type: '',
        name: '',
        nameHyphened: '',
        rating: '',
        course: '',
        year: '',
        review: '',
        reviewer: ''
    });

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-staff-data/find-by-comment/${commentId}`);
                const { type, name, nameHyphened, rating, course, year, review, reviewer } = response.data;

                if (reviewer !== localStorage.getItem('username')) {
                    setError('You are unauthorized to edit this comment');
                }

                setStaffData({ type, name, nameHyphened, rating, course, year, review, reviewer});
            } catch (error) {
                console.error('Error fetching staff data: ', error);
            }
        }

        fetchStaffData();
    }, [commentId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rating') {
            setStaffData({ ...staffData, [name]: parseInt(value, 10)});
        } else if (name === 'name') {
            setStaffData({ 
                ...staffData, 
                [name]: value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                nameHyphened: value.toLowerCase().split(' ').join('-')
            });
        } else if (name === 'course') {
            const upperCaseValue = value.toUpperCase();
            setStaffData({ ...staffData, [name]: upperCaseValue });
        } else {
            setStaffData({ ...staffData, [name]: value });
        }
    };

    const handleCancel = () => {
        navigate(`/home/staff/${staffData.nameHyphened}`);
    }

    const handleConfirm = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/edit-staff-data/edit-comment/${commentId}`, staffData);
            navigate(`/home/staff/${staffData.nameHyphened}`);
        } catch (error) {
            // console.log('Failed to edit staff: ', error);
        }
    }

    return (
        <div className="edit-staff">
            {error ? (
                <div className="unauthorized-error-page">
                    {error}
                    <Link to={`/home/staff/${staffData.nameHyphened}`}>Go back</Link>
                </div>
            ) : (
                <>
                    <h2>Editing Comment</h2>
                    <form className="edit-staff-form">
                        <div>
                            <label>Type:</label>
                            <select name="type" value={staffData.type} onChange={handleChange} required>
                                <option value="" disabled>Select Type</option>
                                <option value="lecturer">Lecturer</option>
                                <option value="tutor">Tutor</option>
                            </select>
                        </div>
                        <div>
                            <label>Full name:</label>
                            <input type="text" name="name" value={staffData.name} onChange={handleChange} placeholder="e.g. Alistair Moffat" disabled required />
                        </div>
                        <div>
                            <label>Rating:</label>
                            <select name="rating" value={staffData.rating.toString()} onChange={handleChange} required>
                                <option value="" disabled>Select Rating</option>
                                <option value="1">1★ / 10</option>
                                <option value="2">2★ / 10</option>
                                <option value="3">3★ / 10</option>
                                <option value="4">4★ / 10</option>
                                <option value="5">5★ / 10</option>
                                <option value="6">6★ / 10</option>
                                <option value="7">7★ / 10</option>
                                <option value="8">8★ / 10</option>
                                <option value="9">9★ / 10</option>
                                <option value="10">10★ / 10</option>
                            </select>
                        </div>
                        <div>
                            <label>Course:</label>
                            <input type="text" name="course" value={staffData.course} onChange={handleChange} placeholder="e.g. COMP10001" required />
                        </div>
                        <div>
                            <label>Year subject was taken:</label>
                            <input type="number" name="year" value={staffData.year} onChange={handleChange} required/>
                        </div>
                        <div>
                            <label>Review:</label>
                            <textarea name="review" value={staffData.review} onChange={handleChange} style={{ width: '15vw', height: '15vh' }} required />
                        </div>
                    </form>
                    <div className="buttons">
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleConfirm}>Confirm</button>
                    </div>
                </>
            )}
        </div>
    );
    
}

export default EditStaff;
