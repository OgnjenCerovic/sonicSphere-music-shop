import React, {useContext, useState} from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import {useNavigate, useParams} from "react-router-dom";

const DeleteMusic = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleDelete = () => {
        api.delete(`/music/${id}`)
            .then(response => {
                setMessage('Music deleted successfully!');
                navigate('/admin/music-management');
            })
            .catch(error => {
                setMessage('There was an error deleting the music.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div>
            <h2>Delete Music</h2>
            <p>Are you sure you want to delete this music?</p>
            <button onClick={handleDelete}>Delete Music</button>
            {message && <p>{message}</p>}
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default DeleteMusic;
