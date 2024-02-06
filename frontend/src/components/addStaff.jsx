import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'

const API_URL = 'http://localhost:3000'

const AddStaff = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const prefilledStaffName = searchParams.has('staff') ? searchParams.get('staff') : '';

    const [staffData, setStaffData] = useState({
        type: 'lecturer',
        name: prefilledStaffName,
        nameHyphened: prefilledStaffName.toLowerCase().split(' ').join('-'),
        rating: 5,
        course: '',
        year: '',
        review: '',
        reviewer: localStorage.getItem('username')
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/add-staff-data`, staffData);
            console.log('Staff added successfully:', response.data);
            setStaffData({
                type: 'lecturer',
                name: prefilledStaffName,
                nameHyphened: prefilledStaffName.toLowerCase().split(' ').join('-'),
                rating: 5,
                course: '',
                year: '',
                review: ''
            })
            navigate(`/home/staff/${staffData.nameHyphened}`);
        } catch (error) {
            console.log('Failed to add staff:', error)
        }
    };

    return (
        <div className="add-staff">
            <h2>Add New Staff/Comment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <select name="type" value={staffData.type} onChange={handleChange} required>
                        <option value="lecturer">Lecturer</option>
                        <option value="tutor">Tutor</option>
                    </select>
                </div>
                <div>
                    <label>Full name:</label>
                    <input type="text" name="name" value={staffData.name} onChange={handleChange} placeholder="e.g. Alistair Moffat" required />
                </div>
                <div>
                    <label>Rating:</label>
                    <select type="number" name="rating" value={staffData.rating} onChange={handleChange} required>
                        <option value="1">1/10</option>
                        <option value="2">2/10</option>
                        <option value="3">3/10</option>
                        <option value="4">4/10</option>
                        <option value="5">5/10</option>
                        <option value="6">6/10</option>
                        <option value="7">7/10</option>
                        <option value="8">8/10</option>
                        <option value="9">9/10</option>
                        <option value="10">10/10</option>
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
                    <textarea name="review" value={staffData.review} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddStaff;    