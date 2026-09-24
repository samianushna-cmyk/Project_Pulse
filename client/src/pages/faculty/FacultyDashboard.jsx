import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, LogOut, User, Building, Mail, Shield, CheckCircle, GraduationCap } from 'lucide-react';
import Button from '../../components/Button';

export default function FacultyDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-card space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-800/20">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Faculty Guide Workspace
              </span>
              <h1 className="text-2xl font-bold text-slate-900">ProjectPulse</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              to="/projects"
              variant="outline"
              size="md"
              className="bg-white border-slate-200"
            >
              View Projects
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
        <div className="p-6 rounded-xl bg-gradient-to-r from-slate-100 via-indigo-50 to-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Welcome, <span className="text-indigo-600">{user?.name}</span>!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              You are authenticated as a <strong>Faculty Guide / Mentor</strong>. Browse active student projects and team compositions.
            </p>
          </div>
          <Button
            to="/projects"
            variant="primary"
            size="sm"
            className="self-start sm:self-auto"
          >
            View Projects
          </Button>
        </div>

        {/* User Details Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <User className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Faculty Name</div>
              <div className="font-semibold text-slate-800">{user?.name}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Institutional Email</div>
              <div className="font-semibold text-slate-800">{user?.email}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <Shield className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Assigned Role</div>
              <div className="font-semibold text-slate-800 capitalize">{user?.role}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
            <Building className="w-5 h-5 text-indigo-500" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Department</div>
              <div className="font-semibold text-slate-800">{user?.department}</div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-emerald-600 font-medium">
          <CheckCircle className="w-4 h-4" />
          <span>Faculty evaluator permissions active.</span>
        </div>
      </div>
    </div>
  );
}
