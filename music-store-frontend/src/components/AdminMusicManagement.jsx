// src/components/AdminMusicManagement.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminMusicManagement = () => {
    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        // Fetch all music items
        api.get('/music')
            .then(response => {
                setMusicList(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the music list!', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Delete music item
        api.delete(`/admin/music-management/${id}`)
            .then(response => {
                // Refresh the list after deletion
                setMusicList(musicList.filter(music => music.m_id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the music item!', error);
            });
    };

    return (
        <div className='display-f'>
            <h1>Admin Music Management</h1>
            <Link to="/admin/create-music" className="btn btn-info add-button">Add New Music</Link>
            <table className="table mt-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {musicList.map(music => (
                    <tr key={music.m_id}>
                        <td>{music.m_id}</td>
                        <td>{music.m_title}</td>
                        <td>{music.m_description}</td>
                        <td>
                            <Link to={`/admin/edit-music/${music.m_id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                            <button onClick={() => handleDelete(music.m_id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMusicManagement;
