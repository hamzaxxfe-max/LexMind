import React, { useState } from "react";
import { Scale, Menu, X } from "../lib/icons";

export default function Header({ onNavigate, currentPage, dark, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-jungle-500/95 backdrop-blur-md text-cream-500 px-6 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 group">
          <Scale size={22} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-bold tracking-tight">LexMind</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg hover:bg-jungle-400 transition"
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className="hidden lg:flex gap-2">
            <button
              onClick={() => onNavigate("contract")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === "contract"
                  ? "bg-cream-500 text-jungle-500 font-semibold shadow-md"
                  : "hover:bg-jungle-400"
              }`}
            >
              Contracts
            </button>
          </nav>
        </div>
      </div>
      {menuOpen && (
        <nav className="lg:hidden mt-3 flex flex-col gap-2 border-t border-jungle-400 pt-3 animate-fadeIn">
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
