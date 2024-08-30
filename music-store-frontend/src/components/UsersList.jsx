import React, {useState, useEffect, useContext} from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom';

const UsersList = () => {
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/admin/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                setMessage('There was an error fetching the users.');
            });
    }, []);

    const handleDelete = (id) => {
        api.delete(`/admin/users/${id}`)
            .then(response => {
                setUsers(users.filter(user => user.u_id !== id));
                setMessage('User deleted successfully!');
            })
            .catch(error => {
                setMessage('There was an error deleting the user.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
    <div className="col-12 col-md-8 offset-md-2">
        <h2>Users List</h2>
        {message && <p>{message}</p>}
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.u_id}>
                        <td>{user.u_name}</td>
                        <td>{user.u_last_name}</td>
                        <td>{user.u_email}</td>
                        <td>{user.u_status}</td>
                        <td>
                            <Link to={`/admin/users/edit/${user.u_id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                            <button onClick={() => handleDelete(user.u_id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default UsersList;
