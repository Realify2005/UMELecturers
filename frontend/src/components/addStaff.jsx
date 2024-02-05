import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'

const AddStaff = () => {
    const [staffData, setStaffData] = useState({
        type: 'lecturer',
        name: '',
        rating: 5,
        course: '',
        year: '',
        review: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        name === 'rating' ? setStaffData({ ...staffData, [name]: parseInt(value, 10)}) : setStaffData({ ...staffData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/add-staff`, staffData);
            console.log('Staff added successfully:', response.data);
            setStaffData({
                type: 'lecturer',
                name: '',
                rating: 5,
                course: '',
                year: '',
                review: ''
            })
        } catch (error) {
            console.log('Failed to add staff:', error)
        }
    };

    return (
        <div className="add-staff">
            <h2>Add New Staff</h2>
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
                <button type="submit">Add Staff</button>
            </form>
        </div>
    )
}

export default AddStaff;    