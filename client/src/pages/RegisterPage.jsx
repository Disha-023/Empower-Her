import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, UserPlus, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [siteKey, setSiteKey] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const recaptchaRef = useRef(null);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { t } = useContext(LangContext);

  useEffect(() => {
    api.get('/auth/recaptcha-site-key')
      .then(res => setSiteKey(res.data.siteKey))
      .catch(err => console.error('Error fetching reCAPTCHA site key:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Invalid email address.');
      return;
    }
    if (!formData.password) {
      toast.error('Password is required.');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', { ...formData, captchaToken });
      
      // DO NOT automatically log the user in.
      // Instead, save to registered users listing and navigate to OTP Verification
      const registeredUser = { ...res.data.user, appliedSchemes: res.data.user.appliedSchemes || [] };
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      if (!allUsers.some(u => u.email === registeredUser.email)) {
        allUsers.push(registeredUser);
        localStorage.setItem('all_users', JSON.stringify(allUsers));
      }

      toast.success('Account created successfully.');
      navigate('/verify-email', { state: { email: formData.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaToken('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 dark:text-white relative">
      <div className="absolute top-10 left-10 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="card-ui w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl">
        {/* Left Side: Illustration / Branding (Splendid Design) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-tr from-violet-600 to-pink-500 p-8 flex-col justify-between text-white relative">
          <div className="space-y-2 text-left">
            <h2 className="text-2xl font-bold">EmpowerHer</h2>
            <p className="text-xs text-violet-100 leading-relaxed">Join a dedicated hub supporting women's welfare, higher education grants, and skill incubation.</p>
          </div>

          <div className="relative flex justify-center py-6">
            <svg viewBox="0 0 100 100" className="w-48 h-48 text-white opacity-95">
              <rect x="25" y="25" width="50" height="50" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 35,45 L 65,45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 35,55 L 55,55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="65" cy="55" r="3" fill="#FFFFFF" />
              <path d="M 50,25 C 60,10 40,10 50,25" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="text-left text-[10px] text-violet-100/70">
            © {new Date().getFullYear()} EmpowerHer Platform. Secure Application.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="text-center md:text-left mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{t('register')}</h1>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Join EmpowerHer and empower your career</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 ml-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  className="input-field !pl-10 text-gray-800 dark:text-white"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 ml-1">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  className="input-field !pl-10 text-gray-800 dark:text-white"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 ml-1">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field !pl-10 !pr-10 text-gray-800 dark:text-white"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-violet-600 cursor-pointer"
                  title={t('togglePassword')}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 ml-1">Account Type (Role)</label>
              <div className="relative">
                <ShieldAlert className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  className="input-field !pl-10 text-gray-800 dark:text-white cursor-pointer appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {siteKey && (
              <div className="flex justify-center my-3">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={siteKey}
                  onChange={(token) => setCaptchaToken(token || '')}
                  theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-btn py-3.5 flex justify-center items-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : <><UserPlus size={18} /> {t('register')}</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-600 hover:text-pink-700 font-bold transition-colors">
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
