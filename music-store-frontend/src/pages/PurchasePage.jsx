import React, { useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const PurchasePage = ({ musicId }) => {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [isPurchased, setIsPurchased] = useState(false);

    const handlePurchase = () => {
        if (!user) {
            setMessage('You need to be logged in to purchase music.');
            return;
        }

        api.post('/purchases', {
            p_music_id: musicId,
            p_user_id: user.u_id
        })
            .then(response => {
                setIsPurchased(true);
                setMessage('Music purchased successfully!');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setMessage('You have already purchased this music.');
                } else {
                    console.log(user)
                    setMessage('There was an error purchasing the music. '+error+"("+musicId+" "+user.u_id+")");
                }
            });
    };

    return (
        <div>
            {user ? (
                <button onClick={handlePurchase}>Purchase Music</button>
            ) : (
                <p>You need to be logged in to purchase music.</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default PurchasePage;
