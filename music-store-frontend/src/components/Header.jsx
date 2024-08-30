import React, {useContext} from 'react';
import api from "../services/api.js";
import AuthContext from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import SearchBar from './SearchBar';

function Header() {

    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        api.post('/logout') // Pozovi logout rutu na backendu
            .then(() => {
                setUser(null); // Očisti korisnika iz konteksta
            })
            .catch(error => {
                console.error('Logout failed', error);
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={handleLogout}>Logout</button>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </>
                            )}

                            {user && user.u_status === 'admin' && (
                                <>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                           aria-expanded="false">
                                            Admin
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li className="dropdown-item"><Link className="nav-link" to="/admin/music-management">Music</Link></li>
                                            <li className="dropdown-item"><Link className="nav-link" to="/admin/albums">Albums</Link></li>
                                            <li className="dropdown-item"><Link className="nav-link" to="/admin/albums/add-music">Collections</Link></li>
                                            <li className="dropdown-item"><Link className="nav-link" to="/admin/users">Users</Link></li>
                                            <li className="dropdown-item"><Link className="nav-link" to="/admin/ratings">Ratings</Link></li>
                                            <li className="dropdown-item"><Link className="nav-link" to="/admin/reviews">Reviews</Link></li>
                                        </ul>
                                    </li>


                                </>
                            )}


                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/music">Music</a>
                            </li>
                   
                        </ul>
                        <SearchBar/>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;