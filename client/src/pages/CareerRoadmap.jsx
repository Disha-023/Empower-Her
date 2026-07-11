import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Bookmark, GraduationCap, Map, 
  TrendingUp, Award, Coins, BookOpen, Briefcase, ExternalLink, Sparkles, Lock
} from 'lucide-react';
import careerRoadmaps from '../data/careerRoadmaps';
import learningResources from '../data/learningResources';

const CareerRoadmap = () => {
  const { user } = useContext(AuthContext);
  const { lang, t } = useContext(LangContext);
  
  const selectedCareer = localStorage.getItem('selectedCareer') || localStorage.getItem('selected_career') || user?.career;
  const storedRecs = JSON.parse(localStorage.getItem('topRecommendations') || '[]');
  const recommendations = storedRecs.length > 0 ? storedRecs : (user?.topRecommendations || (user?.career ? [user.career] : []));
  
  // Local state to keep track of which career is currently being viewed
  const [activeCareerKey, setActiveCareerKey] = useState(() => {
    return selectedCareer || (recommendations.length > 0 ? recommendations[0] : '');
  });

  // Sync activeCareerKey with user's selected career
  useEffect(() => {
    if (selectedCareer) {
      setActiveCareerKey(selectedCareer);
    }
  }, [selectedCareer]);

  if (!selectedCareer) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="card-ui bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-white shadow-lg mb-6 animate-pulse">
              <Lock size={32} />
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
              Roadmap Locked
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Discover your potential! Please complete the Career Interest Assessment to unlock your personalized career roadmap, milestone guides, and curated learning resources.
            </p>
            
            <Link 
              to="/quiz" 
              className="gradient-btn px-8 py-3 font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 inline-block text-center"
            >
              Take Career Quiz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Load active roadmap details
  const roadmapData = careerRoadmaps[activeCareerKey] || careerRoadmaps["Technology & IT"];

  // Localized strings safely
  const title = roadmapData.title?.[lang] || roadmapData.title?.en || activeCareerKey;
  const description = roadmapData.description?.[lang] || roadmapData.description?.en || '';

  const categoriesList = [
    { title: "Courses", key: "courses" },
    { title: "Certifications", key: "certifications" },
    { title: "Scholarships", key: "scholarships" },
    { title: "Government Schemes", key: "schemes" },
    { title: "Training Programs", key: "training" }
  ];

  const categoryIcons = {
    courses: <BookOpen size={18} className="text-pink-500" />,
    certifications: <Award size={18} className="text-violet-500" />,
    scholarships: <GraduationCap size={18} className="text-blue-500" />,
    schemes: <Bookmark size={18} className="text-green-500" />,
    training: <Briefcase size={18} className="text-orange-500" />
  };

  const domainResources = learningResources[activeCareerKey] || {};

  return (
    <div className="max-w-5xl mx-auto space-y-8 dark:text-white animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="card-ui bg-gradient-to-r from-violet-600 to-pink-500 p-8 text-white rounded-3xl shadow-lg border-0 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        {/* Tab Selection if user has topRecommendations */}
        {recommendations.length > 1 && (
          <div className="mb-6 z-10 flex flex-wrap bg-white/15 p-1.5 rounded-2xl backdrop-blur-md self-center max-w-full justify-center gap-1">
            {recommendations.map((recKey, idx) => (
              <button
                key={recKey}
                onClick={() => setActiveCareerKey(recKey)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-350 cursor-pointer ${
                  activeCareerKey === recKey
                    ? 'bg-white text-violet-700 shadow-md scale-105'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {recKey}
              </button>
            ))}
          </div>
        )}

        <div className="relative z-10 space-y-3">
          <span className="text-pink-100 font-extrabold tracking-widest uppercase text-xs flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Career Roadmap Explorer
          </span>
          <h1 className="text-3xl md:text-5xl font-black">{title}</h1>
          <p className="text-pink-50 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">{description}</p>
        </div>
      </div>

      {/* 2. Main content split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Vertical Step-by-Step Journey */}
        <div className="lg:col-span-2 card-ui p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700">
            <GraduationCap className="text-violet-600" /> Educational Journey & Milestone Path
          </h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-6 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-violet-500 before:to-pink-400">
            {roadmapData.steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 md:gap-6 group">
                <div className="bg-white dark:bg-gray-800 border-4 border-violet-100 dark:border-violet-950 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-sm text-violet-600 dark:text-violet-400 shadow-md z-10 flex-shrink-0 group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl flex-1 hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-extrabold text-gray-800 dark:text-white text-base mb-1.5">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Career Parameters and Schemes */}
        <div className="space-y-6">
          
          {/* Average Salary & Growth */}
          <div className="card-ui p-6 grid grid-cols-2 gap-4 divide-x divide-gray-100 dark:divide-gray-700">
            <div className="flex flex-col justify-between items-center text-center p-2">
              <Coins className="text-pink-500 mb-2" size={28} />
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Average Salary</span>
                <span className="text-sm font-black text-gray-800 dark:text-white leading-none">{roadmapData.salary}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center text-center p-2">
              <TrendingUp className="text-violet-600 mb-2" size={28} />
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Growth Outlook</span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-normal block">{roadmapData.growth}</span>
              </div>
            </div>
          </div>

          {/* Required Skills Card */}
          <div className="card-ui p-6 space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-50 dark:border-gray-700/60">
              <CheckCircle2 className="text-green-500" size={18} /> Required Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {roadmapData.skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-green-50 dark:bg-green-950/20 border border-green-100/40 dark:border-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg shadow-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Entrance Exams & Certifications */}
          <div className="card-ui p-6 space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-50 dark:border-gray-700/60">
              <Award className="text-blue-500" size={18} /> Certifications & Exams
            </h3>
            <div className="space-y-3">
              {roadmapData.entranceExams?.length > 0 && (
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Entrance Exams</span>
                  <div className="flex flex-wrap gap-1">
                    {roadmapData.entranceExams.map((exam, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {roadmapData.certifications?.length > 0 && (
                <div className="pt-2 border-t border-gray-50 dark:border-gray-700/60">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Certifications</span>
                  <div className="flex flex-wrap gap-1">
                    {roadmapData.certifications.map((cert, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-bold rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Career Opportunities */}
          <div className="card-ui p-6 space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-50 dark:border-gray-700/60">
              <Briefcase className="text-yellow-500" size={18} /> Career Opportunities
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {roadmapData.opportunities.map((opp, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100/40 dark:border-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded-lg">
                  {opp}
                </span>
              ))}
            </div>
          </div>

          {/* Schemes & Scholarships */}
          <div className="card-ui p-6 space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-50 dark:border-gray-700/60">
              <Bookmark className="text-violet-500" size={18} /> Recommended Programs & Schemes
            </h3>
            <div className="space-y-2">
              {roadmapData.schemes?.map((scheme, idx) => (
                <a 
                  key={idx} 
                  href={scheme.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-3 bg-violet-50/50 dark:bg-violet-950/15 border border-violet-100/40 dark:border-violet-900/30 rounded-xl hover:bg-violet-100/60 dark:hover:bg-violet-900/20 transition-all group"
                >
                  <p className="font-extrabold text-violet-800 dark:text-violet-300 text-xs mb-1 line-clamp-2">{scheme.name}</p>
                  <span className="text-[10px] text-violet-500 flex items-center gap-1 font-bold group-hover:text-violet-700 dark:group-hover:text-violet-350">
                    Apply / View Portal <ExternalLink size={10} />
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Resources & Opportunities Section */}
      <div className="card-ui p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Sparkles className="text-pink-500" size={20} /> Resources & Opportunities
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Top courses, certifications, scholarships, government schemes, and training programs to support your {activeCareerKey} path.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat) => {
            const items = domainResources[cat.key] || [];
            return (
              <div 
                key={cat.key} 
                className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <h3 className="font-extrabold text-gray-800 dark:text-white text-sm flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/50 dark:border-gray-800/60">
                    {categoryIcons[cat.key]}
                    {cat.title}
                  </h3>
                  
                  {items.length > 0 ? (
                    <div className="space-y-4">
                      {items.map((item, idx) => {
                        const itemTitle = item.title || item.name;
                        const itemUrl = item.url || item.officialLink || "#";
                        return (
                          <div key={idx} className="flex flex-col">
                            <span className="font-bold text-xs text-gray-800 dark:text-white leading-snug">
                              {itemTitle}
                            </span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                              {item.description}
                            </span>
                            {itemUrl && itemUrl !== "#" ? (
                              <a
                                href={itemUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-extrabold text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors self-start"
                              >
                                {item.buttonLabel || "Visit Official Link"} <ExternalLink size={10} />
                              </a>
                            ) : (
                              <span className="text-[10px] text-gray-405 dark:text-gray-495 italic mt-1">
                                Official Link not available
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 italic py-4">
                      More resources coming soon.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
