import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getMyTasks,
  updateTask,
  submitProof,
  getTaskProofs,
} from '../../services/collaborationService';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertCircle,
  FileCheck2,
  Loader2,
  ArrowRight,
  FolderGit2,
  Tag,
  Play,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import Button from '../../components/Button';

export default function StudentTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Modal State for Proof Submission
  const [selectedTaskForProof, setSelectedTaskForProof] = useState(null);
  const [proofForm, setProofForm] = useState({ proofUrl: '', description: '' });
  const [submittingProof, setSubmittingProof] = useState(false);

  // Modal State for Viewing Task Proof History & Feedback
  const [viewingProofTask, setViewingProofTask] = useState(null);
  const [proofHistory, setProofHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getMyTasks();
      if (data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.warn('Failed to load tasks:', err.message);
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to load your assigned tasks.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateStatus = async (taskId, newStatus) => {
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await updateTask(taskId, { status: newStatus });
      if (data.success) {
        setTasks(tasks.map((t) => (t._id === taskId ? data.task : t)));
        setStatusMessage({
          type: 'success',
          text: `Task status updated to "${newStatus}".`,
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update task status.',
      });
    }
  };

  const handleOpenProofModal = (task) => {
    setSelectedTaskForProof(task);
    setProofForm({ proofUrl: '', description: '' });
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();
    if (!proofForm.proofUrl.trim() || !proofForm.description.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in both the proof URL and description.' });
      return;
    }
    setSubmittingProof(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await submitProof(selectedTaskForProof._id, {
        proofUrl: proofForm.proofUrl.trim(),
        description: proofForm.description.trim(),
      });
      if (data.success) {
        setStatusMessage({
          type: 'success',
          text: 'Proof submitted. Waiting for review.',
        });
        setSelectedTaskForProof(null);
        setProofForm({ proofUrl: '', description: '' });
        await fetchTasks();
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit proof.',
      });
    } finally {
      setSubmittingProof(false);
    }
  };

  const handleViewProofHistory = async (task) => {
    setViewingProofTask(task);
    setLoadingHistory(true);
    try {
      const data = await getTaskProofs(task._id);
      if (data.success) {
        setProofHistory(data.proofs || []);
      }
    } catch (err) {
      console.warn('Failed to load task proof history:', err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter === 'All') return true;
    return t.status === statusFilter;
  });

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
    if (!dateStr) return 'No due date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Workload Management
              </span>
              <h1 className="text-2xl font-bold text-slate-900">Your Assigned Tasks</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button to="/student/dashboard" variant="outline" size="sm">
              Dashboard
            </Button>
            <Button to="/projects" variant="primary" size="sm">
              Explore Projects
            </Button>
          </div>
        </div>

        {/* Feedback Alert */}
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
                <CheckCircle2 className="w-4 h-4" />
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

        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          {['All', 'Todo', 'In Progress', 'Completed'].map((filter) => {
            const count =
              filter === 'All'
                ? tasks.length
                : tasks.filter((t) => t.status === filter).length;

            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  statusFilter === filter
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    statusFilter === filter
                      ? 'bg-white text-indigo-600'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Task Cards */}
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
            <Loader2 className="w-7 h-7 animate-spin text-indigo-600" />
            <span>Loading your assigned tasks...</span>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((t) => (
              <div
                key={t._id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{t.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(
                          t.priority
                        )}`}
                      >
                        {t.priority}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          t.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : t.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-3">
                      <span>
                        Project:{' '}
                        <strong className="text-slate-800">
                          {t.project?.title || 'Capstone Project'}
                        </strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Due: {formatDate(t.dueDate)}
                      </span>
                    </div>
                  </div>

                  {/* Actions Header */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <Link
                      to={`/projects/${t.project?._id || t.project}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      View in Project
                    </Link>
                  </div>
                </div>

                {t.description && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
                    {t.description}
                  </div>
                )}

                {/* Bottom Action Toolbar */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">Update Status:</span>
                    {t.status === 'Todo' && (
                      <button
                        onClick={() => handleUpdateStatus(t._id, 'In Progress')}
                        className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition-colors flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        Start Task
                      </button>
                    )}
                    {t.status === 'In Progress' && (
                      <button
                        onClick={() => handleUpdateStatus(t._id, 'Completed')}
                        className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Mark as Completed
                      </button>
                    )}
                    {t.status === 'Completed' && (
                      <button
                        onClick={() => handleUpdateStatus(t._id, 'In Progress')}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reopen
                      </button>
                    )}
                  </div>

                  {/* Proof actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewProofHistory(t)}
                      className="px-3 py-1.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Proof History
                    </button>
                    <button
                      onClick={() => handleOpenProofModal(t)}
                      className="px-3.5 py-1.5 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      Submit Proof
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-dashed border-slate-200 text-center space-y-3">
            <ListTodo className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No tasks assigned yet.</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When your team leader assigns milestone deliverables to you, they will appear here.
            </p>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: SUBMIT PROOF */}
      {/* ==================================================== */}
      {selectedTaskForProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Submit Verification Proof</h3>
                <p className="text-xs text-slate-500">
                  Task: <strong>{selectedTaskForProof.title}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedTaskForProof(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Proof URL (GitHub commit URL, repository, or live demo) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/project/commit/xxxx"
                  value={proofForm.proofUrl}
                  onChange={(e) => setProofForm({ ...proofForm, proofUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Provide a direct URL to verify your implementation.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description of Work Done *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Implemented JWT authentication, tested sign-up and login endpoints..."
                  value={proofForm.description}
                  onChange={(e) => setProofForm({ ...proofForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForProof(null)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
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
      {/* MODAL: PROOF HISTORY & REJECTION FEEDBACK */}
      {/* ==================================================== */}
      {viewingProofTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-scaleUp max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Proof Submissions & Feedback</h3>
                <p className="text-xs text-slate-500">
                  Task: <strong>{viewingProofTask.title}</strong>
                </p>
              </div>
              <button
                onClick={() => setViewingProofTask(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {loadingHistory ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span>Loading proof submissions...</span>
              </div>
            ) : proofHistory.length > 0 ? (
              <div className="space-y-3 text-xs">
                {proofHistory.map((p) => (
                  <div
                    key={p._id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        Submitted on {formatDate(p.submittedAt)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <div className="text-slate-600 flex items-center gap-1 font-mono truncate">
                      <span className="font-semibold text-slate-700">URL:</span>
                      <a
                        href={p.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline truncate"
                      >
                        {p.proofUrl}
                      </a>
                    </div>

                    <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Rejection / Evaluation Feedback */}
                    {p.feedback && (
                      <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-950 space-y-0.5">
                        <div className="font-bold flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-indigo-600" />
                          Reviewer Feedback ({p.reviewedBy?.name || 'Reviewer'}):
                        </div>
                        <div className="text-slate-700">{p.feedback}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                No proof submissions yet for this task.
              </div>
            )}

            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingProofTask(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
