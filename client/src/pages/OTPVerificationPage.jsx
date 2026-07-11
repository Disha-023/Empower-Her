import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const OTPVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Starts at 0, countdown only triggered after API success
  const [expiryMinutes, setExpiryMinutes] = useState(10); // Dynamically synchronized with backend
  
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error('Email not found. Redirecting to signup...');
      navigate('/register', { replace: true });
    }
  }, [email, navigate]);

  // Fetch dynamic OTP expiry configuration from backend
  useEffect(() => {
    api.get('/auth/otp-config')
      .then((res) => {
        if (res.data.otpExpiryMinutes) {
          setExpiryMinutes(res.data.otpExpiryMinutes);
        }
      })
      .catch((err) => console.error('Failed to load OTP expiry configuration:', err));
  }, []);

  // Interval timer for the resend cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  if (!email) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      const msg = 'Verification code is required';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (otp.length !== 6) {
      const msg = 'Verification code must be exactly 6 digits';
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      toast.success('Email verified successfully.');
      
      // Redirect to Login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Verification failed';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (cooldown > 0 || loading || resending) return;

    setResending(true);
    setError('');
    try {
      await api.post('/auth/resend-otp', { email });
      toast.success('New verification code sent.');
      setOtp(''); // Clear entered OTP input value
      setCooldown(60); // reset cooldown to 60 seconds
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to resend code';
      toast.error(errMsg);
      
      // If the backend indicates a rate limit with remaining seconds
      if (err.response?.data?.remainingSeconds) {
        setCooldown(err.response.data.remainingSeconds);
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 dark:text-white relative">
      {/* Visual background blurs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="card-ui w-full max-w-md p-8 sm:p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800 text-left">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Verify Your Email</h2>
        <p className="text-gray-500 dark:text-gray-300 text-xs mb-2 leading-relaxed">
          Enter the 6-digit verification code sent to your email.
        </p>
        <p className="text-gray-500 dark:text-gray-300 text-xs mb-4 leading-relaxed font-semibold">
          Verification code is valid for {expiryMinutes} minutes.
        </p>

        <div className="mb-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-4 rounded-xl text-xs space-y-1">
          <span className="text-gray-400 font-medium">Verification code sent to:</span>
          <div>
            <a href={`mailto:${email}`} className="font-bold text-violet-600 dark:text-violet-400 hover:underline break-all">
              {email}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5 ml-1">Verification Code</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                maxLength={6}
                disabled={loading}
                className={`input-field !pl-10 text-gray-800 dark:text-white tracking-widest text-center font-bold text-lg ${
                  error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="••••••"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ''); // only allow digits
                  setOtp(val);
                  if (error) setError('');
                }}
              />
            </div>
            {error && (
              <p className="text-red-500 text-[11px] font-semibold mt-1.5 ml-1 animate-pulse">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || resending}
            className="w-full gradient-btn py-3.5 flex justify-center items-center gap-2 mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying OTP...' : 'Verify'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={cooldown > 0 || loading || resending}
            className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer disabled:text-gray-400 dark:disabled:text-gray-500 disabled:no-underline disabled:cursor-not-allowed"
          >
            {resending ? 'Resending OTP...' : cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
          </button>
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4 text-center">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
