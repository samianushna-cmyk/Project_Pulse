import React, { useEffect, useRef, useState } from 'react';
import { Compass, Users2, Layers, CheckSquare, GraduationCap } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Discover',
    desc: 'Explore projects that match your interests and skills or post your own engineering capstone idea.',
    icon: Compass,
    accent: 'bg-[#C87841]/20 text-[#D97706] border-[#C87841]/30 group-hover:bg-[#C87841] group-hover:text-white',
  },
  {
    step: '02',
    title: 'Match',
    desc: 'Find teammates using explainable rule-based skill matching that guarantees complementary coverage.',
    icon: Users2,
    accent: 'bg-[#82957C]/25 text-[#A3B899] border-[#82957C]/35 group-hover:bg-[#C87841] group-hover:text-white',
  },
  {
    step: '03',
    title: 'Collaborate',
    desc: 'Work together through structured tasks, role assignments, milestones, and sprint timelines.',
    icon: Layers,
    accent: 'bg-white/10 text-[#FAF8F4] border-white/15 group-hover:bg-[#C87841] group-hover:text-white',
  },
  {
    step: '04',
    title: 'Prove',
    desc: 'Submit proof of completed work through GitHub commits, repositories, architecture documents, or live demos.',
    icon: CheckSquare,
    accent: 'bg-[#C87841]/20 text-[#D97706] border-[#C87841]/30 group-hover:bg-[#C87841] group-hover:text-white',
  },
  {
    step: '05',
    title: 'Guide',
    desc: 'Faculty mentors monitor real progress, validate contribution proofs, and provide structured feedback.',
    icon: GraduationCap,
    accent: 'bg-[#82957C]/25 text-[#A3B899] border-[#82957C]/35 group-hover:bg-[#C87841] group-hover:text-white',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#1E281F] text-[#FAF8F4] overflow-hidden border-t border-white/5 transition-colors duration-500"
    >
      {/* Organic Ambient Diffuse Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#C87841]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#82957C]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#253227] border border-[#C87841]/30 text-xs font-mono font-semibold text-[#D8A47F] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C87841] animate-pulse"></span>
            <span>5-STEP LIFECYCLE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FAF8F4]">
            From Skills to <span className="font-serif italic font-normal text-[#C87841]">Real Project Impact</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8A47F]/90 leading-relaxed max-w-2xl mx-auto">
            A transparent, end-to-end milestone journey designed specifically for university semesters and student project excellence.
          </p>
        </div>

        {/* Relative Wrapper for Animated Connecting Line & 5-Step Cards */}
        <div className="relative mt-16 lg:mt-20">
          
          {/* Animated Horizontal Progress Connector Line (Visible on Desktop) */}
          <div className="hidden xl:block absolute top-[52px] left-[6%] right-[6%] h-[2px] pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 2">
              <line
                x1="0"
                y1="1"
                x2="1000"
                y2="1"
                stroke="#C87841"
                strokeOpacity="0.4"
                strokeWidth="2"
                className="animate-flow-dash"
              />
            </svg>
          </div>

          {/* 5 Steps Grid with Staggered Scroll-Triggered Fade-Up */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                  }}
                  className={`group relative rounded-2xl card-moss-acrylic p-6 flex flex-col justify-between cursor-default pointer-events-auto ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div>
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-2xl font-black text-[#A3B899]/40 group-hover:text-[#C87841] group-hover:scale-110 transition-all duration-300">
                        {item.step}
                      </span>
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${item.accent}`}>
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#FAF8F4] mb-2 group-hover:text-[#C87841] transition-colors duration-200">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A3B899] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center text-[11px] font-mono text-[#A3B899]/70 group-hover:text-[#D8A47F] transition-colors duration-200">
                    <span>Phase {index + 1} of 5</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
