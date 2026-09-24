import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjectById, getProjectMatch } from '../../services/projectService';
import {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
  getProjectProofs,
  submitProof,
  reviewProof,
  getProjectFeedback,
  addFacultyFeedback,
  getProjectContributions,
  getProjectActivities,
  sendInvitation,
  getInvitations,
  getStudents,
} from '../../services/collaborationService';
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
  Edit3,
  Plus,
  Send,
  ExternalLink,
  Star,
  Activity,
  Award,
  ListTodo,
  FileCheck2,
  MessageSquareQuote,
  Trash2,
  Filter,
  Eye,
  Github,
  Globe,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import Button from '../../components/Button';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  // State: Core Project & Match
  const [project, setProject] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState(tabParam || 'overview');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // State: Tasks
  const [tasks, setTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState('All');
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [submittingTask, setSubmittingTask] = useState(false);

  // State: Proofs
  const [proofs, setProofs] = useState([]);
  const [loadingProofs, setLoadingProofs] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofForm, setProofForm] = useState({
    taskId: '',
    proofUrl: '',
    description: '',
  });
  const [submittingProof, setSubmittingProof] = useState(false);

  // State: Proof Review
  const [reviewingProofId, setReviewingProofId] = useState(null);
  const [reviewData, setReviewData] = useState({ status: 'Approved', feedback: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  // State: Faculty Feedback
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ rating: 5, comments: '' });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // State: Contributions
  const [contributions, setContributions] = useState(null);
  const [loadingContributions, setLoadingContributions] = useState(false);

  // State: Activities
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  // State: Team & Invitations
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [inviteSearch, setInviteSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [projectInvitations, setProjectInvitations] = useState([]);
  const [submittingInvite, setSubmittingInvite] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Load project details
  const fetchProjectDetails = async () => {
    try {
      const data = await getProjectById(id);
      if (data.success && data.project) {
        setProject(data.project);
      } else {
        setErrorMessage('Project could not be found.');
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Failed to load project details.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchProjectDetails();
    }
  }, [id]);

  // Fetch skill match for student
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

  // Load Tab-specific data
  const loadTasks = async () => {
    setLoadingTasks(true);
    try {
      const data = await getProjectTasks(id);
      if (data.success) setTasks(data.tasks);
    } catch (err) {
      console.warn('Failed to load tasks:', err.message);
    } finally {
      setLoadingTasks(false);
    }
  };

  const loadProofs = async () => {
    setLoadingProofs(true);
    try {
      const data = await getProjectProofs(id);
      if (data.success) setProofs(data.proofs);
    } catch (err) {
      console.warn('Failed to load proofs:', err.message);
    } finally {
      setLoadingProofs(false);
    }
  };

  const loadFeedbacks = async () => {
    setLoadingFeedback(true);
    try {
      const data = await getProjectFeedback(id);
      if (data.success) setFeedbacks(data.feedbacks);
    } catch (err) {
      console.warn('Failed to load feedback:', err.message);
    } finally {
      setLoadingFeedback(false);
    }
  };

  const loadContributions = async () => {
    setLoadingContributions(true);
    try {
      const data = await getProjectContributions(id);
      if (data.success) setContributions(data);
    } catch (err) {
      console.warn('Failed to load contributions:', err.message);
    } finally {
      setLoadingContributions(false);
    }
  };

  const loadActivities = async () => {
    setLoadingActivities(true);
    try {
      const data = await getProjectActivities(id);
      if (data.success) setActivities(data.activities);
    } catch (err) {
      console.warn('Failed to load activities:', err.message);
    } finally {
      setLoadingActivities(false);
    }
  };

  const loadInvitations = async () => {
    if (isLeader) {
      try {
        const data = await getInvitations({ projectId: id });
        if (data.success) setProjectInvitations(data.invitations);
      } catch (err) {
        console.warn('Failed to load project invitations:', err.message);
      }
    }
  };

  // Reload data when activeTab changes
  useEffect(() => {
    if (!project) return;
    if (activeTab === 'tasks') loadTasks();
    if (activeTab === 'proofs') {
      loadProofs();
      loadTasks();
    }
    if (activeTab === 'feedback') loadFeedbacks();
    if (activeTab === 'contributions') loadContributions();
    if (activeTab === 'activity') loadActivities();
    if (activeTab === 'team') loadInvitations();
  }, [activeTab, project]);

  // Helpers
  const userId = user?._id || user?.id;
  const isLeader =
    (project?.leader?._id && userId && project.leader._id.toString() === userId.toString()) ||
    (project?.leader && userId && project.leader.toString() === userId.toString()) ||
    (project?.leader?.email && user?.email && project.leader.email === user.email);

  const isMember =
    isLeader ||
    (Array.isArray(project?.members) &&
      project.members.some((m) => {
        const mId = m?._id || m?.id || m;
        return (
          (mId && userId && mId.toString() === userId.toString()) ||
          (m?.email && user?.email && m.email === user.email)
        );
      }));
  const isFaculty = user?.role === 'faculty';
  const isStudent = user?.role === 'student';

  const currentTeamCount = 1 + (project?.members?.length || 0);
  const isTeamFull = currentTeamCount >= (project?.maxTeamSize || 1);

  // Status Badge Styling
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

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
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

  // ----------------------------------------------------
  // Task Handlers
  // ----------------------------------------------------
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.assignedTo) {
      setStatusMessage({ type: 'error', text: 'Task title and assigned member are required' });
      return;
    }
    setSubmittingTask(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await createTask(id, newTask);
      if (data.success) {
        setTasks([data.task, ...tasks]);
        setShowTaskModal(false);
        setNewTask({
          title: '',
          description: '',
          assignedTo: '',
          priority: 'Medium',
          dueDate: '',
        });
        setStatusMessage({ type: 'success', text: 'Task created and assigned successfully!' });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to create task',
      });
    } finally {
      setSubmittingTask(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const data = await updateTask(taskId, { status: newStatus });
      if (data.success) {
        setTasks(tasks.map((t) => (t._id === taskId ? data.task : t)));
        setStatusMessage({ type: 'success', text: `Task status updated to ${newStatus}` });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update task status',
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const data = await deleteTask(taskId);
      if (data.success) {
        setTasks(tasks.filter((t) => t._id !== taskId));
        setStatusMessage({ type: 'success', text: 'Task deleted' });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to delete task',
      });
    }
  };

  // ----------------------------------------------------
  // Proof Handlers
  // ----------------------------------------------------
  const handleSubmitProof = async (e) => {
    e.preventDefault();
    if (!proofForm.taskId || !proofForm.proofUrl.trim() || !proofForm.description.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in all proof fields with a valid URL' });
      return;
    }
    setSubmittingProof(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await submitProof(proofForm.taskId, {
        proofUrl: proofForm.proofUrl.trim(),
        description: proofForm.description.trim(),
      });
      if (data.success) {
        setProofs([data.proof, ...proofs]);
        setShowProofModal(false);
        setProofForm({ taskId: '', proofUrl: '', description: '' });
        setStatusMessage({ type: 'success', text: 'Proof submitted successfully for verification!' });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit proof',
      });
    } finally {
      setSubmittingProof(false);
    }
  };

  const handleReviewProof = async (e) => {
    e.preventDefault();
    if (!reviewingProofId) return;
    setSubmittingReview(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await reviewProof(reviewingProofId, reviewData);
      if (data.success) {
        setProofs(proofs.map((p) => (p._id === reviewingProofId ? data.proof : p)));
        setReviewingProofId(null);
        setReviewData({ status: 'Approved', feedback: '' });
        setStatusMessage({
          type: 'success',
          text: `Proof evaluated as ${data.proof.status}`,
        });
        loadTasks(); // refresh tasks since status might have changed to completed
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to evaluate proof',
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  // ----------------------------------------------------
  // Faculty Feedback Handlers
  // ----------------------------------------------------
  const handleAddFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackForm.comments.trim()) {
      setStatusMessage({ type: 'error', text: 'Feedback comments cannot be empty' });
      return;
    }
    setSubmittingFeedback(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await addFacultyFeedback(id, feedbackForm);
      if (data.success) {
        setFeedbacks([data.feedback, ...feedbacks]);
        setShowFeedbackModal(false);
        setFeedbackForm({ rating: 5, comments: '' });
        setStatusMessage({ type: 'success', text: 'Faculty evaluation recorded successfully!' });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit feedback',
      });
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // ----------------------------------------------------
  // Team Invite Handlers
  // ----------------------------------------------------
  const handleOpenInviteModal = async () => {
    setShowInviteModal(true);
    setLoadingStudents(true);
    try {
      const data = await getStudents();
      if (data.success) {
        // Exclude members already on the team
        const currentMemberIds = [
          project.leader?._id || project.leader,
          ...(project.members || []).map((m) => m._id || m),
        ];
        const eligible = data.students.filter(
          (s) => !currentMemberIds.includes(s._id)
        );
        setStudentsList(eligible);
      }
    } catch (err) {
      console.warn('Failed to load students:', err.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!selectedStudentId) {
      setStatusMessage({ type: 'error', text: 'Please select a student to invite' });
      return;
    }
    setSubmittingInvite(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await sendInvitation({
        projectId: id,
        recipientId: selectedStudentId,
        message: inviteMessage.trim(),
      });
      if (data.success) {
        setShowInviteModal(false);
        setSelectedStudentId('');
        setInviteMessage('');
        loadInvitations();
        setStatusMessage({ type: 'success', text: 'Team invitation sent successfully!' });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to send invitation',
      });
    } finally {
      setSubmittingInvite(false);
    }
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

  // Combined team members list for assignment & viewing
  const allTeamMembers = [
    ...(project.leader ? [{ ...project.leader, isLeader: true }] : []),
    ...(Array.isArray(project.members)
      ? project.members.map((m) => ({ ...m, isLeader: false }))
      : []),
  ];

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'All') return true;
    return t.status === taskFilter;
  });

  const scoreTheme = matchData ? getScoreColor(matchData.score) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Top Breadcrumb & Alerts */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Explore Projects
        </Link>

        {isLeader && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Shield className="w-3 h-3" />
            Project Leader Workspace
          </span>
        )}
      </div>

      {statusMessage.text && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold border flex items-center justify-between ${
            statusMessage.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage({ type: '', text: '' })}
            className="text-xs font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Users className="w-3 h-3 text-slate-500" />
                Team: {currentTeamCount} / {project.maxTeamSize}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h1>
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-xs text-slate-500 shrink-0">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Created on {formatDate(project.createdAt)}</span>
            </div>
            {isLeader && !isTeamFull && (
              <button
                onClick={handleOpenInviteModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Invite Student
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'team'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Team ({currentTeamCount}/{project.maxTeamSize})
          </button>

          {isStudent && (
            <button
              onClick={() => setActiveTab('match')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'match'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Skill Match
            </button>
          )}

          {(isMember || isFaculty) && (
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'tasks'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" />
              Tasks
            </button>
          )}

          {(isMember || isFaculty) && (
            <button
              onClick={() => setActiveTab('proofs')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'proofs'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              Proof Submissions
            </button>
          )}

          <button
            onClick={() => setActiveTab('contributions')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'contributions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Contribution
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'feedback'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Faculty Feedback
          </button>

          {(isLeader || isFaculty) && (
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'activity'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Activity Log
            </button>
          )}
        </div>

        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Project Description */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Project Description & Scope
              </h2>
              <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/60 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            </div>

            {/* Required Skills Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
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

            {/* Squad Capacity & Team Leader Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Team Formation Capacity</div>
                  <div className="font-bold text-slate-800 text-sm">
                    {currentTeamCount} of {project.maxTeamSize} positions filled
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Project Leader</div>
                  <div className="font-bold text-slate-800 text-sm">
                    {project.leader?.name} ({project.leader?.department || 'Department'})
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: TEAM FORMATION & MEMBERS */}
        {/* ==================================================== */}
        {activeTab === 'team' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Project Team</h2>
                <p className="text-xs text-slate-500">
                  Current team size: <strong>{currentTeamCount} / {project.maxTeamSize}</strong>
                </p>
              </div>

              {isLeader && !isTeamFull && (
                <Button
                  onClick={handleOpenInviteModal}
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  iconPosition="left"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Invite Student
                </Button>
              )}
            </div>

            {/* Members List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Leader Card */}
              <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {project.leader?.name?.charAt(0) || 'L'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        {project.leader?.name}
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          Leader
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">{project.leader?.email}</div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-2 pt-1 border-t border-purple-100">
                  <Building className="w-3.5 h-3.5 text-purple-500" />
                  <span>{project.leader?.department || 'Department not specified'}</span>
                </div>
              </div>

              {/* Members Cards */}
              {project.members && project.members.length > 0 ? (
                project.members.map((member) => (
                  <div
                    key={member._id}
                    className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                          {member.name?.charAt(0) || 'M'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {member.name}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                              Member
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">{member.email}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-slate-100 text-xs">
                      <div className="text-slate-600 flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{member.department || 'Department not specified'}</span>
                      </div>
                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {member.skills.slice(0, 4).map((sk, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center col-span-full space-y-2">
                  <Users className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">No student members yet</p>
                  <p className="text-xs text-slate-400">
                    {isLeader
                      ? 'Click "Invite Student" to invite qualified peers to your team.'
                      : 'This team is currently open for candidates.'}
                  </p>
                </div>
              )}
            </div>

            {/* Sent Invitations (Leader view) */}
            {isLeader && projectInvitations.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sent Team Invitations ({projectInvitations.length})
                </h3>
                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden bg-white">
                  {projectInvitations.map((inv) => (
                    <div key={inv._id} className="p-3.5 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-900">
                          {inv.recipient?.name} ({inv.recipient?.email})
                        </div>
                        <div className="text-slate-500">
                          Sent on {formatDate(inv.createdAt)} {inv.message && `• "${inv.message}"`}
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
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
        )}

        {/* ==================================================== */}
        {/* TAB 3: EXPLAINABLE SKILL MATCH (STUDENT) */}
        {/* ==================================================== */}
        {activeTab === 'match' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Your Skill Match</h2>
              </div>
              <Link
                to="/student/profile"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
              >
                Update Profile Skills <Edit3 className="w-3 h-3" />
              </Link>
            </div>

            {loadingMatch ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Calculating explainable skill match compatibility...</span>
              </div>
            ) : matchData ? (
              <div className="space-y-6">
                {/* Score & Suggested Role Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

                    <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${scoreTheme.bar}`}
                        style={{ width: `${Math.max(matchData.score, 4)}%` }}
                      />
                    </div>
                  </div>

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
                      Transparently determined from matched technical competencies.
                    </p>
                  </div>

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
                  <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2.5">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Matched Skills ({matchData.matchedSkills.length})
                    </span>

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

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-slate-400" />
                      Missing Skills ({matchData.missingSkills.length})
                    </span>

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
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                Please set up your student profile skills to view the skill match.
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: PROJECT TASKS */}
        {/* ==================================================== */}
        {activeTab === 'tasks' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Project Tasks</h2>
              </div>

              <div className="flex items-center gap-3">
                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  {['All', 'Todo', 'In Progress', 'Completed'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTaskFilter(filter)}
                      className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                        taskFilter === filter
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {isLeader && (
                  <Button
                    onClick={() => setShowTaskModal(true)}
                    variant="primary"
                    size="sm"
                    icon={Plus}
                    iconPosition="left"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Add Task
                  </Button>
                )}
              </div>
            </div>

            {loadingTasks ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Loading project tasks...</span>
              </div>
            ) : filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTasks.map((t) => {
                  const isAssignee = t.assignedTo?._id === user?._id;
                  return (
                    <div
                      key={t._id}
                      className="p-5 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(
                              t.priority
                            )}`}
                          >
                            {t.priority} Priority
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              t.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : t.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm">{t.title}</h3>

                        {t.description && (
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {t.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-1.5 font-medium">
                            <User className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Assigned to: <strong>{t.assignedTo?.name || 'Unassigned'}</strong></span>
                          </div>
                          {t.dueDate && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Due: {formatDate(t.dueDate)}</span>
                            </div>
                          )}
                        </div>

                        {/* Assignee / Leader Task Actions */}
                        <div className="flex items-center justify-between pt-1">
                          {(isAssignee || isLeader) && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-medium text-slate-500">Status:</span>
                              <select
                                value={t.status}
                                onChange={(e) => handleUpdateTaskStatus(t._id, e.target.value)}
                                className="text-xs px-2 py-1 rounded-md border border-slate-200 bg-white font-medium focus:ring-1 focus:ring-indigo-500"
                              >
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            {isAssignee && (
                              <button
                                onClick={() => {
                                  setProofForm({ taskId: t._id, proofUrl: '', description: '' });
                                  setShowProofModal(true);
                                }}
                                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                              >
                                Submit Proof
                              </button>
                            )}

                            {isLeader && (
                              <button
                                onClick={() => handleDeleteTask(t._id)}
                                className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                                title="Delete task"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                <ListTodo className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No tasks found</p>
                <p className="text-xs text-slate-400">
                  {isLeader
                    ? 'Create tasks to assign deliverables to your team.'
                    : 'No tasks currently scheduled under this filter.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: PROOF SUBMISSIONS */}
        {/* ==================================================== */}
        {activeTab === 'proofs' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Task Proof Submissions</h2>
              </div>

              {isMember && (
                <Button
                  onClick={() => setShowProofModal(true)}
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  iconPosition="left"
                >
                  Submit Proof URL
                </Button>
              )}
            </div>

            {loadingProofs ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Loading task proof submissions...</span>
              </div>
            ) : proofs.length > 0 ? (
              <div className="space-y-3">
                {proofs.map((proof) => (
                  <div
                    key={proof._id}
                    className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                          Task: {proof.task?.title || 'Deliverable'}
                        </span>
                        <div className="text-xs text-slate-500">
                          Submitted by <strong>{proof.student?.name}</strong> ({proof.student?.department}) on{' '}
                          {formatDate(proof.submittedAt)}
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border self-start sm:self-auto ${
                          proof.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : proof.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {proof.status}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">Proof URL:</span>
                        <a
                          href={proof.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline font-mono inline-flex items-center gap-1 truncate max-w-md"
                        >
                          {proof.proofUrl} <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                      <div className="text-slate-600 leading-relaxed">{proof.description}</div>
                    </div>

                    {/* Feedback if available */}
                    {proof.feedback && (
                      <div className="p-3 rounded-lg bg-indigo-50/40 border border-indigo-100 text-xs text-indigo-900 space-y-0.5">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          Reviewer Feedback ({proof.reviewedBy?.name || 'Evaluator'}):
                        </div>
                        <div className="text-slate-700">{proof.feedback}</div>
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={proof.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open Proof
                        </a>

                        {isFaculty && (
                          <button
                            onClick={() => setShowFeedbackModal(true)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
                          >
                            <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-600" />
                            Give Feedback
                          </button>
                        )}
                      </div>

                      {/* Review Actions for Leader & Faculty */}
                      {(isLeader || isFaculty) && proof.status === 'Pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setReviewingProofId(proof._id);
                              setReviewData({ status: 'Approved', feedback: '' });
                            }}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setReviewingProofId(proof._id);
                              setReviewData({ status: 'Rejected', feedback: '' });
                            }}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                <FileCheck2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No proof submissions yet</p>
                <p className="text-xs text-slate-400">
                  Assigned team members can submit URL proofs (e.g. GitHub repos, commit URLs, live demos).
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: CONTRIBUTION TRACKING */}
        {/* ==================================================== */}
        {activeTab === 'contributions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  Team Contribution Overview
                </h2>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Metric: Task Completion
                </span>
              </div>
            </div>

            {loadingContributions ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Computing contribution statistics...</span>
              </div>
            ) : contributions ? (
              <div className="space-y-6">
                {/* Overall Project Progress Card */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                        Overall Deliverables Progress
                      </div>
                      <div className="text-2xl font-black text-slate-900 mt-0.5">
                        {contributions.overallCompletionPercentage}% Completed
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      {contributions.completedTasks} of {contributions.totalTasks} tasks completed
                    </div>
                  </div>

                  <div className="w-full bg-indigo-200/80 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${Math.max(contributions.overallCompletionPercentage, 3)}%` }}
                    />
                  </div>
                </div>

                {/* Per-member Contribution Breakdown */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Team Member Task Completion Breakdown
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contributions.contributions?.map((memberStat) => (
                      <div
                        key={memberStat.user?._id}
                        className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-200">
                              {memberStat.user?.name?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                {memberStat.user?.name}
                                {memberStat.user?.isLeader && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-purple-50 text-purple-700 rounded border border-purple-200">
                                    Leader
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {memberStat.user?.department}
                              </div>
                            </div>
                          </div>

                          <span className="text-lg font-extrabold text-indigo-600">
                            {memberStat.completionPercentage}%
                          </span>
                        </div>

                        {/* Member Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-indigo-600 transition-all duration-500"
                            style={{ width: `${Math.max(memberStat.completionPercentage, 2)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span>Assigned: <strong>{memberStat.assignedTasksCount}</strong></span>
                          <span>Completed: <strong>{memberStat.completedTasksCount}</strong></span>
                          <span>In Progress: <strong>{memberStat.inProgressCount}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Disclaimer Notice */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Task Completion Metric Note:</strong> {contributions.disclaimer}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 7: FACULTY FEEDBACK */}
        {/* ==================================================== */}
        {activeTab === 'feedback' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Faculty Guide Feedback</h2>
              </div>

              {isFaculty && (
                <Button
                  onClick={() => setShowFeedbackModal(true)}
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  iconPosition="left"
                >
                  Add Evaluation
                </Button>
              )}
            </div>

            {loadingFeedback ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Loading faculty evaluations...</span>
              </div>
            ) : feedbacks.length > 0 ? (
              <div className="space-y-4">
                {feedbacks.map((item) => (
                  <div
                    key={item._id}
                    className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                          {item.faculty?.name?.charAt(0) || 'F'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {item.faculty?.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Faculty Guide • {item.faculty?.department} • {formatDate(item.createdAt)}
                          </div>
                        </div>
                      </div>

                      {/* Star Rating Badge */}
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{item.rating} / 5</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 text-sm text-slate-700 leading-relaxed border border-slate-200/60 whitespace-pre-line">
                      {item.comments}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                <MessageSquareQuote className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No faculty evaluations yet</p>
                <p className="text-xs text-slate-400">
                  {isFaculty
                    ? 'Submit your constructive rating and feedback for this capstone project.'
                    : 'Assigned faculty reviews will be recorded here.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 8: ACTIVITY LOG */}
        {/* ==================================================== */}
        {activeTab === 'activity' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Project Activity Timeline</h2>
            </div>

            {loadingActivities ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Loading activity timeline...</span>
              </div>
            ) : activities.length > 0 ? (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {activities.map((act) => (
                  <div key={act._id} className="relative flex items-start gap-3">
                    <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs w-full space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                          {act.action}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {formatDate(act.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{act.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                No recent activity recorded for this project yet.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: CREATE TASK */}
      {/* ==================================================== */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Create & Assign Task</h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement authentication JWT middleware"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Deliverables</label>
                <textarea
                  rows={3}
                  placeholder="Describe expected deliverable requirements..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign To *</label>
                  <select
                    required
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Member</option>
                    {allTeamMembers.map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.name} {m.isLeader ? '(Leader)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submittingTask}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {submittingTask ? 'Creating...' : 'Create Task'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: SUBMIT PROOF URL */}
      {/* ==================================================== */}
      {showProofModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Submit Verification Proof</h3>
              <button
                onClick={() => setShowProofModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Task *</label>
                <select
                  required
                  value={proofForm.taskId}
                  onChange={(e) => setProofForm({ ...proofForm, taskId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select your assigned task</option>
                  {tasks
                    .filter((t) => t.assignedTo?._id === user?._id || t.assignedTo === user?._id)
                    .map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.title} ({t.status})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Proof URL (GitHub commit, repo, or live demo) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/org/repo/commit/..."
                  value={proofForm.proofUrl}
                  onChange={(e) => setProofForm({ ...proofForm, proofUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description of Completed Work *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain the changes made and tests performed..."
                  value={proofForm.description}
                  onChange={(e) => setProofForm({ ...proofForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowProofModal(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="sm" disabled={submittingProof}>
                  {submittingProof ? 'Submitting...' : 'Submit Proof'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: REVIEW PROOF (LEADER / FACULTY) */}
      {/* ==================================================== */}
      {reviewingProofId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Evaluate Proof Submission</h3>
              <button
                onClick={() => setReviewingProofId(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewProof} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Decision *</label>
                <select
                  value={reviewData.status}
                  onChange={(e) => setReviewData({ ...reviewData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Approved">Approve Deliverable</option>
                  <option value="Rejected">Reject Deliverable (Request Revision)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Feedback Comments</label>
                <textarea
                  rows={3}
                  placeholder="Provide evaluation notes or revision instructions..."
                  value={reviewData.feedback}
                  onChange={(e) => setReviewData({ ...reviewData, feedback: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReviewingProofId(null)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="sm" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Save Evaluation'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: FACULTY FEEDBACK */}
      {/* ==================================================== */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Faculty Guide Evaluation</h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFeedback} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating (1 to 5 Stars) *</label>
                <select
                  value={feedbackForm.rating}
                  onChange={(e) =>
                    setFeedbackForm({ ...feedbackForm, rating: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 / 5 - Outstanding)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 / 5 - Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3 / 5 - Satisfactory)</option>
                  <option value={2}>⭐⭐ (2 / 5 - Needs Improvement)</option>
                  <option value={1}>⭐ (1 / 5 - Unsatisfactory)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Evaluation Feedback & Recommendations *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide detailed feedback on project architecture, execution quality, and milestones..."
                  value={feedbackForm.comments}
                  onChange={(e) =>
                    setFeedbackForm({ ...feedbackForm, comments: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submittingFeedback}
                >
                  {submittingFeedback ? 'Submitting...' : 'Post Evaluation'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: INVITE STUDENT (LEADER) */}
      {/* ==================================================== */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Invite Student to Team</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Search & Select Student *
                </label>
                {loadingStudents ? (
                  <div className="p-3 text-center text-slate-500">Loading student directory...</div>
                ) : (
                  <select
                    required
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select eligible candidate</option>
                    {studentsList.map((st) => (
                      <option key={st._id} value={st._id}>
                        {st.name} — {st.department} ({st.skills?.slice(0, 3).join(', ') || 'No skills listed'})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Personal Message</label>
                <textarea
                  rows={2}
                  placeholder="Hey, we'd love for you to join our capstone squad for frontend development..."
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submittingInvite || !selectedStudentId}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {submittingInvite ? 'Sending...' : 'Send Invitation'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
