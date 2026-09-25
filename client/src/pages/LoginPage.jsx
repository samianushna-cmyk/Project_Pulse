import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, user, isAuthenticated, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to user's dashboard
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(getDashboardPath(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate, getDashboardPath]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login({
      email: formData.email,
      password: formData.password,
    });

    setIsSubmitting(false);

    if (res.success) {
      const destination = getDashboardPath(res.role);
      navigate(destination, { replace: true });
    } else {
      setError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-[#FAF8F4] text-[#1C1D1B] overflow-hidden">
      {/* Background Soft Studio Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-radial-warm pointer-events-none opacity-70"></div>
      <div className="absolute top-1/4 left-1/12 w-[350px] h-[350px] bg-[#1E281F]/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/12 w-[350px] h-[350px] bg-[#C87841]/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Elevated Tactile Ivory Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-[0_20px_50px_rgba(28,29,27,0.06)] hover:border-stone-300 transition-all duration-300">
          
          {/* Header & Logo Icon */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <Link to="/" className="inline-flex items-center group focus:outline-none">
                <div className="w-12 h-12 rounded-2xl bg-[#1E281F] flex items-center justify-center shadow-md shadow-[#1E281F]/15 group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-6 h-6 text-[#FAF8F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h3.5l2.5-6 4 12 2.5-6H20" />
                    <circle cx="12" cy="12" r="1.5" fill="#C87841" stroke="#C87841" />
                  </svg>
                </div>
              </Link>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1D1B]">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-[#525850]">
              Sign in to continue to ProjectPulse
            </p>
          </div>

          {/* Backend / Validation Error Alert */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-sm shadow-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-rose-600" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#60685D] mb-1.5"
              >
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#60685D]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="student@university.edu"
                  className="block w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-stone-300/80 rounded-xl text-sm text-[#1C1D1B] placeholder-[#60685D]/50 focus:bg-white focus:outline-none focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#60685D]"
                >
                  Password
                </label>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#60685D]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-11 py-3 bg-[#F7F5F0] border border-stone-300/80 rounded-xl text-sm text-[#1C1D1B] placeholder-[#60685D]/50 focus:bg-white focus:outline-none focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#60685D] hover:text-[#1C1D1B] transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button - Solid Deep Forest Olive */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#1E281F] hover:bg-[#151D16] shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Log In →</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Signup Link */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 text-center text-sm text-[#525850]">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#C87841] hover:underline transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Security / Academic Notice */}
        <div className="mt-6 text-center text-xs text-[#787F75] flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#787F75]" />
          <span>Protected by role-based academic access control.</span>
        </div>
      </div>
    </div>
  );
}
