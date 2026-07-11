import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';
import { ThemeContext } from '../context/ThemeContext';
import { 
  LogOut, User, Home, BookOpen, Map, Shield, Globe, Sun, Moon, 
  Bookmark, Type, Bell, MessageSquare 
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang, changeLang, t, activeLanguages, supportedLanguages } = useContext(LangContext);
  const { theme, toggleTheme, changeFontSize, resetFontSize } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Notification popup toggles
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Load and sync notifications from LocalStorage
  const loadNotifs = () => {
    const stored = localStorage.getItem('user_notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      const defaults = [
        { id: 'n1', title: 'New Scheme Added', message: 'Sukanya Samriddhi Yojana details updated.', read: false, date: '2026-06-04' },
        { id: 'n2', title: 'Scholarship Added', message: 'CBSE Udaan scheme is accepting registrations.', read: true, date: '2026-06-03' }
      ];
      localStorage.setItem('user_notifications', JSON.stringify(defaults));
      setNotifications(defaults);
    }
  };

  useEffect(() => {
    loadNotifs();

    // Listen to background broadcast edits from other tabs (e.g. Admin broadcasts)
    window.addEventListener('storage', loadNotifs);
    return () => window.removeEventListener('storage', loadNotifs);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('user_notifications', JSON.stringify(updated));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                E
              </div>
              <span className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">
                Empower<span className="text-pink-500">Her</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation and Accessibility controls */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            
            {/* Accessibility Controls: Dark Mode & Font Sizing */}
            <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800/80 p-1.5 rounded-full border border-gray-100 dark:border-gray-700 mr-1 sm:mr-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all duration-300 cursor-pointer shadow-xs active:scale-90"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={16} className="transition-transform duration-500 rotate-180 text-yellow-500" /> : <Moon size={16} className="transition-transform duration-500 rotate-0" />}
              </button>

              {/* Divider */}
              <span className="w-px h-4 bg-gray-200 dark:bg-gray-700"></span>

              {/* Font Size decrease (A-) */}
              <button
                onClick={() => changeFontSize('down')}
                className="p-1 text-xs font-bold text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all cursor-pointer"
                title="Decrease font size"
              >
                A-
              </button>

              {/* Font Size reset (Normal A) */}
              <button
                onClick={resetFontSize}
                className="p-1 text-xs font-bold text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all cursor-pointer"
                title="Reset font size"
              >
                A
              </button>

              {/* Font Size increase (A+) */}
              <button
                onClick={() => changeFontSize('up')}
                className="p-1 text-xs font-bold text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all cursor-pointer"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Notification Bell Dropdown */}
            {user && (
              <div className="relative mr-1">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) markAllRead();
                  }}
                  className="flex items-center p-2 text-gray-500 dark:text-gray-300 hover:text-pink-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all cursor-pointer relative"
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-50 p-3 max-h-80 overflow-y-auto space-y-2">
                    <div className="flex justify-between items-center border-b pb-2 mb-2 border-gray-100 dark:border-gray-700">
                      <span className="font-bold text-xs text-gray-800 dark:text-white">Notifications</span>
                      <button onClick={markAllRead} className="text-[10px] text-pink-600 font-semibold hover:underline">Mark all read</button>
                    </div>
                    {notifications.length > 0 ? (
                      <div className="space-y-1.5">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-2 rounded-lg text-left transition-all ${n.read ? 'bg-transparent' : 'bg-pink-50/30 dark:bg-pink-950/10 border-l-2 border-pink-500'}`}>
                            <h4 className="font-bold text-xs text-gray-900 dark:text-white">{n.title}</h4>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{n.message}</p>
                            <span className="text-[8px] text-gray-400 block mt-1">{n.date}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-4">No notifications.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Dynamic Language Switcher */}
            <div className="relative group mr-1">
              <button className="flex items-center gap-1 text-gray-500 dark:text-gray-300 hover:text-pink-600 px-2 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                <Globe size={18} />
                <span className="uppercase">{lang}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-1">
                  {supportedLanguages
                    .filter(l => (activeLanguages || []).includes(l.code))
                    .map(l => (
                      <button 
                        key={l.code}
                        onClick={() => changeLang(l.code)} 
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-pink-50 dark:hover:bg-gray-700 ${lang === l.code ? 'text-pink-600 dark:text-pink-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {l.label}
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
            
            {/* Authenticated Links */}
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin-dashboard" replace className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
                    <Shield size={18} /> <span className="hidden lg:inline">{t('adminDashboard')}</span>
                  </Link>
                ) : (
                  <>
                    <Link to="/dashboard" replace className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
                      <Home size={18} /> <span className="hidden lg:inline">{t('dashboard')}</span>
                    </Link>
                    <Link to="/saved-schemes" replace className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
                      <Bookmark size={18} /> <span className="hidden lg:inline">{t('savedSchemes')}</span>
                    </Link>
                    <Link to="/quiz" replace className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
                      <BookOpen size={18} /> <span className="hidden lg:inline">Quiz</span>
                    </Link>
                    <Link to="/feedback" replace className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
                      <MessageSquare size={18} /> <span className="hidden lg:inline">Feedback</span>
                    </Link>
                  </>
                )}
                <Link to="/profile" replace className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
                  <User size={18} /> <span className="hidden lg:inline">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  <LogOut size={18} /> <span className="hidden lg:inline">{t('logout')}</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500 px-4 py-2 text-sm font-medium transition-colors">
                  {t('login')}
                </Link>
                <Link to="/register" className="gradient-btn text-sm py-2">
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
