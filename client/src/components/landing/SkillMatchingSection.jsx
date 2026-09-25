import React, { useState } from 'react';
import { Sparkles, Check, X, ArrowDown, Cpu, Layers, CheckCircle2, Shield } from 'lucide-react';

const PRESETS = [
  {
    studentName: 'Sarah Chen',
    studentRole: 'Full-Stack Contributor',
    studentSkills: ['React', 'Node.js', 'MongoDB', 'Git', 'TailwindCSS'],
    projectName: 'Fintech Micro-Lending Portal',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Git', 'Docker'],
    matchedSkills: ['React', 'Node.js', 'MongoDB', 'Git'],
    missingSkills: ['Docker'],
    suggestedRole: 'Full-Stack Developer',
    matchPercentage: 92,
  },
  {
    studentName: 'David Miller',
    studentRole: 'Backend & DB Focus',
    studentSkills: ['Node.js', 'PostgreSQL', 'Express', 'Redis', 'Python'],
    projectName: 'AI Campus Attendance Tracker',
    requiredSkills: ['Python', 'OpenCV', 'FastAPI', 'Redis', 'PostgreSQL'],
    matchedSkills: ['Python', 'Redis', 'PostgreSQL'],
    missingSkills: ['OpenCV', 'FastAPI'],
    suggestedRole: 'Data Pipeline Specialist',
    matchPercentage: 80,
  },
  {
    studentName: 'Ananya Sharma',
    studentRole: 'UI/UX & Frontend',
    studentSkills: ['Figma', 'React', 'TailwindCSS', 'TypeScript', 'Jest'],
    projectName: 'Smart Health Monitoring System',
    requiredSkills: ['Figma', 'React', 'TailwindCSS', 'TypeScript'],
    matchedSkills: ['Figma', 'React', 'TailwindCSS', 'TypeScript'],
    missingSkills: [],
    suggestedRole: 'Lead UI/UX Engineer',
    matchPercentage: 100,
  }
];

export default function SkillMatchingSection() {
  const [activePreset, setActivePreset] = useState(0);
  const current = PRESETS[activePreset];

  return (
    <section id="skill-matching" className="relative py-24 sm:py-32 bg-[#F4EFEB] text-[#1C1D1B] overflow-hidden border-t border-[#1C1D1B]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7EDE5] border border-[#2B3A2C]/15 text-xs font-mono font-semibold text-[#2B3A2C]">
            <Cpu className="w-3.5 h-3.5" />
            <span>EXPLAINABLE RULE-BASED MATCHING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1C1D1B]">
            Transparent Skill Matching, <br />
            <span className="font-serif italic font-normal text-[#C87841]">Zero Guesswork</span>
          </h2>

          <p className="text-base sm:text-lg text-[#575955] leading-relaxed">
            ProjectPulse uses a deterministic, rule-based matching engine that compares verified developer skills against explicit project requirements—giving both leaders and applicants full clarity.
          </p>

          {/* Preset Selector */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={p.studentName}
                onClick={() => setActivePreset(idx)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                  activePreset === idx
                    ? 'bg-[#2B3A2C] text-[#FAF8F4] shadow-sm'
                    : 'bg-white text-[#454743] border border-[#1C1D1B]/10 hover:border-[#2B3A2C]/40'
                }`}
              >
                Example {idx + 1}: {p.studentName}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Match Visual Showcase */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl card-tactile p-6 sm:p-10 shadow-tactile-lg relative">
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
            
            {/* Left: Student Skills */}
            <div className="lg:col-span-5 rounded-2xl bg-[#FAF8F4] border border-[#1C1D1B]/8 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C1D1B]/8 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#72756E]">
                  Student Profile
                </span>
                <span className="text-xs font-medium text-[#2B3A2C] bg-[#E7EDE5] px-2.5 py-0.5 rounded-full border border-[#2B3A2C]/20">
                  {current.studentRole}
                </span>
              </div>

              <h4 className="text-lg font-bold text-[#1C1D1B]">
                {current.studentName}
              </h4>

              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[#72756E] uppercase">
                  Verified Skills:
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.studentSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white text-[#1C1D1B] border border-[#1C1D1B]/10 flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A5A48]"></span>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: Connective Rule Comparison Arrow */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#2B3A2C] text-[#FAF8F4] flex items-center justify-center shadow-sm">
                <ArrowDown className="w-5 h-5 lg:-rotate-90" />
              </div>
              <span className="text-[9px] font-mono text-[#72756E] uppercase mt-1 font-bold">
                COMPARE
              </span>
            </div>

            {/* Right: Project Requirements */}
            <div className="lg:col-span-5 rounded-2xl bg-[#FAF8F4] border border-[#1C1D1B]/8 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C1D1B]/8 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#72756E]">
                  Project Listing
                </span>
                <span className="text-xs font-medium text-[#C87841] bg-[#FAF3EE] px-2.5 py-0.5 rounded-full border border-[#C87841]/20">
                  Capstone Spot
                </span>
              </div>

              <h4 className="text-lg font-bold text-[#1C1D1B]">
                {current.projectName}
              </h4>

              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[#72756E] uppercase">
                  Required Tech Stack:
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white text-[#1C1D1B] border border-[#1C1D1B]/10 flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C87841]"></span>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Result: Match Evaluation Breakdown */}
          <div className="mt-8 pt-6 border-t border-[#1C1D1B]/8 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-[#FAF8F4] p-5 rounded-2xl border border-[#1C1D1B]/6">
            {/* Score */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#2B3A2C] text-[#FAF8F4] flex flex-col items-center justify-center font-mono font-black shadow-sm">
                <span className="text-xl leading-none">{current.matchPercentage}%</span>
                <span className="text-[8px] tracking-wider uppercase">MATCH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1C1D1B]">Match Score</span>
                <span className="text-[10px] text-[#4A5A48] font-mono font-semibold">High Compatibility</span>
              </div>
            </div>

            {/* Matched Skills */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#72756E] block mb-1">
                Matched Skills:
              </span>
              <div className="flex flex-wrap gap-1">
                {current.matchedSkills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#E7EDE5] text-[#2B3A2C] border border-[#2B3A2C]/20 flex items-center gap-1 font-medium"
                  >
                    <Check className="w-2.5 h-2.5" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#72756E] block mb-1">
                Missing / Desired:
              </span>
              <div className="flex flex-wrap gap-1">
                {current.missingSkills.length > 0 ? (
                  current.missingSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 font-medium"
                    >
                      <X className="w-2.5 h-2.5" />
                      {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#E7EDE5] text-[#2B3A2C] border border-[#2B3A2C]/20 font-medium">
                    None (100% Coverage)
                  </span>
                )}
              </div>
            </div>

            {/* Suggested Role */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#72756E] block mb-1">
                Recommended Role:
              </span>
              <div className="text-xs font-bold text-[#C87841] bg-[#FAF3EE] px-3 py-1.5 rounded-lg border border-[#C87841]/25 inline-block">
                {current.suggestedRole}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
