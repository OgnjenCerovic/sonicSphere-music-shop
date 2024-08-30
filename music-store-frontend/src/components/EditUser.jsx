import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const EditUser = () => {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [u_name, setName] = useState('');
    const [u_last_name, setLastName] = useState('');
    const [u_email, setEmail] = useState('');
    const [u_phone, setPhone] = useState('');
    const [u_status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get(`/admin/users/${id}`)
            .then(response => {
                setName(response.data.u_name);
                setLastName(response.data.u_last_name);
                setEmail(response.data.u_email);
                setPhone(response.data.u_phone);
                setStatus(response.data.u_status);
            })
            .catch(error => {
                setMessage('There was an error fetching the user.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/admin/users/${id}`, {
            u_name,
            u_last_name,
            u_email,
            u_phone,
            u_status,
        })
            .then(response => {
                setMessage('User updated successfully!');
            })
            .catch(error => {
                setMessage('There was an error updating the user.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={u_name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={u_last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={u_email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            value={u_phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            value={u_status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            className="form-control"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Update User</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default EditUser;
