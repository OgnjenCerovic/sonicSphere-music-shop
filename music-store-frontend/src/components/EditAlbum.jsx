import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const EditAlbum = () => {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get(`/admin/albums/${id}`)
            .then(response => {
                setTitle(response.data.a_title);
                setDescription(response.data.a_description);
            })
            .catch(error => {
                setMessage('There was an error fetching the album.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/admin/albums/${id}`, {
            a_title: title,
            a_description: description,
        })
            .then(response => {
                setMessage('Album updated successfully!');
            })
            .catch(error => {
                setMessage('There was an error updating the album.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h2>Edit Album</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Album</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default EditAlbum;
