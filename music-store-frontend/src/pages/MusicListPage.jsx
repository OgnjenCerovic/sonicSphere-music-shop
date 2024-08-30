import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {Link} from "react-router-dom";

const MusicListPage = () => {
    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        api.get('/music')
            .then(response => {
                console.log('music fetched');
                setMusicList(response.data);
            })
            .catch(error => {
                console.log('There was an error fetching the music!', error);
            });
    }, []);

    return (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h1>Track List</h1>
                <ul className="list-group">
                    {musicList.map(music => (
                        <li className="list-group-item" key={music.m_id}>
                            <Link to={`/music/${music.m_id}`}>{music.m_title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MusicListPage;