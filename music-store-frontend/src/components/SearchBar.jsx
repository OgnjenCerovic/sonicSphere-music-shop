import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/header.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    };

    return (
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search music..."
            />
            <button type="submit" className="btn btn-info">Search</button>
        </form>
    );
};

export default SearchBar;
