import React, { useState } from "react";
import { generateContract, downloadPdf } from "../lib/api";
import { Loader2, Download, AlertTriangle, FileText } from "lucide-react";

const JURISDICTIONS = [
  { code: "us", label: "United States" },
  { code: "uk", label: "United Kingdom" },
  { code: "eu", label: "European Union" },
  { code: "ae", label: "UAE" },
  { code: "sa", label: "Saudi Arabia" },
  { code: "jo", label: "Jordan" },
];

const EXAMPLES = [
  "A residential lease agreement between a landlord and a tenant for an apartment in New York",
  "An independent contractor agreement for a freelance web developer",
  "A non-disclosure agreement between two startup founders",
  "A simple promissory note for a $10,000 personal loan",
];

export default function ContractPage() {
  const [prompt, setPrompt] = useState("");
  const [jurisdiction, setJurisdiction] = useState("us");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await generateContract(prompt, jurisdiction);
      setResult(data);
    } catch (err) {
      setError("Failed to generate contract. Check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    downloadPdf(prompt, jurisdiction);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-5 gap-8">
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-cream-200">
            <h2 className="text-lg font-semibold text-jungle-500 mb-4">
              Describe your contract
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A commercial lease agreement for a retail store in London..."
              className="w-full h-40 p-4 border border-cream-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-jungle-500"
            />
            <div className="mt-4">
              <label className="text-sm text-gray-600 mb-1 block">Jurisdiction</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full p-2 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-500"
              >
                {JURISDICTIONS.map((j) => (
                  <option key={j.code} value={j.code}>
                    {j.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full mt-4 bg-jungle-500 text-cream-500 py-3 rounded-lg font-semibold hover:bg-jungle-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Generating...</>
              ) : (
                <><FileText size={18} /> Generate contract</>
              )}
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-cream-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Examples
            </h3>
            <div className="space-y-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(ex)}
                  className="text-left w-full p-3 text-sm text-gray-600 bg-cream-50 rounded-lg hover:bg-cream-200 transition"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="lg:col-span-3">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-4 flex items-center gap-2">
              <AlertTriangle size={18} />
              {error}
            </div>
          )}

          {loading && (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-cream-200 text-center">
              <Loader2 size={36} className="animate-spin text-jungle-500 mx-auto mb-4" />
              <p className="text-gray-600">LexMind is drafting your contract...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-cream-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-jungle-500">{result.title}</h2>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-cream-500 text-jungle-500 px-4 py-2 rounded-lg font-medium hover:bg-cream-600 transition"
                  >
                    <Download size={16} /> PDF
                  </button>
                </div>
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap font-serif text-sm leading-relaxed">
                  {result.content}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-cream-200">
                <h3 className="font-semibold text-jungle-500 mb-2">Summary</h3>
                <p className="text-gray-600">{result.summary}</p>
              </div>

              {result.risk_flags.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
                  <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} /> Risk flags
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-amber-700">
                    {result.risk_flags.map((flag, i) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!result && !loading && !error && (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-cream-200 text-center">
              <FileText size={48} className="text-cream-300 mx-auto mb-4" />
              <p className="text-gray-400">
                Describe your contract, choose jurisdiction, and click generate.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
