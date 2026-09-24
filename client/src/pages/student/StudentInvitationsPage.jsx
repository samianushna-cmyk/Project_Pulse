import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getInvitations,
  acceptInvitation,
  rejectInvitation,
} from '../../services/collaborationService';
import {
  MailQuestion,
  CheckCircle2,
  XCircle,
  Clock,
  Building,
  User,
  FolderGit2,
  Loader2,
  AlertCircle,
  ArrowRight,
  Shield,
  Check,
  X
} from 'lucide-react';
import Button from '../../components/Button';

export default function StudentInvitationsPage() {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [filter, setFilter] = useState('Pending');

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const data = await getInvitations();
      if (data.success && Array.isArray(data.invitations)) {
        setInvitations(data.invitations);
      }
    } catch (err) {
      console.warn('Failed to fetch invitations:', err.message);
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to load invitations.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleAccept = async (id) => {
    setProcessingId(id);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await acceptInvitation(id);
      if (data.success) {
        setStatusMessage({
          type: 'success',
          text: 'Invitation accepted! You are now an active team member on this project.',
        });
        await fetchInvitations();
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to accept invitation.',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    setStatusMessage({ type: '', text: '' });
    try {
      const data = await rejectInvitation(id);
      if (data.success) {
        setStatusMessage({
          type: 'success',
          text: 'Invitation declined.',
        });
        await fetchInvitations();
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to decline invitation.',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const pendingList = invitations.filter((i) => i.status === 'Pending');
  const acceptedList = invitations.filter((i) => i.status === 'Accepted');
  const rejectedList = invitations.filter((i) => i.status === 'Rejected');

  const displayedList =
    filter === 'Pending'
      ? pendingList
      : filter === 'Accepted'
      ? acceptedList
      : filter === 'Rejected'
      ? rejectedList
      : invitations;

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <MailQuestion className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Team Recruitment
              </span>
              <h1 className="text-2xl font-bold text-slate-900">Project Invitations</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button to="/projects" variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              Explore Projects
            </Button>
            <Button to="/student/dashboard" variant="outline" size="sm">
              Dashboard
            </Button>
          </div>
        </div>

        {/* Feedback notification */}
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

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => setFilter('Pending')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'Pending'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Pending</span>
            {pendingList.length > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  filter === 'Pending' ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {pendingList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilter('Accepted')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'Accepted'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Accepted</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                filter === 'Accepted' ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {acceptedList.length}
            </span>
          </button>

          <button
            onClick={() => setFilter('Rejected')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'Rejected'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Declined</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                filter === 'Rejected' ? 'bg-white text-indigo-600' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {rejectedList.length}
            </span>
          </button>
        </div>

        {/* Invitations List */}
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
            <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
            <span>Loading your invitations...</span>
          </div>
        ) : displayedList.length > 0 ? (
          <div className="space-y-4">
            {displayedList.map((inv) => {
              const isPending = inv.status === 'Pending';
              const isAccepted = inv.status === 'Accepted';
              const isProcessing = processingId === inv._id;

              return (
                <div
                  key={inv._id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs space-y-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">
                          {inv.project?.title || 'Capstone Project'}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isPending
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : isAccepted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-3">
                        <span>
                          Invited by <strong>{inv.sender?.name || 'Project Leader'}</strong> (
                          {inv.sender?.department || 'Engineering'})
                        </span>
                        <span>•</span>
                        <span>{formatDate(inv.createdAt)}</span>
                      </div>
                    </div>

                    {/* Action buttons for Pending */}
                    {isPending && (
                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1 sm:pt-0">
                        <button
                          onClick={() => handleAccept(inv._id)}
                          disabled={isProcessing}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(inv._id)}
                          disabled={isProcessing}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Decline
                        </button>
                      </div>
                    )}

                    {isAccepted && (
                      <Link
                        to={`/projects/${inv.project?._id || inv.project}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1 self-start sm:self-auto shrink-0"
                      >
                        Open Project <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {inv.message && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 leading-relaxed italic">
                      "{inv.message}"
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
                      Category: <strong>{inv.project?.category || 'Capstone'}</strong>
                    </span>
                    <Link
                      to={`/projects/${inv.project?._id || inv.project}`}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      View Project Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-dashed border-slate-200 text-center space-y-3">
            <MailQuestion className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">
              {filter === 'Pending'
                ? 'No pending invitations.'
                : `No ${filter.toLowerCase()} invitations found.`}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When project leaders invite you to join their capstone squad based on your skills, invitations will appear here.
            </p>
            <div className="pt-2">
              <Button to="/projects" variant="primary" size="sm">
                Explore Open Projects
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
