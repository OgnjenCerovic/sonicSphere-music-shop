import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import PurchasePage from "./PurchasePage.jsx";
import AuthContext from "../context/AuthContext.jsx";

const MusicDetailPage = () => {
    const { id } = useParams();
    const [music, setMusic] = useState(null);
    const { user } = useContext(AuthContext);
    const [ratings, setRatings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(0);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        api.get(`/music/${id}`)
            .then(response => {
                setMusic(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the music detail!', error);
            });

        api.get(`/ratings/${id}`)
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ratings!', error);
            });

        api.get(`/reviews/${id}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the reviews!', error);
            });


    }, [id]);

    const handleRatingChange = (e) => {
        setNewRating(e.target.value);
    };

    const handleReviewChange = (e) => {
        setNewReview(e.target.value);
    };

    const handleSubmitRating = (e) => {
        e.preventDefault();
        api.post('/ratings', {
            ra_music_id: id,
            ra_rating: newRating,
        })
            .then(response => {                
                setRatings([...ratings, response.data]);
                setNewRating(0);
            })
            .catch(error => {
                console.error('There was an error submitting the rating!', error);
            });
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        api.post('/reviews', {
            rw_music_id: id,
            rw_comment: newReview,
        })
            .then(response => {
                setReviews([...reviews, response.data]);
                setNewReview('');
                // window.location.reload();
            })
            .catch(error => {
                console.error('There was an error submitting the review!', error);
            });
    };

    return (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-8 offset-md-2">
                <h1 className="mb-4">Music Detail</h1>
                {music ? (
                    <div className="text-start">
                        <h2 className="mb-3">{music.m_title}</h2>
                        <p className="mb-4">{music.m_description}</p>

                        {/* Conditional download or purchase button */}
                        <div className="mb-4">
                            {music.download_link ? (
                                <a href={music.download_link} download className="btn btn-success">
                                    Download Music
                                </a>
                            ) : (
                                <PurchasePage musicId={music.m_id} />
                            )}
                        </div>

                        {/* Ratings Table */}
                        <div className="ratings mb-4">
                            <h3 className="mb-3">Ratings</h3>
                            {ratings.length > 0 ? (
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>User Name</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ratings.map((rating) => (
                                            <tr key={rating.ra_id}>
                                                <td>{rating.user.u_name}</td>
                                                <td>{rating.ra_rating}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No ratings yet.</p>
                            )}
                        </div>

                        {/* Reviews Table */}
                        <div className="reviews mb-4">
                            <h3 className="mb-3">Reviews</h3>
                            {reviews.length > 0 ? (
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>User Name</th>
                                            <th>Review</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map((review) => (
                                            <tr key={review.rw_id}>
                                                <td>{review.user.u_name}</td>
                                                <td>{review.rw_comment}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>

                        {/* User Input Forms */}
                        {user && (
                            <>
                                <form onSubmit={handleSubmitRating} className="mb-4">
                                    <div className="mb-3">
                                        <label className="form-label">Rating:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={newRating}
                                            onChange={handleRatingChange}
                                            min="1"
                                            max="5"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Submit Rating
                                    </button>
                                </form>

                                <form onSubmit={handleSubmitReview} className="mb-4">
                                    <div className="mb-3">
                                        <label className="form-label">Review:</label>
                                        <textarea
                                            className="form-control"
                                            value={newReview}
                                            onChange={handleReviewChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Submit Review
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>


    );
};

export default MusicDetailPage;
