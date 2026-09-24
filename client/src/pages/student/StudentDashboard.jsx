import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Activity,
  LogOut,
  User,
  Building,
  Mail,
  Shield,
  CheckCircle,
  Edit3,
  Sparkles,
  Briefcase,
  Clock,
  Github,
  Globe,
  ArrowRight,
  Code2
} from 'lucide-react';
import Button from '../../components/Button';

export default function StudentDashboard() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        if (data.success && data.user) {
          setProfileData(data.user);
          updateUser(data.user);
        }
      } catch (err) {
        console.warn('Failed to fetch profile overview:', err.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchLatestProfile();
  }, []);

  const currentUser = profileData || user;
  const skillsCount = currentUser?.skills?.length || 0;
  const preferredRoles = currentUser?.preferredRoles || [];
  const availability = currentUser?.availability || 'Available';

  const getAvailabilityClass = (avail) => {
    switch (avail) {
      case 'Available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Partially Available':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Not Available':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Student Workspace
              </span>
              <h1 className="text-2xl font-bold text-slate-900">ProjectPulse</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              to="/projects"
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-white border-slate-200"
            >
              Explore Projects
            </Button>
            <Button
              to="/student/profile"
              variant="primary"
              size="md"
              icon={Edit3}
              iconPosition="left"
              className="shadow-sm shadow-indigo-500/20"
            >
              View / Edit Profile
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={LogOut}
              iconPosition="left"
              onClick={handleLogout}
              className="text-rose-600 hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50"
            >
              Log Out
            </Button>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Welcome, <span className="text-indigo-600">{currentUser?.name}</span>!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Your developer skill profile is active. Browse available capstone projects or manage your skills.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              to="/projects"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore Projects
            </Button>
            <Button
              to="/student/profile"
              variant="outline"
              size="sm"
              icon={Edit3}
              className="bg-white"
            >
              Manage Skills
            </Button>
          </div>
        </div>

        {/* Profile Summary Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Profile Summary
            </h3>
            <Link
              to="/student/profile"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              Edit Profile <Edit3 className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Department */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Building className="w-3.5 h-3.5 text-indigo-500" />
                <span>Department</span>
              </div>
              <div className="font-semibold text-slate-800 text-sm truncate">
                {currentUser?.department || 'Not specified'}
              </div>
            </div>

            {/* Skills Count */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Technical Skills</span>
              </div>
              <div className="font-semibold text-slate-800 text-sm">
                {skillsCount} {skillsCount === 1 ? 'skill added' : 'skills added'}
              </div>
            </div>

            {/* Availability */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Availability</span>
              </div>
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${getAvailabilityClass(availability)}`}>
                  {availability}
                </span>
              </div>
            </div>

            {/* Role Preferences */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                <span>Preferred Roles</span>
              </div>
              <div className="font-semibold text-slate-800 text-sm truncate">
                {preferredRoles.length > 0 ? preferredRoles.join(', ') : 'None selected'}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Chips Preview */}
        {skillsCount > 0 && (
          <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-900">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-600" />
                Your Active Skill Tags
              </span>
              <Link to="/student/profile" className="text-indigo-600 hover:underline">
                Manage
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {currentUser.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-white text-indigo-700 border border-indigo-200 shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links Preview */}
        {(currentUser?.githubUrl || currentUser?.portfolioUrl) && (
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            {currentUser?.githubUrl && (
              <a
                href={currentUser.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
            )}
            {currentUser?.portfolioUrl && (
              <a
                href={currentUser.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 font-medium transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Portfolio Website</span>
              </a>
            )}
          </div>
        )}

        <div className="pt-2 flex items-center gap-2 text-xs text-emerald-600 font-medium">
          <CheckCircle className="w-4 h-4" />
          <span>Student profile synced with MongoDB Atlas.</span>
        </div>
      </div>
    </div>
  );
}
