import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MusicPage from './pages/MusicPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import Layout from "./components/Layout.jsx";
import MusicListPage from './pages/MusicListPage';
import MusicDetailPage from './pages/MusicDetailPage';
import { AuthProvider } from './context/AuthContext';
import SearchPage from "./pages/SearchPage.jsx";
import DebugPage from "./pages/DebugPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateMusic from "./components/CreateMusic.jsx";
import EditMusic from "./components/EditMusic.jsx";
import DeleteMusic from "./components/DeleteMusic.jsx";
import AdminMusicManagement from "./components/AdminMusicManagement.jsx";
import AlbumList from './components/AlbumList.jsx';
import CreateAlbum from "./components/CreateAlbum.jsx";
import EditAlbum from "./components/EditAlbum.jsx";
import AddMusicToAlbum from "./components/AddMusicToAlbum.jsx";
import UsersList from "./components/UsersList.jsx";
import EditUser from "./components/EditUser.jsx";
import ReviewsList from "./components/ReviewsList.jsx";
import EditReview from "./components/EditReview.jsx";
import RatingsList from "./components/RatingsList.jsx";
import EditRating from "./components/EditRating.jsx";
function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/music/:id" element={<MusicDetailPage />} />
                    <Route path="/music" element={<MusicListPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/debug" element={<DebugPage />} />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/create-music" element={
                        <ProtectedRoute  requiredStatus="admin">
                            <CreateMusic />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/edit-music/:id" element={
                        <ProtectedRoute  requiredStatus="admin">
                            <EditMusic />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/delete-music/:id" element={
                        <ProtectedRoute  requiredStatus="admin">
                            <DeleteMusic />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/music-management" element={
                        <ProtectedRoute requiredStatus="admin">
                            <AdminMusicManagement />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin/albums/create" element={
                        <ProtectedRoute requiredStatus="admin">
                            <CreateAlbum />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/albums/edit/:id" element={
                        <ProtectedRoute requiredStatus="admin">
                            <EditAlbum />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/albums" element={
                        <ProtectedRoute requiredStatus="admin">
                            <AlbumList />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin/albums/add-music" element={
                        <ProtectedRoute requiredStatus="admin">
                            <AddMusicToAlbum />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin/users" element={
                        <ProtectedRoute requiredStatus="admin">
                            <UsersList />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin/users/edit/:id" element={
                        <ProtectedRoute requiredStatus="admin">
                            <EditUser />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin/reviews" element={
                        <ProtectedRoute requiredStatus="admin">
                            <ReviewsList />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/reviews/edit/:id" element={
                        <ProtectedRoute requiredStatus="admin">
                            <EditReview />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/ratings" element={
                        <ProtectedRoute requiredStatus="admin">
                            <RatingsList />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/ratings/edit/:id" element={
                        <ProtectedRoute requiredStatus="admin">
                            <EditRating />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default App;