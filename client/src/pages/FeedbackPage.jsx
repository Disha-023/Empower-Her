import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const FeedbackPage = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LangContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'Feedback', // Options: Feedback, Suggestion, Complaint, Bug Report
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      toast.error('Feedback message cannot be empty.');
      return;
    }

    setLoading(true);

    const feedbackPayload = {
      id: 'fb' + Date.now(),
      user: user?.name || 'Anonymous User',
      email: user?.email || 'anonymous@empowerher.gov.in',
      type: formData.type,
      content: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    // Save to LocalStorage immediately for real-time admin sync
    try {
      const existing = JSON.parse(localStorage.getItem('user_feedbacks') || '[]');
      existing.unshift(feedbackPayload);
      localStorage.setItem('user_feedbacks', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to write feedback to local storage', err);
    }

    // Call server to persist (ready for future MongoDB connection)
    try {
      await api.post('/feedback', feedbackPayload);
    } catch (err) {
      console.log('Backend offline or endpoint pending. Feedback saved to local store.', err);
    }

    toast.success('Thank you! Your feedback has been submitted successfully.');
    setFormData({ type: 'Feedback', message: '' });
    setLoading(false);
    
    // Redirect user back to Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 dark:text-white relative">
      <div className="absolute top-10 left-10 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="card-ui w-full max-w-lg p-6 sm:p-10 shadow-2xl relative">
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-violet-650 transition-colors bg-slate-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border"
        >
          <ArrowLeft size={12} /> Dashboard
        </button>

        <div className="text-center mt-6 mb-8 space-y-2">
          <div className="p-3.5 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-full w-14 h-14 flex items-center justify-center mx-auto shadow-sm">
            <MessageSquare size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Submit Feedback</h1>
          <p className="text-gray-500 dark:text-gray-300 text-xs">Help us improve. Share suggestions, report bugs, or submit complaints.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-left text-sm">
          <div>
            <label className="block text-xs font-semibold text-gray-650 dark:text-gray-300 mb-1.5 ml-1">Feedback Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white font-medium"
            >
              <option value="Feedback">General Feedback</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Complaint">Complaint</option>
              <option value="Bug Report">Bug Report</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-650 dark:text-gray-300 mb-1.5 ml-1">Your Message</label>
            <textarea
              rows={5}
              placeholder="Tell us what you think or describe the issue..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-850 dark:text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3.5 flex justify-center items-center gap-2 mt-6 text-xs font-bold"
          >
            {loading ? 'Submitting...' : <><Send size={14} /> Submit Feedback</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
