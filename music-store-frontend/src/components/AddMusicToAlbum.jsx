import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const AddMusicToAlbum = () => {
    const { user } = useContext(AuthContext);
    const [albums, setAlbums] = useState([]);
    const [musics, setMusics] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState('');
    const [selectedMusic, setSelectedMusic] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/albums').then(response => setAlbums(response.data));
        api.get('/music').then(response => setMusics(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/admin/albums/add-music', {
            c_music_id: selectedMusic,
            c_album_id: selectedAlbum,
        })
            .then(response => {
                alert('Music is successfully added to the album!')
            })
            .catch(error => {
                setMessage('There was an error adding music to the album.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div>
            <form onSubmit={handleSubmit} class="add-form">
                <h2>Add Music to Album</h2>
                <div className='add-form-group'>
                    <label>Album</label>
                    <select value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.target.value)} required>
                        <option value="">Select Album</option>
                        {albums.map(album => (
                            <option key={album.a_id} value={album.a_id}>{album.a_title}</option>
                        ))}
                    </select>
                </div>
                <div className='add-form-group'>
                    <label>Music</label>
                    <select value={selectedMusic} onChange={(e) => setSelectedMusic(e.target.value)} required>
                        <option value="">Select Music</option>
                        {musics.map(music => (
                            <option key={music.m_id} value={music.m_id}>{music.m_title}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className='btn btn-info'>Add Music to Album</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default AddMusicToAlbum;
