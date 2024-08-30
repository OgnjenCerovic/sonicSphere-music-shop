import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
    const {user, setUser} = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.u_status !== 'user') {
            navigate('/login');
        } else {
            api.get('/me')
                .then(response => {
                    setProfile(response.data);
                    setFormData({
                        name: response.data.u_name,
                        last_name: response.data.u_last_name,
                        email: response.data.u_email,
                        phone: response.data.u_phone
                    });
                })
                .catch(error => {
                    console.error('Error fetching profile:', error);
                });
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put('/me', formData)
            .then(response => {
                setProfile(response.data);
                setEditMode(false);
                setUser(response.data); // Update context with new user data
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <div className="profile-page">
                    <h1>Profile</h1>
                    {profile ? (
                        <div>
                            {editMode ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <div>
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Last Name:</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Phone:</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                        <button type="button" onClick={() => setEditMode(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                ) : (
                                <div>
                                    <p>Name: {profile.u_name}</p>
                                    <p>Last Name: {profile.u_last_name}</p>
                                    <p>Email: {profile.u_email}</p>
                                    <p>Phone: {profile.u_phone}</p>
                                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
