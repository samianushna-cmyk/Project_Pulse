import React from 'react';
import { Cpu, GitCommit } from 'lucide-react';

export default function Hero2DVisual() {
  const students = [
    { name: 'Alex K.', role: 'React', color: '#38bdf8' },
    { name: 'Maya R.', role: 'Node.js', color: '#34d399' },
    { name: 'Sara L.', role: 'UI/UX', color: '#f43f5e' },
    { name: 'Dev P.', role: 'Database', color: '#fbbf24' },
  ];

  const skillChips = [
    { name: 'React', color: '#38bdf8' },
    { name: 'Node.js', color: '#22c55e' },
    { name: 'MongoDB', color: '#10b981' },
    { name: 'UI/UX', color: '#f43f5e' },
    { name: 'Git/GitHub', color: '#f97316' },
    { name: 'Testing', color: '#a855f7' },
  ];

  return (
    <div className="relative w-full h-[560px] lg:h-[620px] select-none pointer-events-none">
      {/* Background Radial Glow Halos */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/2 right-1/4 w-[320px] h-[320px] bg-amber-500/15 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-10 left-1/4 w-[280px] h-[280px] bg-indigo-600/15 blur-[90px] rounded-full"></div>

      {/* SVG Central Cube Cluster & Connective Data Beams */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Cube Gradients */}
          <linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="100%" stopColor="#F2B900" />
          </linearGradient>
          <linearGradient id="goldLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E09E00" />
            <stop offset="100%" stopColor="#C78700" />
          </linearGradient>
          <linearGradient id="goldRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9E6400" />
            <stop offset="100%" stopColor="#6E4300" />
          </linearGradient>

          {/* Purple Cube Gradients */}
          <linearGradient id="purpleTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="purpleLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="100%" stopColor="#3B0764" />
          </linearGradient>
          <linearGradient id="purpleRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E1065" />
            <stop offset="100%" stopColor="#170638" />
          </linearGradient>

          {/* Crystal / Dark Cube Gradients */}
          <linearGradient id="crystalTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="darkLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A164D" />
            <stop offset="100%" stopColor="#15082A" />
          </linearGradient>
          <linearGradient id="darkRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#190A33" />
            <stop offset="100%" stopColor="#0B0317" />
          </linearGradient>

          {/* Line Gradients */}
          <linearGradient id="beamPurpleGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="beamGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>

          {/* Drop Shadows */}
          <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glowPurple" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. CONNECTIVE DATA BEAMS                                 */}
        {/* ======================================================== */}

        {/* Cluster to Upper-Right (Skill Match) */}
        <path
          d="M 320 280 Q 400 210 460 140"
          stroke="url(#beamPurpleGold)"
          strokeWidth="1.6"
          strokeDasharray="5 5"
        />
        {/* Cluster to Upper-Middle (University Visual) */}
        <path
          d="M 300 240 Q 280 150 270 95"
          stroke="url(#beamGold)"
          strokeWidth="1.5"
        />
        {/* Cluster to Lower-Left (Student Squad) */}
        <path
          d="M 270 330 Q 180 370 120 420"
          stroke="url(#beamPurpleGold)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Cluster to Lower-Right (Task / Proof) */}
        <path
          d="M 350 330 Q 420 380 470 430"
          stroke="url(#beamPurpleGold)"
          strokeWidth="1.5"
        />
        {/* Cluster Downward to Bottom Network */}
        <path
          d="M 310 370 L 310 520"
          stroke="url(#beamGold)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Orbit Circles around the Cube Cluster */}
        <circle cx="310" cy="290" r="110" stroke="#8b5cf6" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="6 6" />
        <circle cx="310" cy="290" r="165" stroke="#d4af37" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="310" cy="290" r="220" stroke="#8b5cf6" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="8 8" />

        {/* Flowing animated stream pulses */}
        <circle cx="380" cy="220" r="3.5" fill="#fbbf24" className="animate-pulse" />
        <circle cx="190" cy="380" r="3.5" fill="#34d399" className="animate-pulse" />
        <circle cx="410" cy="380" r="3.5" fill="#a855f7" className="animate-pulse" />
        <circle cx="285" cy="160" r="3.5" fill="#fbbf24" className="animate-pulse" />
        <circle cx="310" cy="450" r="3.5" fill="#fbbf24" className="animate-pulse" />

        {/* ======================================================== */}
        {/* 2. THE CENTRAL PURPLE + GOLD CUBE CLUSTER (2D ISOMETRIC) */}
        {/* ======================================================== */}
        <g id="cubeCluster" className="animate-float-slow">
          
          {/* Back Deep Purple / Dark Cubes */}
          {/* Cube 1: Far Left Dark-Purple */}
          <g transform="translate(195, 270)">
            {/* Top */}
            <polygon points="0,-18 20,-7 0,4 -20,-7" fill="url(#purpleTop)" />
            {/* Left */}
            <polygon points="-20,-7 0,4 0,26 -20,15" fill="url(#purpleLeft)" />
            {/* Right */}
            <polygon points="0,4 20,-7 20,15 0,26" fill="url(#purpleRight)" />
          </g>

          {/* Cube 2: Upper Purple Cube */}
          <g transform="translate(255, 205)">
            <polygon points="0,-24 26,-9 0,6 -26,-9" fill="url(#purpleTop)" />
            <polygon points="-26,-9 0,6 0,36 -26,21" fill="url(#purpleLeft)" />
            <polygon points="0,6 26,-9 26,21 0,36" fill="url(#purpleRight)" />
          </g>

          {/* Cube 3: Deep Right Purple Cube */}
          <g transform="translate(390, 245)">
            <polygon points="0,-20 22,-8 0,4 -22,-8" fill="url(#purpleTop)" />
            <polygon points="-22,-8 0,4 0,28 -22,16" fill="url(#purpleLeft)" />
            <polygon points="0,4 22,-8 22,16 0,28" fill="url(#purpleRight)" />
          </g>

          {/* Cube 4: Lower Left Dark Cube */}
          <g transform="translate(225, 345)">
            <polygon points="0,-18 20,-7 0,4 -20,-7" fill="url(#darkLeft)" />
            <polygon points="-20,-7 0,4 0,26 -20,15" fill="url(#darkRight)" />
            <polygon points="0,4 20,-7 20,15 0,26" fill="#0c0318" />
          </g>

          {/* Cube 5: Lower Right Purple Cube */}
          <g transform="translate(375, 340)">
            <polygon points="0,-22 24,-9 0,4 -24,-9" fill="url(#purpleTop)" />
            <polygon points="-24,-9 0,4 0,30 -24,17" fill="url(#purpleLeft)" />
            <polygon points="0,4 24,-9 24,17 0,30" fill="url(#purpleRight)" />
          </g>

          {/* PROMINENT GOLD / BRONZE CUBES (3-4 Large, Visible Gold Pieces) */}
          
          {/* Gold Cube 1: Upper-Right Main Gold Cube */}
          <g transform="translate(330, 215)" filter="url(#glowGold)">
            {/* Top */}
            <polygon points="0,-30 32,-12 0,6 -32,-12" fill="url(#goldTop)" />
            {/* Left */}
            <polygon points="-32,-12 0,6 0,44 -32,26" fill="url(#goldLeft)" />
            {/* Right */}
            <polygon points="0,6 32,-12 32,26 0,44" fill="url(#goldRight)" />
            {/* Highlights */}
            <line x1="0" y1="6" x2="32" y2="-12" stroke="#FFF7BA" strokeWidth="1" />
            <line x1="0" y1="6" x2="-32" y2="-12" stroke="#FFF7BA" strokeWidth="1" />
            <line x1="0" y1="6" x2="0" y2="44" stroke="#FFE76B" strokeWidth="1.2" />
          </g>

          {/* Gold Cube 2: Center-Left Prominent Gold Cube */}
          <g transform="translate(250, 280)" filter="url(#glowGold)">
            <polygon points="0,-26 28,-10 0,6 -28,-10" fill="url(#goldTop)" />
            <polygon points="-28,-10 0,6 0,38 -28,22" fill="url(#goldLeft)" />
            <polygon points="0,6 28,-10 28,22 0,38" fill="url(#goldRight)" />
            <line x1="0" y1="6" x2="0" y2="38" stroke="#FFE76B" strokeWidth="1" />
          </g>

          {/* Gold Cube 3: Lower-Center Gold Cube */}
          <g transform="translate(310, 345)" filter="url(#glowGold)">
            <polygon points="0,-28 30,-11 0,6 -30,-11" fill="url(#goldTop)" />
            <polygon points="-30,-11 0,6 0,40 -30,23" fill="url(#goldLeft)" />
            <polygon points="0,6 30,-11 30,23 0,40" fill="url(#goldRight)" />
            <line x1="0" y1="6" x2="0" y2="40" stroke="#FFE76B" strokeWidth="1.2" />
          </g>

          {/* Gold Cube 4: Floating Satellite Gold Diamond / Mini-Cube */}
          <g transform="translate(400, 290)">
            <polygon points="0,-16 16,-6 0,4 -16,-6" fill="url(#goldTop)" />
            <polygon points="-16,-6 0,4 0,22 -16,12" fill="url(#goldLeft)" />
            <polygon points="0,4 16,-6 16,12 0,22" fill="url(#goldRight)" />
          </g>

          {/* Center Main Large Crystal/Purple Anchor Cube */}
          <g transform="translate(305, 285)" filter="url(#glowPurple)">
            <polygon points="0,-36 38,-14 0,8 -38,-14" fill="url(#crystalTop)" />
            <polygon points="-38,-14 0,8 0,52 -38,30" fill="url(#purpleLeft)" />
            <polygon points="0,8 38,-14 38,30 0,52" fill="url(#purpleRight)" />
            <line x1="0" y1="8" x2="0" y2="52" stroke="#C4B5FD" strokeWidth="1.5" />
            <line x1="0" y1="8" x2="38" y2="-14" stroke="#E9D5FF" strokeWidth="1" />
            <line x1="0" y1="8" x2="-38" y2="-14" stroke="#E9D5FF" strokeWidth="1" />
          </g>

          {/* Floating Small Diamond Crystals around Cluster */}
          {/* Top Diamond */}
          <polygon points="310,140 316,152 310,164 304,152" fill="#FDE047" opacity="0.85" />
          {/* Left Diamond */}
          <polygon points="175,230 182,240 175,250 168,240" fill="#A855F7" opacity="0.75" />
          {/* Right Diamond */}
          <polygon points="435,220 442,230 435,240 428,230" fill="#FDE047" opacity="0.8" />
          {/* Lower Diamond */}
          <polygon points="275,395 281,404 275,413 269,404" fill="#C084FC" opacity="0.75" />
          {/* Far Lower Diamond */}
          <polygon points="355,405 362,415 355,425 348,415" fill="#FDE047" opacity="0.8" />

          {/* Small ProjectPulse Central Badge */}
          <g transform="translate(265, 305)">
            <rect x="0" y="0" width="80" height="18" rx="9" fill="#0e041d" stroke="#d4af37" strokeWidth="1" fillOpacity="0.9" />
            <text x="40" y="12" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
              PROJECTPULSE
            </text>
          </g>
        </g>
      </svg>

      {/* ======================================================== */}
      {/* 3. UPPER-MIDDLE: Miniature 2D University Visual          */}
      {/* ======================================================== */}
      <div className="absolute top-2 left-1/2 -translate-x-1/3 animate-float-slow pointer-events-auto z-20">
        <div className="p-2.5 rounded-2xl bg-[#130a2a]/90 border border-amber-400/40 backdrop-blur-xl shadow-xl shadow-purple-950/60 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-purple-600/20 border border-amber-400/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 10L12 4L22 10L12 16L2 10Z" fill="#fbbf24" fillOpacity="0.25" />
              <path d="M6 12V18" />
              <path d="M10 14V18" />
              <path d="M14 14V18" />
              <path d="M18 12V18" />
              <path d="M4 19H20" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-white tracking-wide leading-tight">
              University Campus
            </span>
            <span className="text-[9px] font-mono text-amber-300">
              Department Portal Active
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. UPPER-RIGHT: Skill Matching Card                      */}
      {/* ======================================================== */}
      <div className="absolute top-4 right-2 sm:right-4 w-[230px] animate-float-reverse pointer-events-auto z-20">
        <div className="p-4 rounded-2xl bg-[#14082c]/90 border border-purple-500/40 backdrop-blur-xl shadow-2xl shadow-purple-950/70 text-slate-100">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-200">
                SKILL MATCH
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <div className="flex items-center justify-between bg-purple-950/70 p-2 rounded-xl border border-yellow-500/30 mb-2.5">
            <span className="text-[10px] text-purple-300 font-medium">Explainable Match</span>
            <span className="text-xs font-black font-mono text-yellow-400 bg-yellow-950/70 px-2 py-0.5 rounded border border-yellow-500/40">
              92% MATCH
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {skillChips.map((sk) => (
              <span
                key={sk.name}
                className="text-[9px] px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/30 text-purple-200 font-medium flex items-center gap-1"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: sk.color }}
                ></span>
                {sk.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. LOWER-MIDDLE / LEFT: Student Network Cards            */}
      {/* ======================================================== */}
      <div className="absolute bottom-10 left-0 sm:left-2 space-y-2 pointer-events-auto z-20">
        <div className="text-[9px] font-mono uppercase tracking-wider text-purple-300/80 mb-1 pl-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Matched Student Squad
        </div>
        <div className="grid grid-cols-2 gap-2 max-w-[240px]">
          {students.map((st, idx) => (
            <div
              key={st.name}
              className={`p-2 rounded-xl bg-[#120826]/90 border border-purple-500/30 backdrop-blur-lg shadow-lg flex items-center gap-2 ${
                idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse'
              }`}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-950 shrink-0"
                style={{ backgroundColor: st.color }}
              >
                {st.name.charAt(0)}
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-[10px] font-bold text-white truncate">
                  {st.name}
                </span>
                <span className="text-[8px] text-purple-300 font-mono leading-none truncate">
                  {st.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. LOWER-RIGHT: Task / Proof of Work Card                */}
      {/* ======================================================== */}
      <div className="absolute bottom-6 right-2 sm:right-4 w-[230px] animate-float-slow pointer-events-auto z-20">
        <div className="p-3.5 rounded-2xl bg-[#140b2a]/92 border border-yellow-500/40 backdrop-blur-xl shadow-2xl shadow-purple-950/80 text-slate-100">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-yellow-500/20">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold border border-emerald-500/40">
                ✓
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-yellow-400 font-bold">
                TASK COMPLETED
              </span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold">
              Verified
            </span>
          </div>

          <div className="text-[11px] font-bold text-white leading-tight">
            Implement Authentication
          </div>
          <p className="text-[9px] text-slate-300 mt-0.5 leading-snug">
            JWT auth tokens & protected role routing.
          </p>

          <div className="mt-2 pt-1.5 border-t border-purple-500/20 flex items-center justify-between text-[9px]">
            <span className="text-purple-300">Submitted Proof:</span>
            <span className="text-yellow-300 font-semibold flex items-center gap-1 bg-yellow-950/60 px-1.5 py-0.5 rounded border border-yellow-500/30">
              <GitCommit className="w-3 h-3 text-amber-400" />
              GitHub Commit ✓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
