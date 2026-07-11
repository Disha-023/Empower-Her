import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Shield, CheckCircle, Users, Activity, Map } from 'lucide-react';
import careerRoadmaps from '../data/careerRoadmaps';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') {
      try {
        const rawUsers = localStorage.getItem('all_users');
        if (rawUsers) {
          const parsedUsers = JSON.parse(rawUsers);
          if (Array.isArray(parsedUsers)) {
            setAllUsers(parsedUsers);
          }
        }
      } catch (err) {
        console.error("Failed to load admin users:", err);
      }
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-10 text-gray-500">Loading profile...</div>;
  }

  const appliedSchemes = Array.isArray(user?.appliedSchemes) ? user.appliedSchemes : [];
  
  // Admin stats calculation safely
  const totalUsers = allUsers.length;
  const totalApplications = allUsers.reduce(
    (sum, u) => sum + (Array.isArray(u?.appliedSchemes) ? u.appliedSchemes.length : 0), 
    0
  );

  // --- CAREER ASSESSMENT METADATA CALCULATIONS ---
  const storedCareer = localStorage.getItem('selectedCareer') || localStorage.getItem('selected_career') || user?.career;
  const isQuizCompleted = !!storedCareer || !!user?.quizCompleted;
  
  const rawQuizDate = localStorage.getItem('quizDate') || localStorage.getItem('quiz_completion_date') || user?.quizDate;
  const quizDateString = rawQuizDate ? new Date(rawQuizDate).toLocaleDateString() : 'N/A';
  
  const storedRecs = JSON.parse(localStorage.getItem('topRecommendations') || '[]');
  const topRecommendationsList = storedRecs.length > 0 ? storedRecs : (user?.topRecommendations || []);
  
  // Calculate selected confidence safely
  const selectedCareerName = storedCareer || 'None';
  
  const storedConfidence = JSON.parse(localStorage.getItem('confidenceScores') || '{}');
  const confidenceScores = Object.keys(storedConfidence).length > 0 ? storedConfidence : (user?.confidenceScores || {});
  const selectedConfidence = confidenceScores[selectedCareerName] || Object.values(confidenceScores)[0] || 0;

  // Retrieve matching schemes from careerRoadmaps data
  const matchingRoadmap = selectedCareerName !== 'None' ? careerRoadmaps[selectedCareerName] : null;
  const rawSchemes = matchingRoadmap?.schemes || [];
  const recommendedSchemes = rawSchemes.filter(s => 
    !s.name.toLowerCase().includes('scholarship') && 
    !s.name.toLowerCase().includes('fellowship') &&
    !s.name.toLowerCase().includes('merit')
  );
  const recommendedScholarships = rawSchemes.filter(s => 
    s.name.toLowerCase().includes('scholarship') || 
    s.name.toLowerCase().includes('fellowship') ||
    s.name.toLowerCase().includes('merit')
  );

  const handleSelectCareer = async (careerDomain) => {
    if (!careerDomain) return;
    
    const completionDate = user?.quizDate || new Date().toISOString();
    
    // Update local storage keys
    localStorage.setItem('selected_career', careerDomain);
    localStorage.setItem('selectedCareer', careerDomain);
    
    const targetRoadmap = careerRoadmaps[careerDomain] || careerRoadmaps["Technology & IT"];
    const targetRawSchemes = targetRoadmap?.schemes || [];
    const schemesList = targetRawSchemes.filter(s => 
      !s.name.toLowerCase().includes('scholarship') && 
      !s.name.toLowerCase().includes('fellowship') &&
      !s.name.toLowerCase().includes('merit')
    );
    const scholarshipsList = targetRawSchemes.filter(s => 
      s.name.toLowerCase().includes('scholarship') || 
      s.name.toLowerCase().includes('fellowship') ||
      s.name.toLowerCase().includes('merit')
    );
    localStorage.setItem('recommendedSchemes', JSON.stringify(schemesList));
    localStorage.setItem('recommendedScholarships', JSON.stringify(scholarshipsList));
    
    // Save user career selection locally
    let storedUser = {};
    try {
      storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      console.error(e);
    }
    
    const updatedUser = {
      ...storedUser,
      career: careerDomain,
      quizCompleted: true,
      quizDate: completionDate,
      topRecommendations: user?.topRecommendations || [careerDomain],
      confidenceScores: user?.confidenceScores || { [careerDomain]: 100 },
      quizScores: user?.quizScores || {}
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    if (setUser) {
      setUser(updatedUser);
    }

    // Call server to persist profile update
    try {
      await api.put('/auth/update-profile', {
        career: careerDomain,
        quizCompleted: true,
        quizDate: completionDate,
        topRecommendations: user?.topRecommendations || [careerDomain],
        confidenceScores: user?.confidenceScores || { [careerDomain]: 100 },
        quizScores: user?.quizScores || {}
      });
      toast.success(`Career path updated to: ${careerDomain}!`);
    } catch (err) {
      console.error("Backend error updating profile, saved to local storage", err);
    }
  };

  const handleRetakeQuizClick = () => {
    localStorage.removeItem('quiz_results');
    localStorage.removeItem('quiz_answers');
    localStorage.removeItem('selected_career');
    localStorage.removeItem('quiz_completion_date');
    
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('topRecommendations');
    localStorage.removeItem('selectedCareer');
    localStorage.removeItem('quizDate');
    localStorage.removeItem('confidenceScores');
    localStorage.removeItem('careerExplanation');
    localStorage.removeItem('recommendedSchemes');
    localStorage.removeItem('recommendedScholarships');
    
    const updatedUser = {
      ...user,
      career: null,
      quizCompleted: false,
      quizDate: null,
      topRecommendations: null,
      confidenceScores: null,
      quizScores: null
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    navigate('/quiz');
  };

  return (
    <div className="space-y-6 dark:text-white">
      {/* Profile Header */}
      <div className="bg-pink-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{user?.name || "Guest"}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Logged in as: <span className="font-semibold uppercase text-pink-600 dark:text-pink-400">{user?.role || "USER"}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Section */}
        <div className="card-ui p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <UserIcon className="text-pink-500" /> User Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
              <UserIcon className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Full Name</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{user?.name || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
              <Mail className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email Address</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{user?.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
              <Shield className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Account Role</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{user?.role || 'user'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applied Schemes Section */}
        <div className="card-ui p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="text-purple-500" /> Your Activity
          </h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Schemes Applied: <span className="font-bold text-purple-600 dark:text-purple-400 px-2 py-0.5 bg-purple-50 dark:bg-purple-950/40 rounded-full">{appliedSchemes.length}</span>
            </p>
          </div>
          {appliedSchemes.length > 0 ? (
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {appliedSchemes.map((scheme, idx) => (
                <div key={idx} className="flex gap-3 p-3 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl hover:border-purple-200 dark:hover:border-purple-900 transition-colors">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-1">{scheme?.title || "Unknown Scheme"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Applied on: {scheme?.appliedAt ? new Date(scheme.appliedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 border-dashed">
              <p className="text-gray-500 dark:text-gray-300 text-sm">You haven't applied to any schemes yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Career Assessment Section */}
      <div className="card-ui p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700">
          <Map className="text-pink-500" /> Career Assessment
        </h2>

        {!isQuizCompleted ? (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 border-dashed space-y-4">
            <p className="text-gray-500 dark:text-gray-450 text-sm">You have not completed the Career Interest Assessment yet.</p>
            <Link to="/quiz" className="gradient-btn py-2.5 px-6 font-bold rounded-xl text-white inline-block">
              Take Career Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Quiz Status</span>
                <span className="text-sm font-extrabold text-green-600 dark:text-green-400">Completed</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Quiz Date</span>
                <span className="text-sm font-extrabold text-gray-700 dark:text-gray-300">{quizDateString}</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Selected Career</span>
                <span className="text-sm font-extrabold text-violet-600 dark:text-violet-400 truncate block">{selectedCareerName}</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Confidence %</span>
                <span className="text-sm font-extrabold text-pink-600 dark:text-pink-400">{selectedConfidence > 0 ? `${selectedConfidence}%` : 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top 3 Recommendations Panel */}
              {topRecommendationsList.length > 0 && (
                <div className="p-5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl space-y-3.5">
                  <div className="flex justify-between items-center border-b pb-1 border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest block">Top Recommendations</span>
                    <span className="text-[10px] text-gray-400 font-semibold italic">Click to select active career path</span>
                  </div>
                  <div className="space-y-3">
                    {topRecommendationsList.slice(0, 3).map((recName, idx) => {
                      const scoreVal = user?.confidenceScores?.[recName] || 0;
                      const isActive = selectedCareerName === recName;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectCareer(recName)}
                          className={`w-full flex justify-between items-center text-xs p-2.5 rounded-lg border transition-all cursor-pointer ${
                            isActive
                              ? 'border-violet-600 bg-violet-50/40 dark:bg-violet-950/20 text-violet-800 dark:text-violet-300 font-bold'
                              : 'border-white dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-violet-350 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className="font-extrabold flex items-center gap-2">
                            {idx + 1}. {recName} {isActive && <span className="text-[9px] px-1.5 py-0.5 bg-violet-600 text-white rounded-md font-bold uppercase tracking-wider">Active</span>}
                          </span>
                          <span className={`font-bold px-2 py-0.5 rounded-md border shadow-2xs ${
                            isActive ? 'text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800 bg-white dark:bg-gray-800' : 'text-gray-500 border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900'
                          }`}>
                            {scoreVal}%
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recommended Schemes Panel */}
              <div className="space-y-4">
                {recommendedSchemes.length > 0 && (
                  <div className="p-5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl space-y-3.5">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest block border-b pb-1 border-gray-200 dark:border-gray-800">Recommended Schemes</span>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                      {recommendedSchemes.map((scheme, idx) => (
                        <a
                          key={idx}
                          href={scheme.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-900 transition-colors text-xs"
                        >
                          <span className="font-extrabold text-gray-700 dark:text-gray-300 truncate pr-4">{scheme.name}</span>
                          <span className="text-[10px] font-bold text-pink-500 flex-shrink-0 flex items-center gap-0.5 hover:underline">Apply</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {recommendedScholarships.length > 0 && (
                  <div className="p-5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl space-y-3.5">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest block border-b pb-1 border-gray-200 dark:border-gray-800">Recommended Scholarships</span>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                      {recommendedScholarships.map((sch, idx) => (
                        <a
                          key={idx}
                          href={sch.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-900 transition-colors text-xs"
                        >
                          <span className="font-extrabold text-gray-700 dark:text-gray-300 truncate pr-4">{sch.name}</span>
                          <span className="text-[10px] font-bold text-pink-500 flex-shrink-0 flex items-center gap-0.5 hover:underline">Apply</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/career-roadmap" className="gradient-btn py-2.5 px-6 font-bold rounded-xl text-white inline-block text-center flex-1 sm:flex-initial">
                View My Roadmap
              </Link>
              <button
                onClick={handleRetakeQuizClick}
                className="py-2.5 px-6 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold rounded-xl text-gray-650 dark:text-gray-350 cursor-pointer flex-1 sm:flex-initial transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Section */}
      {user?.role === 'admin' ? (
        <div className="card-ui p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
            <Users className="text-blue-500" /> Admin Global Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-gray-800/50 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full shadow-sm">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Registered Users</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalUsers}</p>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-gray-800/50 p-4 rounded-xl border border-green-100 dark:border-green-900/30 flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 rounded-full shadow-sm">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Global Applications</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalApplications}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;