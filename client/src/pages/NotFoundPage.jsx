import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-[0_10px_30px_rgba(28,29,27,0.04)]">
        <div className="w-16 h-16 rounded-2xl bg-[#FBECE3] border border-[#C87841]/20 flex items-center justify-center text-[#C87841] mx-auto shadow-xs">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#C87841] uppercase">
            Error 404
          </span>
          <h1 className="text-3xl font-bold text-[#1C1D1B] tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-[#525850] leading-relaxed">
            The workspace page or resource you are looking for doesn't exist or may have been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#C87841]" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
