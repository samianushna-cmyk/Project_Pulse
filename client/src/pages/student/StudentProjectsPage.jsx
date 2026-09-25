import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';
import {
  FolderGit2,
  Users,
  Tag,
  ArrowRight,
  Loader2,
  Sparkles,
  Building,
  CheckCircle,
  Clock
} from 'lucide-react';
import Button from '../../components/Button';

export default function StudentProjectsPage() {
  const { user } = useAuth();
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?._id || user?.id;

  useEffect(() => {
    const fetchJoinedProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjects();
        if (data.success && Array.isArray(data.projects)) {
          const myJoined = data.projects.filter((p) => {
            if (Array.isArray(p.members)) {
              return p.members.some((m) => {
                const mId = m?._id || m?.id || m;
                return (
                  (mId && userId && mId.toString() === userId.toString()) ||
                  (m?.email && user?.email && m.email === user.email)
                );
              });
            }
            return false;
          });
          setJoinedProjects(myJoined);
        }
      } catch (err) {
        console.warn('Failed to fetch joined projects:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchJoinedProjects();
    } else {
      const timeout = setTimeout(() => {
        if (!userId) setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [userId, user?.email]);

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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/70 shadow-[0_10px_30px_rgba(28,29,27,0.04)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1E281F] text-white flex items-center justify-center shadow-md shadow-[#1E281F]/15">
              <FolderGit2 className="w-5 h-5 text-[#FAF8F4]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#60685D] uppercase tracking-wider block">
                Active Teams
              </span>
              <h1 className="text-2xl font-bold text-[#1C1D1B] tracking-tight">My Projects</h1>
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

        {/* Projects List */}
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-stone-500 text-sm">
            <Loader2 className="w-7 h-7 animate-spin text-[#1E281F]" />
            <span>Loading your joined projects...</span>
          </div>
        ) : joinedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {joinedProjects.map((proj) => {
              const teamSize = 1 + (proj.members?.length || 0);
              return (
                <div
                  key={proj._id}
                  className="p-5 rounded-2xl border border-stone-200/80 bg-[#FDFCF9] hover:border-stone-400 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#2D452E] bg-[#EAF2E8] px-2.5 py-0.5 rounded-full border border-[#2D452E]/15">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-stone-700 bg-[#F2EFE9] px-2.5 py-0.5 rounded-full border border-stone-200">
                          {teamSize} / {proj.maxTeamSize} Members
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {proj.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-[#1C1D1B] text-base line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#525850] line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.requiredSkills?.slice(0, 3).map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F2EFE9] text-stone-800 border border-stone-300/60"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs">
                    <span className="text-stone-600">
                      Leader: <strong className="text-[#1C1D1B]">{proj.leader?.name}</strong>
                    </span>
                    <Link
                      to={`/projects/${proj._id}`}
                      className="px-3.5 py-1.5 rounded-full bg-[#1E281F] text-white font-semibold hover:bg-[#151D16] shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-dashed border-stone-300 text-center space-y-3 bg-[#FAF8F4]/50">
            <FolderGit2 className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-sm font-bold text-[#1C1D1B]">
              You have not joined any project teams yet.
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Explore available projects to discover initiatives matching your skills, or accept pending invitations.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2.5">
              <Link
                to="/projects"
                className="px-5 py-2.5 rounded-full bg-[#1E281F] hover:bg-[#151D16] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C87841]" />
              </Link>
              <Link
                to="/student/invitations"
                className="px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all"
              >
                View Invitations
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
