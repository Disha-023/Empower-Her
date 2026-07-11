import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';
import { ThemeContext } from '../context/ThemeContext';
import { ChevronLeft, Volume2, VolumeX, Bookmark, BookmarkCheck, Calendar, MapPin, Tag, Landmark, FileText, CheckSquare, ClipboardList, Clock } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const SchemeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { t, lang } = useContext(LangContext);
  const { speaking, speak, stopSpeaking } = useContext(ThemeContext);

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savedSchemeId, setSavedSchemeId] = useState(null); // Database row ID of saved scheme

  const getLocalizedText = (field, lang) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field?.[lang] || field?.en || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schemeRes, savedRes] = await Promise.all([
          api.get(`/schemes/available/${id}`),
          api.get('/schemes').catch(() => ({ data: [] }))
        ]);
        
        setScheme(schemeRes.data);
        
        // Check if bookmarked
        const found = savedRes.data.find(s => s.schemeId === id);
        if (found) {
          setIsSaved(true);
          setSavedSchemeId(found._id);
        }
      } catch (err) {
        toast.error('Failed to load scheme details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const toggleSave = async () => {
    if (isSaved) {
      // Remove bookmark
      try {
        await api.delete(`/schemes/${savedSchemeId}`);
        setIsSaved(false);
        setSavedSchemeId(null);
        toast.success('Scheme removed from saved list');
      } catch (err) {
        toast.error('Failed to remove scheme');
      }
    } else {
      // Save bookmark
      try {
        const res = await api.post('/schemes/save', {
          schemeId: scheme.id,
          title: scheme.title,
          description: scheme.description
        });
        setIsSaved(true);
        setSavedSchemeId(res.data._id);
        toast.success('Scheme saved successfully');
      } catch (err) {
        toast.error('Failed to save scheme');
      }
    }
  };

  const handleReadAloud = () => {
    if (speaking) {
      stopSpeaking();
    } else {
      const titleText = getLocalizedText(scheme?.title, lang);
      const descText = getLocalizedText(scheme?.description, lang);
      const benefitText = getLocalizedText(scheme?.benefits, lang);
      const textToRead = `${titleText}. ${descText}. ${benefitText}`;
      speak(textToRead);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading scheme details...</div>;
  if (!scheme) return <div className="text-center py-20 text-red-500">Scheme not found</div>;

  // Calculate deadline remaining
  const daysRemaining = (() => {
    if (!scheme.lastDate) return null;
    const diffTime = new Date(scheme.lastDate) - new Date();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  })();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 text-left dark:text-white">
      {/* Navigation and Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
          <ChevronLeft size={16} /> Back to Schemes
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReadAloud}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
              speaking 
                ? 'bg-red-50 dark:bg-red-950/20 text-red-600 border-red-200' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
            title="Read title and description aloud"
          >
            {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {speaking ? 'Stop Speaking' : t('readAloud')}
          </button>
          
          <button
            onClick={toggleSave}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
              isSaved 
                ? 'bg-violet-50 dark:bg-violet-950/20 text-violet-600 border-violet-200' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {isSaved ? <BookmarkCheck className="text-violet-500" size={16} /> : <Bookmark size={16} />}
            {isSaved ? 'Saved' : t('save')}
          </button>
        </div>
      </div>

      {/* Main Detail Header Card */}
      <div className="card-ui p-6 md:p-8 relative">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 text-xs font-bold rounded-lg uppercase tracking-wider border border-violet-100 dark:border-violet-800/30">
              <Tag size={12} /> {scheme.category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg uppercase tracking-wider border border-blue-100 dark:border-blue-800/30">
              <MapPin size={12} /> {scheme.state === 'all' ? 'All India' : scheme.state}
            </span>
            {daysRemaining !== null && daysRemaining <= 10 && daysRemaining >= 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg uppercase tracking-wider border border-red-200">
                <Clock size={12} /> {t('urgent')} ({daysRemaining} days left)
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-snug">
            {getLocalizedText(scheme.title, lang)}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            {getLocalizedText(scheme.description, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-gray-100 dark:border-gray-700/50">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider block">Benefits</span>
            <span className="text-sm font-extrabold text-violet-600 dark:text-violet-400 block mt-0.5">
              {getLocalizedText(scheme.amountLocale, lang) || scheme.amount}
            </span>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider block">Income Limit</span>
            <span className="text-sm font-extrabold text-gray-700 dark:text-gray-300 block mt-0.5">
              {scheme.eligibility?.incomeLimit || 'None'}
            </span>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider block">Last Date</span>
            <span className="text-sm font-extrabold text-pink-600 dark:text-pink-400 block mt-0.5">
              {scheme.lastDate ? new Date(scheme.lastDate).toLocaleDateString() : 'Continuous'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits Section */}
        <div className="card-ui p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Landmark size={20} className="text-violet-600 dark:text-violet-400" /> {t('benefits')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {getLocalizedText(scheme.benefits, lang) || 'Provides financial grants, assistance, and support programs according to guidelines.'}
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div className="card-ui p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <CheckSquare size={20} className="text-pink-500" /> {t('eligibilityCriteria')}
          </h2>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-700/50">
              <strong className="text-gray-700 dark:text-gray-400">{t('gender')}:</strong> 
              <span className="capitalize font-semibold">{scheme.eligibility?.gender || 'Female'}</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-700/50">
              <strong className="text-gray-700 dark:text-gray-400">{t('age')}:</strong> 
              <span className="font-semibold">{scheme.eligibility?.minAge} to {scheme.eligibility?.maxAge} Years</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-gray-50 dark:border-gray-700/50">
              <strong className="text-gray-700 dark:text-gray-400">{t('state')}:</strong> 
              <span className="font-semibold">{scheme.eligibility?.state === 'all' ? 'All States' : scheme.eligibility?.state}</span>
            </li>
            <li className="flex justify-between py-1.5">
              <strong className="text-gray-700 dark:text-gray-400">{t('incomeLimit')}:</strong> 
              <span className="font-semibold">{scheme.eligibility?.incomeLimit || 'None'}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Documents */}
        <div className="card-ui p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FileText size={20} className="text-violet-600 dark:text-violet-400" /> {t('documentsRequired')}
          </h2>
          <ul className="space-y-2">
            {scheme.documentsRequired?.map((doc, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400"></div>
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* Application Process */}
        <div className="card-ui p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <ClipboardList size={20} className="text-pink-500" /> {t('howToApply')}
          </h2>
          <ol className="space-y-3">
            {(getLocalizedText(scheme.howToApply, lang) || scheme.howToApply?.en || []).map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="font-bold text-pink-500 flex-shrink-0 mt-0.5">{idx + 1}.</span>
                <span>{step.replace(/Step \d+: |चरण \d+: |पायरी \d+: |ಹಂತ \d+: /, '')}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="card-ui p-5 bg-gradient-to-r from-violet-50 to-pink-50 dark:from-gray-900/50 dark:to-gray-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-gray-800 dark:text-white">Ready to apply for this opportunity?</h4>
          <p className="text-xs text-gray-500">You will be redirected to the secure official government application portal.</p>
        </div>
        
        {scheme.applyLink ? (
          <a
            href={scheme.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn py-3 px-8 text-sm inline-flex items-center gap-2"
          >
            {t('applyNow')} <ChevronLeft size={16} className="rotate-180" />
          </a>
        ) : (
          <button
            disabled
            className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed rounded-xl py-3 px-8 text-sm font-semibold"
          >
            {t('officialLinkComingSoon')}
          </button>
        )}
      </div>
    </div>
  );
};

export default SchemeDetailPage;
