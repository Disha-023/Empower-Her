import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser.appliedSchemes) parsedUser.appliedSchemes = [];
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    const userToSave = { ...userData, appliedSchemes: userData.appliedSchemes || [] };
    localStorage.setItem('user', JSON.stringify(userToSave));
    localStorage.setItem('token', token);
    setUser(userToSave);
  };

  const logout = async () => {
    const userId = user?.id;
    
    // Clear user state and authentication data synchronously
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Clear all cached user data
    localStorage.removeItem('quiz_results');
    localStorage.removeItem('quiz_answers');
    localStorage.removeItem('selected_career');
    localStorage.removeItem('quiz_completion_date');
    localStorage.removeItem('dashboard_filters');
    localStorage.removeItem('dashboard_search_query');
    localStorage.removeItem('recently_viewed');
    
    // Clear session storage
    sessionStorage.clear();

    try {
      if (userId) await api.post('/auth/logout', { userId });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
