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
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                Active Teams
              </span>
              <h1 className="text-2xl font-bold text-slate-900">My Projects</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button to="/projects" variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Explore Projects
            </Button>
            <Button to="/student/dashboard" variant="outline" size="sm">
              Dashboard
            </Button>
          </div>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-slate-500 text-sm">
            <Loader2 className="w-7 h-7 animate-spin text-purple-600" />
            <span>Loading your joined projects...</span>
          </div>
        ) : joinedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedProjects.map((proj) => {
              const teamSize = 1 + (proj.members?.length || 0);
              return (
                <div
                  key={proj._id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {teamSize} / {proj.maxTeamSize} Members
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {proj.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                      {proj.title}
                    </h3>
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
                    <span className="text-slate-500">
                      Leader: <strong>{proj.leader?.name}</strong>
                    </span>
                    <Link
                      to={`/projects/${proj._id}`}
                      className="text-purple-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-dashed border-slate-200 text-center space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">
              You have not joined any project teams yet.
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Explore available projects to discover initiatives matching your skills, or accept pending invitations.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <Button to="/projects" variant="primary" size="sm">
                Explore Projects
              </Button>
              <Button to="/student/invitations" variant="outline" size="sm">
                View Invitations
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
