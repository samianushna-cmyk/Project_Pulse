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
  Info,
  X
} from 'lucide-react';

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
          text: 'Proof submitted successfully. Waiting for team review.',
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
        return 'bg-[#FBECE3] text-[#C87841] border-[#C87841]/20';
      case 'Medium':
        return 'bg-[#F9F1E2] text-[#8F5E16] border-[#8F5E16]/20';
      case 'Low':
      default:
        return 'bg-[#EAF2E8] text-[#2D452E] border-[#2D452E]/15';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#EAF2E8] text-[#2D452E] border-[#2D452E]/15';
      case 'In Progress':
        return 'bg-[#FBECE3] text-[#C87841] border-[#C87841]/20';
      case 'Todo':
      default:
        return 'bg-[#F2EFE9] text-stone-700 border-stone-200';
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/70 shadow-[0_10px_30px_rgba(28,29,27,0.04)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1E281F] text-white flex items-center justify-center shadow-md shadow-[#1E281F]/15">
              <ListTodo className="w-5 h-5 text-[#FAF8F4]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#60685D] uppercase tracking-wider block">
                WORKLOAD MANAGEMENT
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1D1B] tracking-tight">
                Your Assigned Tasks
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/student/dashboard"
              className="px-4 py-2 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="px-4 py-2 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
            </Link>
          </div>
        </div>

        {/* Feedback Alert */}
        {statusMessage.text && (
          <div
            className={`p-4 rounded-2xl text-xs font-semibold border flex items-center justify-between shadow-xs animate-fade-in ${
              statusMessage.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {statusMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage({ type: '', text: '' })}
              className="text-xs font-bold hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          {['All', 'Todo', 'In Progress', 'Completed'].map((filter) => {
            const count =
              filter === 'All'
                ? tasks.length
                : tasks.filter((t) => t.status === filter).length;

            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === filter
                    ? 'bg-[#1E281F] text-white shadow-xs'
                    : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    statusFilter === filter
                      ? 'bg-white text-[#1E281F]'
                      : 'bg-[#FAF8F4] text-stone-800'
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
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-stone-500 text-sm">
            <Loader2 className="w-7 h-7 animate-spin text-[#1E281F]" />
            <span>Loading your assigned tasks...</span>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((t) => (
              <div
                key={t._id}
                className="p-5 sm:p-6 rounded-2xl border border-stone-200/80 bg-[#FDFCF9] hover:border-stone-400 hover:shadow-md shadow-xs space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#1C1D1B] text-base">{t.title}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(
                          t.priority
                        )}`}
                      >
                        {t.priority}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#525850] flex items-center gap-3">
                      <span>
                        Project:{' '}
                        <strong className="text-[#1C1D1B]">
                          {t.project?.title || 'Capstone Project'}
                        </strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C87841]" />
                        Due: {formatDate(t.dueDate)}
                      </span>
                    </div>
                  </div>

                  {/* Actions Header */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <Link
                      to={`/projects/${t.project?._id || t.project}`}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F2EFE9] text-stone-800 hover:bg-stone-200 transition-colors flex items-center gap-1"
                    >
                      <span>View in Project</span>
                      <ArrowRight className="w-3 h-3 text-[#C87841]" />
                    </Link>
                  </div>
                </div>

                {t.description && (
                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-stone-200 text-xs text-[#525850] leading-relaxed">
                    {t.description}
                  </div>
                )}

                {/* Bottom Action Toolbar */}
                <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 font-medium">Update Status:</span>
                    {t.status === 'Todo' && (
                      <button
                        onClick={() => handleUpdateStatus(t._id, 'In Progress')}
                        className="px-3 py-1.5 rounded-full bg-[#FBECE3] text-[#C87841] border border-[#C87841]/20 hover:bg-[#F7DAC8] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        Start Task
                      </button>
                    )}
                    {t.status === 'In Progress' && (
                      <button
                        onClick={() => handleUpdateStatus(t._id, 'Completed')}
                        className="px-3 py-1.5 rounded-full bg-[#EAF2E8] text-[#2D452E] border border-[#2D452E]/15 hover:bg-[#D8E6D5] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Mark as Completed
                      </button>
                    )}
                    {t.status === 'Completed' && (
                      <button
                        onClick={() => handleUpdateStatus(t._id, 'In Progress')}
                        className="px-3 py-1.5 rounded-full bg-[#F2EFE9] text-stone-700 hover:bg-stone-200 font-bold transition-colors flex items-center gap-1 cursor-pointer"
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
                      className="px-3 py-1.5 rounded-full font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      Proof History
                    </button>
                    <button
                      onClick={() => handleOpenProofModal(t)}
                      className="px-4 py-1.5 rounded-full font-bold bg-[#1E281F] text-white hover:bg-[#151D16] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-[#C87841]" />
                      Submit Proof
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-3 bg-[#FAF8F4]/50">
            <ListTodo className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-sm font-bold text-[#1C1D1B]">No tasks assigned yet.</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              When your team leader assigns milestone deliverables to you, they will appear here.
            </p>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: SUBMIT PROOF */}
      {/* ==================================================== */}
      {selectedTaskForProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-[#1C1D1B]">Submit Verification Proof</h3>
                <p className="text-xs text-[#525850]">
                  Task: <strong className="text-[#1C1D1B]">{selectedTaskForProof.title}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedTaskForProof(null)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Proof URL (GitHub commit URL, repository, or live demo) <span className="text-[#C87841]">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/project/commit/xxxx"
                  value={proofForm.proofUrl}
                  onChange={(e) => setProofForm({ ...proofForm, proofUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-stone-300 text-sm text-[#1C1D1B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841]"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Provide a direct URL to verify your implementation.
                </p>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Description of Work Done <span className="text-[#C87841]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Implemented JWT authentication, tested sign-up and login endpoints..."
                  value={proofForm.description}
                  onChange={(e) => setProofForm({ ...proofForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-stone-300 text-sm text-[#1C1D1B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C87841]/20 focus:border-[#C87841]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForProof(null)}
                  className="px-4 py-2 rounded-full font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingProof}
                  className="px-5 py-2 rounded-full font-bold bg-[#1E281F] hover:bg-[#151D16] text-white shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submittingProof ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C87841]" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck2 className="w-3.5 h-3.5 text-[#C87841]" />
                      <span>Submit Proof</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: PROOF HISTORY & REJECTION FEEDBACK */}
      {/* ==================================================== */}
      {viewingProofTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-[#1C1D1B]">Proof Submissions & Feedback</h3>
                <p className="text-xs text-[#525850]">
                  Task: <strong className="text-[#1C1D1B]">{viewingProofTask.title}</strong>
                </p>
              </div>
              <button
                onClick={() => setViewingProofTask(null)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {loadingHistory ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-stone-500 text-sm">
                <Loader2 className="w-6 h-6 animate-spin text-[#1E281F]" />
                <span>Loading proof submissions...</span>
              </div>
            ) : proofHistory.length > 0 ? (
              <div className="space-y-3 text-xs">
                {proofHistory.map((p) => (
                  <div
                    key={p._id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#FDFCF9] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1C1D1B]">
                        Submitted on {formatDate(p.submittedAt)}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.status === 'Approved'
                            ? 'bg-[#EAF2E8] text-[#2D452E] border-[#2D452E]/15'
                            : p.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-[#FBECE3] text-[#C87841] border-[#C87841]/20'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <div className="text-stone-600 flex items-center gap-1 font-mono truncate">
                      <span className="font-semibold text-stone-700">URL:</span>
                      <a
                        href={p.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C87841] hover:underline truncate"
                      >
                        {p.proofUrl}
                      </a>
                    </div>

                    <p className="text-stone-700 bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Rejection / Evaluation Feedback */}
                    {p.feedback && (
                      <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#C87841]/30 text-stone-800 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-[#C87841]">
                          <Info className="w-3.5 h-3.5 text-[#C87841]" />
                          Reviewer Feedback ({p.reviewedBy?.name || 'Reviewer'}):
                        </div>
                        <div className="text-stone-700">{p.feedback}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-stone-500 bg-[#FAF8F4] rounded-2xl">
                No proof submissions yet for this task.
              </div>
            )}

            <div className="flex items-center justify-end pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setViewingProofTask(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
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
