import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft } from 'lucide-react';

import { AuthProvider } from './context/AuthContext';
import { LangProvider } from './context/LangContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ChatbotWidget from './components/ChatbotWidget';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import RoadmapPage from './pages/RoadmapPage';
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import CareerRoadmap from './pages/CareerRoadmap';
import SchemeDetailPage from './pages/SchemeDetailPage';
import SavedSchemesPage from './pages/SavedSchemesPage';
import FeedbackPage from './pages/FeedbackPage';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Back button on public authentication and landing pages
  const isPublicPage = ['/', '/login', '/register', '/forgot-password', '/verify-email'].includes(location.pathname);

  if (isPublicPage) return null;

  const handleBack = () => {
    // If browser history exists in SPA session index, go back, else redirect to Dashboard
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="mb-4 flex justify-start">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs active:scale-95"
      >
        <ArrowLeft size={14} /> Back
      </button>
    </div>
  );
};

function App() {
  return (
    <LangProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
              <Navbar />
              <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ErrorBoundary>
                  <BackButton />
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/verify-email" element={<OTPVerificationPage />} />
                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/scheme/:id" element={<SchemeDetailPage />} />
                      <Route path="/saved-schemes" element={<SavedSchemesPage />} />
                      <Route path="/quiz" element={<QuizPage />} />
                      <Route path="/roadmap" element={<RoadmapPage />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/admin-dashboard" element={<AdminDashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/career-roadmap" element={<CareerRoadmap />} />
                      <Route path="/feedback" element={<FeedbackPage />} />
                    </Route>
                  </Routes>
                </ErrorBoundary>
              </main>
              <ChatbotWidget />
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="light" />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </LangProvider>
  );
}

export default App;
