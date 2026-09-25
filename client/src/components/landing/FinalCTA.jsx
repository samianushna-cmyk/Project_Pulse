import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#FAF8F4] text-[#1C1D1B] overflow-hidden border-t border-[#1C1D1B]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#2B3A2C] text-[#FAF8F4] p-8 sm:p-14 lg:p-16 shadow-tactile-lg overflow-hidden text-center">
          {/* Subtle warm ambient lighting inside the CTA */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C87841]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FAF8F4]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/10 text-[#FAF8F4] border border-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C87841]" />
              ELEVATE YOUR ACADEMIC PROJECTS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FAF8F4] leading-tight">
              Build. Collaborate. <br />
              <span className="font-serif italic font-normal text-[#ECCBB5]">Prove. Grow.</span>
            </h2>

            <p className="text-[#CFDBCB] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Turn student skills into meaningful project experiences. Connect with complementary peers, eliminate free-riding, and showcase verified work to faculty and future employers.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[#1C1D1B] bg-[#FAF8F4] hover:bg-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-[#FAF8F4] hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#ECCBB5]" />
                <span>Explore Projects</span>
              </Link>
            </div>

            <p className="text-xs font-mono text-[#B0C3AA] pt-3">
              No credit card required • Designed for engineering capstones & semester mini-projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
