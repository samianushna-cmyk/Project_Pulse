import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  LogOut,
  User,
  FolderGit2,
  FolderPlus,
  LayoutDashboard,
  Shield
} from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isLandingPage = location.pathname === '/';

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (!isLandingPage) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  // Helper to determine link active state
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
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
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-5 h-5 text-indigo-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Project<span className="text-indigo-600">Pulse</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase -mt-1 hidden sm:block">
                Skill-Based Collaboration
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600">
            {isAuthenticated ? (
              /* Authenticated Role-based Nav */
              <>
                {/* Leader Links */}
                {user?.role === 'leader' && (
                  <>
                    <Link
                      to="/leader/dashboard"
                      className={`transition-colors py-1 ${
                        isActive('/leader/dashboard')
                          ? 'text-purple-600 font-semibold border-b-2 border-purple-600'
                          : 'hover:text-purple-600'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/leader/projects/create"
                      className={`transition-colors py-1 ${
                        isActive('/leader/projects/create')
                          ? 'text-purple-600 font-semibold border-b-2 border-purple-600'
                          : 'hover:text-purple-600'
                      }`}
                    >
                      Create Project
                    </Link>
                    <Link
                      to="/projects"
                      className={`transition-colors py-1 ${
                        isActive('/projects')
                          ? 'text-purple-600 font-semibold border-b-2 border-purple-600'
                          : 'hover:text-purple-600'
                      }`}
                    >
                      Projects
                    </Link>
                  </>
                )}

                {/* Student Links */}
                {user?.role === 'student' && (
                  <>
                    <Link
                      to="/student/dashboard"
                      className={`transition-colors py-1 ${
                        isActive('/student/dashboard')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student/profile"
                      className={`transition-colors py-1 ${
                        isActive('/student/profile')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/projects"
                      className={`transition-colors py-1 ${
                        isActive('/projects')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      Explore Projects
                    </Link>
                    <Link
                      to="/student/projects"
                      className={`transition-colors py-1 ${
                        isActive('/student/projects')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      My Projects
                    </Link>
                    <Link
                      to="/student/invitations"
                      className={`transition-colors py-1 flex items-center gap-1 ${
                        isActive('/student/invitations')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      <span>Invitations</span>
                    </Link>
                    <Link
                      to="/student/tasks"
                      className={`transition-colors py-1 flex items-center gap-1 ${
                        isActive('/student/tasks')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      <span>Tasks</span>
                    </Link>
                  </>
                )}

                {/* Faculty Links */}
                {user?.role === 'faculty' && (
                  <>
                    <Link
                      to="/faculty/dashboard"
                      className={`transition-colors py-1 ${
                        isActive('/faculty/dashboard')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/projects"
                      className={`transition-colors py-1 ${
                        isActive('/projects')
                          ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                          : 'hover:text-indigo-600'
                      }`}
                    >
                      Projects
                    </Link>
                  </>
                )}
              </>
            ) : isLandingPage ? (
              /* Guest Navigation on Landing Page */
              <>
                <button
                  onClick={() => scrollToSection('problem')}
                  className="hover:text-indigo-600 transition-colors py-1 cursor-pointer"
                >
                  Challenges
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-indigo-600 transition-colors py-1 cursor-pointer"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-indigo-600 transition-colors py-1 cursor-pointer"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('roles')}
                  className="hover:text-indigo-600 transition-colors py-1 cursor-pointer"
                >
                  Roles
                </button>
              </>
            ) : (
              /* Guest Navigation on Auth Pages */
              <>
                <Link to="/#features" className="hover:text-indigo-600 transition-colors">
                  Features
                </Link>
                <Link to="/#how-it-works" className="hover:text-indigo-600 transition-colors">
                  How It Works
                </Link>
                <Link to="/#roles" className="hover:text-indigo-600 transition-colors">
                  Roles
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-semibold text-slate-800">{user?.name}</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-indigo-700 border border-slate-200 capitalize">
                    {user?.role}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={LogOut}
                  iconPosition="left"
                  onClick={handleLogout}
                  className="text-rose-600 hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button to="/login" variant="ghost" size="md">
                  Log in
                </Button>
                <Button
                  to="/signup"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            {!isAuthenticated && (
              <Button
                to="/signup"
                variant="primary"
                size="sm"
                className="text-xs px-2.5 py-1.5 sm:hidden"
              >
                Sign Up
              </Button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drop panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            {isAuthenticated ? (
              <>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900">{user?.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                    {user?.role}
                  </span>
                </div>

                {user?.role === 'leader' && (
                  <>
                    <Link
                      to="/leader/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-purple-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/leader/projects/create"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-purple-600 transition-colors"
                    >
                      Create Project
                    </Link>
                    <Link
                      to="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-purple-600 transition-colors"
                    >
                      Projects
                    </Link>
                  </>
                )}

                {user?.role === 'student' && (
                  <>
                    <Link
                      to="/student/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                      Explore Projects
                    </Link>
                    <Link
                      to="/student/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                      My Projects
                    </Link>
                    <Link
                      to="/student/invitations"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                      Invitations
                    </Link>
                    <Link
                      to="/student/tasks"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
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
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                    >
                      Projects
                    </Link>
                  </>
                )}

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="md"
                    icon={LogOut}
                    iconPosition="left"
                    onClick={handleLogout}
                    className="w-full justify-center text-rose-600 hover:bg-rose-50"
                  >
                    Log Out
                  </Button>
                </div>
              </>
            ) : isLandingPage ? (
              <>
                <button
                  onClick={() => scrollToSection('problem')}
                  className="text-left px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  Challenges
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-left px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-left px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('roles')}
                  className="text-left px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  For Students & Faculty
                </button>
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <Button
                    to="/login"
                    variant="outline"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Button>
                  <Button
                    to="/signup"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={Sparkles}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <Button
                    to="/login"
                    variant="outline"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Button>
                  <Button
                    to="/signup"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={Sparkles}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
