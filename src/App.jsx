import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ForgetPassword from './pages/ForgetPassword';
import EditableRoutine from './pages/EditableRoutine';
import ProtectedRoute from './components/ProtectedRoute';
import { login } from './redux/authSlice';
import Today from './pages/Today';
import Dashboard from './pages/Dashboard';
import PrivacyPage from './pages/PrivacyPage';
import TermsOfUse from './components/TermsOfUse';
import Contact from './components/Contact';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        dispatch(login({
          token: storedToken,
          user: JSON.parse(storedUser),
        }));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route
          path="/auth"
          element={!token ? <AuthPage /> : <Navigate to="/" replace />}
        />

        {/* Protected Routes */}
        <Route
          path="/routine"
          element={<ProtectedRoute><EditableRoutine /></ProtectedRoute>}
        />
        <Route
          path="/today"
          element={<ProtectedRoute><Today /></ProtectedRoute>}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/privacy"
          element={<ProtectedRoute><PrivacyPage /></ProtectedRoute>}
        />
        <Route
          path="/terms"
          element={<ProtectedRoute><TermsOfUse /></ProtectedRoute>}
        />
        <Route
          path="/contact"
          element={<ProtectedRoute><Contact /></ProtectedRoute>}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={1000} pauseOnHover={false} />
    </>
  );
};

export default App;
