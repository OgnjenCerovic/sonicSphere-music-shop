import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Već definisan axios instanca

const DebugPage = () => {
    const [debugInfo, setDebugInfo] = useState(null);
    const [endpoint, setEndpoint] = useState('/debug/all'); // Podrazumevani endpoint

    useEffect(() => {
        api.get(endpoint)
            .then(response => {
                setDebugInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching debug info:', error);
            });
    }, [endpoint]);

    return (
        <div>
            <h1>Debug Information</h1>
            <button onClick={() => setEndpoint('/debug/user')}>Get User Info</button>
            <button onClick={() => setEndpoint('/debug/server-time')}>Get Server Time</button>
            <button onClick={() => setEndpoint('/debug/all')}>Get All Info</button>
            {debugInfo ? (
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DebugPage;
