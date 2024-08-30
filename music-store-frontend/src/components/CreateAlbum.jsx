import React, { useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const CreateAlbum = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/admin/albums', {
            a_title: title,
            a_description: description,
        })
            .then(response => {
                setMessage('Album created successfully!');
            })
            .catch(error => {
                setMessage('There was an error creating the album.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div>
            <h2>Create Album</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Album</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default CreateAlbum;
