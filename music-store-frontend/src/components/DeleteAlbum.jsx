import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const AlbumList = () => {
    const { user } = useContext(AuthContext);
    const [albums, setAlbums] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/admin/albums')
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                setMessage('There was an error fetching the albums.');
            });
    }, []);

    const handleDelete = (id) => {
        api.delete(`/admin/albums/${id}`)
            .then(response => {
                setMessage('Album deleted successfully!');
                setAlbums(albums.filter(album => album.a_id !== id));
            })
            .catch(error => {
                setMessage('There was an error deleting the album.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div>
            <h2>Album List</h2>
            {albums.map(album => (
                <div key={album.a_id}>
                    <h3>{album.a_title}</h3>
                    <p>{album.a_description}</p>
                    <button onClick={() => handleDelete(album.a_id)}>Delete</button>
                </div>
            ))}
            {message && <p>{message}</p>}
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default AlbumList;
