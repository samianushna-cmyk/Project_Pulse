import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, GraduationCap, ShieldCheck } from 'lucide-react';
import TactileHero3D, { FloatingEditorialStamp } from './TactileHero3D';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 pb-14 overflow-hidden bg-[#FAF8F4] text-[#1C1D1B]">
      
      {/* Background Soft Studio Ambient Gradients (No neon, No flat dot grids) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial-warm pointer-events-none opacity-80 z-0" />
      <div className="absolute top-1/4 left-1/12 w-[350px] h-[350px] bg-[#1E281F]/5 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/12 w-[350px] h-[350px] bg-[#C87841]/6 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
        
        {/* ======================================================== */}
        {/* 1. EDITORIAL HERO HEADER                                */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
          
          {/* Subtle Top Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFEB] border border-black/5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E281F] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-[#454743]">
              SKILL-BASED ACADEMIC ECOSYSTEM
            </span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#1C1D1B]">
            Build Better Student Teams.{' '}
            <span className="font-serif italic font-normal text-[#C87841] tracking-normal block sm:inline">
              Track Real Project Impact.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg md:text-xl text-[#454743] max-w-3xl mx-auto leading-relaxed font-normal pt-1">
            Stop relying on random WhatsApp groups and chaotic spreadsheets. ProjectPulse connects students via{' '}
            <strong className="text-[#1C1D1B] font-semibold">explainable skill matching</strong>, enforces{' '}
            <strong className="text-[#1C1D1B] font-semibold">proof-backed task accountability</strong>, and gives{' '}
            <strong className="text-[#1C1D1B] font-semibold">faculty full visibility</strong>.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. 3D FOCAL CENTERPIECE & BALANCED TACTICAL CARDS       */}
        {/* ======================================================== */}
        <div className="relative mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-center w-full">
          
          {/* Floating Editorial Stamp - Anchored to upper-right corner of hero stage container with zero overlap */}
          <div 
            className="hidden lg:block absolute -top-10 right-2 z-30 pointer-events-auto"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <FloatingEditorialStamp />
          </div>

          {/* LEFT CARD: Feature Pill / Card (Skill-Complementary Matching) with Smooth Physics & Parallax */}
          <div 
            className="lg:col-span-3 order-2 lg:order-1 relative z-20 pointer-events-auto"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            <div className="animate-float-left-45 card-tactile card-tactile-hover p-5 sm:p-6 rounded-3xl space-y-4">
              
              {/* Header with Icon */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#E7EDE5] text-[#1E281F] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#1E281F]" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FAF3EE] text-[#C87841] border border-[#C87841]/20">
                  98% MATCH
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#1C1D1B] tracking-tight">
                  Skill-Complementary Matching
                </h2>
                <p className="text-xs text-[#72756E] leading-relaxed mt-1">
                  Teammates matched by verified technical stack and project needs.
                </p>
              </div>

              {/* Visual: Diverse Student Avatar Rings with Skill Tags */}
              <div className="pt-2 border-t border-black/5 space-y-3">
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#1E281F] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    SK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#4A5A48] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    AR
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#C87841] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    TN
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F4] border-2 border-black/10 flex items-center justify-center text-[10px] font-bold text-[#454743] shadow-sm">
                    +4
                  </div>
                </div>

                {/* Skill Pills Cluster */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF8F4] text-[#454743] border border-black/5">
                    React
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF8F4] text-[#454743] border border-black/5">
                    Node.js
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF8F4] text-[#454743] border border-black/5">
                    Python
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#FAF3EE] text-[#C87841] border border-[#C87841]/20">
                    UI/UX
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* CENTER 3D STAGE with Parallax Drift */}
          <div 
            className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center relative z-10 pointer-events-none"
            style={{ transform: `translateY(${scrollY * 0.06}px)` }}
          >
            <div className="w-full">
              <TactileHero3D />
            </div>
          </div>

          {/* RIGHT CARD: Live Metrics Pill / Card with Smooth Physics & Parallax */}
          <div 
            className="lg:col-span-3 order-3 lg:order-3 relative z-20 pointer-events-auto"
            style={{ transform: `translateY(${scrollY * -0.07}px)` }}
          >
            <div className="animate-float-right-45 card-tactile card-tactile-hover p-5 sm:p-6 rounded-3xl space-y-4">
              
              <div className="flex items-center justify-between pb-1 border-b border-black/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#72756E] font-semibold">
                  LIVE BENCHMARKS
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#1E281F] bg-[#E7EDE5] px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E281F] animate-ping" />
                  VERIFIED
                </span>
              </div>

              {/* Metric 1: 100+ Teams Formed */}
              <div className="flex items-center gap-3.5 pt-1">
                <div className="w-9 h-9 rounded-2xl bg-[#E7EDE5] text-[#1E281F] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-[#1E281F]" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#1C1D1B] tracking-tight leading-none">
                    100+
                  </div>
                  <div className="text-xs text-[#72756E] font-medium mt-0.5">
                    Teams Formed
                  </div>
                </div>
              </div>

              {/* Metric 2: 95% Task Accountability */}
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FAF3EE] text-[#C87841] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#C87841]" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#1C1D1B] tracking-tight leading-none">
                    95%
                  </div>
                  <div className="text-xs text-[#72756E] font-medium mt-0.5">
                    Task Accountability
                  </div>
                </div>
              </div>

              {/* Metric 3: 10+ Faculty Mentors */}
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-[#F4EFEB] text-[#454743] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-[#454743]" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#1C1D1B] tracking-tight leading-none">
                    10+
                  </div>
                  <div className="text-xs text-[#72756E] font-medium mt-0.5">
                    Faculty Mentors
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. CALL TO ACTION (BOTTOM CENTER)                       */}
        {/* ======================================================== */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center space-y-5 text-center relative z-20 pointer-events-auto">
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            {/* Primary Button */}
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm text-white bg-[#1E281F] hover:bg-[#151D16] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Get Started →</span>
            </Link>

            {/* Secondary Button */}
            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-medium text-sm text-[#1C1D1B] bg-white/90 hover:bg-white border border-black/10 shadow-sm hover:border-[#1E281F]/30 transition-all duration-200 flex items-center justify-center"
            >
              Log in to Account
            </Link>
          </div>

          {/* Bottom Feature Checklist */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#72756E] font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <span className="text-[#1E281F] font-bold">✓</span> Skill-Complementary Matching
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#1E281F] font-bold">✓</span> Proof-of-Work Verification
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#1E281F] font-bold">✓</span> Direct Faculty Mentor Portals
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
