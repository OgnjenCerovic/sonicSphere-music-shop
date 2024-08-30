import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Pokreni API poziv da dobiješ trenutno prijavljenog korisnika
        api.get('/me')
            .then(response => {
                console.log('Response from /me:', response);
                setUser(response.data);
                console.log('User data:', response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the current user!', error);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
