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
  Plus,
  AlertCircle,
  Eye,
  CheckSquare,
  Cpu,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Compass,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import Button from '../../components/Button';

export default function LeaderDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [leaderProjects, setLeaderProjects] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userId = user?._id || user?.id;

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch projects and invitations gracefully
      const projPromise = getProjects().catch((err) => {
        console.warn('Projects fetch failed:', err);
        return { success: false, error: err.response?.data?.message || err.message };
      });
      const invPromise = getInvitations().catch((err) => {
        console.warn('Invitations fetch failed:', err);
        return { success: false, error: err.message };
      });

      const [projRes, invRes] = await Promise.all([projPromise, invPromise]);

      if (projRes.success && Array.isArray(projRes.projects)) {
        const myProjects = projRes.projects.filter((p) => {
          const leaderId = p.leader?._id || p.leader?.id || p.leader;
          return (
            (leaderId && userId && leaderId.toString() === userId.toString()) ||
            (p.leader && p.leader.email && user?.email && p.leader.email === user.email)
          );
        });
        setLeaderProjects(myProjects);
      } else if (!projRes.success) {
        setError(projRes.error || 'Unable to load projects.');
      }

      if (invRes.success && Array.isArray(invRes.invitations)) {
        setInvitations(invRes.invitations);
      }
    } catch (err) {
      console.error('Failed to load leader dashboard data:', err);
      setError(err.response?.data?.message || err.message || 'Unable to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    } else {
      // If user is loaded from session without immediate id
      const timeout = setTimeout(() => {
        if (!userId) setLoading(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [userId, user?.email]);

  // Aggregate metrics
  const activeProjectsCount = leaderProjects.filter((p) => p.status !== 'Completed').length;
  const completedProjectsCount = leaderProjects.filter((p) => p.status === 'Completed').length;
  const totalRecruitedMembers = leaderProjects.reduce((acc, p) => {
    return acc + (Array.isArray(p.members) ? p.members.length : 0);
  }, 0);
  const pendingInvitesCount = invitations.filter((i) => i.status === 'Pending').length;
  const acceptedInvitesCount = invitations.filter((i) => i.status === 'Accepted').length;

  const formatNumber = (num) => String(num || 0).padStart(2, '0');

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Build Recent Activity Feed dynamically from real data
  const activityList = [
    ...leaderProjects.slice(0, 3).map((p) => ({
      id: `proj-${p._id}`,
      type: 'project_created',
      title: `Created project "${p.title}"`,
      subtitle: `Squad capacity: ${p.maxTeamSize} members • ${p.category}`,
      date: formatDate(p.createdAt),
      highlight: true,
    })),
    ...invitations.slice(0, 3).map((inv) => ({
      id: `inv-${inv._id}`,
      type: 'invitation',
      title: `Invitation ${inv.status.toLowerCase()} by ${inv.recipient?.name || inv.recipient?.email || 'Candidate'}`,
      subtitle: `Project: ${inv.project?.title || 'Capstone Project'}`,
      date: formatDate(inv.createdAt),
      highlight: inv.status === 'Accepted',
    })),
  ];

  // Calculate team progress percentage
  const totalCapacity = leaderProjects.reduce((acc, p) => acc + (p.maxTeamSize || 4), 0);
  const teamFillPercentage = totalCapacity > 0 
    ? Math.min(100, Math.round(((totalRecruitedMembers + leaderProjects.length) / totalCapacity) * 100))
    : 75;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* ======================================================== */}
      {/* 1. DISTINCTIVE EDITORIAL HERO / WELCOME SECTION          */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-white/85 backdrop-blur-xl border border-stone-200/80 shadow-[0_12px_36px_rgba(28,29,27,0.04)] p-6 sm:p-10 overflow-hidden">
        
        {/* Subtle Ambient Studio Lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF3EE] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-70" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EAF2E8] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 opacity-60" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Headline & Welcome Narrative */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EFEB] border border-black/5 text-xs font-mono font-semibold text-[#4A5A48]">
              <span className="w-2 h-2 rounded-full bg-[#1E281F] animate-pulse" />
              <span>TEAM LEADER WORKSPACE</span>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-mono tracking-widest text-[#72756E] uppercase font-bold">
                WELCOME BACK,
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1D1B] tracking-tight">
                {user?.name || 'Team Leader'}<span className="text-[#C87841]">!</span>
              </h1>
              {/* Burnt-Orange Decorative Line */}
              <div className="w-14 h-1 bg-[#C87841] rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-[#525850] max-w-xl leading-relaxed font-normal pt-1">
              Manage your projects, collaborate with your team, and build something meaningful. Match verified developer skills, enforce milestone proofs, and prepare deliverables for faculty review.
            </p>

            {/* Quick Hero Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                to="/leader/projects/create"
                className="px-6 py-3 rounded-full bg-[#1E281F] hover:bg-[#2B3A2C] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#C87841]" />
                <span>Create Project</span>
              </Link>
              <Link
                to="/projects"
                className="px-6 py-3 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-[#C87841]" />
              </Link>
            </div>
          </div>

          {/* Right: Landing Page Geometric Composition Motif */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-3xl bg-[#FAF8F4] border border-stone-200/80 shadow-tactile relative space-y-4">
              
              {/* Top Bar of Graphic */}
              <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1E281F]" />
                  <div className="w-3 h-3 rounded-full bg-[#C87841]" />
                  <div className="w-3 h-3 rounded-full bg-[#D4A054]" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#72756E] bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                  PROJECT BENCHMARKS
                </span>
              </div>

              {/* Geometric Composition Blocks */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-[#1E281F] text-white space-y-1">
                  <div className="text-[10px] font-mono opacity-70">CAPACITY</div>
                  <div className="text-xl font-black">{totalCapacity || 8}</div>
                  <div className="text-[9px] text-[#D4A054] font-medium">Slots Total</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF3EE] border border-[#C87841]/20 space-y-1">
                  <div className="text-[10px] font-mono text-[#C87841]">MATCHED</div>
                  <div className="text-xl font-black text-[#1C1D1B]">98%</div>
                  <div className="text-[9px] text-[#C87841] font-semibold">Stack Fit</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#EAF2E8] border border-[#2D452E]/15 space-y-1">
                  <div className="text-[10px] font-mono text-[#2D452E]">VERIFIED</div>
                  <div className="text-xl font-black text-[#2D452E]">100%</div>
                  <div className="text-[9px] text-[#2D452E] font-semibold">Faculty Ready</div>
                </div>
              </div>

              {/* Mini Skill Pill Row */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#1E281F] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    L
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#C87841] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    T
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#EAF2E8] text-[#2D452E] text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    +3
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#72756E]">
                  {leaderProjects.length} Active {leaderProjects.length === 1 ? 'Initiative' : 'Initiatives'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Error State if API Fails */}
      {error && (
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3 text-rose-800 text-sm font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>Unable to load projects. {error}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-1.5 bg-white border border-rose-200 rounded-xl text-rose-700 font-bold hover:bg-rose-100 transition-colors cursor-pointer text-xs"
          >
            Retry
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. COHESIVE STATISTICS CARDS (ONE ACCENT EACH)           */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Projects Created (Accent: Forest Green) */}
        <div className="bg-white/90 rounded-3xl p-6 border border-stone-200/80 shadow-[0_8px_24px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60685D]">
              PROJECTS CREATED
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#E7EDE5] text-[#1E281F] flex items-center justify-center ring-1 ring-[#CADCCF]">
              <FolderPlus className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-4xl font-black text-[#1C1D1B] tracking-tight">
              {formatNumber(leaderProjects.length)}
            </div>
            <span className="text-xs font-semibold text-[#1E281F] bg-[#E7EDE5] px-2.5 py-0.5 rounded-full">
              Leading
            </span>
          </div>
        </div>

        {/* Card 2: Team Members (Accent: Sage Green) */}
        <div className="bg-white/90 rounded-3xl p-6 border border-stone-200/80 shadow-[0_8px_24px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60685D]">
              TEAM MEMBERS
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#EAF2E8] text-[#2D452E] flex items-center justify-center ring-1 ring-[#D5E3D2]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-4xl font-black text-[#1C1D1B] tracking-tight">
              {formatNumber(totalRecruitedMembers)}
            </div>
            <span className="text-xs font-semibold text-[#2D452E] bg-[#EAF2E8] px-2.5 py-0.5 rounded-full">
              Recruited
            </span>
          </div>
        </div>

        {/* Card 3: Pending Invitations (Accent: Burnt Orange) */}
        <div className="bg-white/90 rounded-3xl p-6 border border-stone-200/80 shadow-[0_8px_24px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60685D]">
              PENDING INVITES
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#FAF3EE] text-[#C87841] flex items-center justify-center ring-1 ring-[#F3D7C5]">
              <MailQuestion className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-4xl font-black text-[#C87841] tracking-tight">
              {formatNumber(pendingInvitesCount)}
            </div>
            <span className="text-xs font-semibold text-[#C87841] bg-[#FAF3EE] px-2.5 py-0.5 rounded-full">
              Awaiting
            </span>
          </div>
        </div>

        {/* Card 4: Active Projects (Accent: Forest Green + Gold status indicator) */}
        <div className="bg-white/90 rounded-3xl p-6 border border-stone-200/80 shadow-[0_8px_24px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60685D]">
              ACTIVE PROJECTS
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#F9F1E2] text-[#8F5E16] flex items-center justify-center ring-1 ring-[#EEDCC1]">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-4xl font-black text-[#1C1D1B] tracking-tight">
              {formatNumber(activeProjectsCount)}
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8F5E16] bg-[#F9F1E2] px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A054] animate-ping" />
              In Flight
            </span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. QUICK ACTIONS BAR                                     */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#60685D]">
              WORKSPACE DISPATCH
            </h3>
            <h2 className="text-xl font-bold text-[#1C1D1B]">Quick Actions</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Action 1: Create Project (Burnt Orange) */}
          <Link
            to="/leader/projects/create"
            className="p-5 rounded-3xl bg-white border border-stone-200/80 hover:border-[#C87841]/50 hover:shadow-md transition-all group block space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FAF3EE] text-[#C87841] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1C1D1B] group-hover:text-[#C87841] transition-colors flex items-center justify-between">
                <span>Create Project</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-[#72756E] mt-1 line-clamp-2">
                Define scope, required skills, and squad capacity for your initiative.
              </p>
            </div>
          </Link>

          {/* Action 2: Explore Projects (Forest Green) */}
          <Link
            to="/projects"
            className="p-5 rounded-3xl bg-white border border-stone-200/80 hover:border-[#1E281F]/50 hover:shadow-md transition-all group block space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#E7EDE5] text-[#1E281F] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1C1D1B] group-hover:text-[#1E281F] transition-colors flex items-center justify-between">
                <span>Explore Projects</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-[#72756E] mt-1 line-clamp-2">
                Browse academic repository and explore other teams' architectures.
              </p>
            </div>
          </Link>

          {/* Action 3: Skill Matching (Warm Gold) */}
          <a
            href="#skill-match-section"
            className="p-5 rounded-3xl bg-white border border-stone-200/80 hover:border-[#8F5E16]/50 hover:shadow-md transition-all group block space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F9F1E2] text-[#8F5E16] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1C1D1B] group-hover:text-[#8F5E16] transition-colors flex items-center justify-between">
                <span>Skill Matching</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-[#72756E] mt-1 line-clamp-2">
                Inspect algorithm recommendations and complementary team profiles.
              </p>
            </div>
          </a>

          {/* Action 4: Team Members (Soft Sage) */}
          <Link
            to={leaderProjects.length > 0 ? `/projects/${leaderProjects[0]._id}?tab=team` : '/projects'}
            className="p-5 rounded-3xl bg-white border border-stone-200/80 hover:border-[#2D452E]/50 hover:shadow-md transition-all group block space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#EAF2E8] text-[#2D452E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1C1D1B] group-hover:text-[#2D452E] transition-colors flex items-center justify-between">
                <span>Team Members</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-[#72756E] mt-1 line-clamp-2">
                Manage invitations, assign roles, and review contributor availability.
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MAIN CONTENT: MY PROJECTS SECTION                     */}
      {/* ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#60685D]">
              CAPSTONE INITIATIVES
            </span>
            <h2 className="text-2xl font-extrabold text-[#1C1D1B] tracking-tight">
              My Projects ({leaderProjects.length})
            </h2>
            <p className="text-xs sm:text-sm text-[#72756E]">
              Your active academic projects and recruited team rosters.
            </p>
          </div>

          <Link
            to="/leader/projects/create"
            className="px-5 py-2.5 rounded-full bg-[#1E281F] hover:bg-[#2B3A2C] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#C87841]" />
            <span>+ Create Project</span>
          </Link>
        </div>

        {loading ? (
          <div className="p-14 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-stone-200">
            <Loader2 className="w-8 h-8 animate-spin text-[#1E281F]" />
            <span className="font-semibold text-xs text-stone-500">Loading your academic workspaces...</span>
          </div>
        ) : leaderProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaderProjects.map((proj) => {
              const teamSize = 1 + (proj.members?.length || 0);
              const memberNames = Array.isArray(proj.members) && proj.members.length > 0
                ? proj.members.map((m) => (typeof m === 'object' ? m.name : 'Student')).join(', ')
                : 'Leader only';
              const progressRatio = Math.min(100, Math.round((teamSize / (proj.maxTeamSize || 4)) * 100));

              return (
                <div
                  key={proj._id}
                  className="rounded-3xl border border-stone-200/80 bg-white/95 hover:border-stone-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Subtle Forest-Green / Copper Top Accent Bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#1E281F] via-[#2D452E] to-[#C87841]" />

                  <div className="p-6 space-y-4 flex-grow">
                    {/* Header Row: Category & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#2D452E] bg-[#EAF2E8] px-3 py-1 rounded-full border border-[#2D452E]/15">
                        {proj.category || 'Engineering'}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-[#60685D] bg-[#F4EFEB] px-2.5 py-0.5 rounded-full border border-stone-200">
                          {teamSize} / {proj.maxTeamSize || 4} MEMBERS
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                            proj.status === 'Open'
                              ? 'bg-[#EAF2E8] text-[#2D452E] border border-[#2D452E]/20'
                              : proj.status === 'In Progress'
                              ? 'bg-[#F9F1E2] text-[#8F5E16] border border-[#8F5E16]/20'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {proj.status?.toUpperCase() || 'OPEN'}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-extrabold text-[#1C1D1B] text-lg sm:text-xl group-hover:text-[#C87841] transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#525850] mt-1.5 line-clamp-2 leading-relaxed font-normal">
                        {proj.description}
                      </p>
                    </div>

                    {/* Recruited Team Roster Box */}
                    <div className="text-xs text-[#525850] bg-[#FAF8F4] p-3.5 rounded-2xl border border-stone-200/70 space-y-1">
                      <div className="font-bold text-[#1C1D1B] flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C87841]" />
                        <span>Roster:</span>
                      </div>
                      <p className="text-[11px] text-[#60685D] line-clamp-1">
                        {memberNames}
                      </p>
                    </div>

                    {/* Required Skills Chips */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#72756E]">
                        Required Tech Stack:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.requiredSkills?.slice(0, 4).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-xl text-xs font-medium bg-[#F4EFEB] text-stone-800 border border-stone-300/60"
                          >
                            {s}
                          </span>
                        ))}
                        {proj.requiredSkills?.length > 4 && (
                          <span className="text-xs text-stone-500 self-center font-bold px-1">
                            +{proj.requiredSkills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Squad Capacity Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-[#72756E] font-medium">
                        <span>Team Formation</span>
                        <span>{progressRatio}% filled</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1E281F]"
                          style={{ width: `${progressRatio}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-6 py-4 bg-[#FAF8F4]/80 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-[#72756E] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C87841]" />
                      Created {formatDate(proj.createdAt)}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/projects/${proj._id}`}
                        className="px-4 py-1.5 rounded-full bg-[#1E281F] text-white hover:bg-[#2B3A2C] text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                      >
                        <span>Open Project</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
                      </Link>
                      <Link
                        to={`/projects/${proj._id}?tab=team`}
                        className="px-3 py-1.5 rounded-full bg-[#FAF3EE] text-[#C87841] hover:bg-[#F5E6DC] border border-[#C87841]/20 text-xs font-bold transition-all"
                      >
                        Team
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-4 bg-white/60">
            <FolderPlus className="w-12 h-12 text-stone-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#1C1D1B]">No Capstone Projects Yet</h3>
              <p className="text-xs sm:text-sm text-[#72756E] max-w-sm mx-auto">
                Create your first project initiative, define skill requirements, and start recruiting teammates.
              </p>
            </div>
            <Link
              to="/leader/projects/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E281F] hover:bg-[#2B3A2C] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 text-[#C87841]" />
              <span>Create Your First Capstone Project</span>
            </Link>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 5. SPLIT BENTO: RECENT ACTIVITY & TEAM PERFORMANCE       */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* RECENT ACTIVITY TIMELINE (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#60685D]">
                PROJECT PULSE LOG
              </span>
              <h3 className="text-xl font-bold text-[#1C1D1B]">Recent Activity</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-[#72756E] bg-[#FAF8F4] px-3 py-1 rounded-full border border-stone-200">
              {activityList.length} events
            </span>
          </div>

          {activityList.length > 0 ? (
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-200 pl-2">
              {activityList.map((item) => (
                <div key={item.id} className="relative flex items-start gap-4">
                  {/* Timeline Node */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      item.highlight
                        ? 'bg-[#1E281F] text-white shadow-xs'
                        : 'bg-[#FAF3EE] text-[#C87841] border border-[#C87841]/30'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>

                  <div className="flex-1 bg-[#FAF8F4] p-4 rounded-2xl border border-stone-200/70 space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1C1D1B]">{item.title}</span>
                      <span className="text-[11px] font-mono text-[#72756E]">{item.date}</span>
                    </div>
                    <p className="text-xs text-[#60685D]">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-stone-500">
              No recent activity recorded. New project events will show up here.
            </div>
          )}
        </div>

        {/* TEAM PERFORMANCE CARD (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/80 p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#60685D]">
                  FORMATION STATUS
                </span>
                <h3 className="text-xl font-bold text-[#1C1D1B]">Team Performance</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#EAF2E8] text-[#2D452E] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            {/* Circular Metric Gauge Representation */}
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="relative w-36 h-36 rounded-full flex items-center justify-center border-8 border-[#FAF3EE] border-t-[#1E281F] border-r-[#C87841]">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#1C1D1B]">
                    {teamFillPercentage}%
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#72756E] uppercase">
                    FORMATION
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#525850] font-medium pt-2">
                Recruited Contributor Ratio
              </p>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-stone-100 text-center">
            <div className="p-2.5 rounded-2xl bg-[#E7EDE5] space-y-0.5">
              <div className="text-[10px] font-mono font-bold text-[#1E281F]">ACTIVE</div>
              <div className="text-sm font-black text-[#1C1D1B]">{totalRecruitedMembers}</div>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#FAF3EE] space-y-0.5">
              <div className="text-[10px] font-mono font-bold text-[#C87841]">PENDING</div>
              <div className="text-sm font-black text-[#C87841]">{pendingInvitesCount}</div>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#F9F1E2] space-y-0.5">
              <div className="text-[10px] font-mono font-bold text-[#8F5E16]">ACCEPTED</div>
              <div className="text-sm font-black text-[#8F5E16]">{acceptedInvitesCount}</div>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 6. SKILL MATCHING SHOWCASE PREVIEW                       */}
      {/* ======================================================== */}
      <div id="skill-match-section" className="rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200/80 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#4A5A48]">
              EXPLAINABLE ALGORITHMIC MATCHING
            </span>
            <h3 className="text-2xl font-extrabold text-[#1C1D1B] tracking-tight">
              Skill Matching Engine
            </h3>
            <p className="text-xs sm:text-sm text-[#72756E]">
              Find complementary student profiles matching your project's verified technical requirements.
            </p>
          </div>

          <Link
            to="/projects"
            className="px-5 py-2.5 rounded-full bg-[#1E281F] text-white text-xs font-bold hover:bg-[#2B3A2C] transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All Applicants</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
          </Link>
        </div>

        {/* Interactive Match Matrix Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Required Skills Matrix */}
          <div className="lg:col-span-7 bg-[#FAF8F4] p-6 rounded-3xl border border-stone-200/80 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold uppercase text-[#72756E]">Candidate Stack vs Project Needs</span>
              <span className="font-semibold text-[#2D452E] bg-[#EAF2E8] px-2.5 py-0.5 rounded-full">
                Lead Frontend Engineer
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white border border-stone-200/70 text-center space-y-1 shadow-xs">
                <div className="text-xs font-bold text-[#1C1D1B]">React</div>
                <div className="text-[11px] text-[#2D452E] font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-stone-200/70 text-center space-y-1 shadow-xs">
                <div className="text-xs font-bold text-[#1C1D1B]">Node.js</div>
                <div className="text-[11px] text-[#2D452E] font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-stone-200/70 text-center space-y-1 shadow-xs">
                <div className="text-xs font-bold text-[#1C1D1B]">MongoDB</div>
                <div className="text-[11px] text-[#2D452E] font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-stone-200/70 text-center space-y-1 shadow-xs">
                <div className="text-xs font-bold text-[#1C1D1B]">UI/UX</div>
                <div className="text-[11px] text-[#C87841] font-semibold flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Learning
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#EAF2E8]/60 border border-[#2D452E]/15 flex items-center gap-2.5 text-xs text-[#2D452E]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Deterministic score computed from verified GitHub repositories & course credentials.</span>
            </div>
          </div>

          {/* Right: Match Score Big Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1E281F] to-[#151D16] text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-4 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4A054]">
              COMPLEMENTARY FIT
            </span>
            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
              <span className="text-5xl font-black text-white tracking-tight">94%</span>
              <span className="text-xs text-[#EAF2E8] font-semibold">Match Score</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Applicant possesses 3 of 4 required technical skills with active repository commits and validated project deliverables.
            </p>
            <div className="pt-2">
              <Link
                to="/projects"
                className="inline-block w-full text-center px-4 py-2.5 rounded-full bg-[#C87841] hover:bg-[#B46733] text-white text-xs font-bold shadow-sm transition-all"
              >
                Send Direct Team Invitation
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. SENT INVITATIONS TABLE (REAL DATA)                    */}
      {/* ======================================================== */}
      {invitations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#60685D]">
                RECRUITMENT PIPELINE
              </span>
              <h3 className="text-xl font-bold text-[#1C1D1B]">
                Sent Invitations ({invitations.length})
              </h3>
            </div>
          </div>

          <div className="divide-y divide-stone-100 rounded-3xl border border-stone-200/80 bg-white/95 overflow-hidden text-xs sm:text-sm shadow-xs">
            {invitations.slice(0, 5).map((inv) => (
              <div key={inv._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#1C1D1B] text-sm sm:text-base">
                    {inv.recipient?.name || 'Applicant'}{' '}
                    <span className="text-stone-500 font-normal text-xs sm:text-sm">
                      ({inv.recipient?.email})
                    </span>
                  </div>
                  <div className="text-stone-500 text-xs sm:text-sm">
                    Project: <strong className="text-stone-800">{inv.project?.title || 'Capstone'}</strong> • Sent{' '}
                    {formatDate(inv.createdAt)}
                  </div>
                </div>
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                    inv.status === 'Accepted'
                      ? 'bg-[#EAF2E8] text-[#2D452E] border border-[#2D452E]/20'
                      : inv.status === 'Rejected'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-[#FAF3EE] text-[#C87841] border border-[#C87841]/30'
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
  );
}

