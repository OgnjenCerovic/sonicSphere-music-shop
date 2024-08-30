import React from 'react';
import { Link } from 'react-router-dom';

const MusicItem = ({ music }) => {
    return (
        <div>
            <li className="list-group-item" key={music.m_id}>
            <Link className='black-link' to={`/music/${music.m_id}`}>{music.m_title}</Link>
            </li>
        </div>
    );
};



export default MusicItem;
