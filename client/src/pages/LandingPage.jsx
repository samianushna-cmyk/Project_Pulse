import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck2,
  GraduationCap,
  TrendingUp,
  Award,
  Search,
  Check,
  UserCheck,
  Zap,
  FolderGit2,
  Clock,
  MessageSquareOff,
  Scale,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import DashboardMockup from '../components/DashboardMockup';

export default function LandingPage() {
  const problems = [
    {
      icon: Users,
      title: "Unbalanced Teams & Clashing Skills",
      desc: "Friends group together randomly, resulting in teams with all frontend coders, no backend logic, or missing critical domain skills.",
      tag: "Skill Mismatch"
    },
    {
      icon: MessageSquareOff,
      title: "WhatsApp & Chat Chaos",
      desc: "Crucial requirements, file versions, and deadlines get buried under hundreds of informal chat messages and lost download links.",
      tag: "Communication Loss"
    },
    {
      icon: Scale,
      title: "Unequal Contribution (Free-Riders)",
      desc: "One or two hardworking members do 90% of the project work, while inactive members receive identical academic grades.",
      tag: "Unfair Grading"
    },
    {
      icon: Clock,
      title: "Unclear Tasks & Missed Deadlines",
      desc: "Ambiguous ownership leads to tasks being forgotten until the night before semester project review presentations.",
      tag: "Execution Drag"
    },
    {
      icon: FileSpreadsheet,
      title: "Scattered Evidence & Drive Links",
      desc: "Code snippets, dataset links, and slide decks are spread across disconnected Google Drives and personal folders.",
      tag: "No Central Proof"
    },
    {
      icon: Eye,
      title: "Zero Visibility for Faculty Guides",
      desc: "Professors only see the final outcome during evaluation, having zero insight into milestone progress or individual student effort.",
      tag: "Blind Mentoring"
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Explainable Skill Matching",
      desc: "Intelligent matching algorithm pairs projects with students based on verified tech stacks, domain interests, and complementary skill gaps.",
      badge: "Smart Algorithms",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Users,
      title: "Structured Team Formation",
      desc: "Create project openings with explicit role requirements (e.g. ML Engineer, UI/UX Designer, Backend Dev) to build balanced squads.",
      badge: "Team Balance",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: Layers,
      title: "Agile Task Management",
      desc: "Integrated Kanban boards tailored for academic semesters, featuring milestones, sprint goals, dependencies, and clear assignment.",
      badge: "Kanban & Sprints",
      color: "from-sky-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Verifiable Contribution Tracking",
      desc: "Transparent quantitative and qualitative analytics showing exactly who built which module, commits merged, and milestones met.",
      badge: "Fair Accountability",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: FileCheck2,
      title: "Proof of Work Verification",
      desc: "Every completed task requires verifiable proof (GitHub PRs, test reports, architecture diagrams, benchmark videos) before sign-off.",
      badge: "Zero Fake Work",
      color: "from-violet-500 to-indigo-600"
    },
    {
      icon: GraduationCap,
      title: "Faculty Mentorship & Visibility",
      desc: "Faculty guides receive direct dashboards to monitor team health, review weekly progress proofs, give feedback, and grade with confidence.",
      badge: "Direct Guidance",
      color: "from-indigo-600 to-slate-800"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Skill Profile",
      desc: "Build your academic developer profile detailing your programming languages, frameworks, past projects, and primary domains of interest."
    },
    {
      number: "02",
      title: "Create or Join Project",
      desc: "Publish your capstone or semester project proposal, or explore active projects looking for specialized contributors."
    },
    {
      number: "03",
      title: "Match Team Members",
      desc: "Our matching engine pairs the project's needed skill set with eligible student candidates to ensure comprehensive technical coverage."
    },
    {
      number: "04",
      title: "Assign Tasks & Milestones",
      desc: "Break down semester deliverables into targeted sprints, setting explicit task owners, deadlines, and acceptance criteria."
    },
    {
      number: "05",
      title: "Submit Verifiable Proof",
      desc: "As tasks conclude, attach code repositories, design prototypes, or test execution logs to log verifiable contribution records."
    },
    {
      number: "06",
      title: "Faculty Reviews Progress",
      desc: "Faculty guides inspect real-time progress logs, validate milestone deliverables, and evaluate individual student contribution fairly."
    }
  ];

  const roles = [
    {
      role: "Student",
      badge: "Contributor & Learner",
      desc: "Showcase your real abilities, join high-impact teams that need your exact skills, and build a verified portfolio of real project evidence.",
      benefits: [
        "Find projects aligned with your preferred tech stack",
        "Never get stuck carrying an unbalanced workload",
        "Generate a verified proof-of-work portfolio for job interviews",
        "Clear personal task assignments and milestone targets"
      ],
      cta: "Join as Student",
      highlight: false
    },
    {
      role: "Team Leader",
      badge: "Project Architect",
      desc: "Recruit competent, complementary team members without guesswork and manage milestones with structured task boards and accountability.",
      benefits: [
        "Eliminate random group creation guesswork",
        "Real-time visibility into who is delivering which task",
        "Enforce proof submission before marking tasks complete",
        "Present well-documented project records to faculty guides"
      ],
      cta: "Create a Project",
      highlight: true
    },
    {
      role: "Faculty Guide",
      badge: "Mentor & Evaluator",
      desc: "Get deep, honest insight into all assigned student project teams without chasing endless spreadsheet updates and vague WhatsApp summaries.",
      benefits: [
        "Centralized overview of all guided capstone batches",
        "Inspect individual member contribution analytics",
        "Review uploaded proof files and milestone status anytime",
        "Conduct fair, evidence-based viva and semester grading"
      ],
      cta: "Register as Faculty",
      highlight: false
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 bg-radial-grid">
        {/* Glow backdrop decorative blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 to-blue-500/10 blur-3xl pointer-events-none -z-10 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 shadow-xs mb-6 sm:mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Next-Gen Academic Collaboration Platform</span>
            <span className="text-indigo-400">|</span>
            <span className="text-slate-600 font-normal">Built for Universities & Colleges</span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-5xl mx-auto leading-[1.12]">
            Build Better Student Teams. <br className="hidden sm:inline" />
            <span className="text-gradient">Track Real Project Impact.</span>
          </h1>

          {/* Subtitle Description */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stop relying on random WhatsApp groups and chaotic spreadsheets. 
            ProjectPulse connects students via <strong>explainable skill matching</strong>, enforces 
            <strong> proof-backed task accountability</strong>, and gives <strong>faculty full visibility</strong>.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button
              to="/signup"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-indigo-600/20"
              icon={ArrowRight}
              iconPosition="right"
            >
              Get Started Free
            </Button>
            <Button
              to="/login"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Log in to Account
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Skill-Complementary Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Proof-of-Work Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Direct Faculty Mentor Portals</span>
            </div>
          </div>

          {/* Dashboard Product Visual */}
          <div className="mt-12 sm:mt-16">
            <DashboardMockup />
          </div>
        </div>
      </section>


      {/* 2. THE PROBLEM SECTION */}
      <section id="problem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Academic Challenge"
          title="Why Traditional Student Projects Fail"
          subtitle="When project teams form without structure and manage work over informal chats, everyone loses."
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-rose-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2.5 py-0.5 rounded-full">
                      {prob.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {prob.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {prob.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-rose-500 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  Causes grading disputes & lost time
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. SOLUTION / FEATURES SECTION */}
      <section id="features" className="bg-slate-900 py-20 sm:py-24 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Solution"
            title="Everything You Need for High-Performing Teams"
            subtitle="ProjectPulse transforms messy student teamwork into an organized, trackable, and verifiable engineering pipeline."
            dark={true}
          />

          <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/60 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-indigo-300 bg-indigo-950 border border-indigo-800/80 px-2.5 py-0.5 rounded-full">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Simple 6-Step Workflow"
          title="From Idea to Faculty Approved Submission"
          subtitle="A clear, end-to-end milestone journey designed specifically for academic semester timelines."
        />

        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl sm:text-3xl font-black text-indigo-600/30 group-hover:text-indigo-600 transition-colors font-mono">
                  {step.number}
                </span>
                <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold border border-indigo-100">
                  Step {idx + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* 5. THREE ROLE CARDS SECTION */}
      <section id="roles" className="bg-slate-100/70 py-20 sm:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tailored Experience"
            title="Built for Every Academic Stakeholder"
            subtitle="Whether you are writing code, organizing deliverables, or evaluating semester outcomes, ProjectPulse is customized for you."
          />

          <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {roles.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  item.highlight
                    ? 'bg-slate-900 text-white shadow-xl ring-2 ring-indigo-500 scale-100 lg:-translate-y-2'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-soft'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      item.highlight 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-black tracking-tight ${item.highlight ? 'text-white' : 'text-slate-900'}`}>
                    {item.role}
                  </h3>

                  <p className={`mt-3 text-sm leading-relaxed ${item.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>

                  <div className={`my-6 border-t ${item.highlight ? 'border-slate-800' : 'border-slate-100'}`}></div>

                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                    item.highlight ? 'text-indigo-400' : 'text-slate-500'
                  }`}>
                    Key Capabilities:
                  </h4>

                  <ul className="space-y-3">
                    {item.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${
                          item.highlight ? 'text-indigo-400' : 'text-indigo-600'
                        }`} />
                        <span className={item.highlight ? 'text-slate-200' : 'text-slate-700'}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100/10">
                  <Button
                    to="/signup"
                    variant={item.highlight ? 'primary' : 'outline'}
                    size="md"
                    className="w-full justify-center"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    {item.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-center">
          {/* Decorative circular pattern */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Elevate Your Project Experience
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to collaborate smarter on your next student project?
            </h2>

            <p className="text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Create your skill profile in under two minutes. Join balanced squads, track milestones with integrity, and make your faculty review seamless.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to="/signup"
                variant="white"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto font-bold shadow-lg"
              >
                Create Free Account
              </Button>
              <Button
                to="/login"
                variant="dark"
                size="lg"
                className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-900 border border-indigo-300/20"
              >
                Sign In to Workspace
              </Button>
            </div>

            <p className="text-xs text-indigo-200/80 pt-2">
              No credit card required • Ideal for senior design, capstones, and semester mini-projects
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
