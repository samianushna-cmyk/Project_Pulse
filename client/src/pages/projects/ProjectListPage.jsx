import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';
import {
  FolderGit2,
  Plus,
  Search,
  Filter,
  Users,
  Calendar,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  Tag,
  CheckCircle2,
  Clock,
  CheckCircle
} from 'lucide-react';
import Button from '../../components/Button';

export default function ProjectListPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjects();
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      } catch (err) {
        setErrorMessage(
          err.response?.data?.message ||
            err.message ||
            'Failed to load projects. Please try refreshing.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by search term, category, and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.requiredSkills?.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      project.leader?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Extract unique categories for filter dropdown
  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  // Helper for status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'In Progress':
        return 'bg-[#F7EFE1] text-[#7A5418] border-[#7A5418]/20';
      case 'Completed':
        return 'bg-[#FBECE3] text-[#C87841] border-[#C87841]/20';
      default:
        return 'bg-[#F2EFE9] text-stone-700 border-stone-200';
    }
  };

  // Format date helper
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/70 shadow-[0_10px_30px_rgba(28,29,27,0.04)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1E281F] flex items-center justify-center shadow-md shadow-[#1E281F]/15">
              <FolderGit2 className="w-5 h-5 text-[#FAF8F4]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#60685D] uppercase tracking-wider block">
                ACADEMIC INITIATIVES
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1D1B] tracking-tight">
                Explore Projects
              </h1>
            </div>
          </div>

          {/* Action for Leaders */}
          {user?.role === 'leader' && (
            <Link
              to="/leader/projects/create"
              className="px-5 py-2.5 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5 text-[#C87841]" />
              <span>Create Project</span>
            </Link>
          )}
        </div>

        {/* Subtitle & Search / Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <p className="text-xs sm:text-sm text-[#525850] max-w-xl leading-relaxed">
            Browse active capstone projects, explore domain categories, and inspect required technical stacks.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, skills..."
                className="block w-full pl-9 pr-3.5 py-2 bg-[#F7F5F0] border border-stone-300 rounded-full text-xs text-[#1C1D1B] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full sm:w-auto px-3.5 py-2 bg-[#F7F5F0] border border-stone-300 rounded-full text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all cursor-pointer"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full sm:w-auto px-3.5 py-2 bg-[#F7F5F0] border border-stone-300 rounded-full text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841] focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">Status: All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-sm shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#1E281F] animate-spin" />
          <p className="text-xs font-semibold text-stone-500">Loading projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        /* Project Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-[#FDFCF9] rounded-2xl border border-stone-200/80 shadow-[0_10px_30px_rgba(28,29,27,0.03)] hover:shadow-lg hover:border-stone-400 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Body */}
              <div className="p-6 space-y-4 flex-grow">
                {/* Header: Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF2E8] text-[#2D452E] border border-[#2D452E]/15">
                    <Tag className="w-3 h-3 text-[#2D452E]" />
                    {project.category || 'General'}
                  </span>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    {project.status || 'Open'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-[#1C1D1B] group-hover:text-[#C87841] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#525850] line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Required Skills */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                    Required Skills:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.requiredSkills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F2EFE9] text-stone-800 border border-stone-300/60 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metadata: Leader, Team Size, Date */}
                <div className="pt-3 border-t border-stone-200/70 grid grid-cols-2 gap-2 text-xs text-stone-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">
                      Leader: <strong className="text-stone-800">{project.leader?.name || 'Assigned Leader'}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 justify-end">
                    <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>
                      Team Size: <strong className="text-stone-800">{project.maxTeamSize || 4}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 bg-stone-100/50 border-t border-stone-200/70 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C87841]" />
                  {formatDate(project.createdAt)}
                </span>

                <Link
                  to={`/projects/${project._id}`}
                  className="px-3.5 py-1.5 rounded-full bg-[#1E281F] text-white hover:bg-[#151D16] text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3 h-3 text-[#C87841]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-stone-200/80 shadow-sm text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F4] text-stone-600 flex items-center justify-center mx-auto border border-stone-200">
            <FolderGit2 className="w-7 h-7 text-[#1E281F]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#1C1D1B]">No Projects Found</h3>
            <p className="text-xs text-stone-500">
              {searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All'
                ? 'No projects match your current filters. Try changing your search keywords.'
                : 'There are currently no active projects created in the system.'}
            </p>
          </div>
          {user?.role === 'leader' && (
            <div className="pt-2">
              <Link
                to="/leader/projects/create"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#C87841]" />
                <span>Create the First Project</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
