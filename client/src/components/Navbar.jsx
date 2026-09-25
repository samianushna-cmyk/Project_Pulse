import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  LogOut,
  User,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup' || location.pathname === '/register';

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'student':
        return 'bg-[#EAF2E8] text-[#2D452E] border border-[#D1E3CE]';
      case 'leader':
        return 'bg-[#FBECE3] text-[#A35222] border border-[#F4D4C3]';
      case 'faculty':
        return 'bg-[#F7EFE1] text-[#7A5418] border border-[#EBDCC5]';
      default:
        return 'bg-[#EAF2E8] text-[#2D452E] border border-[#D1E3CE]';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F4]/85 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_16px_-4px_rgba(27,28,26,0.04)] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link
            to={
              isAuthenticated
                ? user?.role === 'leader'
                  ? '/leader/dashboard'
                  : user?.role === 'faculty'
                  ? '/faculty/dashboard'
                  : '/student/dashboard'
                : '/'
            }
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1E281F] flex items-center justify-center shadow-md shadow-[#1E281F]/15 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 text-[#FAF8F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h3.5l2.5-6 4 12 2.5-6H20" />
                <circle cx="12" cy="12" r="1.5" fill="#C87841" stroke="#C87841" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#1C1D1B] leading-none group-hover:text-[#1E281F] transition-colors">
                Project<span className="text-[#C87841]">Pulse</span>
              </span>
              <span className="text-[9.5px] font-mono tracking-widest text-[#72756E] uppercase font-semibold mt-1 hidden sm:block">
                SKILL-BASED COLLABORATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-stone-200/70 shadow-sm backdrop-blur-md text-sm font-medium">
            {isAuthenticated ? (
              /* Authenticated Role-based Nav */
              <>
                {user?.role === 'leader' && (
                  <>
                    <Link
                      to="/leader/dashboard"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/leader/dashboard')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/leader/projects/create"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/leader/projects/create')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Create Project
                    </Link>
                    <Link
                      to="/projects"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/projects')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Explore Projects
                    </Link>
                  </>
                )}

                {user?.role === 'student' && (
                  <>
                    <Link
                      to="/student/dashboard"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/student/dashboard')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student/profile"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/student/profile')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/projects"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/projects')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Explore Projects
                    </Link>
                    <Link
                      to="/student/projects"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/student/projects')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      My Projects
                    </Link>
                    <Link
                      to="/student/invitations"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/student/invitations')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Invitations
                    </Link>
                    <Link
                      to="/student/tasks"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/student/tasks')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Tasks
                    </Link>
                  </>
                )}

                {user?.role === 'faculty' && (
                  <>
                    <Link
                      to="/faculty/dashboard"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/faculty/dashboard')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/projects"
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        isActive('/projects')
                          ? 'bg-[#1E281F] text-white font-semibold shadow-xs'
                          : 'text-[#525850] hover:text-stone-900 hover:bg-stone-100/70'
                      }`}
                    >
                      Explore Directory
                    </Link>
                  </>
                )}
              </>
            ) : (
              /* Public / Guest Navigation */
              <>
                <Link to="/#features" className="px-4 py-2 rounded-full hover:bg-stone-100/70 hover:text-stone-900 transition-colors text-[#525850]">
                  Features
                </Link>
                <Link to="/#how-it-works" className="px-4 py-2 rounded-full hover:bg-stone-100/70 hover:text-stone-900 transition-colors text-[#525850]">
                  How It Works
                </Link>
                <Link to="/#roles" className="px-4 py-2 rounded-full hover:bg-stone-100/70 hover:text-stone-900 transition-colors text-[#525850]">
                  Roles
                </Link>
                <Link to="/projects" className="px-4 py-2 rounded-full hover:bg-stone-100/70 hover:text-stone-900 transition-colors text-[#525850] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#C87841]" />
                  <span>Explore Projects</span>
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Chip with Role Badge */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 text-xs shadow-sm">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span className="font-semibold text-[#1C1D1B]">{user?.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${getRoleBadgeStyle(user?.role)}`}>
                    {user?.role}
                  </span>
                </div>
                
                {/* Clean Stone Logout Icon */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100/80 border border-transparent hover:border-stone-200 transition-colors cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {!isLoginPage && (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-[#454743] hover:text-stone-900 rounded-full hover:bg-stone-100/70 transition-all duration-200"
                  >
                    Log in
                  </Link>
                )}
                {!isSignupPage ? (
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#1E281F] hover:bg-[#151D16] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <span>Get Started →</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#1E281F] hover:bg-[#151D16] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <span>Log in →</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            {!isAuthenticated && (
              <Link
                to="/register"
                className="text-xs px-3.5 py-1.5 rounded-full font-semibold bg-[#1E281F] text-white shadow-sm sm:hidden"
              >
                Get Started →
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#454743] hover:text-stone-900 hover:bg-stone-100 border border-stone-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drop panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F4]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#454743]">
            {isAuthenticated ? (
              <>
                <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-4 h-4 text-stone-500" />
                    <span className="font-bold text-[#1C1D1B]">{user?.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${getRoleBadgeStyle(user?.role)}`}>
                    {user?.role}
                  </span>
                </div>

                {user?.role === 'leader' && (
                  <>
                    <Link
                      to="/leader/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/leader/projects/create"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Create Project
                    </Link>
                    <Link
                      to="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Explore Projects
                    </Link>
                  </>
                )}

                {user?.role === 'student' && (
                  <>
                    <Link
                      to="/student/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Explore Projects
                    </Link>
                    <Link
                      to="/student/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      My Projects
                    </Link>
                    <Link
                      to="/student/invitations"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Invitations
                    </Link>
                    <Link
                      to="/student/tasks"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Tasks
                    </Link>
                  </>
                )}

                {user?.role === 'faculty' && (
                  <>
                    <Link
                      to="/faculty/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      Explore Directory
                    </Link>
                  </>
                )}

                <div className="pt-2 border-t border-stone-200">
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-full font-semibold text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  Features
                </Link>
                <Link
                  to="/#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  to="/#roles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  Roles
                </Link>
                <Link
                  to="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  Explore Projects
                </Link>

                <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full font-medium text-[#1C1D1B] bg-white border border-stone-200"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full font-semibold text-white bg-[#1E281F]"
                  >
                    Get Started Free
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
