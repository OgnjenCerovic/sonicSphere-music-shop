import React, {useState, useEffect, useContext} from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom';

const RatingsList = () => {
    const {user} = useContext(AuthContext);
    const [ratings, setRatings] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/admin/ratings')
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                setMessage('There was an error fetching the ratings.');
            });
    }, []);

    const handleDelete = (id) => {
        api.delete(`/admin/ratings/${id}`)
            .then(response => {
                setRatings(ratings.filter(rating => rating.r_id !== id));
                setMessage('Rating deleted successfully!');
                document.location.reload();
            })
            .catch(error => {
                setMessage('There was an error deleting the rating.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
        <div className="col-12 col-md-8 offset-md-2">
            <h2>Ratings List</h2>
            {message && <p>{message}</p>}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings.map(rating => (
                        <tr key={rating.ra_id}>
                            <td>{rating.user.u_name} {rating.user.u_last_name}</td>
                            <td>{rating.ra_rating}</td>
                            <td>
                                <Link to={`/admin/ratings/edit/${rating.ra_id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                                <button onClick={() => handleDelete(rating.ra_id)} className="btn btn-danger btn-sm">Delete</button>
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

export default RatingsList;
