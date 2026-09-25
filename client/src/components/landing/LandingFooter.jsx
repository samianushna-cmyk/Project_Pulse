import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Check } from 'lucide-react';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#141B15] text-[#D4DDD0] border-t border-white/10 text-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        {/* Main 4-Section Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* Column 1: Brand & Academic Mission (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#253227] border border-white/10 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-[#FAF8F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h3.5l2.5-6 4 12 2.5-6H20" />
                  <circle cx="12" cy="12" r="1.5" fill="#C87841" stroke="#C87841" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#FAF8F4]">
                Project<span className="text-[#C87841]">Pulse</span>
              </span>
            </Link>

            <p className="text-[#A3B899] text-sm leading-relaxed max-w-sm">
              Skill-Based Collaboration for Universities & Engineering Teams. Connecting student talent with explainable matching and verified proof logs.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#FAF8F4] bg-[#253227]/90 border border-white/10 px-3.5 py-1.5 rounded-full w-fit">
              <GraduationCap className="w-4 h-4 text-[#C87841]" />
              <span>Academic Engineering Platform</span>
            </div>
          </div>

          {/* Column 2: Platform Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-[#FAF8F4] font-semibold text-sm tracking-wide">Platform</h3>
            <ul className="space-y-2.5 text-xs text-[#A3B899]">
              <li>
                <a href="#features" className="hover:text-[#C87841] transition-colors">
                  Skill Matching
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#C87841] transition-colors">
                  5-Step Lifecycle
                </a>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#C87841] transition-colors">
                  Explore Projects
                </Link>
              </li>
              <li>
                <a href="#proof" className="hover:text-[#C87841] transition-colors">
                  Proof Verification
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Roles & Mentors (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-[#FAF8F4] font-semibold text-sm tracking-wide">Mentors & Faculty</h3>
            <ul className="space-y-2.5 text-xs text-[#A3B899]">
              <li>
                <a href="#roles" className="hover:text-[#C87841] transition-colors">
                  Student Portals
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-[#C87841] transition-colors">
                  Team Leader Tools
                </a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-[#C87841] transition-colors">
                  Faculty Guide Hub
                </a>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#C87841] transition-colors">
                  Institution Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated Newsletter Input (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-[#FAF8F4] font-semibold text-sm tracking-wide">Stay Updated</h3>
            <p className="text-[#A3B899] text-xs leading-relaxed">
              Get updates on university capstone workflows, proof verification algorithms, and platform releases.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="relative flex items-center max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your campus email..."
                  required
                  className="w-full px-4 py-2.5 rounded-full bg-[#253227] border border-white/10 text-xs text-[#FAF8F4] placeholder-[#A3B899]/60 focus:outline-none focus:border-[#C87841]/50 pr-12 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to updates"
                  className="absolute right-1.5 w-8 h-8 rounded-full bg-[#C87841] hover:bg-[#D97706] text-white flex items-center justify-center shadow-md transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-[#A3B899] mt-1.5 block">
                  ✓ Thank you for subscribing!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Legal & Status Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3B899]/80">
          <p>© {currentYear} ProjectPulse. All rights reserved. Built for modern student engineering workflows.</p>
          
          <div className="flex items-center gap-6">
            <span className="hover:text-[#C87841] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#C87841] transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-[#C87841] transition-colors cursor-pointer">Status</span>
            <span className="flex items-center gap-1.5 text-[#A3B899]">
              <span className="w-2 h-2 rounded-full bg-[#82957C] animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
