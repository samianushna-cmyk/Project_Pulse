import React from 'react';
import { GraduationCap, Eye, Award, MessageSquare, CheckCircle, BarChart3, Users, FolderGit2 } from 'lucide-react';

export default function FacultySection() {
  return (
    <section id="faculty" className="relative py-24 sm:py-32 bg-[#F4EFEB] text-[#1C1D1B] overflow-hidden border-t border-[#1C1D1B]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7EDE5] border border-[#2B3A2C]/15 text-xs font-mono font-semibold text-[#2B3A2C]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC MENTORSHIP & EVALUATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1C1D1B]">
            Give Faculty Visibility Into <br />
            <span className="font-serif italic font-normal text-[#C87841]">Real Student Work</span>
          </h2>

          <p className="text-base sm:text-lg text-[#575955] leading-relaxed">
            Faculty can monitor project progress, review submitted proof, and provide meaningful guidance—without chasing WhatsApp groups or messy spreadsheet logs.
          </p>
        </div>

        {/* Faculty Cockpit Preview Visual */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl card-tactile p-6 sm:p-8 shadow-tactile-lg space-y-6">
          {/* Cockpit Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1C1D1B]/8 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7EDE5] border border-[#2B3A2C]/20 flex items-center justify-center text-[#2B3A2C]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1C1D1B]">Faculty Guide Mentorship Hub</h4>
                <p className="text-xs text-[#72756E]">Department of Computer Science & Engineering</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-white text-[#1C1D1B] border border-[#1C1D1B]/10 shadow-sm">
                Active Capstones: <strong className="text-[#2B3A2C]">12 Teams</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FAF3EE] text-[#C87841] border border-[#C87841]/20 font-semibold">
                Proofs Awaiting Review: <strong>4</strong>
              </span>
            </div>
          </div>

          {/* Cockpit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Column 1: Projects Overview */}
            <div className="rounded-2xl bg-[#FAF8F4] border border-[#1C1D1B]/8 p-5 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#72756E] uppercase">
                <span className="flex items-center gap-1.5 font-bold text-[#1C1D1B]">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#2B3A2C]" />
                  Projects & Teams
                </span>
                <span className="text-[#C87841] font-semibold">Batch '26</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'Campus Connect', lead: 'Alex K.', members: 4, progress: 78 },
                  { name: 'Autonomous Drone Nav', lead: 'Rohan M.', members: 5, progress: 65 },
                  { name: 'Fintech Micro-Loans', lead: 'Sarah C.', members: 4, progress: 90 },
                ].map((proj) => (
                  <div key={proj.name} className="p-3 rounded-xl bg-white border border-[#1C1D1B]/8 text-xs space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between text-[#1C1D1B] font-semibold">
                      <span>{proj.name}</span>
                      <span className="text-[#2B3A2C] font-mono text-[11px] font-bold">{proj.progress}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#72756E]">
                      <span>Lead: {proj.lead}</span>
                      <span>{proj.members} Members</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Recent Submitted Proofs */}
            <div className="rounded-2xl bg-[#FAF8F4] border border-[#1C1D1B]/8 p-5 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#72756E] uppercase">
                <span className="flex items-center gap-1.5 font-bold text-[#1C1D1B]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2B3A2C]" />
                  Task Proof Logs
                </span>
                <span className="text-[#2B3A2C] font-semibold">Live</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { task: 'Database Schema Design', student: 'Dev P.', type: 'ER Diagram & SQL', status: 'Approved' },
                  { task: 'Auth Middleware Route', student: 'Sarah C.', type: 'GitHub Commit', status: 'Approved' },
                  { task: 'UI Wireframes v2', student: 'Sara L.', type: 'Figma Prototype', status: 'Reviewing' },
                ].map((proof) => (
                  <div key={proof.task} className="p-3 rounded-xl bg-white border border-[#1C1D1B]/8 text-xs space-y-1 shadow-sm">
                    <div className="flex items-center justify-between text-[#1C1D1B] font-medium">
                      <span className="truncate max-w-[130px]">{proof.task}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${proof.status === 'Approved' ? 'bg-[#E7EDE5] text-[#2B3A2C]' : 'bg-[#FAF3EE] text-[#C87841]'}`}>
                        {proof.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#72756E] flex items-center justify-between">
                      <span>By: {proof.student}</span>
                      <span className="text-[#72756E]">{proof.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Mentor Feedback & Viva Evaluation */}
            <div className="rounded-2xl bg-[#FAF8F4] border border-[#1C1D1B]/8 p-5 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#72756E] uppercase">
                <span className="flex items-center gap-1.5 font-bold text-[#1C1D1B]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#C87841]" />
                  Faculty Feedback
                </span>
                <span className="text-[#C87841] font-bold">★★★★★</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#C87841]/20 text-xs space-y-2 shadow-sm">
                <p className="text-[11px] text-[#575955] italic leading-relaxed">
                  "The team has demonstrated strong sprint execution. GitHub commit proofs show clean code structure and modular test cases."
                </p>
                <div className="pt-2 border-t border-[#1C1D1B]/8 flex items-center justify-between text-[10px] text-[#72756E]">
                  <span>Milestone 3 Grade:</span>
                  <span className="font-bold text-[#2B3A2C] font-mono">9.5 / 10 (A+)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#1C1D1B]/8 text-xs flex items-center justify-between shadow-sm">
                <span className="text-[#575955] text-[11px]">Next Milestone Review</span>
                <span className="text-[#C87841] font-mono font-semibold text-[11px]">Oct 15, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
