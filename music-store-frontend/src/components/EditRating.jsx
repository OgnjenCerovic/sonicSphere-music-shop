import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const EditRating = () => {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [ra_rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get(`/admin/ratings/${id}`)
            .then(response => {
                setRating(response.data.ra_rating);
            })
            .catch(error => {
                setMessage('There was an error fetching the rating.');
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/admin/ratings/${id}`, {
            ra_rating,
        })
            .then(response => {
                setMessage('Rating updated successfully!');
            })
            .catch(error => {
                setMessage('There was an error updating the rating.');
            });
    };

    return user && user.u_status === 'admin' ? (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h2>Edit Rating</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Rating</label>
                        <input
                            type="number"
                            value={ra_rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                            min="1"
                            max="5"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Rating</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    ) : (
        <p>You do not have permission to access this page.</p>
    );
};

export default EditRating;
