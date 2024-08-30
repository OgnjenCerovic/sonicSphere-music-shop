import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import api from '../services/api';
import MusicItem from '../components/MusicItem';

const SearchPage = () => {
    const [music, setMusic] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(location.search);
            const searchQuery = params.get('query');

            if (searchQuery) {
                const response = await api.get('/search', {params: {query: searchQuery}});
                setMusic(Array.isArray(response.data) ? response.data : []);
            }
        };

        fetchData();
    }, [location.search]);

    return (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h1>Search Results</h1>
                <div>
                    {music.length > 0 ? (
                        music.map((item) => (
                            <MusicItem key={item.m_id} music={item}/>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
