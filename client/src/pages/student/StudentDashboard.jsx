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
  Building,
  Edit3,
  Sparkles,
  Briefcase,
  Clock,
  ArrowRight,
  Code2,
  FolderGit2,
  MailQuestion,
  ListTodo,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

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
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Partially Available':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Not Available':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Action / Alerts */}
      {actionMessage.text && (
        <div
          className={`p-5 rounded-3xl text-sm font-semibold border flex items-center justify-between shadow-sm animate-fade-in ${
            actionMessage.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {actionMessage.type === 'error' ? (
              <XCircle className="w-5 h-5 text-rose-600" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage({ type: '', text: '' })}
            className="hover:underline text-stone-600 font-bold cursor-pointer text-xs uppercase tracking-wider"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Surface Container (Bento Glass Card) */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/80 shadow-[0_15px_35px_rgba(30,40,31,0.05)] space-y-8">
        
        {/* Workspace Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-stone-200/70">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#1E281F] flex items-center justify-center shadow-lg shadow-[#1E281F]/20">
              <svg className="w-6 h-6 text-[#FAF8F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h3.5l2.5-6 4 12 2.5-6H20" />
                <circle cx="12" cy="12" r="1.8" fill="#C87841" stroke="#C87841" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest text-[#4A5A48] uppercase block">
                STUDENT WORKSPACE
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C1D1B] tracking-tight">ProjectPulse</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-full bg-[#1E281F] hover:bg-[#2B3A2C] text-white text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-[#C87841]" />
            </Link>
            
            <Link
              to="/student/profile"
              className="px-6 py-3 rounded-full bg-[#C87841] hover:bg-[#B46733] text-white text-sm font-bold shadow-md shadow-[#C87841]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-full border border-stone-300/80 hover:bg-stone-100/80 text-stone-700 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer hover:border-stone-400"
              title="Log out"
            >
              <LogOut className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>

        {/* Welcome Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-stone-200/80 shadow-[0_10px_30px_rgba(28,29,27,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1D1B]">
              Welcome back, <span className="text-[#C87841]">{currentUser?.name}</span>!
            </h2>
            <p className="text-base md:text-lg text-[#525850] font-normal leading-relaxed">
              Your developer skill profile is active. Browse open capstone projects, manage team invitations, and track assigned tasks.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-full bg-[#1E281F] hover:bg-[#2B3A2C] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-[#C87841]" />
            </Link>
          </div>
        </div>

        {/* Elevated Stat Metric Cards (Bento Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Skills Listed */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(45,69,46,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">Skills Listed</span>
              <div className="w-11 h-11 rounded-2xl bg-[#EAF2E8] text-[#345236] flex items-center justify-center ring-1 ring-[#D5E3D2]">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#1C1D1B] tracking-tight">{skillsCount}</div>
          </div>

          {/* Card 2: Pending Invitations */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(200,120,65,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">Pending Invites</span>
              <div className="w-11 h-11 rounded-2xl bg-[#FBECE3] text-[#C87841] flex items-center justify-center ring-1 ring-[#F3D7C5]">
                <MailQuestion className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#C87841] tracking-tight">
              {pendingInvitations.length}
            </div>
          </div>

          {/* Card 3: Joined Projects */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(143,94,22,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">Joined Projects</span>
              <div className="w-11 h-11 rounded-2xl bg-[#F9F1E2] text-[#8F5E16] flex items-center justify-center ring-1 ring-[#EEDCC1]">
                <FolderGit2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#1C1D1B] tracking-tight">{joinedProjects.length}</div>
          </div>

          {/* Card 4: Assigned Tasks */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(29,74,39,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">Assigned Tasks</span>
              <div className="w-11 h-11 rounded-2xl bg-[#E2EDE5] text-[#1D4A27] flex items-center justify-center ring-1 ring-[#CADCCF]">
                <ListTodo className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-black text-[#1D4A27] tracking-tight truncate">
              {completedTasksCount} / {myTasks.length} Done
            </div>
          </div>
        </div>

        {/* Pending Team Invitations Section */}
        {pendingInvitations.length > 0 && (
          <div className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#C87841] flex items-center gap-2">
                <MailQuestion className="w-4 h-4 text-[#C87841]" />
                Pending Team Invitations ({pendingInvitations.length})
              </h3>
            </div>

            <div className="space-y-3">
              {pendingInvitations.map((inv) => (
                <div
                  key={inv._id}
                  className="p-5 rounded-2xl bg-[#FAF8F4]/80 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-[#1C1D1B] text-base">
                      {inv.project?.title || 'Capstone Project'}
                    </div>
                    <div className="text-xs sm:text-sm text-[#60685D]">
                      Invited by <strong className="text-[#1C1D1B]">{inv.sender?.name}</strong> ({inv.sender?.department}) •{' '}
                      {formatDate(inv.createdAt)}
                    </div>
                    {inv.message && (
                      <div className="text-xs sm:text-sm text-[#525850] italic pt-0.5">"{inv.message}"</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
                    <button
                      onClick={() => handleAcceptInvite(inv._id)}
                      className="px-5 py-2 rounded-full text-xs font-bold bg-[#1E281F] text-white hover:bg-[#2B3A2C] transition-all shadow-xs cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectInvite(inv._id)}
                      className="px-5 py-2 rounded-full text-xs font-bold bg-stone-200/70 text-stone-700 hover:bg-stone-300/70 transition-all cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs Container */}
        <div className="space-y-6">
          <div className="bg-stone-200/60 backdrop-blur-md p-1.5 rounded-2xl inline-flex gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#1E281F] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
              }`}
            >
              Profile & Skills
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[#1E281F] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
              }`}
            >
              My Projects ({joinedProjects.length})
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-[#1E281F] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
              }`}
            >
              Assigned Tasks ({myTasks.length})
            </button>
          </div>

          {/* Tab 1: Profile & Skills Overview Bento */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Field 1: Department */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/70 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#4A5A48] font-semibold text-sm">
                    <Building className="w-4 h-4 text-[#4A5A48]" />
                    <span className="text-base font-bold text-[#2A3128]">Academic Department</span>
                  </div>
                  <div className="font-medium text-[#1C1D1B] text-base md:text-lg pt-1">
                    {currentUser?.department || 'Computer Science & Engineering'}
                  </div>
                </div>

                {/* Field 2: Availability */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/70 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#4A5A48] font-semibold text-sm">
                    <Clock className="w-4 h-4 text-[#4A5A48]" />
                    <span className="text-base font-bold text-[#2A3128]">Availability Status</span>
                  </div>
                  <div className="pt-1">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${
                        availability === 'Available'
                          ? 'bg-[#EAF2E8] text-[#28522A] border-[#28522A]/20'
                          : availability === 'Partially Available'
                          ? 'bg-[#F9F1E2] text-[#8F5E16] border-[#8F5E16]/20'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {availability}
                    </span>
                  </div>
                </div>

                {/* Field 3: Preferred Roles */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/70 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#4A5A48] font-semibold text-sm">
                    <Briefcase className="w-4 h-4 text-[#4A5A48]" />
                    <span className="text-base font-bold text-[#2A3128]">Preferred Roles</span>
                  </div>
                  <div className="font-medium text-[#1C1D1B] text-base md:text-lg pt-1 truncate">
                    {preferredRoles.length > 0 ? preferredRoles.join(', ') : 'Full Stack Developer, ML Engineer'}
                  </div>
                </div>
              </div>

              {/* Technical Skills Bento Card */}
              {skillsCount > 0 ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/70 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-[#1C1D1B] flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[#4A5A48]" />
                      Technical Skills ({skillsCount})
                    </span>
                    <Link to="/student/profile" className="text-sm font-bold text-[#C87841] hover:text-[#B46733] transition-colors">
                      Manage Skills &rarr;
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {currentUser.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-[#F4EFEB] hover:bg-[#EAE4DC] border border-stone-300 text-[#1C1D1B] font-semibold text-sm px-4 py-2 rounded-xl transition-all shadow-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-10 rounded-3xl border border-dashed border-stone-300 text-center space-y-3 bg-white/50">
                  <Sparkles className="w-9 h-9 text-stone-400 mx-auto" />
                  <p className="text-sm font-bold text-stone-700">No skills added yet</p>
                  <p className="text-xs text-stone-500">Add your programming languages, frameworks, and tools to get matched with projects.</p>
                  <Link
                    to="/student/profile"
                    className="inline-block px-6 py-2.5 rounded-full bg-[#1E281F] text-white text-xs font-bold hover:bg-[#2B3A2C] transition-all shadow-sm"
                  >
                    Add Your Skills
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: My Joined Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4 animate-fadeIn">
              {joinedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {joinedProjects.map((proj) => (
                    <Link
                      key={proj._id}
                      to={`/projects/${proj._id}`}
                      className="p-6 rounded-3xl border border-stone-200/80 bg-white/90 hover:border-stone-400 hover:shadow-lg transition-all block group space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#2D452E] bg-[#EAF2E8] px-3 py-1 rounded-full border border-[#D1E3CE]">
                          {proj.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {proj.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#1C1D1B] text-lg group-hover:text-[#C87841] transition-colors line-clamp-1">
                          {proj.title}
                        </h4>
                        <p className="text-sm text-[#60685D] mt-1.5 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-[#60685D]">
                        <span>Leader: <strong className="text-[#1C1D1B]">{proj.leader?.name}</strong></span>
                        <span className="text-[#C87841] font-bold group-hover:underline flex items-center gap-1">
                          Open Workspace &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-10 rounded-3xl border border-dashed border-stone-300 text-center space-y-3 bg-white/50">
                  <FolderGit2 className="w-10 h-10 text-stone-400 mx-auto" />
                  <p className="text-sm font-bold text-stone-700">You haven't joined any projects yet</p>
                  <p className="text-xs text-stone-500">
                    Browse open projects and check your skill match compatibility.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/projects"
                      className="inline-block px-6 py-2.5 rounded-full bg-[#1E281F] text-white text-xs font-bold hover:bg-[#2B3A2C] transition-all shadow-sm"
                    >
                      Explore Projects
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Assigned Tasks */}
          {activeTab === 'tasks' && (
            <div className="space-y-4 animate-fadeIn">
              {myTasks.length > 0 ? (
                <div className="space-y-3">
                  {myTasks.map((t) => (
                    <div
                      key={t._id}
                      className="p-5 rounded-2xl border border-stone-200/80 bg-white/90 hover:border-stone-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div>
                        <div className="font-bold text-[#1C1D1B] text-base">{t.title}</div>
                        <div className="text-xs sm:text-sm text-[#60685D] mt-1">
                          Project: <strong className="text-[#1C1D1B]">{t.project?.title || 'Team Task'}</strong> • Deadline: {formatDate(t.deadline)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          t.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : t.status === 'In Progress'
                            ? 'bg-[#F9F1E2] text-[#8F5E16] border-[#8F5E16]/20'
                            : 'bg-stone-100 text-stone-700 border-stone-200'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 rounded-3xl border border-dashed border-stone-300 text-center space-y-2 bg-white/50">
                  <ListTodo className="w-10 h-10 text-stone-400 mx-auto" />
                  <p className="text-sm font-bold text-stone-700">No assigned tasks right now</p>
                  <p className="text-xs text-stone-500">
                    When team leaders assign you milestones or sprint tasks, they will appear here.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
