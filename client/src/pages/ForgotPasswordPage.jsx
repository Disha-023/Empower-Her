import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Key, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../utils/api';
import { LangContext } from '../context/LangContext';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [siteKey, setSiteKey] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const recaptchaRef = useRef(null);

  const navigate = useNavigate();
  const { t } = useContext(LangContext);

  useEffect(() => {
    api.get('/auth/recaptcha-site-key')
      .then(res => setSiteKey(res.data.siteKey))
      .catch(err => console.error('Error fetching reCAPTCHA site key:', err));
  }, []);

  // Step 1: Request Password Reset OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Email is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Invalid email address.');
      return;
    }

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email, captchaToken });
      toast.success('Verification code sent successfully.');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset code');
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaToken('');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Verification code is required.');
      return;
    }
    if (otp.length !== 6) {
      toast.error('Verification code must be exactly 6 digits.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-reset-otp', { email, otp });
      toast.success('Email verified successfully.');
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwords;

    if (!newPassword) {
      toast.error('New password is required.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (!confirmPassword) {
      toast.error('Confirm password is required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/reset-password', {
        email,
        otp,
        newPassword
      });
      toast.success('Password reset successfully.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 dark:text-white relative">
      <div className="absolute top-10 left-10 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="card-ui w-full max-w-md p-8 sm:p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800 text-left">
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-violet-600 dark:text-violet-400">
          <span className={`px-2 py-1 rounded ${step >= 1 ? 'bg-violet-100 dark:bg-violet-950/60' : 'bg-gray-100 dark:bg-gray-800'}`}>1. Email</span>
          <span className="text-gray-400">→</span>
          <span className={`px-2 py-1 rounded ${step >= 2 ? 'bg-violet-100 dark:bg-violet-950/60' : 'bg-gray-100 dark:bg-gray-800'}`}>2. Verification</span>
          <span className="text-gray-400">→</span>
          <span className={`px-2 py-1 rounded ${step >= 3 ? 'bg-violet-100 dark:bg-violet-950/60' : 'bg-gray-100 dark:bg-gray-800'}`}>3. Reset</span>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Forgot Password</h2>
            <p className="text-gray-500 dark:text-gray-300 text-xs mb-6 leading-relaxed">
              Enter your registered email address and we'll send you a 6-digit OTP code to reset your password.
            </p>

            <form onSubmit={handleSendOTP} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    className="input-field !pl-10 text-gray-800 dark:text-white"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                className="w-full gradient-btn py-3.5 flex justify-center items-center gap-2 mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Verify OTP</h2>
            <p className="text-gray-500 dark:text-gray-300 text-xs mb-6 leading-relaxed">
              We have sent a verification code to <strong className="text-violet-600 dark:text-violet-400">{email}</strong>. Please enter it below.
            </p>

            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 ml-1">Verification Code</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="input-field !pl-10 text-gray-800 dark:text-white tracking-widest text-center font-bold text-lg"
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn py-3.5 flex justify-center items-center gap-2 mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-xs font-bold text-gray-500 hover:text-violet-600 cursor-pointer mt-2"
              >
                Change Email Address
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">New Password</h2>
            <p className="text-gray-500 dark:text-gray-300 text-xs mb-6 leading-relaxed">
              Please choose a strong, secure new password for your account.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 ml-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    required
                    className="input-field !pl-10 text-gray-800 dark:text-white"
                    placeholder="••••••••"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 ml-1">Confirm New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    required
                    className="input-field !pl-10 text-gray-800 dark:text-white"
                    placeholder="••••••••"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn py-3.5 flex justify-center items-center gap-2 mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          </div>
        )}

        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4 text-center">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
