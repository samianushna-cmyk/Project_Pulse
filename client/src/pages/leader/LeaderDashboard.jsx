import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';
import {
  FolderPlus,
  FolderGit2,
  LogOut,
  User,
  Building,
  Mail,
  Shield,
  CheckCircle,
  Crown,
  ArrowRight,
  Sparkles,
  Users,
  Tag
} from 'lucide-react';
import Button from '../../components/Button';

export default function LeaderDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [leaderProjects, setLeaderProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchLeaderProjects = async () => {
      try {
        const data = await getProjects();
        if (data.success && Array.isArray(data.projects)) {
          // Filter projects created by this leader
          const myProjects = data.projects.filter(
            (p) => p.leader?._id === user?._id || p.leader === user?._id
          );
          setLeaderProjects(myProjects);
        }
      } catch (err) {
        console.warn('Failed to fetch leader projects:', err.message);
      } finally {
        setLoadingProjects(false);
      }
    };

    if (user?._id) {
      fetchLeaderProjects();
    }
  }, [user?._id]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Main Workspace Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                Team Leader Workspace
              </span>
              <h1 className="text-2xl font-bold text-slate-900">ProjectPulse</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              to="/leader/projects/create"
              variant="primary"
              size="md"
              icon={FolderPlus}
              iconPosition="left"
              className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 shadow-sm shadow-purple-500/20"
            >
              Create Project
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
        <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-slate-50 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Welcome, <span className="text-purple-600">{user?.name}</span>!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              You are authenticated as a <strong>Team Leader</strong>. Create new initiatives, define required tech stacks, and recruit your capstone team.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              to="/leader/projects/create"
              variant="primary"
              size="sm"
              icon={FolderPlus}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create Project
            </Button>
            <Button
              to="/projects"
              variant="outline"
              size="sm"
              icon={FolderGit2}
              className="bg-white"
            >
              View Projects
            </Button>
          </div>
        </div>

        {/* Quick Summary Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Leadership Overview
            </h3>
            <Link
              to="/projects"
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              Browse All Projects <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Projects Created Metric */}
            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold">
                <FolderPlus className="w-3.5 h-3.5 text-purple-600" />
                <span>Projects Created</span>
              </div>
              <div className="font-extrabold text-2xl text-purple-900">
                {leaderProjects.length}
              </div>
            </div>

            {/* Department */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Building className="w-3.5 h-3.5 text-purple-500" />
                <span>Department</span>
              </div>
              <div className="font-semibold text-slate-800 text-sm truncate">
                {user?.department || 'Engineering'}
              </div>
            </div>

            {/* Assigned Role */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Shield className="w-3.5 h-3.5 text-purple-500" />
                <span>Assigned Role</span>
              </div>
              <div className="font-semibold text-purple-700 text-sm capitalize">
                {user?.role}
              </div>
            </div>

            {/* Email */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Mail className="w-3.5 h-3.5 text-purple-500" />
                <span>Institutional Email</span>
              </div>
              <div className="font-semibold text-slate-800 text-sm truncate">
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Leader's Recent Projects Quick List */}
        {leaderProjects.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Managed Projects ({leaderProjects.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {leaderProjects.slice(0, 4).map((proj) => (
                <Link
                  key={proj._id}
                  to={`/projects/${proj._id}`}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-200 hover:shadow-xs transition-all block group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      {proj.category}
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {proj.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors line-clamp-1">
                    {proj.title}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {proj.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between text-xs text-emerald-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Leader privileges active.</span>
          </div>
          <Link
            to="/projects"
            className="text-purple-600 hover:underline font-semibold"
          >
            Go to Project Directory &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
