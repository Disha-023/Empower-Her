import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';
import { ThemeContext } from '../context/ThemeContext';
import { ArrowRight, CheckCircle2, Search, Award, Users, Landmark, GraduationCap, ChevronRight, MessageSquare, Quote, Heart } from 'lucide-react';
import api from '../utils/api';

const Counter = ({ end, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    let active = true;
    const step = (timestamp) => {
      if (!active) return;
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
    return () => {
      active = false;
    };
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const { t, lang } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback default featured schemes if backend fetch fails
  const fallbackSchemes = [
    {
      id: "s16",
      title: { en: "PRAGATI Scholarship", hi: "प्रगति छात्रवृत्ति", mr: "प्रगती शिष्यवृत्ती", kn: "ಪ್ರಗತಿ ವಿದ್ಯಾರ್ಥಿವೇತನ" },
      description: {
        en: "AICTE scholarship for promoting technical education among girls.",
        hi: "लड़कियों के बीच तकनीकी शिक्षा को बढ़ावा देने के लिए एआईसीटीई छात्रवृत्ति।",
        mr: "मुलींमध्ये तांत्रिक शिक्षणाला प्रोत्साहन देण्यासाठी AICTE शिष्यवृत्ती.",
        kn: "ಹುಡುಗಿಯರಲ್ಲಿ ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣವನ್ನು ಉತ್ತೇಜಿಸಲು AICTE ವಿದ್ಯಾರ್ಥಿವೇತನ."
      },
      category: "Education",
      amount: "₹50,000/year",
      amountLocale: { en: "₹50,000/year", hi: "₹50,000/वर्ष", mr: "₹५०,०००/वर्ष", kn: "ವರ್ಷಕ್ಕೆ ₹50,000" }
    },
    {
      id: "s2",
      title: { en: "Sukanya Samriddhi Yojana", hi: "सुकन्या समृद्धि योजना", mr: "सुकन्या समृद्धी योजना", kn: "ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ" },
      description: {
        en: "Savings scheme endorsed by Government of India targeted at the parents of girl children.",
        hi: "भारत सरकार द्वारा समर्थित बचत योजना जो बालिकाओं के माता-पिता को लक्षित करती है।",
        mr: "भारत सरकारद्वारे मान्यता प्राप्त मुलींच्या पालकांसाठीची बचत योजना.",
        kn: "ಹೆಣ್ಣು ಮಕ್ಕಳ ಪೋಷಕರನ್ನು ಗುರಿಯಾಗಿಸಿಕೊಂಡು ಭಾರತ ಸರ್ಕಾರ ಅನುಮೋದಿಸಿದ ಉಳಿತಾಯ ಯೋಜನೆ."
      },
      category: "Health",
      amount: "High Interest Savings",
      amountLocale: { en: "High Interest Savings", hi: "उच्च ब्याज बचत", mr: "उच्च व्याज बचत", kn: "ಹೆಚ್ಚಿನ ಬಡ್ಡಿಯ ಉಳಿತಾಯ" }
    },
    {
      id: "s15",
      title: { en: "CBSE Udaan Scheme", hi: "सीबीएसई उड़ान योजना", mr: "सीबीएसई उड्डाण योजना", kn: "ಸಿಬಿಎಸ್‌ಇ ಉಡಾನ್ ಯೋಜನೆ" },
      description: {
        en: "Free engineering entrance preparation for girls in classes 11 and 12.",
        hi: "कक्षा 11 और 12 की लड़कियों के लिए मुफ्त इंजीनियरिंग प्रवेश परीक्षा की तैयारी।",
        mr: "इयत्ता ११ वी आणि १२ वीच्या मुलींसाठी मोफत इंजिनिअरिंग प्रवेश परीक्षा तयारी.",
        kn: "11 ಮತ್ತು 12 ನೇ ತರಗತಿಯ ಹುಡುಗಿಯರಿಗಾಗಿ ಉಚಿತ ಇಂಜಿನಿಯರಿಂಗ್ ಪ್ರವೇಶ ತಯಾರಿ."
      },
      category: "Education",
      amount: "Free Coaching",
      amountLocale: { en: "Free Coaching", hi: "मुफ्त कोचिंग", mr: "मोफत कोचिंग", kn: "ಉಚಿತ ತರಬೇತಿ" }
    },
    {
      id: "s5",
      title: { en: "Mahila Samridhi Yojana (Mudra Loan)", hi: "महिला समृद्धि योजना", mr: "महिला समृद्धी योजना", kn: "ಮಹಿಳಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ" },
      description: {
        en: "Micro-loans to provide entrepreneurship support to women from marginalized groups.",
        hi: "हाशिये पर मौजूद समूहों की महिलाओं को उद्यमिता सहायता प्रदान करने के लिए सूक्ष्म ऋण।",
        mr: "वंचित गटातील महिलांना उद्योजकता सहाय्य प्रदान करण्यासाठी सूक्ष्म कर्ज.",
        kn: "ವಂಚಿತ ಗುಂಪುಗಳ ಮಹಿಳೆಯರಿಗೆ ಉದ್ಯಮಶೀಲತೆ ಬೆಂಬಲವನ್ನು ನೀಡಲು ಸೂಕ್ಷ್ಮ ಸಾಲಗಳು."
      },
      category: "Business",
      amount: "Up to ₹10 Lakhs",
      amountLocale: { en: "Up to ₹10 Lakhs", hi: "₹10 लाख तक", mr: "₹१० लाखांपर्यंत", kn: "₹10 ಲಕ್ಷದವರೆಗೆ" }
    }
  ];

  useEffect(() => {
    api.get('/schemes/available')
      .then(res => {
        // Filter out specific featured schemes
        const ids = ["s16", "s2", "s15", "s5"];
        const filtered = res.data.filter(s => ids.includes(s.id));
        setFeatured(filtered.length > 0 ? filtered : fallbackSchemes);
      })
      .catch(() => {
        setFeatured(fallbackSchemes);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getLocalizedText = (field, lang) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field?.[lang] || field?.en || "";
  };

  const handleCTA = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-20 pb-16 dark:text-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-between py-12 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 rounded-full text-xs font-semibold border border-violet-100 dark:border-violet-800/30">
              <Award size={14} /> Global Empowerment Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
              {t('landingHeroTitle')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              {t('landingHeroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={handleCTA} className="gradient-btn flex items-center gap-2 group shadow-lg hover:shadow-violet-500/20">
                {t('findSchemes')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={handleCTA} className="px-6 py-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                {t('checkEligibility')}
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual illustration in SVGs (Premium Custom Design) */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full opacity-10 animate-pulse"></div>
              <svg viewBox="0 0 200 200" className="w-full h-full text-violet-600 dark:text-violet-400">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="80" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M 50,130 C 50,80 80,50 100,50 C 120,50 150,80 150,130 Z" fill="url(#gradient1)" opacity="0.85" />
                <circle cx="100" cy="80" r="18" fill="#FFFFFF" />
                <path d="M 75,130 L 125,130 C 125,170 75,170 75,130 Z" fill="#FFFFFF" opacity="0.3" />
                <path d="M 40,110 C 60,95 80,105 100,105 C 120,105 140,95 160,110" fill="none" stroke="#FFFFFF" strokeWidth="3" />
              </svg>
              {/* Floating tags */}
              <div className="absolute -top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <GraduationCap className="text-violet-500" size={20} />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">Scholarships</span>
              </div>
              <div className="absolute bottom-10 -left-6 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <Landmark className="text-pink-500" size={20} />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">Govt Schemes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="bg-gradient-to-r from-violet-50 to-pink-50 dark:from-gray-900/60 dark:to-gray-900/40 rounded-3xl p-8 md:p-12 border border-violet-100/50 dark:border-gray-700/50 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <Landmark size={32} className="mx-auto text-violet-600 dark:text-violet-400" />
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              <Counter end={500} suffix="+" />
            </h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('statsSchemes')}</p>
          </div>
          <div className="space-y-2">
            <Users size={32} className="mx-auto text-pink-500" />
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              <Counter end={50000} suffix="+" />
            </h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('statsUsers')}</p>
          </div>
          <div className="space-y-2">
            <Award size={32} className="mx-auto text-violet-600 dark:text-violet-400" />
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              <Counter end={28} suffix="" />
            </h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('statsStates')}</p>
          </div>
          <div className="space-y-2">
            <GraduationCap size={32} className="mx-auto text-pink-500" />
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              <Counter end={100} suffix="+" />
            </h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('statsScholarships')}</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Schemes Section */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{t('featuredSchemes')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Empowering girls and women with direct welfare, coaching, and growth programs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((sch) => (
            <div key={sch.id} className="card-ui hover:-translate-y-2 hover:shadow-lg flex flex-col justify-between p-6">
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 text-xs font-bold rounded-lg uppercase tracking-wide">
                  {sch.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                  {getLocalizedText(sch.title, lang)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  {getLocalizedText(sch.description, lang)}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Benefit Amount</p>
                  <p className="text-xs font-extrabold text-violet-600 dark:text-violet-400">
                    {getLocalizedText(sch.amountLocale, lang) || sch.amount}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigate(`/scheme/${sch.id}`);
                  }}
                  className="p-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/40 rounded-full transition-all cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{t('howItWorks')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Four simple steps to discover, track, and apply for government programs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", key: "step1", desc: "Create a personalized account with your educational and professional interests." },
            { step: "02", key: "step2", desc: "Use our interactive filters or career quiz to verify matching eligibility requirements." },
            { step: "03", key: "step3", desc: "Select and save matching schemes and scholarships directly to your dashboard." },
            { step: "04", key: "step4", desc: "Apply directly through the linked official portal with required documents." }
          ].map((item, idx) => (
            <div key={idx} className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-violet-100 dark:text-gray-700/60 block mb-4">{item.step}</span>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{t(item.key)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Success Stories Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{t('successStories')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Real stories from beneficiaries who scaled their studies and businesses through government opportunities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Pooja Hegde",
              role: "Tech Entrepreneur (Bengaluru)",
              quote: "The Mudra Loan Scheme allowed me to buy hardware for my start-up. EmpowerHer made it extremely simple to find documents and verify requirements.",
              imgLetter: "P"
            },
            {
              name: "Shreya Ghoshal",
              role: "B.Tech Student (Pune)",
              quote: "Receiving the Pragati Scholarship helped fund my entire engineering tuition. The deadline tracker on this platform kept me on top of updates.",
              imgLetter: "S"
            },
            {
              name: "Ananya Patil",
              role: "Rural Weaver (Kolhapur)",
              quote: "Under the Mahila Samridhi program, I learned digital marketing and launched my clothing store online. Finding the official link here was direct and safe.",
              imgLetter: "A"
            }
          ].map((story, i) => (
            <div key={i} className="card-ui p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="text-pink-500/20 fill-pink-500/10" size={32} />
                <p className="text-sm italic text-gray-600 dark:text-gray-300">
                  "{story.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {story.imgLetter}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white">{story.name}</h4>
                  <p className="text-xs text-gray-400">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Professional Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-700 pt-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                E
              </div>
              <span className="font-extrabold text-lg text-gray-800 dark:text-white">
                Empower<span className="text-pink-500">Her</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Empowering girls and women across India by centralizing discoverable government schemes, scholarships, and resources.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Features</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={handleCTA} className="hover:text-pink-600">Scheme Matching</button></li>
              <li><button onClick={handleCTA} className="hover:text-pink-600">Eligibility Verifier</button></li>
              <li><button onClick={handleCTA} className="hover:text-pink-600">Deadline Alerts</button></li>
              <li><button onClick={handleCTA} className="hover:text-pink-600">Career Insights</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Contact & Help</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><span>Email: support@empowerher.gov.in</span></li>
              <li><span>Helpline: +91 1800 200 400</span></li>
              <li><span>Address: New Delhi, India</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="#" className="hover:text-pink-600">{t('privacyPolicy')}</Link></li>
              <li><Link to="#" className="hover:text-pink-600">{t('termsConditions')}</Link></li>
              <li><Link to="#" className="hover:text-pink-600">{t('aboutUs')}</Link></li>
              <li><Link to="#" className="hover:text-pink-600">{t('contact')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} EmpowerHer Platform. Government of India initiative. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-pink-500 fill-pink-500" /> for Women in India
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
