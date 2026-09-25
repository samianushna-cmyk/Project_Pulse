import React, { useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from '../components/landing/HeroSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import RoleSection from '../components/landing/RoleSection';
import SkillMatchingSection from '../components/landing/SkillMatchingSection';
import ProofSection from '../components/landing/ProofSection';
import FacultySection from '../components/landing/FacultySection';
import FinalCTA from '../components/landing/FinalCTA';

export default function LandingPage() {
  useEffect(() => {
    // Initialize momentum smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-[#FAF8F4] text-[#1C1D1B] selection:bg-[#CFDBCB] selection:text-[#1C1D1B] overflow-x-hidden">
      {/* 1. Hero Section with 3D Antigravity Scene */}
      <HeroSection />

      {/* 2. How ProjectPulse Works (5-Step Lifecycle) */}
      <HowItWorksSection />

      {/* 3. Three Academic Roles (Student, Leader, Faculty) */}
      <RoleSection />

      {/* 4. Explainable Rule-Based Skill Matching */}
      <SkillMatchingSection />

      {/* 5. Proof of Work & Verifiable Task Accountability */}
      <ProofSection />

      {/* 6. Faculty Mentorship & Progress Visibility */}
      <FacultySection />

      {/* 7. Final Call to Action */}
      <FinalCTA />
    </div>
  );
}
