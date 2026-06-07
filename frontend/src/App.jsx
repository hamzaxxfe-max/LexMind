import React, { useState } from "react";
import Header from "./components/Header";
import ContractPage from "./pages/ContractPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <div className="min-h-screen bg-cream-500">
      <Header onNavigate={setPage} currentPage={page} />
      {page === "landing" && <LandingPage onStart={() => setPage("contract")} />}
      {page === "contract" && <ContractPage />}
    </div>
  );
}
