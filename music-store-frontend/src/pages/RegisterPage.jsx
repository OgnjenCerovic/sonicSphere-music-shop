import React, { useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import data from "bootstrap/js/src/dom/data.js";

function RegisterPage() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', {
                name,
                last_name: lastName,
                email,
                phone,
                password,
            });
            setMessage(response.data.message);
            navigate('/login');
        } catch (error) {
            setMessage('Registration failed '+error.response.data.message);
        }
    };

    return (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="lname" className="form-label">last name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor="email" className="form-label">email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="phone" className="form-label">phone</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label htmlFor="password" className="form-label">password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default RegisterPage;