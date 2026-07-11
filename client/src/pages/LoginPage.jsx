import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, CheckSquare, Square, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { LangContext } from '../context/LangContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [siteKey, setSiteKey] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const recaptchaRef = useRef(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const { t } = useContext(LangContext);

  useEffect(() => {
    api.get('/auth/recaptcha-site-key')
      .then(res => setSiteKey(res.data.siteKey))
      .catch(err => console.error('Error fetching reCAPTCHA site key:', err));
  }, []);

  // Load remembered credentials
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error('Email is required.');
      return;
    }
    if (!formData.password) {
      toast.error('Password is required.');
      return;
    }

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { ...formData, captchaToken });
      const loggedInUser = { ...res.data.user, appliedSchemes: res.data.user.appliedSchemes || [] };
      login(loggedInUser, res.data.token);
      
      // Save or clear remembered email
      if (rememberMe) {
        localStorage.setItem('remembered_email', formData.email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      if (!allUsers.some(u => u.email === loggedInUser.email)) {
        allUsers.push(loggedInUser);
        localStorage.setItem('all_users', JSON.stringify(allUsers));
      }

      toast.success('Login successful.');
      
      const from = location.state?.from?.pathname || (res.data.user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
      navigate(from, { replace: true });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed';
      if (errMsg === 'Please verify your email before login') {
        setUnverifiedEmail(formData.email);
      }
      toast.error(errMsg);
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
        {/* Left Side: Branding / Illustration (Vibrant gradient and graphic) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-tr from-violet-600 to-pink-500 p-8 flex-col justify-between text-white relative">
          <div className="space-y-2 text-left">
            <h2 className="text-2xl font-bold">EmpowerHer</h2>
            <p className="text-xs text-violet-100 leading-relaxed">Discover, save, and apply to welfare, business, and educational opportunities made for you.</p>
          </div>

          <div className="relative flex justify-center py-6">
            <svg viewBox="0 0 100 100" className="w-48 h-48 text-white opacity-95">
              <path d="M 20,80 Q 20,40 50,40 Q 80,40 80,80 Z" fill="currentColor" opacity="0.15" />
              <circle cx="50" cy="30" r="12" fill="currentColor" opacity="0.3" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 15,50 Q 50,20 85,50" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
            </svg>
          </div>

          <div className="text-left text-[10px] text-violet-100/70">
            © {new Date().getFullYear()} EmpowerHer Platform. Secure Application.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{t('login')}</h1>
            <p className="text-gray-500 dark:text-gray-300 text-sm">Sign in to continue your career journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {unverifiedEmail && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeIn mb-2">
                <div>
                  <p className="font-bold mb-1">Email Verification Required</p>
                  <p className="text-gray-500 dark:text-gray-400">Please verify your email before logging in.</p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await api.post('/auth/generate-otp', { email: unverifiedEmail });
                    } catch (err) {
                      console.error('Failed to generate/send first OTP on login redirect:', err);
                    }
                    navigate('/verify-email', { state: { email: unverifiedEmail } });
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-[11px] cursor-pointer self-start sm:self-center"
                >
                  Verify Email
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 ml-1">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  className="input-field !pl-10 text-gray-800 dark:text-white"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (unverifiedEmail) setUnverifiedEmail('');
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 ml-1">{t('password')}</label>
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

            {siteKey && (
              <div className="flex justify-center my-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={siteKey}
                  onChange={(token) => setCaptchaToken(token || '')}
                  theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                />
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-violet-600 cursor-pointer"
              >
                {rememberMe ? <CheckSquare size={16} className="text-violet-600" /> : <Square size={16} />}
                {t('rememberMe')}
              </button>

              <Link
                to="/forgot-password"
                className="text-pink-600 hover:text-pink-700 font-bold cursor-pointer"
              >
                {t('forgotPassword') || 'Forgot Password?'}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-btn py-3.5 flex justify-center items-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : <><LogIn size={18} /> {t('login')}</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="text-pink-600 hover:text-pink-700 font-bold transition-colors">
              {t('register')}
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl border border-gray-100 dark:border-gray-700">
            <button onClick={() => setShowForgotModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer">&times;</button>
            <div className="text-center space-y-4">
              <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <Info size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reset Password</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">
                For security reasons, password recovery link has been configured through email authentication. Please contact support at <strong className="text-violet-600">support@empowerher.gov.in</strong> or verify with local helpline.
              </p>
              <button
                onClick={() => setShowForgotModal(false)}
                className="gradient-btn w-full mt-4"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
