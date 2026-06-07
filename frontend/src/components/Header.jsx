import React from "react";
import { Scale } from "lucide-react";

export default function Header({ onNavigate, currentPage }) {
  return (
    <header className="bg-jungle-500 text-cream-500 px-6 py-4 flex items-center justify-between">
      <button onClick={() => onNavigate("landing")} className="flex items-center gap-2">
        <Scale size={28} />
        <span className="text-xl font-bold tracking-tight">LexMind</span>
      </button>
      <nav className="flex gap-4">
        <button
          onClick={() => onNavigate("contract")}
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === "contract"
              ? "bg-cream-500 text-jungle-500 font-semibold"
              : "hover:bg-jungle-400"
          }`}
        >
          Contracts
        </button>
      </nav>
    </header>
  );
}
