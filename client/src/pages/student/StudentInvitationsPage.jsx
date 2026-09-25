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
  X,
  Sparkles
} from 'lucide-react';

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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/70 shadow-[0_10px_30px_rgba(28,29,27,0.04)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1E281F] text-white flex items-center justify-center shadow-md shadow-[#1E281F]/15">
              <MailQuestion className="w-5 h-5 text-[#FAF8F4]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#60685D] uppercase tracking-wider block">
                TEAM RECRUITMENT
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1D1B] tracking-tight">
                Project Invitations
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/projects"
              className="px-4 py-2 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
            </Link>
            <Link
              to="/student/dashboard"
              className="px-4 py-2 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Feedback notification */}
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

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <button
            onClick={() => setFilter('Pending')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'Pending'
                ? 'bg-[#C87841] text-white shadow-xs'
                : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>Pending</span>
            {pendingList.length > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  filter === 'Pending' ? 'bg-white text-[#C87841]' : 'bg-[#FAF8F4] text-stone-800'
                }`}
              >
                {pendingList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilter('Accepted')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'Accepted'
                ? 'bg-[#1E281F] text-white shadow-xs'
                : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>Accepted</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                filter === 'Accepted' ? 'bg-white text-[#1E281F]' : 'bg-[#FAF8F4] text-stone-800'
              }`}
            >
              {acceptedList.length}
            </span>
          </button>

          <button
            onClick={() => setFilter('Rejected')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'Rejected'
                ? 'bg-[#1E281F] text-white shadow-xs'
                : 'bg-[#F2EFE9] text-stone-700 hover:bg-stone-200'
            }`}
          >
            <span>Declined</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                filter === 'Rejected' ? 'bg-white text-[#1E281F]' : 'bg-[#FAF8F4] text-stone-800'
              }`}
            >
              {rejectedList.length}
            </span>
          </button>
        </div>

        {/* Invitations List */}
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-stone-500 text-sm">
            <Loader2 className="w-7 h-7 animate-spin text-[#1E281F]" />
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
                  className="p-5 sm:p-6 rounded-2xl border border-stone-200/80 bg-[#FDFCF9] hover:border-stone-400 hover:shadow-md space-y-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#1C1D1B] text-base">
                          {inv.project?.title || 'Capstone Project'}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isPending
                              ? 'bg-[#FBECE3] text-[#C87841] border-[#C87841]/20'
                              : isAccepted
                              ? 'bg-[#EAF2E8] text-[#2D452E] border-[#2D452E]/15'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#525850] flex items-center gap-3">
                        <span>
                          Invited by <strong className="text-[#1C1D1B]">{inv.sender?.name || 'Project Leader'}</strong> (
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
                          className="px-4 py-2 rounded-full text-xs font-bold bg-[#1E281F] text-white hover:bg-[#151D16] transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C87841]" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-[#C87841]" />
                          )}
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(inv._id)}
                          disabled={isProcessing}
                          className="px-4 py-2 rounded-full text-xs font-bold bg-[#F2EFE9] text-stone-700 hover:bg-stone-200 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Decline
                        </button>
                      </div>
                    )}

                    {isAccepted && (
                      <Link
                        to={`/projects/${inv.project?._id || inv.project}`}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-[#1E281F] text-white hover:bg-[#151D16] transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
                      >
                        <span>Open Project</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
                      </Link>
                    )}
                  </div>

                  {inv.message && (
                    <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-stone-200 text-xs text-[#525850] leading-relaxed italic">
                      "{inv.message}"
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#60685D]" />
                      Category: <strong className="text-[#1C1D1B]">{inv.project?.category || 'Capstone'}</strong>
                    </span>
                    <Link
                      to={`/projects/${inv.project?._id || inv.project}`}
                      className="text-[#C87841] hover:text-[#A35222] font-semibold flex items-center gap-1"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-3 bg-[#FAF8F4]/50">
            <MailQuestion className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-sm font-bold text-[#1C1D1B]">
              {filter === 'Pending'
                ? 'No pending invitations.'
                : `No ${filter.toLowerCase()} invitations found.`}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              When project leaders invite you to join their capstone squad based on your skills, invitations will appear here.
            </p>
            <div className="pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <span>Explore Open Projects</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
