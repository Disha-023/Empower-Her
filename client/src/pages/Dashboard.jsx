import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';
import { ThemeContext } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Bookmark, CheckCircle2, ChevronRight, BookmarkMinus, Calendar, ArrowRight, User, Search, Eye, Filter, HelpCircle } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { t, lang } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [quizResult, setQuizResult] = useState(null);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [availableSchemes, setAvailableSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Personalized Dashboard Widget States
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Smart Filters State
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('dashboard_search_query') || '';
  });
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('dashboard_filters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse dashboard filters', e);
      }
    }
    return {
      ageGroup: 'all',
      category: 'all',
      state: 'all',
      maxIncome: ''
    };
  });

  const getLocalizedText = (field, lang) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field?.[lang] || field?.en || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizRes, savedRes, availableRes] = await Promise.all([
          api.get('/quiz/latest').catch(() => ({ data: null })),
          api.get('/schemes').catch(() => ({ data: [] })),
          api.get('/schemes/available').catch(() => ({ data: [] }))
        ]);
        
        setQuizResult(quizRes.data);
        setSavedBookmarks(savedRes.data);
        setAvailableSchemes(availableRes.data);
        
        // Auto filter from quiz result only if no saved filters exist
        const hasSavedFilters = localStorage.getItem('dashboard_filters');
        if (quizRes.data && !hasSavedFilters) {
          const cats = quizRes.data.primaryCategory.split(', ');
          let matchedCategory = 'all';
          if (cats.includes('Entrepreneur')) matchedCategory = 'Business';
          else if (cats.includes('Tech')) matchedCategory = 'Education';
          else if (cats.includes('Education')) matchedCategory = 'Education';
          
          if (matchedCategory !== 'all') {
            setFilters(prev => {
              const updated = { ...prev, category: matchedCategory };
              localStorage.setItem('dashboard_filters', JSON.stringify(updated));
              return updated;
            });
          }
        }

        // Load recently viewed from localStorage
        const storedRecent = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
        setRecentlyViewed(storedRecent);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Save filters dynamically when they change
  useEffect(() => {
    if (searchQuery !== '') {
      localStorage.setItem('dashboard_search_query', searchQuery);
    } else {
      localStorage.removeItem('dashboard_search_query');
    }
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('dashboard_filters', JSON.stringify(filters));
  }, [filters]);

  const saveScheme = async (e, sch) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const res = await api.post('/schemes/save', { 
        schemeId: sch.id, 
        title: sch.title, 
        description: sch.description 
      });
      const updated = [...savedBookmarks, res.data];
      setSavedBookmarks(updated);
      toast.success('Scheme saved successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving scheme');
    }
  };

  const removeScheme = async (e, savedRowId) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await api.delete(`/schemes/${savedRowId}`);
      const updated = savedBookmarks.filter(s => s._id !== savedRowId);
      setSavedBookmarks(updated);
      toast.success("Scheme removed");
    } catch (err) {
      toast.error("Failed to remove scheme");
    }
  };

  // Eligibility matching algorithm
  const checkEligibilityMatch = (sch) => {
    let ok = true;
    
    // Check gender
    if (sch.eligibility?.gender && sch.eligibility.gender !== 'female') {
      ok = false;
    }

    // Check age range
    // If specific age group is selected:
    if (filters.ageGroup !== 'all') {
      const min = sch.eligibility?.minAge || 0;
      const max = sch.eligibility?.maxAge || 100;
      if (filters.ageGroup === 'girl_child' && (max < 0 || min > 14)) ok = false;
      if (filters.ageGroup === 'student' && (max < 15 || min > 24)) ok = false;
      if (filters.ageGroup === 'working_woman' && (max < 25 || min > 50)) ok = false;
      if (filters.ageGroup === 'entrepreneur' && (max < 18 || min > 65)) ok = false;
      if (filters.ageGroup === 'senior_citizen' && (max < 60 || min > 100)) ok = false;
    }

    // Check category type
    if (filters.category !== 'all') {
      // Map main filter categories to schema category types
      const schemaCat = (sch.category || '').toLowerCase();
      const filterCat = filters.category.toLowerCase();
      if (schemaCat !== filterCat) {
        ok = false;
      }
    }

    // Check State
    if (filters.state !== 'all') {
      const schemeState = sch.eligibility?.state || 'all';
      if (schemeState !== 'all' && schemeState.toLowerCase() !== filters.state.toLowerCase()) {
        ok = false;
      }
    }

    // Check Income Limit
    if (filters.maxIncome) {
      const incomeLimitStr = sch.eligibility?.incomeLimit || 'None';
      if (incomeLimitStr !== 'None') {
        // Extract number from string, e.g. "₹8 Lakhs/annum" -> 800000
        const matches = incomeLimitStr.match(/\d+/);
        if (matches) {
          const limitValue = Number(matches[0]) * 100000;
          if (Number(filters.maxIncome) > limitValue) {
            ok = false;
          }
        }
      }
    }

    return ok;
  };

  // Filter schemes dynamically
  const filteredSchemes = availableSchemes.filter(sch => {
    // 1. Text Search query
    const titleText = getLocalizedText(sch.title, lang).toLowerCase();
    const descText = getLocalizedText(sch.description, lang).toLowerCase();
    const query = searchQuery.toLowerCase();
    if (query && !titleText.includes(query) && !descText.includes(query)) {
      return false;
    }

    // 2. Strict eligibility filters
    return checkEligibilityMatch(sch);
  });

  // Calculate stats for personalized summary cards
  const eligibleSchemesCount = availableSchemes.filter(checkEligibilityMatch).length;
  
  // Calculate upcoming deadlines (schemes ending in next 30 days)
  const upcomingDeadlines = availableSchemes.filter(sch => {
    if (!sch.lastDate) return false;
    const diffTime = new Date(sch.lastDate) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 30; // within 30 days
  }).sort((a, b) => new Date(a.lastDate) - new Date(b.lastDate));

  // Checklist
  const checklist = [
    { titleKey: 'takeQuiz', title: "Take the Career Quiz", done: !!quizResult },
    { titleKey: 'exploreRoadmap', title: "Explore the Roadmap", done: false },
    { titleKey: 'saveScheme', title: "Save a Scheme/Scholarship", done: savedBookmarks.length > 0 },
    { titleKey: 'chatBot', title: "Chat with Career Bot", done: false }
  ];

  const handleSchemeClick = (sch) => {
    // Add to recently viewed in localStorage with viewedAt timestamp
    let recent = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
    recent = recent.filter(item => item.id !== sch.id); // remove duplicates
    recent.unshift({ 
      id: sch.id, 
      title: sch.title, 
      category: sch.category, 
      viewedAt: new Date().toLocaleString() 
    }); // add to top
    recent = recent.slice(0, 4); // keep top 4
    localStorage.setItem('recently_viewed', JSON.stringify(recent));
    setRecentlyViewed(recent);

    // Route to details
    navigate(`/scheme/${sch.id}`);
  };

  const clearFilters = () => {
    setFilters({
      ageGroup: 'all',
      category: 'all',
      state: 'all',
      maxIncome: ''
    });
    setSearchQuery('');
    localStorage.removeItem('dashboard_filters');
    localStorage.removeItem('dashboard_search_query');
  };

  const focusEligibility = () => {
    const el = document.getElementById('filters-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 text-left dark:text-white">
      {/* 1. Personalized Header Banner */}
      <div className="bg-pink-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white mb-1">
            {t('welcome')}, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {t('readyToBuild')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/profile" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold shadow-xs">
            <User size={14} /> Profile
          </Link>
        </div>
      </div>

      {/* 2. Personalized Statistics Grid & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Metric 1: Eligible Schemes */}
        <div onClick={focusEligibility} className="card-ui p-5 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-2xl">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Eligible Schemes</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{eligibleSchemesCount} Match</span>
          </div>
        </div>

        {/* Metric 2: Saved Schemes */}
        <Link to="/saved-schemes" className="card-ui p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-pink-50 dark:bg-pink-950/40 text-pink-500 rounded-2xl">
            <Bookmark size={24} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{t('savedSchemes')}</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{savedBookmarks.length} Saved</span>
          </div>
        </Link>

        {/* Metric 3: Upcoming Deadlines count */}
        <div className="card-ui p-5 flex items-center gap-4">
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-2xl">
            <Calendar size={24} />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Upcoming Deadlines</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{upcomingDeadlines.length} Alert</span>
          </div>
        </div>

        {/* Metric 4: Quick Actions Grid */}
        <div className="card-ui p-4 bg-gradient-to-br from-violet-600 to-pink-500 text-white flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider block">{t('quickActions')}</span>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button onClick={focusEligibility} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-semibold transition-all">
              Browse List
            </button>
            <button onClick={focusEligibility} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-semibold transition-all">
              Eligibility
            </button>
            <Link to="/saved-schemes" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-semibold transition-all block">
              Saved List
            </Link>
            <Link to="/profile" className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-left text-xs font-semibold transition-all block">
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Schemes Directory */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Smart Search & Filters Panel */}
          <div id="filters-section" className="card-ui p-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 dark:border-gray-700 pb-3">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Filter size={18} className="text-violet-600" /> {t('filterAvailable')}
              </h2>
              <button onClick={clearFilters} className="text-xs font-semibold text-pink-600 hover:text-pink-700 cursor-pointer">
                Clear Filters
              </button>
            </div>

            <div className="space-y-4">
              {/* Dynamic Text Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  className="input-field !pl-10 text-gray-800 dark:text-white"
                  placeholder={t('searchSchemes') || 'Search Schemes...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Age Group Filter */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Age Group</label>
                  <select
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
                    value={filters.ageGroup}
                    onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
                  >
                    <option value="all">Any Age Group</option>
                    <option value="girl_child">Girl Child (0-14)</option>
                    <option value="student">Student (15-24)</option>
                    <option value="working_woman">Working Woman (25-50)</option>
                    <option value="entrepreneur">Entrepreneur (18-65)</option>
                    <option value="senior_citizen">Senior Citizen (60+)</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{t('category')}</label>
                  <select
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="all">Any Category</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Employment">Employment</option>
                    <option value="Business">Business</option>
                    <option value="Skill Development">Skill Development</option>
                  </select>
                </div>

                {/* State Filter */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{t('state')}</label>
                  <select
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
                    value={filters.state}
                    onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  >
                    <option value="all">All States</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                {/* Income Filter */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{t('incomeFilter') || 'Max Annual Income'}</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
                    placeholder="e.g. 500000"
                    value={filters.maxIncome}
                    onChange={(e) => setFilters({ ...filters, maxIncome: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scheme Listings */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-gray-800 dark:text-white">Matching Schemes Directory</h2>

            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((sch) => {
                const savedRow = savedBookmarks.find(s => s.schemeId === sch.id);
                const isSaved = !!savedRow;
                
                // Calculate days remaining
                const daysLeft = sch.lastDate ? Math.ceil((new Date(sch.lastDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;

                return (
                  <div
                    key={sch.id}
                    onClick={() => handleSchemeClick(sch)}
                    className="cursor-pointer card-ui p-5 flex flex-col justify-between hover:border-pink-300 dark:hover:border-pink-700 transition-all hover:shadow-md text-left"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 text-[10px] font-bold rounded uppercase">
                            {sch.category}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase">
                            {sch.state === 'all' ? 'All India' : sch.state}
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => isSaved ? removeScheme(e, savedRow._id) : saveScheme(e, sch)}
                          className="text-gray-400 hover:text-pink-500 p-1 rounded-full cursor-pointer transition-all"
                          title="Save scheme"
                        >
                          {isSaved ? (
                            <BookmarkMinus size={20} className="text-pink-500 fill-pink-500/20" />
                          ) : (
                            <Bookmark size={20} />
                          )}
                        </button>
                      </div>

                      <h3 className="font-extrabold text-gray-800 dark:text-white hover:text-violet-600 transition-colors line-clamp-1">
                        {getLocalizedText(sch.title, lang)}
                      </h3>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {getLocalizedText(sch.description, lang)}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-[9px] text-gray-400 tracking-wider font-bold uppercase">Benefit</p>
                          <p className="text-xs font-black text-violet-600 dark:text-violet-400">
                            {getLocalizedText(sch.amountLocale, lang) || sch.amount}
                          </p>
                        </div>
                        {daysLeft !== null && (
                          <div>
                            <p className="text-[9px] text-gray-400 tracking-wider font-bold uppercase">Deadline</p>
                            <p className={`text-xs font-black flex items-center gap-1 ${daysLeft <= 10 && daysLeft >= 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>
                              <Calendar size={12} /> {daysLeft >= 0 ? `${daysLeft} days remaining` : 'Closed'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={sch.applyLink || "https://www.myscheme.gov.in"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 text-[10px] font-bold text-gray-500 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:text-violet-650 hover:bg-violet-50 dark:hover:bg-violet-950/20 rounded-lg transition-colors cursor-pointer"
                        >
                          Official Website
                        </a>
                        <a
                          href={sch.applyLink || "https://www.myscheme.gov.in"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 text-[10px] font-bold text-white bg-pink-500 hover:bg-pink-650 rounded-lg transition-colors cursor-pointer"
                        >
                          Apply Now
                        </a>
                        <button className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1 hover:gap-1.5 transition-all">
                          Details <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed">
                <p className="text-gray-500 dark:text-gray-300 text-sm">{t('noSchemesFound')}</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Sidebar (Widgets) */}
        <div className="space-y-6">
          {/* Recently Viewed Widget */}
          <div className="card-ui p-5">
            <h2 className="text-md font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2 border-b border-gray-50 dark:border-gray-700/50 pb-2">
              <Eye size={18} className="text-pink-500" /> {t('recentlyViewed') || 'Recently Viewed'}
            </h2>
            {recentlyViewed.length > 0 ? (
              <div className="space-y-2">
                {recentlyViewed.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/scheme/${item.id}`)}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-950 border border-gray-100 dark:border-gray-700/50 flex justify-between items-center cursor-pointer transition-all"
                  >
                    <div className="text-left min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-white truncate">
                        {getLocalizedText(item.title, lang)}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[9px] font-semibold text-gray-400 uppercase">{item.category}</span>
                        {item.viewedAt && (
                          <span className="text-[8px] text-gray-405 dark:text-gray-400 font-medium">
                            {item.viewedAt.split(',')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-4">No recently viewed schemes.</p>
            )}
          </div>

          {/* Upcoming Deadlines Widget */}
          <div className="card-ui p-5">
            <h2 className="text-md font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2 border-b border-gray-50 dark:border-gray-700/50 pb-2">
              <Calendar size={18} className="text-violet-600" /> {t('upcomingDeadlines')}
            </h2>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-2.5">
                {upcomingDeadlines.slice(0, 4).map((sch) => {
                  const daysLeft = Math.ceil((new Date(sch.lastDate) - new Date()) / (1000 * 60 * 60 * 24));
                  return (
                    <div
                      key={sch.id}
                      onClick={() => navigate(`/scheme/${sch.id}`)}
                      className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-950 border border-gray-100 dark:border-gray-700/50 flex flex-col cursor-pointer transition-all"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-gray-800 dark:text-white truncate text-left flex-1">
                          {getLocalizedText(sch.title, lang)}
                        </h4>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${daysLeft <= 10 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600'}`}>
                          {daysLeft}d left
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400">
                        <span>Last Date: {new Date(sch.lastDate).toLocaleDateString()}</span>
                        <span className="font-bold hover:underline text-violet-600">Details</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-4">No deadlines in the next 30 days.</p>
            )}
          </div>

          {/* Existing Quiz Result & Getting Started widgets for backward compatibility */}
          <div className="card-ui p-5">
            <div className="flex items-center gap-2.5 mb-3 border-b border-gray-50 dark:border-gray-700/50 pb-2">
              <Trophy size={18} className="text-yellow-500" />
              <h2 className="text-md font-bold text-gray-800 dark:text-white">Career Insights</h2>
            </div>
            {quizResult ? (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50 text-left">
                <h3 className="font-bold text-xs text-gray-700 dark:text-gray-350">Recommended: <span className="text-pink-600">{quizResult.primaryCategory}</span></h3>
                <div className="space-y-2 mt-3">
                  {Object.entries(quizResult?.scores || {}).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([category, score]) => (
                     <div key={category}>
                       <div className="flex justify-between text-[10px] font-medium text-gray-400 mb-0.5">
                         <span>{category}</span>
                         <span>{score} pts</span>
                       </div>
                       <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1">
                         <div className="bg-violet-500 h-1 rounded-full" style={{ width: `${Math.min(100, score)}%` }}></div>
                       </div>
                     </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 text-xs mb-3">Discover your ideal career path.</p>
                <Link to="/quiz" className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-xl text-xs font-semibold inline-block transition-colors">Take Quiz</Link>
              </div>
            )}
          </div>

          <div className="card-ui p-5">
            <h2 className="text-md font-bold text-gray-800 dark:text-white mb-3 border-b border-gray-50 dark:border-gray-700/50 pb-2">{t('gettingStarted')}</h2>
            <div className="space-y-2.5">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/50 text-left">
                  {item.done ? (
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"></div>
                  )}
                  <span className={`text-xs ${item.done ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300 font-medium'}`}>{t(item.titleKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
