import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ForgetPassword from './pages/ForgetPassword'
import EditableRoutine from './pages/EditableRoutine'
import ProtectedRoute from './components/ProtectedRoute';
import { login } from './redux/authSlice';
import Today from './pages/Today';
import Dashboard from './pages/Dashboard';
import PrivacyPage from './pages/PrivacyPage';
import TermsOfUse from './components/TermsOfUse';
import Contact from './components/Contact';

const App = () => {
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { token } = useSelector((state) => state.auth);

  // Load token from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      dispatch(login({ token: storedToken, user: JSON.parse(storedUser) }));
    }
  }, [dispatch]);

  return (
  <>
  
  <Router>
  {token && <Navbar />}

  <Routes>
    <Route path="/" element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    } />
    
    <Route path="/routine" element={
      <ProtectedRoute>
        <EditableRoutine />
      </ProtectedRoute>
    } />
    <Route path="/today" element={
      <ProtectedRoute>
        <Today />
      </ProtectedRoute>
    } />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/privacy" element={
      <ProtectedRoute>
        <PrivacyPage/>
      </ProtectedRoute>
    } />
    <Route path="/terms" element={
      <ProtectedRoute>
        <TermsOfUse/>
      </ProtectedRoute>
    } />
    <Route path="/contact" element={
      <ProtectedRoute>
        <Contact/>
      </ProtectedRoute>
    } />
    
    <Route path="/auth/forget-password" element={<ForgetPassword/>}/>
    
    <Route path="/auth" element={!token ? <AuthPage /> : <Navigate to="/" />} />
    
    <Route path="*" element={<Navigate to={token ? '/' : '/auth'} />} />
  </Routes>
  
  <ToastContainer position="top-right" autoClose={2000} />
</Router>
  </>
  );
};

export default App;
