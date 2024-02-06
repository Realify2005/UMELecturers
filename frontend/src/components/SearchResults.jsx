import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const SearchResults = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const search = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const query = searchParams.get('query');
                const response = await axios.post(`${API_URL}/api/get-staff-data/search-staff`, { searchTerm: query });
                setSearchResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error searching staff: ', error);
                // Handle error
            }
        };

        search();
    }, [location.search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Search Results</h2>
            {searchResults.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {searchResults.map((staff, index) => (
                        <li key={index}>
                            <Link to={`/home/staff/${staff.nameHyphened}`}>{staff.name}</Link>
                        </li> // Modify this to display other staff details
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
