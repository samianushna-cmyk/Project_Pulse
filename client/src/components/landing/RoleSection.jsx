import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Code2, Crown, GraduationCap } from 'lucide-react';

const ROLES = [
  {
    role: 'Student',
    tagline: 'Contributor & Builder',
    icon: Code2,
    desc: 'Showcase verified abilities, discover capstone projects tailored to your tech stack, and build a proof-backed portfolio.',
    features: [
      'Build your verified skill profile',
      'Showcase technical strengths & domain interests',
      'Join projects with complementary teams',
      'Complete assigned tasks with clear expectations',
      'Submit proof of work for direct credit',
    ],
    cta: 'Join as Student',
    highlight: false,
    accentIcon: 'bg-[#E7EDE5] text-[#2B3A2C]',
    btnClass: 'bg-white hover:bg-[#FAF8F4] text-[#1C1D1B] border border-[#1C1D1B]/15 shadow-sm',
  },
  {
    role: 'Leader',
    tagline: 'Project Architect',
    icon: Crown,
    desc: 'Form balanced student squads with explainable skill matching, organize milestones, and manage task accountability without chaos.',
    features: [
      'Create projects with structured milestones',
      'Define required tech stacks & role spots',
      'Build teams using skill-gap matching',
      'Assign tasks with deadlines & criteria',
      'Track real-time progress & proof logs',
    ],
    cta: 'Create a Project',
    highlight: true,
    accentIcon: 'bg-[#FAF3EE] text-[#C87841]',
    btnClass: 'bg-[#2B3A2C] hover:bg-[#1E291F] text-[#FAF8F4] font-bold shadow-md shadow-[#2B3A2C]/20',
  },
  {
    role: 'Faculty Guide',
    tagline: 'Mentor & Evaluator',
    icon: GraduationCap,
    desc: 'Gain total visibility into semester team progress, review uploaded code proofs, and grade student contributions with confidence.',
    features: [
      'Monitor student teams across batches',
      'View team composition & skill balance',
      'Review student work & evidence logs',
      'Give timely guidance and feedback',
      'Conduct fair, evidence-based evaluations',
    ],
    cta: 'Register as Faculty',
    highlight: false,
    accentIcon: 'bg-[#E7EDE5] text-[#2B3A2C]',
    btnClass: 'bg-white hover:bg-[#FAF8F4] text-[#1C1D1B] border border-[#1C1D1B]/15 shadow-sm',
  },
];

export default function RoleSection() {
  return (
    <section id="roles" className="relative py-24 sm:py-32 bg-[#FAF8F4] text-[#1C1D1B] border-t border-[#1C1D1B]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7EDE5] border border-[#2B3A2C]/15 text-xs font-mono font-semibold text-[#2B3A2C]">
            <span>● ACADEMIC ROLES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1C1D1B]">
            Designed for Every <span className="font-serif italic font-normal text-[#C87841]">Project Stakeholder</span>
          </h2>

          <p className="text-base sm:text-lg text-[#575955] leading-relaxed">
            Whether you are writing code, organizing milestone deliveries, or supervising final evaluations, ProjectPulse adapts to your workflow.
          </p>
        </div>

        {/* 3 Role Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {ROLES.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.role}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 card-tactile card-tactile-hover ${
                  card.highlight ? 'lg:-translate-y-2 border-2 border-[#2B3A2C]/25 shadow-tactile-lg' : ''
                }`}
              >
                {card.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#2B3A2C] text-[#FAF8F4] font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${card.accentIcon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#F4EFEB] border border-[#1C1D1B]/10 text-[#454743]">
                      {card.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-[#1C1D1B] tracking-tight">
                    {card.role}
                  </h3>

                  <p className="mt-3 text-sm text-[#575955] leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="my-6 border-t border-[#1C1D1B]/8"></div>

                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B3A2C] mb-4">
                    Key Capabilities:
                  </h4>

                  <ul className="space-y-3">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#1C1D1B]">
                        <div className="w-5 h-5 rounded-full bg-[#E7EDE5] text-[#2B3A2C] flex items-center justify-center shrink-0 mt-0.5 border border-[#2B3A2C]/20">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-[#454743]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1C1D1B]/8">
                  <Link
                    to="/signup"
                    className={`w-full py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${card.btnClass}`}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
