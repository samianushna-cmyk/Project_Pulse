import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { getProjects } from '../../services/projectService';
import {
  getInvitations,
  acceptInvitation,
  rejectInvitation,
  getMyTasks,
} from '../../services/collaborationService';
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
  Code2,
  FolderGit2,
  MailQuestion,
  ListTodo,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Tag,
  Users,
  Check
} from 'lucide-react';
import Button from '../../components/Button';

export default function StudentDashboard() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const [loadingInvites, setLoadingInvites] = useState(true);
  const [myTasks, setMyTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch student profile
  const fetchProfile = async () => {
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

  // Fetch invitations
  const fetchInvitations = async () => {
    setLoadingInvites(true);
    try {
      const data = await getInvitations();
      if (data.success) {
        setInvitations(data.invitations);
      }
    } catch (err) {
      console.warn('Failed to fetch invitations:', err.message);
    } finally {
      setLoadingInvites(false);
    }
  };

  // Fetch assigned tasks
  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const data = await getMyTasks();
      if (data.success) {
        setMyTasks(data.tasks);
      }
    } catch (err) {
      console.warn('Failed to fetch tasks:', err.message);
    } finally {
      setLoadingTasks(false);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await getProjects();
      if (data.success) {
        setAllProjects(data.projects);
      }
    } catch (err) {
      console.warn('Failed to fetch projects:', err.message);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchInvitations();
    fetchTasks();
    fetchProjects();
  }, []);

  // Invitation handlers
  const handleAcceptInvite = async (inviteId) => {
    try {
      const data = await acceptInvitation(inviteId);
      if (data.success) {
        setActionMessage({ type: 'success', text: 'Invitation accepted! You joined the team.' });
        fetchInvitations();
        fetchProjects();
      }
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to accept invitation',
      });
    }
  };

  const handleRejectInvite = async (inviteId) => {
    try {
      const data = await rejectInvitation(inviteId);
      if (data.success) {
        setActionMessage({ type: 'success', text: 'Invitation declined.' });
        fetchInvitations();
      }
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to decline invitation',
      });
    }
  };

  const currentUser = profileData || user;
  const skillsCount = currentUser?.skills?.length || 0;
  const preferredRoles = currentUser?.preferredRoles || [];
  const availability = currentUser?.availability || 'Available';

  const pendingInvitations = invitations.filter((i) => i.status === 'Pending');
  const joinedProjects = allProjects.filter((p) => {
    const isMem =
      Array.isArray(p.members) &&
      p.members.some((m) => (m._id ? m._id === user?._id : m === user?._id));
    return isMem;
  });

  const completedTasksCount = myTasks.filter((t) => t.status === 'Completed').length;

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
      {/* Top Action / Alerts */}
      {actionMessage.text && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold border flex items-center justify-between ${
            actionMessage.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === 'error' ? (
              <XCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage({ type: '', text: '' })}
            className="hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Header Card */}
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

          <div className="flex items-center gap-2.5">
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
              Edit Profile
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
              Welcome back, <span className="text-indigo-600">{currentUser?.name}</span>!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Your developer skill profile is active. Browse open capstone projects, manage team invitations, and track assigned tasks.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <Button to="/projects" variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Explore Projects
            </Button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Skills Count */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skills Listed</span>
            </div>
            <div className="text-2xl font-black text-indigo-900">{skillsCount}</div>
          </div>

          {/* Pending Invitations */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
              <MailQuestion className="w-3.5 h-3.5" />
              <span>Pending Invites</span>
            </div>
            <div className="text-2xl font-black text-amber-900">
              {pendingInvitations.length}
            </div>
          </div>

          {/* Joined Teams */}
          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Joined Projects</span>
            </div>
            <div className="text-2xl font-black text-purple-900">{joinedProjects.length}</div>
          </div>

          {/* Assigned Tasks */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <ListTodo className="w-3.5 h-3.5" />
              <span>Assigned Tasks</span>
            </div>
            <div className="text-2xl font-black text-emerald-900">
              {completedTasksCount} / {myTasks.length} Done
            </div>
          </div>
        </div>

        {/* Pending Team Invitations Section */}
        {pendingInvitations.length > 0 && (
          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <MailQuestion className="w-4 h-4 text-amber-600" />
                Pending Team Invitations ({pendingInvitations.length})
              </h3>
            </div>

            <div className="space-y-2.5">
              {pendingInvitations.map((inv) => (
                <div
                  key={inv._id}
                  className="p-4 rounded-xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm">
                      {inv.project?.title || 'Capstone Project'}
                    </div>
                    <div className="text-xs text-slate-500">
                      Invited by <strong>{inv.sender?.name}</strong> ({inv.sender?.department}) •{' '}
                      {formatDate(inv.createdAt)}
                    </div>
                    {inv.message && (
                      <div className="text-xs text-slate-600 italic">"{inv.message}"</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      onClick={() => handleAcceptInvite(inv._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectInvite(inv._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs for Workspace sections */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Profile & Skills
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            My Projects ({joinedProjects.length})
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tasks'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Assigned Tasks ({myTasks.length})
          </button>
        </div>

        {/* Tab 1: Profile & Skills Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Building className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Academic Department</span>
                </div>
                <div className="font-bold text-slate-800 text-sm">
                  {currentUser?.department || 'Not specified'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Availability Status</span>
                </div>
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${getAvailabilityClass(
                      availability
                    )}`}
                  >
                    {availability}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Preferred Roles</span>
                </div>
                <div className="font-bold text-slate-800 text-sm truncate">
                  {preferredRoles.length > 0 ? preferredRoles.join(', ') : 'None selected'}
                </div>
              </div>
            </div>

            {skillsCount > 0 ? (
              <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-900">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    Your Technical Skills ({skillsCount})
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
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No skills added yet</p>
                <Button to="/student/profile" variant="primary" size="sm">
                  Add Your Skills
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: My Joined Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4 animate-fadeIn">
            {joinedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {joinedProjects.map((proj) => (
                  <Link
                    key={proj._id}
                    to={`/projects/${proj._id}`}
                    className="p-5 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs transition-all block group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        {proj.category}
                      </span>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {proj.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Leader: {proj.leader?.name}</span>
                      <span className="text-indigo-600 font-semibold group-hover:underline">
                        Open Workspace &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">You haven't joined any projects yet</p>
                <p className="text-xs text-slate-400">
                  Browse open projects and check your skill match compatibility.
                </p>
                <div className="pt-2">
                  <Button to="/projects" variant="primary" size="sm">
                    Explore Projects
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Assigned Tasks */}
        {activeTab === 'tasks' && (
          <div className="space-y-4 animate-fadeIn">
            {myTasks.length > 0 ? (
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
                {myTasks.map((t) => (
                  <div
                    key={t._id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{t.title}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            t.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : t.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>
                      <div className="text-slate-500">
                        Project: <strong>{t.project?.title || 'Capstone Project'}</strong> • Priority:{' '}
                        {t.priority} {t.dueDate && `• Due: ${formatDate(t.dueDate)}`}
                      </div>
                    </div>

                    <Link
                      to={`/projects/${t.project?._id || t.project}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors self-start sm:self-auto shrink-0"
                    >
                      View in Project
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                <ListTodo className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No tasks currently assigned</p>
                <p className="text-xs text-slate-400">
                  When project leaders assign tasks to you, they will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
