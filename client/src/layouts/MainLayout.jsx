import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';
import { useAuth } from '../context/AuthContext';
import { Menu, User, LogOut } from 'lucide-react';

export default function MainLayout() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/register';

  // 1. Landing Page View
  if (isLandingPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#1B1C1A] selection:bg-[#CFDBCB] selection:text-[#1B1C1A]">
        <LandingNavbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <LandingFooter />
      </div>
    );
  }

  // 2. Auth Pages (Login / Register) View
  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F4] bg-[radial-gradient(ellipse_80%_70%_at_10%_-10%,rgba(227,235,225,0.45),rgba(255,255,255,0)),radial-gradient(ellipse_60%_60%_at_90%_35%,rgba(247,236,225,0.4),rgba(255,255,255,0)),radial-gradient(ellipse_70%_60%_at_20%_90%,rgba(242,239,233,0.6),rgba(255,255,255,0))] text-[#1C1D1B] selection:bg-[#CFDBCB] selection:text-[#1C1D1B]">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  // 3. Authenticated Workspace View (Persistent Left Sidebar + Main Content)
  return (
    <div className="min-h-screen flex bg-[#FAF8F4] bg-[radial-gradient(ellipse_80%_70%_at_10%_-10%,rgba(227,235,225,0.45),rgba(255,255,255,0)),radial-gradient(ellipse_60%_60%_at_90%_35%,rgba(247,236,225,0.4),rgba(255,255,255,0)),radial-gradient(ellipse_70%_60%_at_20%_90%,rgba(242,239,233,0.6),rgba(255,255,255,0))] text-[#1C1D1B] selection:bg-[#CFDBCB] selection:text-[#1C1D1B]">
      {/* Left Sidebar */}
      {isAuthenticated && (
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />
      )}

      {/* Main Workspace Flow */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header with Hamburger when authenticated */}
        {isAuthenticated && (
          <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#FAF8F4]/90 backdrop-blur-md border-b border-stone-200">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 border border-stone-200"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-[#162017]" />
            </button>
            <span className="font-bold text-sm text-[#1C1D1B]">
              Project<span className="text-[#C87841]">Pulse</span>
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#1E281F] text-[#FAF8F4] flex items-center justify-center text-xs font-bold">
              {user?.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
            </div>
          </div>
        )}

        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}


