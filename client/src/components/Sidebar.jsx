import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderPlus,
  FolderGit2,
  Users,
  Sparkles,
  MailQuestion,
  ListTodo,
  User,
  GraduationCap,
  LogOut,
  Compass,
  FileCheck2,
  Activity,
  X
} from 'lucide-react';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (setMobileOpen) setMobileOpen(false);
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/projects' && location.pathname.startsWith('/projects')) {
      return true;
    }
    return location.pathname === path;
  };

  // Define role-specific navigation routes
  const getNavItems = () => {
    const role = user?.role?.toLowerCase();

    if (role === 'leader') {
      return [
        { label: 'Dashboard', path: '/leader/dashboard', icon: LayoutDashboard },
        { label: 'Create Project', path: '/leader/projects/create', icon: FolderPlus },
        { label: 'Explore Projects', path: '/projects', icon: Compass },
      ];
    }

    if (role === 'faculty') {
      return [
        { label: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
        { label: 'Explore Directory', path: '/projects', icon: Compass },
      ];
    }

    // Default: Student
    return [
      { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      { label: 'My Profile', path: '/student/profile', icon: User },
      { label: 'Explore Projects', path: '/projects', icon: Compass },
      { label: 'My Projects', path: '/student/projects', icon: FolderGit2 },
      { label: 'Invitations', path: '/student/invitations', icon: MailQuestion },
      { label: 'Tasks', path: '/student/tasks', icon: ListTodo },
    ];
  };

  const navItems = getNavItems();

  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'leader':
        return 'bg-[#C87841]/20 text-[#DDA37B] border-[#C87841]/30';
      case 'faculty':
        return 'bg-[#D4A054]/20 text-[#E8C28A] border-[#D4A054]/30';
      case 'student':
      default:
        return 'bg-[#EAF2E8]/15 text-[#BBD7B7] border-[#EAF2E8]/20';
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#162017] text-[#FAF8F4] border-r border-[#263428]">
      {/* Top Header & Brand */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to={
              user?.role === 'leader'
                ? '/leader/dashboard'
                : user?.role === 'faculty'
                ? '/faculty/dashboard'
                : '/student/dashboard'
            }
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#223023] border border-[#344636] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg
                className="w-5 h-5 text-[#FAF8F4]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h3.5l2.5-6 4 12 2.5-6H20" />
                <circle cx="12" cy="12" r="1.5" fill="#C87841" stroke="#C87841" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#FAF8F4] leading-none">
                Project<span className="text-[#C87841]">Pulse</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#8F9E8D] uppercase font-semibold mt-1">
                SKILL-BASED COLLABORATION
              </span>
            </div>
          </Link>

          {/* Mobile Close Button */}
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-[#8F9E8D] hover:text-white hover:bg-[#263428] md:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Section Label */}
        <div className="pt-2">
          <span className="text-[10px] font-mono tracking-wider uppercase text-[#738371] font-semibold block px-3">
            WORKSPACE NAVIGATION
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-[#FAF8F4] text-[#162017] shadow-sm font-bold'
                    : 'text-[#D5DDD3] hover:text-white hover:bg-[#233224]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    active ? 'text-[#C87841]' : 'text-[#C87841]'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile & Logout Bottom Card */}
      <div className="p-4 m-4 rounded-2xl bg-[#1E2B1F] border border-[#2B3C2D] space-y-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#28392A] border border-[#394F3C] flex items-center justify-center text-[#FAF8F4] font-bold text-xs uppercase shadow-xs shrink-0">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'PP'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#FAF8F4] truncate">
              {user?.name || 'Academic User'}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`inline-block px-2 py-0.2 rounded-full text-[9px] font-mono uppercase font-bold border ${getRoleBadgeStyle(
                  user?.role
                )}`}
              >
                {user?.role || 'Student'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-xl bg-[#162017] hover:bg-[#121A13] border border-[#263428] text-xs font-semibold text-[#D5DDD3] hover:text-rose-400 hover:border-rose-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5 text-[#C87841]" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-4/5 max-w-xs h-full z-50 shadow-2xl animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
