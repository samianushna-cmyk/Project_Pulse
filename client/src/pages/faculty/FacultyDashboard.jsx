import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';
import {
  Activity,
  LogOut,
  User,
  Building,
  Mail,
  Shield,
  CheckCircle,
  GraduationCap,
  FolderGit2,
  Users,
  Tag,
  Loader2,
  Sparkles,
  ArrowRight,
  MessageSquareQuote,
  Clock,
  Search
} from 'lucide-react';
import Button from '../../components/Button';

export default function FacultyDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const data = await getProjects();
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.warn('Failed to fetch projects for faculty:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      !searchTerm.trim() ||
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.leader?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const openProjectsCount = projects.filter((p) => p.status === 'Open').length;
  const inProgressCount = projects.filter((p) => p.status === 'In Progress').length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;

  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];

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
      {/* Main Workspace Card (Bento Glass Container) */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/80 shadow-[0_15px_35px_rgba(30,40,31,0.05)] space-y-8">
        {/* Top Workspace Header Banner */}
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
                FACULTY WORKSPACE
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C1D1B] tracking-tight">ProjectPulse</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-full bg-[#1E281F] hover:bg-[#2B3A2C] text-white text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>Explore Directory</span>
              <ArrowRight className="w-4 h-4 text-[#C87841]" />
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

        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-stone-200/80 shadow-[0_10px_30px_rgba(28,29,27,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1D1B]">
              Welcome, Prof. <span className="text-[#C87841]">{user?.name}</span>!
            </h2>
            <p className="text-base md:text-lg text-[#525850] font-normal leading-relaxed">
              Department of {user?.department || 'Computer Science'}. Review student capstone teams, track milestone deliverables, and submit structured feedback.
            </p>
          </div>
          <Link
            to="/projects"
            className="px-6 py-3 rounded-full bg-[#1E281F] hover:bg-[#2B3A2C] text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5 self-start sm:self-auto shrink-0"
          >
            <span>All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
          </Link>
        </div>

        {/* Elevated Metrics Row (Bento Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Projects */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(45,69,46,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">Total Projects</span>
              <div className="w-11 h-11 rounded-2xl bg-[#F2EFE9] text-stone-700 flex items-center justify-center ring-1 ring-stone-300/60">
                <FolderGit2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#1C1D1B] tracking-tight">{projects.length}</div>
          </div>

          {/* Card 2: Open Projects */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(45,69,46,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">Open Projects</span>
              <div className="w-11 h-11 rounded-2xl bg-[#EAF2E8] text-[#2D452E] flex items-center justify-center ring-1 ring-[#D5E3D2]">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#2D452E] tracking-tight">{openProjectsCount}</div>
          </div>

          {/* Card 3: In Progress */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(143,94,22,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">In Progress</span>
              <div className="w-11 h-11 rounded-2xl bg-[#F7EFE1] text-[#7A5418] flex items-center justify-center ring-1 ring-[#EEDCC1]">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#7A5418] tracking-tight">{inProgressCount}</div>
          </div>

          {/* Card 4: Completed */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/90 shadow-[0_10px_25px_rgba(28,29,27,0.03)] hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(200,120,65,0.09)] transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#5A6357]">Completed</span>
              <div className="w-11 h-11 rounded-2xl bg-[#FBECE3] text-[#C87841] flex items-center justify-center ring-1 ring-[#F3D7C5]">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-[#C87841] tracking-tight">{completedCount}</div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search projects by title, category, or leader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full text-xs sm:text-sm border border-stone-300 bg-white/90 text-[#1C1D1B] placeholder-stone-400 focus:bg-white focus:border-[#C87841] focus:ring-2 focus:ring-[#C87841]/20 focus:outline-none transition-all shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1E281F] text-white shadow-xs'
                    : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200 border border-stone-300/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid for Faculty Review */}
        <div className="space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-[#1C1D1B]">
            Student Projects Directory ({filteredProjects.length})
          </h3>

          {loading ? (
            <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-stone-500 text-sm">
              <Loader2 className="w-8 h-8 animate-spin text-[#1E281F]" />
              <span className="font-semibold text-xs">Loading projects directory...</span>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProjects.map((proj) => {
                const teamSize = 1 + (proj.members?.length || 0);
                return (
                  <div
                    key={proj._id}
                    className="p-6 rounded-3xl border border-stone-200/80 bg-white/90 hover:border-stone-400 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#2D452E] bg-[#EAF2E8] px-3 py-1 rounded-full border border-[#2D452E]/15">
                          {proj.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-700 bg-[#F2EFE9] px-3 py-1 rounded-full border border-stone-200">
                            {teamSize} / {proj.maxTeamSize} Members
                          </span>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              proj.status === 'Open'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : proj.status === 'In Progress'
                                ? 'bg-[#F7EFE1] text-[#7A5418] border border-[#7A5418]/20'
                                : 'bg-[#FBECE3] text-[#C87841] border border-[#C87841]/20'
                            }`}
                          >
                            {proj.status}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-[#1C1D1B] text-lg line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="text-sm text-[#525850] line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {proj.requiredSkills?.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#F4EFEB] text-stone-800 border border-stone-300/60"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs sm:text-sm">
                      <div className="text-stone-600 truncate max-w-[50%]">
                        Leader: <strong className="text-[#1C1D1B]">{proj.leader?.name}</strong>
                      </div>

                      <Link
                        to={`/projects/${proj._id}`}
                        className="px-4 py-2 rounded-full bg-[#1E281F] text-white font-bold hover:bg-[#2B3A2C] shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                      >
                        <MessageSquareQuote className="w-3.5 h-3.5 text-[#C87841]" />
                        <span>Review Workspace &rarr;</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 rounded-3xl border border-dashed border-stone-300 text-center space-y-2 bg-white/50">
              <FolderGit2 className="w-10 h-10 text-stone-400 mx-auto" />
              <p className="text-sm font-bold text-stone-700">No projects found</p>
              <p className="text-xs text-stone-500">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
