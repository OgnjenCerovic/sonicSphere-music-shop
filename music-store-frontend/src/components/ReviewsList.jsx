import React, {useState, useEffect, useContext} from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom';

const ReviewsList = () => {
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/admin/reviews')
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                setMessage('There was an error fetching the reviews.');
            });
    }, []);

    const handleDelete = (id) => {
        api.delete(`/admin/reviews/${id}`)
            .then(response => {
                setReviews(reviews.filter(review => review.r_id !== id));
                setMessage('Review deleted successfully!');
            })
            .catch(error => {
                setMessage('There was an error deleting the review.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
        <div className="col-12 col-md-8 offset-md-2">
            <h2>Reviews List</h2>
            {message && <p>{message}</p>}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.rw_id}>
                            <td>{review.user.u_name} {review.user.u_last_name}</td>
                            <td>{review.rw_comment}</td>
                            <td>
                                <Link to={`/admin/reviews/edit/${review.rw_id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                                <button onClick={() => handleDelete(review.rw_id)} className="btn btn-danger btn-sm">Delete</button>
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

export default ReviewsList;
