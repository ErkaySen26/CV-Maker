import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CVTemplates from './components/CVTemplates';
import MyCVs from './components/MyCVs';
import CVChatbot from './components/CVChatbot';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateCV from './components/CreateCV';
import EditCV from './components/EditCV';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/cv-templates"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <CVTemplates />
                    <Footer />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/my-cvs"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <MyCVs />
                    <Footer />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/create-cv/:templateId"
              element={
                <PrivateRoute>
                  <CreateCV />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-cv/:cvId"
              element={
                <PrivateRoute>
                  <EditCV />
                </PrivateRoute>
              }
            />
          </Routes>
          <CVChatbot />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 