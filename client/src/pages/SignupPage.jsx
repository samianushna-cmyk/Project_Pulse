import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Building2,
  AlertCircle,
  Loader2,
  Code2,
  Crown,
  GraduationCap,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup, user, isAuthenticated, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleRoleSelect = (roleValue) => {
    setFormData((prev) => ({
      ...prev,
      role: roleValue,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation checks
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);

    const res = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
      department: formData.department,
    });

    setIsSubmitting(false);

    if (res.success) {
      const destination = getDashboardPath(res.role);
      navigate(destination, { replace: true });
    } else {
      setError(res.error || 'Registration failed. Please check your details and try again.');
    }
  };

  const roles = [
    {
      id: 'student',
      title: 'Student',
      subtitle: 'Contributor',
      icon: Code2,
    },
    {
      id: 'leader',
      title: 'Leader',
      subtitle: 'Project Lead',
      icon: Crown,
    },
    {
      id: 'faculty',
      title: 'Faculty',
      subtitle: 'Guide & Evaluator',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-[#FAF8F4] text-[#1C1D1B] overflow-hidden">
      {/* Background Soft Studio Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-radial-warm pointer-events-none opacity-70"></div>
      <div className="absolute top-1/4 left-1/12 w-[350px] h-[350px] bg-[#1E281F]/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/12 w-[350px] h-[350px] bg-[#C87841]/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl">
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
              Create Your Account
            </h1>
            <p className="mt-2 text-sm text-[#525850]">
              Join ProjectPulse and build better student teams
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#60685D] mb-1.5"
              >
                Full Name
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#60685D]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Alex Rivera"
                  className="block w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-stone-300/80 rounded-xl text-sm text-[#1C1D1B] placeholder-[#60685D]/50 focus:bg-white focus:outline-none focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#60685D] mb-1.5"
              >
                Institutional Email Address
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
                  placeholder="alex.rivera@university.edu"
                  className="block w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-stone-300/80 rounded-xl text-sm text-[#1C1D1B] placeholder-[#60685D]/50 focus:bg-white focus:outline-none focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#60685D] mb-2">
                Select Your Academic Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = formData.role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleSelect(r.id)}
                      className={`relative flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#1E281F] bg-[#E7EDE5]/60 shadow-sm ring-1 ring-[#1E281F]/30'
                          : 'border-stone-200/80 bg-[#F7F5F0]/70 hover:border-stone-300 hover:bg-[#F7F5F0] text-[#525850]'
                      }`}
                    >
                      {/* Check indicator */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 text-[#1E281F]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                      
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 ${
                          isSelected
                            ? 'bg-[#1E281F] text-white shadow-sm'
                            : 'bg-white border border-stone-200 text-[#60685D]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <span
                        className={`text-sm font-bold leading-tight ${
                          isSelected ? 'text-[#1C1D1B]' : 'text-[#525850]'
                        }`}
                      >
                        {r.title}
                      </span>
                      <span
                        className={`text-[11px] mt-0.5 ${
                          isSelected ? 'text-[#1E281F] font-semibold' : 'text-[#787F75]'
                        }`}
                      >
                        {r.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="block text-xs font-semibold uppercase tracking-wider text-[#60685D] mb-1.5"
              >
                Department / Program
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#60685D]">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Computer Science & Engineering"
                  className="block w-full pl-10 pr-4 py-3 bg-[#F7F5F0] border border-stone-300/80 rounded-xl text-sm text-[#1C1D1B] placeholder-[#60685D]/50 focus:bg-white focus:outline-none focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password & Confirm Password (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#60685D] mb-1.5"
                >
                  Password
                </label>
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
                    autoComplete="new-password"
                    placeholder="Min. 6 characters"
                    className="block w-full pl-10 pr-10 py-3 bg-[#F7F5F0] border border-stone-300/80 rounded-xl text-sm text-[#1C1D1B] placeholder-[#60685D]/50 focus:bg-white focus:outline-none focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#60685D] hover:text-[#1C1D1B] transition-colors cursor-pointer"
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#60685D] mb-1.5"
                >
                  Confirm Password
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#60685D]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    className="block w-full pl-10 pr-10 py-3 bg-[#F7F5F0] border border-stone-300/80 rounded-xl text-sm text-[#1C1D1B] placeholder-[#60685D]/50 focus:bg-white focus:outline-none focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#60685D] hover:text-[#1C1D1B] transition-colors cursor-pointer"
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button - Solid Deep Forest Olive */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#1E281F] hover:bg-[#151D16] shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account →</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Login Link */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 text-center text-sm text-[#525850]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#C87841] hover:underline transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Security / Academic Notice */}
        <div className="mt-6 text-center text-xs text-[#787F75] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#787F75]" />
          <span>Institutional data privacy and FERPA-aligned data protection</span>
        </div>
      </div>
    </div>
  );
}
