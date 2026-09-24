import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';
import { getInvitations } from '../../services/collaborationService';
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
  Tag,
  ListTodo,
  MailQuestion,
  Loader2,
  Clock,
  Plus
} from 'lucide-react';
import Button from '../../components/Button';

export default function LeaderDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [leaderProjects, setLeaderProjects] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, invRes] = await Promise.all([
          getProjects(),
          getInvitations(),
        ]);

        if (projRes.success && Array.isArray(projRes.projects)) {
          const myProjects = projRes.projects.filter(
            (p) => p.leader?._id === user?._id || p.leader === user?._id
          );
          setLeaderProjects(myProjects);
        }

        if (invRes.success && Array.isArray(invRes.invitations)) {
          setInvitations(invRes.invitations);
        }
      } catch (err) {
        console.warn('Failed to load leader dashboard data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchData();
    }
  }, [user?._id]);

  // Aggregate metrics
  const activeProjectsCount = leaderProjects.filter((p) => p.status !== 'Completed').length;
  const totalRecruitedMembers = leaderProjects.reduce((acc, p) => {
    return acc + (Array.isArray(p.members) ? p.members.length : 0);
  }, 0);
  const pendingInvitesCount = invitations.filter((i) => i.status === 'Pending').length;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
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

          <div className="flex items-center gap-2.5">
            <Button
              to="/leader/projects/create"
              variant="primary"
              size="md"
              icon={FolderPlus}
              iconPosition="left"
              className="bg-purple-600 hover:bg-purple-700 shadow-sm shadow-purple-500/20"
            >
              Create Project
            </Button>
            <Button
              to="/projects"
              variant="outline"
              size="md"
              className="bg-white border-slate-200"
            >
              All Projects
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
              Welcome back, <span className="text-purple-600">{user?.name}</span>!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Manage your capstone projects, invite skilled developers, assign milestones, and coordinate deliverables.
            </p>
          </div>
          <Button
            to="/leader/projects/create"
            variant="primary"
            size="sm"
            icon={Plus}
            iconPosition="left"
            className="bg-purple-600 hover:bg-purple-700 self-start sm:self-auto shrink-0"
          >
            Create New Project
          </Button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold">
              <FolderPlus className="w-3.5 h-3.5 text-purple-600" />
              <span>Projects Created</span>
            </div>
            <div className="font-extrabold text-2xl text-purple-900">{leaderProjects.length}</div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Team Members</span>
            </div>
            <div className="font-extrabold text-2xl text-indigo-900">{totalRecruitedMembers}</div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
              <MailQuestion className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending Invites</span>
            </div>
            <div className="font-extrabold text-2xl text-amber-900">{pendingInvitesCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active Projects</span>
            </div>
            <div className="font-extrabold text-2xl text-emerald-900">{activeProjectsCount}</div>
          </div>
        </div>

        {/* Managed Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Your Managed Projects ({leaderProjects.length})
            </h3>
            <Link
              to="/leader/projects/create"
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              Create Project <Plus className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              <span>Loading your projects...</span>
            </div>
          ) : leaderProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leaderProjects.map((proj) => {
                const teamSize = 1 + (proj.members?.length || 0);
                return (
                  <Link
                    key={proj._id}
                    to={`/projects/${proj._id}`}
                    className="p-5 rounded-xl border border-slate-200/90 bg-white hover:border-purple-300 hover:shadow-xs transition-all block group space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {teamSize} / {proj.maxTeamSize} Members
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {proj.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base group-hover:text-purple-600 transition-colors line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.requiredSkills?.slice(0, 3).map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                      {proj.requiredSkills?.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{proj.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Created {formatDate(proj.createdAt)}</span>
                      <span className="text-purple-600 font-semibold group-hover:underline flex items-center gap-1">
                        Manage Workspace &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-3">
              <FolderPlus className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">No projects created yet</p>
              <Button
                to="/leader/projects/create"
                variant="primary"
                size="sm"
                icon={Plus}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Create Your First Capstone Project
              </Button>
            </div>
          )}
        </div>

        {/* Sent Invitations Status */}
        {invitations.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recent Sent Invitations ({invitations.length})
            </h3>
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden text-xs">
              {invitations.slice(0, 5).map((inv) => (
                <div key={inv._id} className="p-3.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">
                      {inv.recipient?.name} ({inv.recipient?.email})
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Project: <strong>{inv.project?.title || 'Capstone'}</strong> • Sent{' '}
                      {formatDate(inv.createdAt)}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === 'Accepted'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : inv.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
