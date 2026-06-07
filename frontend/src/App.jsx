import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import ContractPage from "./pages/ContractPage";
import LandingPage from "./pages/LandingPage";

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lexmind-dark");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("lexmind-dark", dark);
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}

export default function App() {
  const [page, setPage] = useState("landing");
  const [dark, toggleDark] = useDarkMode();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-cream-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header onNavigate={setPage} currentPage={page} dark={dark} onToggleDark={toggleDark} />
        {page === "landing" && <LandingPage onStart={() => setPage("contract")} />}
        {page === "contract" && <ContractPage />}
      </div>
    </ErrorBoundary>
  );
}
