import React, { useEffect, useRef, useState } from "react";
import { FileText, Shield, Globe, ArrowRight } from "../lib/icons";

function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{children}</div>;
}

export default function LandingPage({ onStart }) {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <FadeIn>
        <section className="text-center mb-20">
          <div className="inline-block bg-jungle-500/10 text-jungle-600 dark:text-jungle-300 px-4 py-1 rounded-full text-sm font-medium mb-6">
            AI-Powered Legal Drafting
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-jungle-500 dark:text-jungle-300 mb-4 leading-tight">
            Draft contracts<br />in seconds
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            LexMind uses AI to generate professional legal contracts tailored to your jurisdiction — from NDAs to commercial leases.
          </p>
          <button
            onClick={onStart}
            className="group bg-jungle-500 text-cream-500 px-10 py-4 rounded-xl text-lg font-semibold flex items-center gap-3 mx-auto hover:bg-jungle-600 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Start drafting <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </FadeIn>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          { icon: FileText, title: "Smart drafting", desc: "Describe what you need, and LexMind generates a complete contract with proper legal structure and formatting." },
          { icon: Globe, title: "Multi-jurisdiction", desc: "Supports US, UK, EU, UAE, Saudi, and Jordanian legal systems with jurisdiction-specific clauses." },
          { icon: Shield, title: "Risk analysis", desc: "Every contract comes with risk flags, key considerations, and a clear plain-english summary." },
        ].map(({ icon: Icon, title, desc }, i) => (
          <FadeIn key={i} delay={i * 150}>
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-jungle-500/10 dark:bg-jungle-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon size={24} className="text-jungle-500 dark:text-jungle-300" />
              </div>
              <h3 className="text-lg font-semibold text-jungle-500 dark:text-jungle-300 mb-2">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{desc}</p>
            </div>
          </FadeIn>
        ))}
      </section>
    </main>
  );
}
