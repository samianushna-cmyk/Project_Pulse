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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <FolderGit2 className="w-6 h-6 text-indigo-100" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Academic Initiatives
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Explore Projects
              </h1>
            </div>
          </div>

          {/* Action for Leaders */}
          {user?.role === 'leader' && (
            <Button
              to="/leader/projects/create"
              variant="primary"
              size="md"
              icon={Plus}
              iconPosition="left"
              className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 shadow-sm shadow-purple-500/20"
            >
              Create Project
            </Button>
          )}
        </div>

        {/* Subtitle & Search / Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <p className="text-sm text-slate-600 max-w-xl">
            Browse active capstone projects, explore domain categories, and inspect required technical stacks.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, skills..."
                className="block w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors cursor-pointer"
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
                className="block w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors cursor-pointer"
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
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-sm shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-9 h-9 text-indigo-600 animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        /* Project Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-indigo-200"
            >
              {/* Card Body */}
              <div className="p-6 space-y-4 flex-grow">
                {/* Header: Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <Tag className="w-3 h-3" />
                    {project.category || 'General'}
                  </span>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    {project.status || 'Open'}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Required Skills */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Required Skills:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.requiredSkills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-indigo-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metadata: Leader, Team Size, Date */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      Leader: <strong className="text-slate-700">{project.leader?.name || 'Assigned Leader'}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 justify-end">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Team Size: <strong className="text-slate-700">{project.maxTeamSize || 4}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(project.createdAt)}
                </span>

                <Button
                  to={`/projects/${project._id}`}
                  variant="outline"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-white text-xs px-3 py-1.5"
                >
                  View Project
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 border border-slate-200/90 shadow-card text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
            <FolderGit2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No Projects Found</h3>
            <p className="text-xs text-slate-500">
              {searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All'
                ? 'No projects match your current filters. Try changing your search keywords.'
                : 'There are currently no active projects created in the system.'}
            </p>
          </div>
          {user?.role === 'leader' && (
            <div className="pt-2">
              <Button
                to="/leader/projects/create"
                variant="primary"
                size="md"
                icon={Plus}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Create the First Project
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
