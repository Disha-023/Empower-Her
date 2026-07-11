import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { LangContext } from '../context/LangContext';
import { 
  Users, UserCheck, Shield, Bookmark, CircleUser, Plus, Edit2, Trash2, Calendar, 
  Link as LinkIcon, FileText, CheckCircle, HelpCircle, LayoutDashboard, BrainCircuit, 
  GraduationCap, BarChart3, MessageSquare, Bell, FileEdit, Globe, Settings, LogOut, 
  Search, Ban, Unlock, ToggleLeft, ToggleRight, Check, X, Eye, EyeOff
} from 'lucide-react';
import { toast } from 'react-toastify';

const defaultEligibilityCategories = [
  {
    id: 'cat-education',
    name: 'Education',
    criteria: [
      { id: 'crit1', text: 'Is the applicant a female citizen residing in India?' },
      { id: 'crit2', text: 'Is the student currently studying in 11th or 12th standard?' }
    ]
  },
  {
    id: 'cat-business',
    name: 'Business',
    criteria: [
      { id: 'crit3', text: 'Does the annual family income exceed ₹8,00,000?' }
    ]
  },
  {
    id: 'cat-employment',
    name: 'Employment',
    criteria: [
      { id: 'crit4', text: 'Is the applicant from a marginalized minority group?' }
    ]
  }
];

const defaultCourses = [
  { id: 'c-tech1', title: 'Introduction to Python Programming', category: 'Technology', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', certUrl: 'https://coursera.org/verify/python-basics' },
  { id: 'c-tech2', title: 'Web Development Bootcamp: HTML, CSS & JS', category: 'Technology', url: 'https://www.youtube.com/watch?v=mU6anWqODqs', certUrl: 'https://freecodecamp.org/cert/web-dev' },
  { id: 'c-tech3', title: 'Data Science & Machine Learning Fundamentals', category: 'Technology', url: 'https://www.youtube.com/watch?v=ua-CiDNNj30', certUrl: 'https://coursera.org/verify/data-science' },
  
  { id: 'c-med1', title: 'First Aid & CPR Certification', category: 'Medical', url: 'https://www.youtube.com/watch?v=N8z36PjXgP0', certUrl: 'https://redcross.org/cert/firstaid' },
  { id: 'c-med2', title: 'Clinical Nursing Skills & Practice', category: 'Medical', url: 'https://www.youtube.com/watch?v=c7y2Z1S2ZgE', certUrl: 'https://coursera.org/verify/clinical-nursing' },
  { id: 'c-med3', title: 'Introduction to Medical Terminology', category: 'Medical', url: 'https://www.youtube.com/watch?v=3-a3Q1xLw80', certUrl: 'https://udemy.com/cert/medical-terminology' },

  { id: 'c-edu1', title: 'Foundations of Teaching & Pedagogy', category: 'Education', url: 'https://www.youtube.com/watch?v=r32Vb6i7A0I', certUrl: 'https://coursera.org/verify/teaching-foundations' },
  { id: 'c-edu2', title: 'Online Tutoring Best Practices', category: 'Education', url: 'https://www.youtube.com/watch?v=tF4D4O8v5wA', certUrl: 'https://edx.org/cert/online-tutoring' },
  { id: 'c-edu3', title: 'Special Education & Inclusive Classrooms', category: 'Education', url: 'https://www.youtube.com/watch?v=34dZ7XmCdfI', certUrl: 'https://udemy.com/cert/special-education' },

  { id: 'c-bus1', title: 'Empowering Women Entrepreneurs & Startups', category: 'Business', url: 'https://www.youtube.com/watch?v=zJg4_3c8j9s', certUrl: 'https://udemy.com/certificate/women-business' },
  { id: 'c-bus2', title: 'Financial Accounting & Bookkeeping', category: 'Business', url: 'https://www.youtube.com/watch?v=yYX4Ev6OtbA', certUrl: 'https://coursera.org/verify/accounting' },
  { id: 'c-bus3', title: 'Digital Marketing & Branding Essentials', category: 'Business', url: 'https://www.youtube.com/watch?v=nU-IIX6tXw4', certUrl: 'https://google.com/grow/digital-marketing' },

  { id: 'c-gov1', title: 'Public Administration & Governance in India', category: 'Government', url: 'https://www.youtube.com/watch?v=23uX5r2K2E0', certUrl: 'https://nptel.ac.in/cert/public-admin' },
  { id: 'c-gov2', title: 'Preparing for Civil Services (UPSC) Guide', category: 'Government', url: 'https://www.youtube.com/watch?v=t_u_K4vXfP8', certUrl: 'https://unacademy.com/cert/civil-prep' },
  { id: 'c-gov3', title: 'Right to Information (RTI) Act Training', category: 'Government', url: 'https://www.youtube.com/watch?v=vVj4k0EaG28', certUrl: 'https://swayam.gov.in/cert/rti-act' },

  { id: 'c-arts1', title: 'Graphic Design Basics (Illustrator & Photoshop)', category: 'Arts & Media', url: 'https://www.youtube.com/watch?v=9E4U16m9p6c', certUrl: 'https://coursera.org/verify/graphic-design' },
  { id: 'c-arts2', title: 'Introduction to Journalism & Reporting', category: 'Arts & Media', url: 'https://www.youtube.com/watch?v=68t0XW3x71k', certUrl: 'https://edx.org/cert/journalism' },
  { id: 'c-arts3', title: 'Video Editing Masterclass (Premiere Pro)', category: 'Arts & Media', url: 'https://www.youtube.com/watch?v=yHGlJ06g7Z8', certUrl: 'https://udemy.com/cert/video-editing' },

  { id: 'c-beauty1', title: 'Professional Makeup & Cosmetology Course', category: 'Beauty & Wellness', url: 'https://www.youtube.com/watch?v=Xh0mG2JdG2w', certUrl: 'https://beautyacademy.com/cert/makeup' },
  { id: 'c-beauty2', title: 'Hair Styling & Care Techniques', category: 'Beauty & Wellness', url: 'https://www.youtube.com/watch?v=jWpUq4tP0cQ', certUrl: 'https://beautyacademy.com/cert/hair' },
  { id: 'c-beauty3', title: 'Yoga & Mindfulness Instructor Training', category: 'Beauty & Wellness', url: 'https://www.youtube.com/watch?v=sTANio_2w0Q', certUrl: 'https://yogaschool.org/cert/instructor' },

  { id: 'c-sports1', title: 'Sports Coaching & Athlete Development', category: 'Sports', url: 'https://www.youtube.com/watch?v=Zf_c8p3-f1I', certUrl: 'https://coursera.org/verify/sports-coaching' },
  { id: 'c-sports2', title: 'Physical Fitness & Exercise Science', category: 'Sports', url: 'https://www.youtube.com/watch?v=uK1X2aK_tqg', certUrl: 'https://udemy.com/cert/exercise-science' },
  { id: 'c-sports3', title: 'Sports Nutrition & Diet Planning', category: 'Sports', url: 'https://www.youtube.com/watch?v=Z21z8C2c6Zc', certUrl: 'https://edx.org/cert/sports-nutrition' }
];

const defaultNotificationTypes = [
  { id: 'nt1', name: 'Scheme Update', group: 'Scheme', enabled: true },
  { id: 'nt2', name: 'New Scheme', group: 'Scheme', enabled: true },
  { id: 'nt3', name: 'Scholarship Alert', group: 'Scheme', enabled: true },
  { id: 'nt4', name: 'Career Recommendation Ready', group: 'Career', enabled: true },
  { id: 'nt5', name: 'Quiz Updated', group: 'Career', enabled: true },
  { id: 'nt6', name: 'Course Added', group: 'Course', enabled: true },
  { id: 'nt7', name: 'Certification Alert', group: 'Course', enabled: true },
  { id: 'nt8', name: 'Profile Verified', group: 'Profile', enabled: true },
  { id: 'nt9', name: 'Profile Rejected', group: 'Profile', enabled: true },
  { id: 'nt10', name: 'System Maintenance', group: 'System', enabled: true },
  { id: 'nt11', name: 'Security Alert', group: 'System', enabled: true },
  { id: 'nt12', name: 'Announcement', group: 'System', enabled: true },
  { id: 'nt13', name: 'Update', group: 'System', enabled: true }
];

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { 
    t, 
    lang, 
    activeLanguages, 
    supportedLanguages, 
    enableLanguage, 
    disableLanguage, 
    addLanguage,
    deleteLanguage
  } = useContext(LangContext);
  const navigate = useNavigate();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core Data States
  const [metrics, setMetrics] = useState({ totalUsers: 0, activeUsersCount: 0, totalSchemes: 0, mostViewedScheme: 'None', users: [], applications: [] });
  const [availableSchemes, setAvailableSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // CRUD Form States (Schemes)
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);

  // Scheme form initial structure
  const initialForm = {
    title: { en: '', hi: '', mr: '', kn: '' },
    description: { en: '', hi: '', mr: '', kn: '' },
    benefits: { en: '', hi: '', mr: '', kn: '' },
    category: 'Education',
    state: 'all',
    applyLink: '',
    lastDate: '',
    eligibility: { minAge: 18, maxAge: 65, state: 'all', country: 'India', category: 'Education', gender: 'female', incomeLimit: 'None' },
    amount: '',
    amountLocale: { en: '', hi: '', mr: '', kn: '' },
    documentsRequired: '', 
    howToApply: { en: '', hi: '', mr: '', kn: '' }
  };
  const [form, setForm] = useState(initialForm);

  // --- New Admin Modules Mock/Local States (MongoDB-ready Design) ---

  // 1. User Management State
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [blockedUserIds, setBlockedUserIds] = useState([]);
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  // 2. Scheme Status management (Active/Inactive)
  const [deactivatedSchemeIds, setDeactivatedSchemeIds] = useState([]);

  // 3. Eligibility Manager State
  const [eligibilityCategories, setEligibilityCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ id: null, name: '' });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [criteriaForm, setCriteriaForm] = useState({ id: null, text: '' });

  // 4. Career Quiz Manager State (Support 19 Career Domains)
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizQuestionForm, setQuizQuestionForm] = useState({ id: null, text: '', domain: 'Technology', careerPaths: '' });
  const [careerDomains, setCareerDomains] = useState([
    'Technology', 'Medical', 'Education', 'Sports', 'Business', 'Entrepreneurship',
    'Government Jobs', 'Finance', 'Law', 'Arts', 'Media', 'Agriculture',
    'Beauty & Wellness', 'Research', 'Defence', 'NGO & Social Work',
    'Homemaker & Home Business', 'Hospitality & Tourism', 'Skilled Trades'
  ]);

  // 5. Course Management State
  const [courses, setCourses] = useState([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({ id: null, title: '', category: 'Technology', url: '', certUrl: '' });

  // 6. Feedback Management State (Ready for MongoDB integration)
  const [feedbacks, setFeedbacks] = useState([]);

  // 7. Notification Management State (Connects to navbar alerts broadcast)
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationEditMode, setNotificationEditMode] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [notificationForm, setNotificationForm] = useState({ title: '', type: '', message: '' });
  const [notificationTypes, setNotificationTypes] = useState([]);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [typeForm, setTypeForm] = useState({ id: null, name: '', group: 'System' });
  const [notifSubTab, setNotifSubTab] = useState('broadcasts');

  // 8. Content Management State
  const [contentSettings, setContentSettings] = useState({
    heroTitle: 'EmpowerHer: Centralized Welfare & Growth Portal',
    heroSubtitle: 'Discover, save, and apply to welfare, business, and educational opportunities made for you.',
    announcementBanner: 'Special Mudra Loan webinars starting this Saturday!',
    featuredSchemesList: ['s16', 's2']
  });

  // 9. Simplified Language Manager Modal states
  const [showLangModal, setShowLangModal] = useState(false);
  const [langForm, setLangForm] = useState({ label: '', code: '' });

  // Navigation Items array (Removed Career Roadmap and User Quiz, which belong to users)
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'users', label: 'Users', icon: <Users size={16} /> },
    { id: 'schemes', label: 'Schemes', icon: <Bookmark size={16} /> },
    { id: 'eligibility', label: 'Eligibility Manager', icon: <CheckCircle size={16} /> },
    { id: 'quiz', label: 'Career Quiz Management', icon: <BrainCircuit size={16} /> },
    { id: 'courses', label: 'Courses', icon: <GraduationCap size={16} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={16} /> },
    { id: 'content', label: 'Content Manager', icon: <FileEdit size={16} /> },
    { id: 'language', label: 'Language Manager', icon: <Globe size={16} /> },
    { id: 'profile', label: 'Profile', icon: <CircleUser size={16} /> },
    { id: 'logout', label: 'Logout', icon: <LogOut size={16} /> }
  ];

  const getLocalizedText = (field, lang) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field?.[lang] || field?.en || "";
  };

  const fetchDashboardData = async () => {
    try {
      const [metricsRes, availableRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/schemes/available')
      ]);
      setMetrics(metricsRes.data);
      setAvailableSchemes(availableRes.data);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Synchronize localStorage datasets on admin login/mount
  useEffect(() => {
    // 1. Synchronize Career Quiz Questions
    const storedQuiz = localStorage.getItem('admin_quiz_questions');
    if (storedQuiz) {
      try {
        setQuizQuestions(JSON.parse(storedQuiz));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaults = [
        { id: 'qq1', text: 'I enjoy coding, technology, and solving logical problems.', domain: 'Technology', careerPaths: 'Software Developer, Data Analyst, Web Developer, Cyber Security Analyst' },
        { id: 'qq2', text: 'I am interested in helping sick or injured people and studying biology.', domain: 'Medical', careerPaths: 'Doctor, Nurse, Pharmacist, Physiotherapist' },
        { id: 'qq3', text: 'I love sharing knowledge, tutoring others, and academic mentoring.', domain: 'Education', careerPaths: 'School Teacher, College Professor, Education Consultant, Corporate Trainer' },
        { id: 'qq4', text: 'I enjoy playing sports, physical fitness, and coaching.', domain: 'Sports', careerPaths: 'Professional Athlete, Sports Coach, Fitness Trainer, Sports Journalist' },
        { id: 'qq5', text: 'I am interested in starting businesses, trade, and project management.', domain: 'Entrepreneurship', careerPaths: 'Startup Founder, Business Consultant, Business Development Manager' },
        { id: 'qq6', text: 'I like analyzing statistics, managing money, and banking.', domain: 'Finance', careerPaths: 'Financial Analyst, Investment Banker, Accountant, Tax Consultant' },
        { id: 'qq7', text: 'I am interested in investigating legal cases, policy, and justice.', domain: 'Law', careerPaths: 'Lawyer, Legal Advisor, Corporate Counsel, Judge' },
        { id: 'qq8', text: 'I enjoy drawing, graphic design, and painting.', domain: 'Arts', careerPaths: 'Graphic Designer, Illustrator, Fashion Designer, Animator' },
        { id: 'qq9', text: 'I enjoy writing, digital video editing, and public broadcasting.', domain: 'Media', careerPaths: 'Journalist, Content Creator, Editor, Public Relations Specialist' },
        { id: 'qq10', text: 'I want to serve the nation in administrative and governance roles.', domain: 'Government Jobs', careerPaths: 'Civil Servant (IAS/IPS), Public Officer, Tax Inspector' },
        { id: 'qq11', text: 'I am passionate about crop production, soil science, and farming.', domain: 'Agriculture', careerPaths: 'Agronomist, Agricultural Officer, Farm Manager' },
        { id: 'qq12', text: 'I enjoy styling hair, skincare, and cosmetology.', domain: 'Beauty & Wellness', careerPaths: 'Beautician, Salon Manager, Makeup Artist, Wellness Consultant' },
        { id: 'qq13', text: 'I enjoy researching scientific theories and performing lab experiments.', domain: 'Research', careerPaths: 'Research Scientist, Lab Technician, Data Scientist' },
        { id: 'qq14', text: 'I respect national security, discipline, and defense training.', domain: 'Defence', careerPaths: 'Army Officer, Police Officer, Security Consultant' },
        { id: 'qq15', text: 'I want to coordinate welfare projects and serve local communities.', domain: 'NGO & Social Work', careerPaths: 'Social Worker, NGO Director, Community Coordinator' },
        { id: 'qq16', text: 'I want to start a home-based boutique, tailoring, or baking business.', domain: 'Homemaker & Home Business', careerPaths: 'Home Baker, Fashion Tailor, Craft Business Owner' },
        { id: 'qq17', text: 'I like guest services, hotel management, and organizing travel.', domain: 'Hospitality & Tourism', careerPaths: 'Hotel Manager, Tour Guide, Event Planner, Travel Agent' },
        { id: 'qq18', text: 'I enjoy hands-on work like electrical systems, welding, or carpentry.', domain: 'Skilled Trades', careerPaths: 'Electrician, Carpenter, Welder, HVAC Technician' }
      ];
      localStorage.setItem('admin_quiz_questions', JSON.stringify(defaults));
      setQuizQuestions(defaults);
    }

    // 2. Synchronize User feedbacks (Real submissions only)
    const storedFeedbacks = localStorage.getItem('user_feedbacks');
    let realFeedbacks = [];
    if (storedFeedbacks) {
      try {
        const parsed = JSON.parse(storedFeedbacks);
        // Exclude fake/hardcoded default feedbacks
        realFeedbacks = parsed.filter(f => f.id !== 'fb1' && f.id !== 'fb2' && f.id !== 'fb3');
      } catch (e) {
        console.error(e);
      }
    }
    setFeedbacks(realFeedbacks);

    // 3. Synchronize Broadcaster Notifications
    const storedNotifs = localStorage.getItem('user_notifications');
    if (storedNotifs) {
      try {
        setNotifications(JSON.parse(storedNotifs));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaults = [
        { id: 'n1', title: 'New Scheme Added', type: 'Announcement', message: 'Sukanya Samriddhi Yojana details updated.', read: false, date: '2026-06-04' },
        { id: 'n2', title: 'Scholarship Added', type: 'Scholarship Alert', message: 'CBSE Udaan scheme is accepting registrations.', read: true, date: '2026-06-03' }
      ];
      localStorage.setItem('user_notifications', JSON.stringify(defaults));
      setNotifications(defaults);
    }

    // 4. Synchronize Eligibility Categories
    const storedEligCategories = localStorage.getItem('eligibility_categories');
    if (storedEligCategories) {
      try {
        setEligibilityCategories(JSON.parse(storedEligCategories));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('eligibility_categories', JSON.stringify(defaultEligibilityCategories));
      setEligibilityCategories(defaultEligibilityCategories);
    }

    // 5. Synchronize Courses
    const storedCourses = localStorage.getItem('admin_courses');
    if (storedCourses) {
      try {
        setCourses(JSON.parse(storedCourses));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('admin_courses', JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    }

    // 6. Synchronize Notification Types
    const storedNotifTypes = localStorage.getItem('notification_types');
    if (storedNotifTypes) {
      try {
        setNotificationTypes(JSON.parse(storedNotifTypes));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('notification_types', JSON.stringify(defaultNotificationTypes));
      setNotificationTypes(defaultNotificationTypes);
    }
  }, []);

  if (!user || user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  if (loading) return <div className="text-center py-20 text-gray-500">{t('loadingAdmin')}</div>;

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // --- Schemes Management Helper Functions ---
  const handleOpenAdd = () => {
    setForm(initialForm);
    setEditMode(false);
    setShowModal(true);
  };

  const handleOpenEdit = (sch) => {
    setForm({
      title: {
        en: sch.title?.en || (typeof sch.title === 'string' ? sch.title : ''),
        hi: sch.title?.hi || '',
        mr: sch.title?.mr || '',
        kn: sch.title?.kn || ''
      },
      description: {
        en: sch.description?.en || (typeof sch.description === 'string' ? sch.description : ''),
        hi: sch.description?.hi || '',
        mr: sch.description?.mr || '',
        kn: sch.description?.kn || ''
      },
      benefits: {
        en: sch.benefits?.en || (typeof sch.benefits === 'string' ? sch.benefits : ''),
        hi: sch.benefits?.hi || '',
        mr: sch.benefits?.mr || '',
        kn: sch.benefits?.kn || ''
      },
      category: sch.category || 'Education',
      state: sch.state || 'all',
      applyLink: sch.applyLink || '',
      lastDate: sch.lastDate || '',
      eligibility: {
        minAge: sch.eligibility?.minAge || 18,
        maxAge: sch.eligibility?.maxAge || 65,
        state: sch.eligibility?.state || 'all',
        country: sch.eligibility?.country || 'India',
        category: sch.eligibility?.category || 'Education',
        gender: sch.eligibility?.gender || 'female',
        incomeLimit: sch.eligibility?.incomeLimit || 'None'
      },
      amount: sch.amount || '',
      amountLocale: {
        en: sch.amountLocale?.en || (typeof sch.amount === 'string' ? sch.amount : ''),
        hi: sch.amountLocale?.hi || '',
        mr: sch.amountLocale?.mr || '',
        kn: sch.amountLocale?.kn || ''
      },
      documentsRequired: Array.isArray(sch.documentsRequired) ? sch.documentsRequired.join(', ') : '',
      howToApply: {
        en: Array.isArray(sch.howToApply?.en) ? sch.howToApply.en.join('\n') : '',
        hi: Array.isArray(sch.howToApply?.hi) ? sch.howToApply.hi.join('\n') : '',
        mr: Array.isArray(sch.howToApply?.mr) ? sch.howToApply.mr.join('\n') : '',
        kn: Array.isArray(sch.howToApply?.kn) ? sch.howToApply.kn.join('\n') : ''
      }
    });
    setSelectedSchemeId(sch.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSaveScheme = async (e) => {
    e.preventDefault();
    if (!form.title.en || !form.description.en) {
      toast.error('English Title and Description are required');
      return;
    }

    const formattedData = {
      ...form,
      title: {
        en: form.title.en,
        hi: form.title.hi || form.title.en,
        mr: form.title.mr || form.title.en,
        kn: form.title.kn || form.title.en
      },
      description: {
        en: form.description.en,
        hi: form.description.hi || form.description.en,
        mr: form.description.mr || form.description.en,
        kn: form.description.kn || form.description.en
      },
      benefits: {
        en: form.benefits.en || form.description.en,
        hi: form.benefits.hi || form.benefits.en || form.description.en,
        mr: form.benefits.mr || form.benefits.en || form.description.en,
        kn: form.benefits.kn || form.benefits.en || form.description.en
      },
      amountLocale: {
        en: form.amount || form.amountLocale.en,
        hi: form.amountLocale.hi || form.amount || form.amountLocale.en,
        mr: form.amountLocale.mr || form.amount || form.amountLocale.en,
        kn: form.amountLocale.kn || form.amount || form.amountLocale.en
      },
      eligibility: {
        ...form.eligibility,
        category: form.category,
        state: form.state
      },
      documentsRequired: form.documentsRequired ? form.documentsRequired.split(',').map(s => s.trim()) : [],
      howToApply: {
        en: form.howToApply.en ? form.howToApply.en.split('\n').map(s => s.trim()) : [],
        hi: form.howToApply.hi ? form.howToApply.hi.split('\n').map(s => s.trim()) : [],
        mr: form.howToApply.mr ? form.howToApply.mr.split('\n').map(s => s.trim()) : [],
        kn: form.howToApply.kn ? form.howToApply.kn.split('\n').map(s => s.trim()) : []
      },
      categoryType: [form.eligibility.gender === 'female' ? 'Student' : 'All'],
      categoryTypeLocal: [
        { en: 'Student', hi: 'छात्र', mr: 'विद्यार्थी', kn: 'ವಿದ್ಯಾರ್ಥಿ' }
      ]
    };

    try {
      if (editMode) {
        await api.put(`/admin/schemes/${selectedSchemeId}`, formattedData);
        toast.success('Scheme updated successfully');
      } else {
        await api.post('/admin/schemes', formattedData);
        toast.success('Scheme created successfully');
      }
      setShowModal(false);
      fetchDashboardData();
    } catch (err) {
      toast.error('Failed to save scheme');
    }
  };

  const handleDeleteScheme = async (id) => {
    if (window.confirm('Are you sure you want to delete this available scheme? This action cannot be undone.')) {
      try {
        await api.delete(`/admin/schemes/${id}`);
        toast.success('Scheme deleted successfully');
        fetchDashboardData();
      } catch (err) {
        toast.error('Failed to delete scheme');
      }
    }
  };

  const toggleSchemeStatus = (schemeId) => {
    setDeactivatedSchemeIds(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId) 
        : [...prev, schemeId]
    );
    const isActivating = deactivatedSchemeIds.includes(schemeId);
    toast.success(`Scheme ${isActivating ? 'Activated' : 'Deactivated'} successfully`);
  };

  // --- Eligibility Manager Helper Functions (Category & Criteria CRUD) ---
  const saveEligibilityCategories = (updated) => {
    setEligibilityCategories(updated);
    localStorage.setItem('eligibility_categories', JSON.stringify(updated));
  };

  const handleOpenAddCategory = () => {
    setCategoryForm({ id: null, name: '' });
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat) => {
    setCategoryForm({ id: cat.id, name: cat.name });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    let updated;
    if (categoryForm.id) {
      updated = eligibilityCategories.map(cat => 
        cat.id === categoryForm.id ? { ...cat, name: categoryForm.name.trim() } : cat
      );
      toast.success('Category updated successfully');
    } else {
      const newCat = {
        id: 'cat-' + Date.now(),
        name: categoryForm.name.trim(),
        criteria: []
      };
      updated = [...eligibilityCategories, newCat];
      toast.success('Category created successfully');
    }
    saveEligibilityCategories(updated);
    setShowCategoryModal(false);
    setCategoryForm({ id: null, name: '' });
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category and all its criteria?')) {
      const updated = eligibilityCategories.filter(cat => cat.id !== id);
      saveEligibilityCategories(updated);
      toast.success('Category deleted successfully');
    }
  };

  const handleOpenCriteria = (cat) => {
    setSelectedCategory(cat);
    setCriteriaForm({ id: null, text: '' });
    setShowCriteriaModal(true);
  };

  const handleSaveCriterion = (e) => {
    e.preventDefault();
    if (!criteriaForm.text.trim()) {
      toast.error('Criterion text is required');
      return;
    }
    const cat = eligibilityCategories.find(c => c.id === selectedCategory.id);
    if (!cat) return;

    let updatedCriteria;
    if (criteriaForm.id) {
      updatedCriteria = cat.criteria.map(crit => 
        crit.id === criteriaForm.id ? { ...crit, text: criteriaForm.text.trim() } : crit
      );
      toast.success('Criterion updated successfully');
    } else {
      const newCrit = {
        id: 'crit-' + Date.now(),
        text: criteriaForm.text.trim()
      };
      updatedCriteria = [...cat.criteria, newCrit];
      toast.success('Criterion added successfully');
    }

    const updatedCategories = eligibilityCategories.map(c => 
      c.id === selectedCategory.id ? { ...c, criteria: updatedCriteria } : c
    );
    saveEligibilityCategories(updatedCategories);
    setSelectedCategory({ ...cat, criteria: updatedCriteria });
    setCriteriaForm({ id: null, text: '' });
  };

  const handleDeleteCriterion = (critId) => {
    if (window.confirm('Are you sure you want to delete this criterion?')) {
      const cat = eligibilityCategories.find(c => c.id === selectedCategory.id);
      if (!cat) return;

      const updatedCriteria = cat.criteria.filter(crit => crit.id !== critId);
      const updatedCategories = eligibilityCategories.map(c => 
        c.id === selectedCategory.id ? { ...c, criteria: updatedCriteria } : c
      );
      saveEligibilityCategories(updatedCategories);
      setSelectedCategory({ ...cat, criteria: updatedCriteria });
      toast.success('Criterion deleted successfully');
      
      if (criteriaForm.id === critId) {
        setCriteriaForm({ id: null, text: '' });
      }
    }
  };

  const handleStartEditCriterion = (crit) => {
    setCriteriaForm({ id: crit.id, text: crit.text });
  };

  // --- Quiz Manager Helper Functions ---
  const handleOpenAddQuiz = () => {
    setQuizQuestionForm({ id: null, text: '', domain: 'Technology', careerPaths: '' });
    setShowQuizModal(true);
  };
  const handleOpenEditQuiz = (q) => {
    setQuizQuestionForm({ id: q.id, text: q.text, domain: q.domain, careerPaths: q.careerPaths || '' });
    setShowQuizModal(true);
  };
  const handleSaveQuiz = (e) => {
    e.preventDefault();
    if (!quizQuestionForm.text.trim()) {
      toast.error('Question prompt is required');
      return;
    }
    let updated;
    if (quizQuestionForm.id) {
      updated = quizQuestions.map(q => q.id === quizQuestionForm.id ? quizQuestionForm : q);
      toast.success('Quiz question updated successfully');
    } else {
      const newQ = { ...quizQuestionForm, id: 'qq' + Date.now() };
      updated = [...quizQuestions, newQ];
      toast.success('Quiz question added successfully');
    }
    setQuizQuestions(updated);
    localStorage.setItem('admin_quiz_questions', JSON.stringify(updated));
    setShowQuizModal(false);
  };
  const handleDeleteQuiz = (id) => {
    if (window.confirm('Delete this quiz question?')) {
      const updated = quizQuestions.filter(q => q.id !== id);
      setQuizQuestions(updated);
      localStorage.setItem('admin_quiz_questions', JSON.stringify(updated));
      toast.success('Question deleted successfully');
    }
  };
  const handleAddDomain = () => {
    const domain = window.prompt('Enter new career domain name:');
    if (domain && domain.trim()) {
      if (careerDomains.includes(domain.trim())) {
        toast.error('Domain already exists');
      } else {
        setCareerDomains(prev => [...prev, domain.trim()]);
        toast.success('Career domain added');
      }
    }
  };

  // --- Course Management Helper Functions ---
  const saveCourses = (updated) => {
    setCourses(updated);
    localStorage.setItem('admin_courses', JSON.stringify(updated));
  };

  const handleOpenAddCourse = () => {
    setCourseForm({ id: null, title: '', category: 'Technology', url: '', certUrl: '' });
    setShowCourseModal(true);
  };

  const handleOpenEditCourse = (c) => {
    setCourseForm(c);
    setShowCourseModal(true);
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) {
      toast.error('Course title is required');
      return;
    }
    let updated;
    if (courseForm.id) {
      updated = courses.map(c => c.id === courseForm.id ? courseForm : c);
      toast.success('Course updated successfully');
    } else {
      const newC = { ...courseForm, id: 'c' + Date.now() };
      updated = [...courses, newC];
      toast.success('Course added successfully');
    }
    saveCourses(updated);
    setShowCourseModal(false);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Delete this course?')) {
      const updated = courses.filter(c => c.id !== id);
      saveCourses(updated);
      toast.success('Course deleted successfully');
    }
  };

  // --- Notification Manager Helper Functions ---
  const saveNotificationTypes = (updated) => {
    setNotificationTypes(updated);
    localStorage.setItem('notification_types', JSON.stringify(updated));
  };

  const handleOpenAddNotification = () => {
    const enabled = notificationTypes.filter(t => t.enabled);
    const defaultType = enabled.length > 0 ? enabled[0].name : '';
    setNotificationForm({ title: '', type: defaultType, message: '' });
    setNotificationEditMode(false);
    setSelectedNotificationId(null);
    setShowNotificationModal(true);
  };

  const handleOpenEditNotification = (n) => {
    setNotificationForm({ title: n.title, type: n.type || '', message: n.message });
    setSelectedNotificationId(n.id);
    setNotificationEditMode(true);
    setShowNotificationModal(true);
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!notificationForm.title.trim() || !notificationForm.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!notificationForm.type) {
      toast.error('Please select a broadcast type (enable at least one notification type)');
      return;
    }
    let updated;
    if (notificationEditMode) {
      updated = notifications.map(n => n.id === selectedNotificationId ? {
        ...n,
        title: notificationForm.title,
        type: notificationForm.type,
        message: notificationForm.message
      } : n);
      toast.success('Notification updated successfully');
    } else {
      const newN = {
        id: 'n' + Date.now(),
        title: notificationForm.title,
        type: notificationForm.type,
        message: notificationForm.message,
        read: false,
        date: new Date().toISOString().split('T')[0]
      };
      updated = [newN, ...notifications];
      toast.success(`${notificationForm.type} broadcasted successfully`);
    }
    setNotifications(updated);
    localStorage.setItem('user_notifications', JSON.stringify(updated));
    // Alert user dashboard / navbar of storage sync changes
    window.dispatchEvent(new Event('storage'));
    setNotificationForm({ title: '', type: '', message: '' });
    setShowNotificationModal(false);
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Delete this notification broadcast?')) {
      const updated = notifications.filter(n => n.id !== id);
      setNotifications(updated);
      localStorage.setItem('user_notifications', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      toast.success('Notification deleted successfully');
    }
  };

  const handleOpenAddType = () => {
    setTypeForm({ id: null, name: '', group: 'System' });
    setShowTypeModal(true);
  };
  
  const handleOpenEditType = (t) => {
    setTypeForm({ id: t.id, name: t.name, group: t.group });
    setShowTypeModal(true);
  };

  const handleSaveType = (e) => {
    e.preventDefault();
    if (!typeForm.name.trim()) {
      toast.error('Type name is required');
      return;
    }
    let updated;
    if (typeForm.id) {
      updated = notificationTypes.map(t => 
        t.id === typeForm.id ? { ...t, name: typeForm.name.trim(), group: typeForm.group } : t
      );
      toast.success('Notification type updated successfully');
    } else {
      const newType = {
        id: 'nt-' + Date.now(),
        name: typeForm.name.trim(),
        group: typeForm.group,
        enabled: true
      };
      updated = [...notificationTypes, newType];
      toast.success('Notification type created successfully');
    }
    saveNotificationTypes(updated);
    setShowTypeModal(false);
    setTypeForm({ id: null, name: '', group: 'System' });
  };

  const handleDeleteType = (id) => {
    if (window.confirm('Are you sure you want to delete this notification type?')) {
      const updated = notificationTypes.filter(t => t.id !== id);
      saveNotificationTypes(updated);
      toast.success('Notification type deleted successfully');
    }
  };

  const toggleTypeEnabled = (id) => {
    const updated = notificationTypes.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    );
    saveNotificationTypes(updated);
    const type = updated.find(t => t.id === id);
    toast.success(`Notification type "${type.name}" is now ${type.enabled ? 'Enabled' : 'Disabled'}`);
  };

  // --- Language Manager Helper Functions ---
  const handleOpenAddLang = () => {
    setLangForm({ label: '', code: '' });
    setShowLangModal(true);
  };

  const handleSaveLang = (e) => {
    e.preventDefault();
    if (!langForm.label.trim() || !langForm.code.trim()) {
      toast.error('All fields are required');
      return;
    }
    const success = addLanguage(langForm.label, langForm.code);
    if (success) {
      toast.success(`${langForm.label} added to available languages.`);
      setShowLangModal(false);
    } else {
      toast.error('Language code already exists');
    }
  };

  const handleDeleteLang = (code, label) => {
    if (code === 'en') {
      toast.error('English cannot be deleted.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${label}?`)) {
      const success = deleteLanguage(code);
      if (success) {
        toast.success(`${label} deleted successfully`);
      } else {
        toast.error('Failed to delete language');
      }
    }
  };

  // --- Tab Rendering Engine ---
  const renderTabContent = () => {

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Overview header */}
            <div className="bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-gray-900 dark:text-white shadow-xs dark:shadow-lg flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-extrabold mb-1">System Overview</h1>
                <p className="text-gray-500 dark:text-gray-300 text-sm">Real-time database statistics and user registration activity.</p>
              </div>
              <button
                onClick={() => setActiveTab('schemes')}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-sm cursor-pointer"
              >
                <Plus size={16} /> Manage Schemes
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-ui p-5 flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-2xl"><Users size={24} /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-800 dark:text-white">{metrics.totalUsers}</h2>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('totalUsers')}</p>
                </div>
              </div>
              
              <div className="card-ui p-5 flex items-center gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/40 text-green-600 rounded-2xl"><UserCheck size={24} /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-800 dark:text-white">{metrics.activeUsersCount}</h2>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('activeUsers')}</p>
                </div>
              </div>

              <div className="card-ui p-5 flex items-center gap-4">
                <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 rounded-2xl"><Bookmark size={24} /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-800 dark:text-white">{metrics.totalSchemes}</h2>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Live Schemes</p>
                </div>
              </div>

              <div className="card-ui p-5 flex items-center gap-4">
                <div className="p-3 bg-pink-50 dark:bg-pink-950/40 text-pink-500 rounded-2xl"><CircleUser size={24} /></div>
                <div>
                  <h2 className="text-sm font-black text-gray-800 dark:text-white line-clamp-1">{metrics.mostViewedScheme}</h2>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Most Viewed Scheme</p>
                </div>
              </div>
            </div>

            {/* Roster lists side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Roster */}
              <div className="card-ui p-6">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 dark:border-gray-700 pb-2">
                  <div className="flex items-center gap-2">
                    <CircleUser size={20} className="text-gray-600 dark:text-gray-300"/> 
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t('userRoster')}</h2>
                  </div>
                  <button onClick={() => setActiveTab('users')} className="text-xs text-pink-600 hover:underline font-semibold">View All</button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {metrics.users.filter(u => u.role !== 'admin').slice(0, 5).map(u => (
                    <div key={u.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">{u.name}</h3>
                        <p className="text-[10px] text-gray-500">{u.email}</p>
                      </div>
                      {u.role === 'admin' ? 
                        <span className="text-[10px] font-semibold px-2 py-1 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 rounded flex items-center gap-1"><Shield size={12}/> {t('admin')}</span> 
                        : 
                        <span className="text-[10px] font-semibold px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">{t('user')}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved applications logs */}
              <div className="card-ui p-6">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-50 dark:border-gray-700 pb-2">
                  <Bookmark size={20} className="text-gray-600 dark:text-gray-300"/> 
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t('schemeApplications')}</h2>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {metrics.applications.length > 0 ? metrics.applications.map(app => (
                    <div key={app.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-1 text-sm">
                        <h3 className="font-semibold text-gray-800 dark:text-white truncate text-left">{app.schemeName}</h3>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{new Date(app.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-pink-600 dark:text-pink-400 text-left font-medium">{t('appliedBy')} {app.userName}</p>
                    </div>
                  )) : (
                    <div className="text-center py-6 text-sm text-gray-500">{t('noApplications')}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        const activeUsers = metrics.users.filter(u => u.role !== 'admin' && !deletedUserIds.includes(u.id));
        const filteredUsers = activeUsers.filter(u => 
          u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
          u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
        );

        return (
          <div className="card-ui p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Users className="text-violet-600" /> User Directory
              </h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search user name/email..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="input-field !pl-10 text-xs text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">User Details</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(u => {
                      const isBlocked = blockedUserIds.includes(u.id);
                      return (
                        <tr key={u.id} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          <td className="px-6 py-4">
                            <div className="font-bold text-gray-900 dark:text-white">{u.name}</div>
                            <div className="text-xs text-gray-400">{u.email}</div>
                          </td>
                          <td className="px-6 py-4 capitalize">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-purple-100 dark:bg-purple-950 text-purple-600' : 'bg-gray-100 dark:bg-gray-900 text-gray-600'}`}>
                              {u.role || 'user'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isBlocked ? 'bg-red-100 dark:bg-red-950 text-red-600' : 'bg-green-100 dark:bg-green-950 text-green-600'}`}>
                              {isBlocked ? 'Blocked' : 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex gap-2 justify-center">
                            <button
                              onClick={() => setSelectedUserDetails(u)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setBlockedUserIds(prev => 
                                  isBlocked ? prev.filter(id => id !== u.id) : [...prev, u.id]
                                );
                                toast.success(`User ${isBlocked ? 'Unblocked' : 'Blocked'} successfully`);
                              }}
                              className={`p-1.5 rounded-lg cursor-pointer ${isBlocked ? 'text-green-600 hover:bg-green-50' : 'text-amber-600 hover:bg-amber-50'}`}
                              title={isBlocked ? 'Unblock User' : 'Block User'}
                            >
                              {isBlocked ? <Unlock size={16} /> : <Ban size={16} />}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete user ${u.name}?`)) {
                                  setDeletedUserIds(prev => [...prev, u.id]);
                                  toast.success('User deleted successfully');
                                }
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-gray-400">No users matched search criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Selected User Details Modal */}
            {selectedUserDetails && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
                  <button onClick={() => setSelectedUserDetails(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer">&times;</button>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">User Registration details</h3>
                  <div className="space-y-3 text-xs">
                    <div><span className="font-bold text-gray-400">ID:</span> {selectedUserDetails.id}</div>
                    <div><span className="font-bold text-gray-400">Name:</span> {selectedUserDetails.name}</div>
                    <div><span className="font-bold text-gray-400">Email:</span> {selectedUserDetails.email}</div>
                    <div><span className="font-bold text-gray-400">Role:</span> <span className="capitalize font-bold text-pink-500">{selectedUserDetails.role}</span></div>
                    <div><span className="font-bold text-gray-400">Created At:</span> {new Date().toLocaleDateString()}</div>
                    <div><span className="font-bold text-gray-400">Database Connection:</span> <span className="text-green-500 font-semibold">Ready for MongoDB Schema Sync</span></div>
                  </div>
                  <button onClick={() => setSelectedUserDetails(null)} className="gradient-btn w-full mt-6 py-2.5">Close</button>
                </div>
              </div>
            )}
          </div>
        );

      case 'schemes':
        return (
          <div className="card-ui p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Enhanced Schemes Manager</h2>
              <button
                onClick={handleOpenAdd}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs cursor-pointer"
              >
                <Plus size={16} /> Add Scheme
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Scheme Name</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Official Link</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availableSchemes.map((sch) => {
                    const isDeactivated = deactivatedSchemeIds.includes(sch.id);
                    return (
                      <tr key={sch.id} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <th scope="row" className="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                          {getLocalizedText(sch.title, lang)}
                        </th>
                        <td className="px-6 py-4">{sch.category}</td>
                        <td className="px-6 py-4">
                          {sch.applyLink ? (
                            <a href={sch.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline gap-1 text-xs">
                              <LinkIcon size={12} /> Link
                            </a>
                          ) : (
                            <span className="text-gray-400 italic text-xs">Not Set</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDeactivated ? 'bg-red-100 text-red-600 dark:bg-red-950/20' : 'bg-green-100 text-green-600 dark:bg-green-950/20'}`}>
                            {isDeactivated ? 'Inactive' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2 justify-center">
                          <button
                            onClick={() => toggleSchemeStatus(sch.id)}
                            className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer"
                            title={isDeactivated ? 'Activate Scheme' : 'Deactivate Scheme'}
                          >
                            {isDeactivated ? <ToggleRight size={18} className="text-gray-400" /> : <ToggleLeft size={18} className="text-pink-500" />}
                          </button>
                          <button
                            onClick={() => handleOpenEdit(sch)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer"
                            title="Edit Scheme"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteScheme(sch.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                            title="Delete Scheme"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'eligibility':
        return (
          <div className="card-ui p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Eligibility Criteria Manager</h2>
              <button
                onClick={handleOpenAddCategory}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs cursor-pointer"
              >
                <Plus size={16} /> Add Category
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibilityCategories.map((cat) => (
                <div key={cat.id} className="card-ui p-5 flex flex-col justify-between border border-gray-150 dark:border-gray-750 hover:border-pink-300 dark:hover:border-pink-400 transition-all text-left bg-white dark:bg-gray-800 shadow-xs relative">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{cat.name}</h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Criteria count: <span className="font-bold text-pink-500">{cat.criteria?.length || 0}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                    <button
                      onClick={() => handleOpenCriteria(cat)}
                      className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View Criteria
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer"
                        title="Edit Category Name"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-1.5 text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {eligibilityCategories.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">No categories found. Click Add Category to create one.</div>
              )}
            </div>

            {/* Category Modal */}
            {showCategoryModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
                  <button onClick={() => setShowCategoryModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer">&times;</button>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {categoryForm.id ? 'Edit Category Name' : 'Add New Category'}
                  </h3>
                  <form onSubmit={handleSaveCategory} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Category Name*</label>
                      <input
                        type="text"
                        className="input-field"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        required
                        placeholder="e.g. Health, Sports"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button type="button" onClick={() => setShowCategoryModal(false)} className="px-4 py-2 border rounded-xl cursor-pointer">Cancel</button>
                      <button type="submit" className="gradient-btn px-6 py-2 cursor-pointer">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Criteria Modal */}
            {showCriteriaModal && selectedCategory && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col max-h-[85vh]">
                  <button onClick={() => setShowCriteriaModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-750 text-2xl font-bold cursor-pointer">&times;</button>
                  
                  <div className="mb-4 text-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Manage Criteria: <span className="text-pink-500">{selectedCategory.name}</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Add or edit individual eligibility criteria/rules for this category.</p>
                  </div>

                  {/* List of current criteria */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-1">
                    {selectedCategory.criteria && selectedCategory.criteria.length > 0 ? (
                      selectedCategory.criteria.map((crit) => (
                        <div key={crit.id} className="flex justify-between items-start gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 text-sm">
                          <div className="text-gray-800 dark:text-gray-205 text-left font-medium">
                            {crit.text}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleStartEditCriterion(crit)}
                              className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded cursor-pointer"
                              title="Edit Criterion"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteCriterion(crit.id)}
                              className="p-1 text-red-650 hover:bg-red-100 dark:hover:bg-red-900/40 rounded cursor-pointer"
                              title="Delete Criterion"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-400 text-xs italic">No criteria defined for this category yet.</div>
                    )}
                  </div>

                  {/* Add/Edit Criterion Form */}
                  <form onSubmit={handleSaveCriterion} className="border-t border-gray-100 dark:border-gray-700 pt-4 text-left">
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                        {criteriaForm.id ? 'Edit Criterion' : 'Add New Criterion'}
                      </label>
                      <div className="flex gap-2">
                        <textarea
                          rows={2}
                          className="input-field !py-2 flex-1 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                          placeholder="Enter validation rule or requirement question..."
                          value={criteriaForm.text}
                          onChange={(e) => setCriteriaForm({ ...criteriaForm, text: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          {criteriaForm.id && (
                            <button
                              type="button"
                              onClick={() => setCriteriaForm({ id: null, text: '' })}
                              className="text-xs text-red-500 hover:underline cursor-pointer"
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setShowCriteriaModal(false)} className="px-4 py-1.5 border rounded-xl text-xs cursor-pointer">Close Modal</button>
                          <button type="submit" className="gradient-btn px-5 py-1.5 text-xs cursor-pointer">
                            {criteriaForm.id ? 'Save Criterion' : 'Add Criterion'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="card-ui p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Career Quiz Management</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleAddDomain}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white font-bold px-3 py-2 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Manage Domains
                </button>
                <button
                  onClick={handleOpenAddQuiz}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs cursor-pointer"
                >
                  <Plus size={16} /> Add Question
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Quiz Question Statement</th>
                    <th scope="col" className="px-6 py-3">Career Domain</th>
                    <th scope="col" className="px-6 py-3">Associated Career Paths</th>
                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizQuestions.map((q) => (
                    <tr key={q.id} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{q.text}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 text-xs font-bold rounded uppercase">
                          {q.domain}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400">{q.careerPaths || 'None'}</td>
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <button
                          onClick={() => handleOpenEditQuiz(q)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer"
                          title="Edit Question"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(q.id)}
                          className="p-1.5 text-red-655 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                          title="Delete Question"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Career Quiz question Modal */}
            {showQuizModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
                  <button onClick={() => setShowQuizModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer">&times;</button>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {quizQuestionForm.id ? 'Edit Quiz Question' : 'Add Quiz Question'}
                  </h3>
                  <form onSubmit={handleSaveQuiz} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Question Prompt*</label>
                      <textarea
                        rows={3}
                        className="input-field !py-2"
                        value={quizQuestionForm.text}
                        onChange={(e) => setQuizQuestionForm({ ...quizQuestionForm, text: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Assign Career Domain</label>
                      <select
                        className="input-field"
                        value={quizQuestionForm.domain}
                        onChange={(e) => setQuizQuestionForm({ ...quizQuestionForm, domain: e.target.value })}
                      >
                        {careerDomains.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Career Paths (Comma-separated)*</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. Software Developer, Data Analyst, Web Developer"
                        value={quizQuestionForm.careerPaths}
                        onChange={(e) => setQuizQuestionForm({ ...quizQuestionForm, careerPaths: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button type="button" onClick={() => setShowQuizModal(false)} className="px-4 py-2 border rounded-xl cursor-pointer">Cancel</button>
                      <button type="submit" className="gradient-btn px-6 py-2 cursor-pointer">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'courses':
        return (
          <div className="card-ui p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <GraduationCap className="text-pink-500" /> Skill Development & Courses
              </h2>
              <button
                onClick={handleOpenAddCourse}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs cursor-pointer"
              >
                <Plus size={16} /> Add Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(c => (
                <div key={c.id} className="card-ui p-5 flex flex-col justify-between border hover:border-pink-350 transition-all text-left bg-white dark:bg-gray-800 shadow-xs relative">
                  <div className="space-y-3">
                    <span className="px-2.5 py-0.5 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 text-[10px] font-bold rounded-lg uppercase">
                      {c.category}
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{c.title}</h3>
                    <div className="space-y-1.5 text-xs">
                      {c.url && (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-650 hover:underline">
                          <LinkIcon size={14} /> Learning Resource (YouTube)
                        </a>
                      )}
                      {c.certUrl && (
                        <a href={c.certUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-green-650 hover:underline font-medium">
                          <CheckCircle size={14} /> Certification Link
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                    <button
                      onClick={() => handleOpenEditCourse(c)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer"
                      title="Edit Course"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="p-1.5 text-red-655 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Modal */}
            {showCourseModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
                  <button onClick={() => setShowCourseModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer">&times;</button>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {courseForm.id ? 'Edit Course Details' : 'Add New Course'}
                  </h3>
                  <form onSubmit={handleSaveCourse} className="space-y-4 text-left text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Course Title*</label>
                      <input
                        type="text"
                        className="input-field"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Category Domain</label>
                      <select
                        className="input-field"
                        value={courseForm.category}
                        onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                      >
                        <option value="Technology">Technology</option>
                        <option value="Medical">Medical</option>
                        <option value="Education">Education</option>
                        <option value="Business">Business</option>
                        <option value="Government">Government</option>
                        <option value="Arts & Media">Arts & Media</option>
                        <option value="Beauty & Wellness">Beauty & Wellness</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Learning Resource Link (YouTube URL)</label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/..."
                        className="input-field"
                        value={courseForm.url}
                        onChange={(e) => setCourseForm({ ...courseForm, url: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Official Certification Link</label>
                      <input
                        type="url"
                        placeholder="https://credentials.org/..."
                        className="input-field"
                        value={courseForm.certUrl}
                        onChange={(e) => setCourseForm({ ...courseForm, certUrl: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 border rounded-xl cursor-pointer">Cancel</button>
                      <button type="submit" className="gradient-btn px-6 py-2 cursor-pointer">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'feedback':
        return (
          <div className="card-ui p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 border-b pb-3">
              <MessageSquare className="text-pink-500" /> User Feedback Manager
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">User Name</th>
                    <th scope="col" className="px-6 py-3">Feedback Type</th>
                    <th scope="col" className="px-6 py-3">Message</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.length > 0 ? (
                    feedbacks.map(f => (
                      <tr key={f.id} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{f.user}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 text-xs font-bold rounded uppercase">
                            {f.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-655 dark:text-gray-300 leading-normal max-w-xs">{f.content}</td>
                        <td className="px-6 py-4 text-xs font-semibold text-gray-450 whitespace-nowrap">{f.date}</td>
                        <td className="px-6 py-4 text-center">
                          <select
                            value={f.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              const updated = feedbacks.map(item => item.id === f.id ? { ...item, status: newStatus } : item);
                              setFeedbacks(updated);
                              localStorage.setItem('user_feedbacks', JSON.stringify(updated));
                              toast.success(`Feedback status set to ${newStatus}`);
                            }}
                            className={`p-1 text-xs font-bold rounded cursor-pointer ${
                              f.status === 'Resolved' ? 'bg-green-150 text-green-600 dark:bg-green-950/20' : 
                              f.status === 'In Review' ? 'bg-blue-150 text-blue-600 dark:bg-blue-950/20' : 
                              'bg-amber-150 text-amber-600 dark:bg-amber-950/20'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400">No Feedback Submitted Yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="card-ui p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 flex-wrap gap-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Bell className="text-violet-650" /> Notifications & Broadcasts Manager
              </h2>
              <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
                <button
                  onClick={() => setNotifSubTab('broadcasts')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    notifSubTab === 'broadcasts'
                      ? 'bg-white dark:bg-gray-850 text-violet-600 dark:text-violet-400 shadow-xs'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Broadcasts History
                </button>
                <button
                  onClick={() => setNotifSubTab('types')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    notifSubTab === 'types'
                      ? 'bg-white dark:bg-gray-850 text-violet-600 dark:text-violet-400 shadow-xs'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Broadcast Types ({notificationTypes.length})
                </button>
              </div>
            </div>

            {notifSubTab === 'broadcasts' ? (
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Recent Broadcast Records</span>
                  <button
                    onClick={handleOpenAddNotification}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs cursor-pointer"
                  >
                    <Plus size={16} /> Create Broadcast
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3">Alert Headline</th>
                        <th scope="col" className="px-6 py-3">Category Type</th>
                        <th scope="col" className="px-6 py-3">Message Content</th>
                        <th scope="col" className="px-6 py-3">Publish Date</th>
                        <th scope="col" className="px-6 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <tr key={n.id} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{n.title}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 text-xs font-bold rounded uppercase">
                                {n.type || 'Announcement'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 max-w-xs">{n.message}</td>
                            <td className="px-6 py-4 text-xs font-semibold text-gray-450 whitespace-nowrap">{n.date}</td>
                            <td className="px-6 py-4 flex gap-2 justify-center">
                              <button
                                onClick={() => handleOpenEditNotification(n)}
                                className="p-1.5 text-blue-650 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer"
                                title="Edit Broadcast"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteNotification(n.id)}
                                className="p-1.5 text-red-655 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                                title="Delete Broadcast"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-gray-400">No active notification history found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Notification Types Config</span>
                  <button
                    onClick={handleOpenAddType}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs cursor-pointer"
                  >
                    <Plus size={16} /> Add Type
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3">Type Name</th>
                        <th scope="col" className="px-6 py-3">Group</th>
                        <th scope="col" className="px-6 py-3 text-center">Status</th>
                        <th scope="col" className="px-6 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notificationTypes.map(t => (
                        <tr key={t.id} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t.name}</td>
                          <td className="px-6 py-4 capitalize font-semibold text-xs text-gray-500 dark:text-gray-450">{t.group}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => toggleTypeEnabled(t.id)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer inline-flex items-center gap-1"
                              title={t.enabled ? 'Disable Notification Type' : 'Enable Notification Type'}
                            >
                              {t.enabled ? (
                                <span className="inline-flex items-center text-xs font-bold text-green-600 bg-green-50 dark:bg-green-950/20 px-2.5 py-0.5 rounded-lg gap-1">
                                  <ToggleRight size={18} className="text-green-500" /> Enabled
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-lg gap-1">
                                  <ToggleLeft size={18} className="text-gray-400" /> Disabled
                                </span>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleOpenEditType(t)}
                                className="p-1.5 text-blue-650 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg cursor-pointer"
                                title="Edit Type"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteType(t.id)}
                                className="p-1.5 text-red-655 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                                title="Delete Type"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notification Broadcast Modal */}
            {showNotificationModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
                  <button onClick={() => setShowNotificationModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-750 text-2xl font-bold cursor-pointer">&times;</button>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {notificationEditMode ? 'Edit Broadcast Alert' : 'Send System Broadcast'}
                  </h3>
                  <form onSubmit={handleSendNotification} className="space-y-4 text-left text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Headline*</label>
                      <input
                        type="text"
                        className="input-field"
                        value={notificationForm.title}
                        onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Broadcast Type</label>
                      <select
                        className="input-field text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        value={notificationForm.type}
                        onChange={(e) => setNotificationForm({ ...notificationForm, type: e.target.value })}
                      >
                        {notificationTypes.filter(t => t.enabled).map(t => (
                          <option key={t.id} value={t.name}>{t.name} ({t.group})</option>
                        ))}
                        {notificationTypes.filter(t => t.enabled).length === 0 && (
                          <option value="">No notification types enabled</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Detailed Message*</label>
                      <textarea
                        rows={3}
                        className="input-field !py-2"
                        value={notificationForm.message}
                        onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button type="button" onClick={() => setShowNotificationModal(false)} className="px-4 py-2 border rounded-xl cursor-pointer">Cancel</button>
                      <button type="submit" className="gradient-btn px-6 py-2 cursor-pointer">
                        {notificationEditMode ? 'Save Changes' : 'Broadcast'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Notification Type Create/Edit Modal */}
            {showTypeModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
                  <button onClick={() => setShowTypeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-750 text-2xl font-bold cursor-pointer">&times;</button>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {typeForm.id ? 'Edit Notification Type' : 'Add Notification Type'}
                  </h3>
                  <form onSubmit={handleSaveType} className="space-y-4 text-left text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Type Name*</label>
                      <input
                        type="text"
                        className="input-field text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        value={typeForm.name}
                        onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
                        required
                        placeholder="e.g. Scheme Update, Security Alert"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Group Category</label>
                      <select
                        className="input-field text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        value={typeForm.group}
                        onChange={(e) => setTypeForm({ ...typeForm, group: e.target.value })}
                      >
                        <option value="Scheme">Scheme</option>
                        <option value="Career">Career</option>
                        <option value="Course">Course</option>
                        <option value="Profile">Profile</option>
                        <option value="System">System</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button type="button" onClick={() => setShowTypeModal(false)} className="px-4 py-2 border rounded-xl cursor-pointer">Cancel</button>
                      <button type="submit" className="gradient-btn px-6 py-2 cursor-pointer">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'content':
        return (
          <div className="card-ui p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 border-b pb-3">
              <FileEdit className="text-pink-500" /> Homepage Content & Banners Editor
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success('Homepage configurations saved successfully');
              }}
              className="space-y-4 text-left text-sm"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Homepage Hero Title Statement</label>
                <input
                  type="text"
                  className="input-field"
                  value={contentSettings.heroTitle}
                  onChange={(e) => setContentSettings({ ...contentSettings, heroTitle: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Homepage Hero Subtitle</label>
                <textarea
                  rows={2}
                  className="input-field !py-2"
                  value={contentSettings.heroSubtitle}
                  onChange={(e) => setContentSettings({ ...contentSettings, heroSubtitle: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Top Announcement Banner Bulletin</label>
                <input
                  type="text"
                  className="input-field text-yellow-600 font-semibold"
                  value={contentSettings.announcementBanner}
                  onChange={(e) => setContentSettings({ ...contentSettings, announcementBanner: e.target.value })}
                />
              </div>
              <div className="pt-2">
                <button type="submit" className="gradient-btn px-8 py-2.5 cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        );

      case 'language':
        return (
          <div className="card-ui p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 flex-wrap gap-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Globe className="text-violet-650" /> System Language Manager
              </h2>
              <button
                onClick={handleOpenAddLang}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-xs cursor-pointer"
              >
                <Plus size={16} /> Add Language
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
                <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Language Name</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supportedLanguages.map((l) => {
                    const isActive = activeLanguages.includes(l.code);
                    return (
                      <tr key={l.code} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900 dark:text-white">{l.label}</span>
                          <span className="text-xs text-gray-400 ml-2 uppercase">({l.code})</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isActive ? 'bg-green-100 text-green-600 dark:bg-green-950/20' : 'bg-gray-100 text-gray-600 dark:bg-gray-900 text-gray-450'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2 justify-center">
                          <button
                            onClick={() => {
                              if (isActive) {
                                if (l.code === 'en') {
                                  toast.error('English cannot be disabled.');
                                  return;
                                }
                                disableLanguage(l.code);
                                toast.success(`${l.label} disabled successfully`);
                              } else {
                                enableLanguage(l.code);
                                toast.success(`${l.label} enabled successfully`);
                              }
                            }}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                              isActive 
                                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                            disabled={l.code === 'en'}
                          >
                            {isActive ? 'Disable' : 'Enable'}
                          </button>
                          
                          <button
                            onClick={() => handleDeleteLang(l.code, l.label)}
                            className={`p-1.5 rounded-lg cursor-pointer ${
                              l.code === 'en' 
                                ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed' 
                                : 'text-red-655 hover:bg-red-50 dark:hover:bg-red-950/20'
                            }`}
                            disabled={l.code === 'en'}
                            title={l.code === 'en' ? 'System language' : 'Delete Language'}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="card-ui p-6 max-w-md mx-auto text-left space-y-4">
            <div className="text-center space-y-2 pb-3 border-b">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-sm">
                A
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">System Administrator</h3>
              <span className="px-3 py-1 bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400 rounded-full text-xs font-bold">
                ROOT ADMIN
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div><span className="font-bold text-gray-400">Account Username:</span> {user?.name || 'Administrator'}</div>
              <div><span className="font-bold text-gray-400">Security Email:</span> {user?.email || 'admin@empowerher.gov.in'}</div>
              <div><span className="font-bold text-gray-400">Permission Level:</span> Write Access (CRUD)</div>
              <div><span className="font-bold text-gray-400">Status:</span> Connected to API</div>
            </div>
          </div>
        );

      default:
        return <div>Tab content not found.</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[85vh] gap-6 text-left dark:text-white">
      {/* Left Navigation Sidebar */}
      <div className="w-full lg:w-64 flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 h-fit sticky top-20">
        <div className="flex items-center gap-2 mb-6 px-2 border-b border-gray-50 dark:border-gray-700/50 pb-3">
          <Shield className="text-pink-500" size={24} />
          <span className="font-extrabold text-md tracking-tight text-gray-850 dark:text-white">
            Admin Console
          </span>
        </div>
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'logout') {
                  handleLogout();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === item.id && item.id !== 'logout'
                  ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-900/50 hover:text-violet-600 dark:hover:text-violet-400'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 w-full overflow-hidden">
        {renderTabContent()}
      </div>

      {/* CRUD Add/Edit Scheme Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-1.5">
              {editMode ? <Edit2 size={20} /> : <Plus size={20} />}
              {editMode ? 'Edit Available Scheme' : 'Add New Available Scheme'}
            </h2>

            <form onSubmit={handleSaveScheme} className="space-y-5 text-left text-sm">
              {/* Titles in multiple languages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Scheme Name (English)*</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.title.en}
                    onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Scheme Name (Hindi)</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.title.hi}
                    onChange={(e) => setForm({ ...form, title: { ...form.title, hi: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Scheme Name (Marathi)</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.title.mr}
                    onChange={(e) => setForm({ ...form, title: { ...form.title, mr: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Scheme Name (Kannada)</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.title.kn}
                    onChange={(e) => setForm({ ...form, title: { ...form.title, kn: e.target.value } })}
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Description (English)*</label>
                  <textarea
                    rows={2}
                    className="input-field !py-2"
                    value={form.description.en}
                    onChange={(e) => setForm({ ...form, description: { ...form.description, en: e.target.value } })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Description (Hindi)</label>
                  <textarea
                    rows={2}
                    className="input-field !py-2"
                    value={form.description.hi}
                    onChange={(e) => setForm({ ...form, description: { ...form.description, hi: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Description (Marathi)</label>
                  <textarea
                    rows={2}
                    className="input-field !py-2"
                    value={form.description.mr}
                    onChange={(e) => setForm({ ...form, description: { ...form.description, mr: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Description (Kannada)</label>
                  <textarea
                    rows={2}
                    className="input-field !py-2"
                    value={form.description.kn}
                    onChange={(e) => setForm({ ...form, description: { ...form.description, kn: e.target.value } })}
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Benefits (English)</label>
                  <textarea
                    rows={2}
                    className="input-field !py-2"
                    value={form.benefits.en}
                    onChange={(e) => setForm({ ...form, benefits: { ...form.benefits, en: e.target.value } })}
                  />
                </div>
              </div>

              {/* Categorization & Location Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Category</label>
                  <select
                    className="input-field"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Employment">Employment</option>
                    <option value="Business">Business</option>
                    <option value="Skill Development">Skill Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Target State</label>
                  <select
                    className="input-field"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
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

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Official Website Link</label>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://official.gov.in"
                    value={form.applyLink}
                    onChange={(e) => setForm({ ...form, applyLink: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Deadline Date (Last Date)</label>
                  <input
                    type="date"
                    className="input-field"
                    value={form.lastDate}
                    onChange={(e) => setForm({ ...form, lastDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Financial benefits & constraints */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Amount / Scholarship Value (Numeric/Short)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. ₹50,000/year"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Annual Income Cap</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. ₹8 Lakhs/annum or None"
                    value={form.eligibility.incomeLimit}
                    onChange={(e) => setForm({ ...form, eligibility: { ...form.eligibility, incomeLimit: e.target.value } })}
                  />
                </div>
              </div>

              {/* Age Bounds & Constraints */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Minimum Age Required</label>
                  <input
                    type="number"
                    className="input-field"
                    value={form.eligibility.minAge}
                    onChange={(e) => setForm({ ...form, eligibility: { ...form.eligibility, minAge: Number(e.target.value) } })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Maximum Age Required</label>
                  <input
                    type="number"
                    className="input-field"
                    value={form.eligibility.maxAge}
                    onChange={(e) => setForm({ ...form, eligibility: { ...form.eligibility, maxAge: Number(e.target.value) } })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Gender Restriction</label>
                  <select
                    className="input-field"
                    value={form.eligibility.gender}
                    onChange={(e) => setForm({ ...form, eligibility: { ...form.eligibility, gender: e.target.value } })}
                  >
                    <option value="female">Female Only</option>
                    <option value="all">Any Gender</option>
                  </select>
                </div>
              </div>

              {/* Documents & How to Apply Text Areas */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Required Documents (Comma-separated)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Aadhaar Card, Mark Sheets, Income Certificate"
                    value={form.documentsRequired}
                    onChange={(e) => setForm({ ...form, documentsRequired: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Steps to Apply (New line separated steps)</label>
                  <textarea
                    rows={3}
                    className="input-field !py-2"
                    placeholder="Step 1: Visit official website&#10;Step 2: Sign up with details"
                    value={form.howToApply.en}
                    onChange={(e) => setForm({ ...form, howToApply: { ...form.howToApply, en: e.target.value } })}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gradient-btn py-2.5 px-8 font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Add Language Modal */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
            <button 
              onClick={() => setShowLangModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Add New System Language
            </h3>
            <form onSubmit={handleSaveLang} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Language Name*</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Spanish, French"
                  value={langForm.label}
                  onChange={(e) => setLangForm({ ...langForm, label: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Language ISO Code*</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. es, fr"
                  value={langForm.code}
                  onChange={(e) => setLangForm({ ...langForm, code: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowLangModal(false)} 
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="gradient-btn px-6 py-2">
                  Add Language
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
