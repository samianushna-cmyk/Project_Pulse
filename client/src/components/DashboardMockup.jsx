import React from 'react';
import {
  CheckCircle2,
  Clock,
  FileCheck,
  Flame,
  GitBranch,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Check
} from 'lucide-react';

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-indigo-500/20 via-indigo-500/5 to-transparent border border-indigo-200/50 shadow-2xl backdrop-blur-sm">
      {/* Top Application Frame */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 text-slate-100 overflow-hidden shadow-2xl">
        {/* Mock Browser/App Header Bar */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
              projectpulse.app/workspace/capstone-2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Synced
            </span>
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
              PP
            </div>
          </div>
        </div>

        {/* Dashboard Main Body */}
        <div className="p-4 sm:p-6 space-y-5 bg-slate-900/90">
          {/* Project Summary Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Senior Capstone Project
                </span>
                <span className="text-xs text-slate-400">ID: CS-2026-T14</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Autonomous Campus Navigation & Mapping System
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Department of Computer Science & Engineering • Faculty Guide: Dr. Anita Sharma
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-right sm:text-left lg:text-right">
                <div className="text-xs text-slate-400">Overall Milestone Progress</div>
                <div className="text-lg font-bold text-emerald-400">78% Complete</div>
              </div>
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-700"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-500"
                    strokeDasharray="78, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white">78%</span>
              </div>
            </div>
          </div>

          {/* Grid Layout: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Skill Compatibility & Team Radar */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Skill-Match Score
                </span>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/50">
                  94% Match
                </span>
              </div>

              <p className="text-xs text-slate-400">
                AI analyzed required skills vs member verified skill profiles:
              </p>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Computer Vision (YOLOv8)</span>
                    <span className="text-emerald-400 font-medium">98% (Assigned: Rahul)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">FastAPI & Backend</span>
                    <span className="text-emerald-400 font-medium">92% (Assigned: Alex)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">React & Interactive Map UI</span>
                    <span className="text-emerald-400 font-medium">95% (Assigned: Priya)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                <span>Team Balance:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Fully Covered
                </span>
              </div>
            </div>

            {/* Column 2: Live Sprint & Proof Submission */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Active Tasks & Proofs
                </span>
                <span className="text-[11px] text-slate-400">Sprint 3</span>
              </div>

              <div className="space-y-2.5">
                {/* Task Card 1 */}
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Pathfinding Graph A* Engine</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Proof Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Assigned: Priya K.</span>
                    <span className="text-indigo-400 font-mono text-[10px]">PR #24 + Benchmarks</span>
                  </div>
                </div>

                {/* Task Card 2 */}
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-indigo-500/40 text-xs space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">LiDAR Point-Cloud Ingestion</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                      Review Pending
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Assigned: Rahul S.</span>
                    <span className="text-amber-400 text-[10px]">1 Video Proof Attached</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero unverified tasks allowed in final report</span>
              </div>
            </div>

            {/* Column 3: Individual Contribution & Faculty Visibility */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Individual Contribution
                </span>
                <span className="text-[11px] text-slate-400">Equal Weight</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Priya K. (Leader)</span>
                    <span className="font-bold text-white">28% (14 tasks)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Alex M.</span>
                    <span className="font-bold text-white">25% (12 tasks)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Rahul S.</span>
                    <span className="font-bold text-white">26% (13 tasks)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '26%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-0.5">
                    <span>Meera T.</span>
                    <span className="font-bold text-white">21% (10 tasks)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-indigo-700 h-1.5 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>
              </div>

              {/* Faculty guide verdict badge */}
              <div className="mt-2 p-2 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-[11px] text-indigo-200 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">Faculty status: <strong>Milestone 2 Approved</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
