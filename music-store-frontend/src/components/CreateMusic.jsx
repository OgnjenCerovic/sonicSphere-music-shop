import React, { useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const CreateMusic = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState(null); // Added state for media
    const [message, setMessage] = useState('');

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

        api.post('/music', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                alert('Track added successfully')
                // Reset form fields
                setTitle('');
                setDescription('');
                setMedia(null);
            })
            .catch(error => {
                alert('There was an error creating the music.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
            </div>
            <h2 className='page-header'>Create Music</h2>
            <form onSubmit={handleSubmit} className='display-f add-form'>
                <div className='add-form-group'>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className='form-control'
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className='form-control'
                    />
                </div>
                <div>
                    <label>Media</label>
                    <input
                        type="file"
                        className='form-control'
                        onChange={handleFileChange} // Handle file input
                    />
                </div>
                <button type="submit" className='btn btn-info'>Create Music</button>
            </form>
        </div>
    ) : (
    <p>You do not have permission to access this page.</p>
);
};

export default CreateMusic;
