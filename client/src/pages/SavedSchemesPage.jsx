import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';
import { Bookmark, Trash2, Search, ArrowRight, ExternalLink } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const SavedSchemesPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { t, lang } = useContext(LangContext);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const getLocalizedText = (field, lang) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field?.[lang] || field?.en || "";
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      const res = await api.get('/schemes');
      setSaved(res.data);
    } catch (err) {
      toast.error('Failed to load saved schemes');
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await api.delete(`/schemes/${id}`);
      setSaved(saved.filter(s => s._id !== id));
      toast.success('Scheme removed successfully');
    } catch (err) {
      toast.error('Failed to remove bookmark');
    }
  };

  const filtered = saved.filter(s => {
    const titleText = getLocalizedText(s.title, lang).toLowerCase();
    const descText = getLocalizedText(s.description, lang).toLowerCase();
    const q = search.toLowerCase();
    return titleText.includes(q) || descText.includes(q);
  });

  if (loading) return <div className="text-center py-20 text-gray-500">Loading saved schemes...</div>;

  return (
    <div className="space-y-6 text-left dark:text-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-pink-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
            <Bookmark className="text-pink-500 fill-pink-500/20" size={24} /> {t('savedSchemesTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Keep track of programs you have bookmarked for applications.</p>
        </div>
        <span className="text-sm px-3 py-1 bg-white dark:bg-gray-800 border border-pink-200 dark:border-gray-700 text-pink-600 dark:text-pink-400 rounded-full font-bold">
          {saved.length} Bookmarks
        </span>
      </div>

      {/* Search Filter */}
      {saved.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            className="input-field !pl-10 text-gray-800 dark:text-white"
            placeholder="Search saved schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Cards List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/scheme/${item.schemeId}`)}
              className="cursor-pointer card-ui p-5 flex justify-between items-center hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-md"
            >
              <div className="space-y-1 text-left flex-1 min-w-0 pr-4">
                <h3 className="font-bold text-gray-800 dark:text-white truncate">
                  {getLocalizedText(item.title, lang)}
                </h3>
                <p className="text-xs text-gray-400">
                  Bookmarked on: {new Date(item.savedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {getLocalizedText(item.description, lang)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => removeBookmark(e, item._id)}
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
                  title="Remove Bookmark"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  className="p-2.5 text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/20 rounded-xl transition-all"
                  title="View Scheme details"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed">
          <Bookmark className="mx-auto text-gray-300 dark:text-gray-600 mb-3" size={40} />
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">No Saved Schemes</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Explore the directory and save programs you're interested in.</p>
          <Link to="/dashboard" className="gradient-btn py-2 px-6">
            Browse Directory
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedSchemesPage;
