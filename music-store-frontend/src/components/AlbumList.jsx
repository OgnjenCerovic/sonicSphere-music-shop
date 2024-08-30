import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { Link } from "react-router-dom";

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
        <div className="display-f">
            <h2>Album List</h2>
            <Link to="/admin/albums/create" className="btn btn-info add-button">Add new album</Link>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map(album => (
                        <tr key={album.a_id}>
                            <td>{album.a_id}</td>
                            <td>{album.a_title}</td>
                            <td>{album.a_description}</td>
                            <td>

                                <button onClick={() => handleDelete(album.a_id)} className='btn btn-danger btn-sm me-2'>Delete</button>
                                <Link to={`/admin/albums/edit/${album.a_id}`} className='btn btn-warning btn-sm'>Edit</Link>

                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
            {message && <p>{message}</p>}
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default AlbumList;
