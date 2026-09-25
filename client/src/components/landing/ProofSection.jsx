import React from 'react';
import { GitPullRequest, GitCommit, CheckCircle2, ShieldCheck, ArrowRight, FileCode2, ExternalLink } from 'lucide-react';

export default function ProofSection() {
  return (
    <section id="proof" className="relative py-24 sm:py-32 bg-[#FAF8F4] text-[#1C1D1B] overflow-hidden border-t border-[#1C1D1B]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF3EE] border border-[#C87841]/20 text-xs font-mono font-semibold text-[#C87841]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIABLE ACCOUNTABILITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1C1D1B]">
            Proof of Work <span className="font-serif italic font-normal text-[#C87841]">Verification</span>
          </h2>

          <p className="text-base sm:text-lg text-[#575955] leading-relaxed">
            Eliminate free-riders and fake submissions. Every completed task requires verifiable evidence before marking progress as done.
          </p>
        </div>

        {/* Visual Proof Card & Pipeline Workflow */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left: Interactive Task & Proof Card */}
          <div className="lg:col-span-7 rounded-3xl card-tactile p-6 sm:p-8 shadow-tactile-lg relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1C1D1B]/8 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4A5A48] animate-pulse"></div>
                <span className="text-xs font-mono font-bold uppercase text-[#72756E]">
                  Sprint Milestone #03
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E7EDE5] text-[#2B3A2C] border border-[#2B3A2C]/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed & Verified
              </span>
            </div>

            {/* Task Info */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#72756E]">
                  Task Deliverable
                </span>
                <h4 className="text-xl font-bold text-[#1C1D1B] mt-0.5">
                  Implement Login API & Auth Middleware
                </h4>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#72756E]">
                  Description
                </span>
                <p className="text-xs sm:text-sm text-[#575955] leading-relaxed mt-0.5">
                  Implemented secure JWT authentication, password hashing with bcrypt, refresh token rotation, and protected role-based Express middleware.
                </p>
              </div>

              {/* Submitted Proof Evidence Box */}
              <div className="p-4 rounded-2xl bg-[#F4EFEB] border border-[#1C1D1B]/8 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#C87841] flex items-center gap-1.5">
                    <GitCommit className="w-4 h-4 text-[#C87841]" />
                    Submitted Proof
                  </span>
                  <span className="text-[10px] font-mono text-[#72756E]">
                    ID: #commit-7a8f92b
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#1C1D1B] bg-white p-2.5 rounded-xl border border-[#1C1D1B]/8 shadow-sm">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-[#4A5A48]" />
                    <span className="font-mono text-[11px] text-[#1C1D1B] font-semibold">github.com/projectpulse/auth-service</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C87841]" />
                </div>
              </div>

              {/* Assignee & Reviewer Footer */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#575955]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#2B3A2C] text-white font-bold flex items-center justify-center text-[10px]">
                    S
                  </div>
                  <span>Assignee: Sarah C. (Student)</span>
                </div>
                <div className="text-[#2B3A2C] font-mono font-bold">
                  Approved by Lead & Faculty ✓
                </div>
              </div>
            </div>
          </div>

          {/* Right: The 4-Step Accountability Pipeline */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-bold text-[#1C1D1B] mb-2">
              The 4-Step Proof Pipeline
            </h3>
            <p className="text-sm text-[#575955] mb-6">
              Ensures fair grading, authentic collaboration, and verifiable portfolios for future job placements.
            </p>

            <div className="space-y-3">
              {[
                { step: '01', title: 'Task Selection', desc: 'Picks up assigned sprint task with defined acceptance criteria.' },
                { step: '02', title: 'Task Execution', desc: 'Writes modular code, designs wireframes, or builds benchmarks.' },
                { step: '03', title: 'Proof Submission', desc: 'Attaches GitHub commit hash, PR link, or demo video URL.' },
                { step: '04', title: 'Review & Credit', desc: 'Leader validates work and faculty marks verified milestone credit.' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl card-tactile border border-[#1C1D1B]/8 hover:border-[#2B3A2C]/30 transition-colors flex items-start gap-3.5"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#E7EDE5] border border-[#2B3A2C]/20 text-[#2B3A2C] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#1C1D1B]">{item.title}</h4>
                    <p className="text-xs text-[#575955] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
