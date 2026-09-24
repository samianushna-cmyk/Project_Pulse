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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
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

          <div className="flex items-center gap-2.5">
            <Button
              to="/projects"
              variant="outline"
              size="md"
              className="bg-white border-slate-200"
            >
              Explore Directory
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
              Welcome, Prof. <span className="text-indigo-600">{user?.name}</span>!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Department of {user?.department || 'Computer Science'}. Review student capstone teams, track milestone deliverables, and submit structured feedback.
            </p>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 font-semibold">Total Projects</div>
            <div className="text-2xl font-black text-slate-900">{projects.length}</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
            <div className="text-xs text-emerald-700 font-semibold">Open Projects</div>
            <div className="text-2xl font-black text-emerald-900">{openProjectsCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
            <div className="text-xs text-blue-700 font-semibold">In Progress</div>
            <div className="text-2xl font-black text-blue-900">{inProgressCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1">
            <div className="text-xs text-purple-700 font-semibold">Completed</div>
            <div className="text-2xl font-black text-purple-900">{completedCount}</div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search projects by title, category, or leader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid for Faculty Review */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Student Projects Directory ({filteredProjects.length})
          </h3>

          {loading ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
              <span>Loading projects directory...</span>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((proj) => {
                const teamSize = 1 + (proj.members?.length || 0);
                return (
                  <div
                    key={proj._id}
                    className="p-5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                          {proj.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {teamSize} / {proj.maxTeamSize} Members
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              proj.status === 'Open'
                                ? 'bg-emerald-50 text-emerald-700'
                                : proj.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {proj.status}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.requiredSkills?.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="text-slate-500 truncate max-w-[50%]">
                        Leader: <strong>{proj.leader?.name}</strong>
                      </div>

                      <Link
                        to={`/projects/${proj._id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquareQuote className="w-3.5 h-3.5" />
                        Review Workspace &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
              <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">No projects found</p>
              <p className="text-xs text-slate-400">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
