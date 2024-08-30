import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const EditReview = () => {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [rw_comment, setReview] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get(`/admin/reviews/${id}`)
            .then(response => {
                setReview(response.data.rw_comment);
            })
            .catch(error => {
                setMessage('There was an error fetching the review.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/admin/reviews/${id}`, {
            rw_comment,
        })
            .then(response => {
                setMessage('Review updated successfully!');
            })
            .catch(error => {
                setMessage('There was an error updating the review.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h2>Edit Review</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Review</label>
                        <textarea
                            value={rw_comment}
                            onChange={(e) => setReview(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Review</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default EditReview;
