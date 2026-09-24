import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjectById, getProjectMatch } from '../../services/projectService';
import {
  FolderGit2,
  ArrowLeft,
  Users,
  Calendar,
  User,
  Mail,
  Building,
  Tag,
  Shield,
  Loader2,
  AlertCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  Check,
  Target,
  Briefcase,
  Edit3
} from 'lucide-react';
import Button from '../../components/Button';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const data = await getProjectById(id);
        if (data.success && data.project) {
          setProject(data.project);
        } else {
          setErrorMessage('Project could not be found.');
        }
      } catch (err) {
        setErrorMessage(
          err.response?.data?.message ||
            err.message ||
            'Failed to load project details.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  // Fetch student-specific skill match if user is a student
  useEffect(() => {
    const fetchMatch = async () => {
      if (user?.role === 'student' && id) {
        setLoadingMatch(true);
        try {
          const data = await getProjectMatch(id);
          if (data.success) {
            setMatchData(data);
          }
        } catch (err) {
          console.warn('Failed to calculate skill match:', err.message);
        } finally {
          setLoadingMatch(false);
        }
      }
    };

    if (project) {
      fetchMatch();
    }
  }, [user?.role, id, project]);

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

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getScoreColor = (score) => {
    if (score >= 75) {
      return {
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        bar: 'bg-emerald-500',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      };
    }
    if (score >= 40) {
      return {
        text: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        bar: 'bg-indigo-600',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      };
    }
    return {
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      bar: 'bg-amber-500',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-9 h-9 text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading project details...</p>
      </div>
    );
  }

  if (errorMessage || !project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Project Not Found</h2>
        <p className="text-sm text-slate-500">{errorMessage || 'This project may have been removed.'}</p>
        <div className="pt-2">
          <Button to="/projects" variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
            Back to All Projects
          </Button>
        </div>
      </div>
    );
  }

  const scoreTheme = matchData ? getScoreColor(matchData.score) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
      {/* Top Breadcrumbs */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Explore Projects
        </Link>
      </div>

      {/* Main Project Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Created on {formatDate(project.createdAt)}</span>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Project Description & Scope
          </h2>
          <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/60 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {project.description}
          </div>
        </div>

        {/* Required Skills Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Required Technical Stack
            </h2>
            <span className="text-xs text-slate-500">
              {project.requiredSkills?.length} {project.requiredSkills?.length === 1 ? 'skill' : 'skills'} needed
            </span>
          </div>

          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-indigo-50/30 border border-indigo-100/70">
            {project.requiredSkills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-indigo-700 border border-indigo-200 shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Squad Capacity & Team Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Max Team Size */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Maximum Team Size</div>
              <div className="font-bold text-slate-800 text-sm">
                Up to {project.maxTeamSize} team members
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Recruitment Status</div>
              <div className="font-bold text-slate-800 text-sm">
                {project.status === 'Open'
                  ? 'Accepting team candidate applications'
                  : `Project is ${project.status}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Explainable Skill Match Section (Only for logged-in students) */}
      {user?.role === 'student' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Skill Match</h2>
                <p className="text-xs text-slate-500">
                  Explainable matching computed between your developer profile and required stack
                </p>
              </div>
            </div>

            <Link
              to="/student/profile"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Update Your Skills <Edit3 className="w-3 h-3" />
            </Link>
          </div>

          {loadingMatch ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
              <span>Calculating skill match compatibility...</span>
            </div>
          ) : matchData ? (
            <div className="space-y-6">
              {/* Score & Suggested Role Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Match Score Gauge Card */}
                <div
                  className={`p-5 rounded-xl border ${scoreTheme.bg} ${scoreTheme.border} flex flex-col justify-between space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Match Score
                    </span>
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${scoreTheme.badge}`}
                    >
                      {matchData.score >= 75
                        ? 'High Match'
                        : matchData.score >= 40
                        ? 'Moderate Match'
                        : 'Low Match'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black ${scoreTheme.text}`}>
                      {matchData.score}%
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      ({matchData.matchedSkills.length} of {project.requiredSkills?.length} skills)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${scoreTheme.bar}`}
                      style={{ width: `${Math.max(matchData.score, 4)}%` }}
                    />
                  </div>
                </div>

                {/* Suggested Role Card */}
                <div className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/70 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Suggested Team Role</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900 mt-2">
                      {matchData.suggestedRole}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Determined from your matched technical skill competencies.
                  </p>
                </div>

                {/* Explanation Formula Card */}
                <div className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/70 flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Info className="w-3.5 h-3.5 text-indigo-500" />
                    <span>How it is calculated</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Match score is calculated from the percentage of project-required skills that match your profile.
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 bg-white/80 p-2 rounded-md border border-slate-200/60">
                    ({matchData.matchedSkills.length} matched / {project.requiredSkills?.length} required) × 100
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Skills Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matched Skills */}
                <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Matched Skills ({matchData.matchedSkills.length})
                    </span>
                  </div>

                  {matchData.matchedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.matchedSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-emerald-800 border border-emerald-200 shadow-xs"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-700 italic">
                      None of the required skills currently match your profile.
                    </p>
                  )}
                </div>

                {/* Missing Skills */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-slate-400" />
                      Missing Skills ({matchData.missingSkills.length})
                    </span>
                  </div>

                  {matchData.missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.missingSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-700 font-medium">
                      ✓ You possess all required technical skills for this project!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
              Unable to calculate skill match. Make sure your profile skills are up to date.
            </div>
          )}
        </div>
      )}

      {/* Leader Information Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Project Leader</h2>
            <p className="text-xs text-slate-500">Initiative owner & point of contact</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Leader Name</div>
            <div className="font-semibold text-slate-800 truncate">
              {project.leader?.name || 'Assigned Leader'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Contact Email</div>
            <div className="font-semibold text-slate-800 truncate">
              {project.leader?.email || 'Not available'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Department</div>
            <div className="font-semibold text-slate-800 truncate">
              {project.leader?.department || 'Department not specified'}
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice about subsequent phases */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          Team invitations, applications, and task assignments will be enabled in subsequent ProjectPulse releases.
        </span>
      </div>
    </div>
  );
}
