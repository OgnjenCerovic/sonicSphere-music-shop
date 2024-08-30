import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const EditMusic = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState(null); // Added state for media
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get(`/music/${id}`)
            .then(response => {
                setTitle(response.data.m_title);
                setDescription(response.data.m_description);
                // Optionally, you could also set the existing media if needed
            })
            .catch(error => {
                setMessage('There was an error fetching the music.');
            });
    }, [id]);

    const handleFileChange = (e) => {
        setMedia(e.target.files[0]); // Set the selected file
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('m_title', title);
        formData.append('m_description', description);
        if (media) {
            formData.append('m_media', media); // Append media file
        }

        api.post(`/music/${id}?_method=PUT`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setMessage('Music updated successfully!');
            })
            .catch(error => {
                setMessage('There was an error updating the music.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
            <h2>Edit Music</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Media</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange} // Handle file input
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Music</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default EditMusic;
