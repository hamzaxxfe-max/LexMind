import React from "react";
import { FileText, Shield, Globe, ArrowRight } from "lucide-react";

export default function LandingPage({ onStart }) {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold text-jungle-500 mb-4">
          Draft contracts in seconds
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          LexMind uses AI to generate professional legal contracts tailored to your jurisdiction.
        </p>
        <button
          onClick={onStart}
          className="bg-jungle-500 text-cream-500 px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 mx-auto hover:bg-jungle-600 transition"
        >
          Start drafting <ArrowRight size={20} />
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-cream-200">
          <FileText size={32} className="text-jungle-500 mb-4" />
          <h3 className="text-lg font-semibold text-jungle-500 mb-2">Smart drafting</h3>
          <p className="text-gray-600">
            Describe what you need, and LexMind generates a complete contract with proper legal structure.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-cream-200">
          <Globe size={32} className="text-jungle-500 mb-4" />
          <h3 className="text-lg font-semibold text-jungle-500 mb-2">Multi-jurisdiction</h3>
          <p className="text-gray-600">
            Supports US, UK, EU, UAE, Saudi, and Jordanian legal systems.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-cream-200">
          <Shield size={32} className="text-jungle-500 mb-4" />
          <h3 className="text-lg font-semibold text-jungle-500 mb-2">Risk analysis</h3>
          <p className="text-gray-600">
            Every contract comes with risk flags and a clear summary.
          </p>
        </div>
      </section>
    </main>
  );
}
