import React, { useState } from "react";
import { Scale, Menu, X } from "lucide-react";

export default function Header({ onNavigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-jungle-500 text-cream-500 px-6 py-4">
      <div className="flex items-center justify-between">
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-2">
          <Scale size={28} />
          <span className="text-xl font-bold tracking-tight">LexMind</span>
        </button>
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className="hidden lg:flex gap-4">
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
      </div>
      {menuOpen && (
        <nav className="lg:hidden mt-4 flex flex-col gap-2 border-t border-jungle-400 pt-4">
          <button
            onClick={() => { onNavigate("landing"); setMenuOpen(false); }}
            className={`px-4 py-2 rounded-lg transition text-left ${
              currentPage === "landing"
                ? "bg-cream-500 text-jungle-500 font-semibold"
                : "hover:bg-jungle-400"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate("contract"); setMenuOpen(false); }}
            className={`px-4 py-2 rounded-lg transition text-left ${
              currentPage === "contract"
                ? "bg-cream-500 text-jungle-500 font-semibold"
                : "hover:bg-jungle-400"
            }`}
          >
            Contracts
          </button>
        </nav>
      )}
    </header>
  );
}
