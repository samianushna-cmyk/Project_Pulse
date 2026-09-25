import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, User, LogOut, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white/60 backdrop-blur-lg border-b border-black/5 shadow-[0_2px_16px_-4px_rgba(27,28,26,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo (Left) */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none shrink-0">
            {/* Tactile Organic Logo Glyph */}
            <div className="w-10 h-10 rounded-xl bg-[#1E281F] flex items-center justify-center shadow-md shadow-[#1E281F]/15 group-hover:scale-[1.03] transition-all duration-200">
              <svg className="w-5 h-5 text-[#FAF8F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h3.5l2.5-6 4 12 2.5-6H20" />
                <circle cx="12" cy="12" r="1.5" fill="#C87841" stroke="#C87841" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#1C1D1B] leading-none group-hover:text-[#1E281F] transition-colors">
                Project<span className="text-[#C87841]">Pulse</span>
              </span>
              <span className="text-[9.5px] font-mono tracking-widest text-[#72756E] uppercase font-semibold mt-1">
                SKILL-BASED COLLABORATION
              </span>
            </div>
          </Link>

          {/* Unified Elevated Navigation Capsule (Center) */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/70 border border-black/5 shadow-sm backdrop-blur-md text-sm font-medium text-[#454743]">
            <button
              onClick={() => scrollToSection('features')}
              className="px-4 py-2 rounded-full hover:bg-black/5 hover:text-stone-900 transition-all duration-200 cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('skill-matching')}
              className="px-4 py-2 rounded-full hover:bg-black/5 hover:text-stone-900 transition-all duration-200 cursor-pointer"
            >
              Skill Matching
            </button>
            <button
              onClick={() => scrollToSection('faculty')}
              className="px-4 py-2 rounded-full hover:bg-black/5 hover:text-stone-900 transition-all duration-200 cursor-pointer"
            >
              Faculty Portal
            </button>
            <Link
              to="/projects"
              className="px-4 py-2 rounded-full hover:bg-black/5 hover:text-stone-900 transition-all duration-200 flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-[#C87841]" />
              <span>Explore Projects</span>
            </Link>
          </nav>

          {/* Public Auth Controls (Right) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={
                    user?.role === 'leader'
                      ? '/leader/dashboard'
                      : user?.role === 'faculty'
                      ? '/faculty/dashboard'
                      : '/student/dashboard'
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 text-xs font-semibold text-[#1C1D1B] shadow-sm hover:border-[#1E281F]/40 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#1E281F]" />
                  <span>{user?.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#E7EDE5] text-[#1E281F] uppercase font-bold">
                    {user?.role}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-[#72756E] hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#454743] hover:text-stone-900 rounded-full hover:bg-black/5 transition-all duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#1E281F] hover:bg-[#151D16] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 group"
                >
                  <span>Get Started →</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
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
              className="p-2 rounded-xl text-[#454743] hover:text-stone-900 hover:bg-black/5 border border-black/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-[#FAF8F4]/98 backdrop-blur-xl px-5 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#454743]">
            <button
              onClick={() => scrollToSection('features')}
              className="text-left px-3.5 py-2 rounded-xl hover:bg-black/5 hover:text-stone-900 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('skill-matching')}
              className="text-left px-3.5 py-2 rounded-xl hover:bg-black/5 hover:text-stone-900 transition-colors"
            >
              Skill Matching
            </button>
            <button
              onClick={() => scrollToSection('faculty')}
              className="text-left px-3.5 py-2 rounded-xl hover:bg-black/5 hover:text-stone-900 transition-colors"
            >
              Faculty Portal
            </button>
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3.5 py-2 rounded-xl hover:bg-black/5 hover:text-stone-900 transition-colors flex items-center justify-between"
            >
              <span>Explore Projects</span>
              <Compass className="w-4 h-4 text-[#C87841]" />
            </Link>

            <div className="pt-3 border-t border-black/5 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <Link
                    to={
                      user?.role === 'leader'
                        ? '/leader/dashboard'
                        : user?.role === 'faculty'
                        ? '/faculty/dashboard'
                        : '/student/dashboard'
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full font-semibold bg-[#1E281F] text-white shadow-sm"
                  >
                    Go to Dashboard ({user?.role})
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 text-xs font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full font-medium text-[#1C1D1B] bg-white border border-black/10"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full font-semibold text-white bg-[#1E281F] shadow-sm"
                  >
                    Get Started →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
