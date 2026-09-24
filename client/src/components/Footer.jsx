import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github, Linkedin, Twitter, CheckCircle2, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Project<span className="text-indigo-400">Pulse</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering higher education with skill-based team formation, accountable task execution, verifiable contribution logs, and transparent faculty mentoring.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1.5 rounded-md">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Academic Collaboration Platform</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Skill Matching
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Team Formation
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Task Boards
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Proof Verification
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Faculty Dashboards
                </a>
              </li>
            </ul>
          </div>

          {/* Roles */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">For Academic Roles</h3>
            <ul className="space-y-2">
              <li>
                <a href="#roles" className="hover:text-white transition-colors">
                  Students
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-white transition-colors">
                  Team Leaders
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-white transition-colors">
                  Faculty Guides / Mentors
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Create Student Account
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Register as Faculty
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} ProjectPulse. All rights reserved. Built for modern student engineering & project workflows.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
