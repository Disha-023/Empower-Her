import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import timelineRoadmaps from '../data/timelineRoadmaps';
import { BookOpen, GraduationCap, Briefcase, ChevronDown, ChevronUp, Star, Lock } from 'lucide-react';

const RoadmapPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    "Class 10": true,
    "Class 12": false,
    "College": false,
    "Career": false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const { user } = useContext(AuthContext);

  const careerKey = localStorage.getItem('selectedCareer') || localStorage.getItem('selected_career') || user?.career;

  if (!careerKey) {
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

  const stageStyles = {
    "Class 10": { icon: <BookOpen size={24} />, color: "from-blue-400 to-blue-600" },
    "Class 12": { icon: <GraduationCap size={24} />, color: "from-purple-400 to-purple-600" },
    "College": { icon: <Star size={24} />, color: "from-pink-400 to-pink-600" },
    "Career": { icon: <Briefcase size={24} />, color: "from-orange-400 to-orange-600" }
  };

  const baseRoadmapData = timelineRoadmaps[careerKey] || timelineRoadmaps["Technology & IT"] || timelineRoadmaps["Developer"];

  const roadmapData = JSON.parse(JSON.stringify(baseRoadmapData)).map(stage => ({
    ...stage,
    icon: stageStyles[stage.id]?.icon || <Star size={24} />,
    color: stageStyles[stage.id]?.color || "from-gray-400 to-gray-600"
  }));

  const scores = user?.quizScores || {};
  if (scores.Sports && scores.Sports > 0) {
      const stageMatch = roadmapData.find(s => s.id === "College");
      if (stageMatch && !stageMatch.content.skills.includes("Physical Conditioning")) {
          stageMatch.content.skills.push("Physical Conditioning");
      }
  }
  if (scores.Entrepreneur && scores.Entrepreneur > 0) {
      const stageMatch = roadmapData.find(s => s.id === "Career");
      if (stageMatch && !stageMatch.content.skills.includes("Startup Pitching")) {
          stageMatch.content.skills.push("Startup Pitching");
          if (!stageMatch.content.opportunities) stageMatch.content.opportunities = [];
          if (!stageMatch.content.opportunities.includes("Startup Founder")) {
              stageMatch.content.opportunities.push("Startup Founder");
          }
      }
  }

  return (
    <div className="max-w-4xl mx-auto text-left">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Career Roadmap</h1>
        <p className="text-gray-500 dark:text-gray-400">A step-by-step guide to building a successful career in {careerKey}.</p>
      </div>

      <div className="relative border-l-2 border-pink-200 dark:border-pink-900/60 ml-4 md:ml-6 space-y-8 pb-8">
        {roadmapData.map((stage, idx) => (
          <div key={idx} className="relative pl-8 md:pl-10">
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-4 w-8 h-8 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center text-white shadow-md z-10 border-4 border-gray-50 dark:border-gray-900`}>
              <div className="scale-50">{stage.icon}</div>
            </div>

            {/* Card */}
            <div className="card-ui overflow-hidden">
              <div 
                className={`bg-white dark:bg-gray-800 p-5 md:p-6 cursor-pointer flex justify-between items-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-750`}
                onClick={() => toggleSection(stage.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stage.color} text-white`}>
                    {stage.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{stage.title}</h2>
                </div>
                <button className="text-gray-400 hover:text-pink-500 transition-colors p-2">
                  {expandedSections[stage.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
              </div>

              {/* Expandable Content */}
              <div className={`transition-all duration-300 ease-in-out ${expandedSections[stage.id] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 pt-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                  <div className="mb-4 pt-4">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Core Focus</h3>
                    <p className="text-gray-800 dark:text-gray-200">{stage.content.focus}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Key Skills</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {stage.content.skills.map((skill, sIdx) => (
                          <li key={sIdx} className="text-gray-700 dark:text-gray-300">{skill}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {stage.content.exams && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Important Exams</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {stage.content.exams.map((exam, eIdx) => (
                            <li key={eIdx} className="text-gray-700 dark:text-gray-300">{exam}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {stage.content.courses && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Key Courses</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {stage.content.courses.map((course, cIdx) => (
                            <li key={cIdx} className="text-gray-700 dark:text-gray-300">{course}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {stage.content.opportunities && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Career Options</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {stage.content.opportunities.map((opp, oIdx) => (
                            <li key={oIdx} className="text-gray-700 dark:text-gray-300">{opp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
