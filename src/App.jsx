import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home"; // ← çoğul değil!
import Login from "./components/Login";
import Register from "./components/Register";
import CVTemplates from "./components/CVTemplates";
import CVBuilder from "./components/CVBuilder";
import CVChatbot from "./components/CVChatbot";
import PrivateRoute from "./components/PrivateRoute";
import MyCVs from "./components/MyCVs";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/templates"
                element={
                  <PrivateRoute>
                    <CVTemplates />
                  </PrivateRoute>
                }
              />
              <Route
                path="/builder/:templateId"
                element={
                  <PrivateRoute>
                    <CVBuilder />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-cvs"
                element={
                  <PrivateRoute>
                    <MyCVs />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <CVChatbot />
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
