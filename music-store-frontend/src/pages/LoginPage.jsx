import React, { useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.access_token);
            setMessage('Login successful');

            console.log(response.data)

            setTimeout(()=>{
                console.log(("redirecting"))
                navigate('/');
            },1000);
        } catch (error) {
            setMessage('Login failed '+error.response.data.message);
        }
    };

    return (
        <div className="row text-center mt-5">
            <div className="col-12 col-md-4 offset-md-4">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            className="form-control"
                            id="exampleInputPassword1"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default LoginPage;