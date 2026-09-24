import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, Sparkles } from 'lucide-react';
import Button from '../components/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-radial-grid">
      <div className="max-w-md w-full text-center space-y-6 bg-white/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-slate-200/90 shadow-card">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto shadow-xs">
          <Compass className="w-8 h-8 animate-pulse-subtle" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The workspace page or resource you are looking for doesn't exist or may have been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            to="/"
            variant="primary"
            size="md"
            icon={Home}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
          <Button
            to="/signup"
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
