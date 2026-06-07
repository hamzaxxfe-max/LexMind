import React, { useState, useRef, useEffect } from "react";
import { generateContract, downloadPdf } from "../lib/api";
import { Loader2, Download, AlertTriangle, FileText } from "../lib/icons";

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
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await generateContract(prompt, jurisdiction);
      setResult(data);
    } catch (err) {
      if (err.response?.status === 422) {
        setError("الرجاء إدخال وصف أطول للعقد (10 أحرف على الأقل).");
      } else if (err.response?.status === 429) {
        setError("عدد الطلبات كبير جداً. انتظر قليلاً وحاول مجدداً.");
      } else if (err.code === "ERR_NETWORK") {
        setError("لا يمكن الاتصال بالخادم. تأكد من تشغيل الخادم على المنفذ 8081.");
      } else {
        setError("فشل إنشاء العقد. تحقق من مفتاح API وحاول مجدداً.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
      <div className="grid lg:grid-cols-5 gap-8">
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-jungle-500 dark:text-jungle-300 mb-4">
              Describe your contract
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A commercial lease agreement for a retail store in London..."
              className="w-full h-40 p-4 border border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-jungle-500 bg-transparent transition text-sm"
            />
            <div className="mt-4">
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1.5 block font-medium">Jurisdiction</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-jungle-500 transition text-sm"
              >
                {JURISDICTIONS.map((j) => (
                  <option key={j.code} value={j.code}>{j.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full mt-4 bg-jungle-500 text-cream-500 py-3 rounded-xl font-semibold hover:bg-jungle-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Generating...</>
              ) : (
                <><FileText size={18} /> Generate contract</>
              )}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              Examples
            </h3>
            <div className="space-y-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(ex)}
                  className="text-left w-full p-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-[1.01]"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="lg:col-span-3" ref={resultRef}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-xl mb-4 flex items-start gap-3 animate-fadeIn">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {loading && (
            <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 text-center animate-fadeIn">
              <Loader2 size={40} className="animate-spin text-jungle-500 mx-auto mb-4" />
              <div className="h-2 w-32 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-3 overflow-hidden">
                <div className="h-full w-1/3 bg-jungle-500 rounded-full animate-pulse" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-sm">LexMind is drafting your contract...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-bold text-jungle-500 dark:text-jungle-300">{result.title}</h2>
                    <span className="text-xs text-gray-400">{JURISDICTIONS.find(j => j.code === jurisdiction)?.label}</span>
                  </div>
                  <button
                    onClick={() => downloadPdf(prompt, jurisdiction)}
                    className="flex items-center gap-2 bg-jungle-500/10 dark:bg-jungle-500/20 text-jungle-600 dark:text-jungle-300 px-4 py-2 rounded-xl font-medium hover:bg-jungle-500/20 dark:hover:bg-jungle-500/30 transition-all active:scale-95"
                  >
                    <Download size={16} /> PDF
                  </button>
                </div>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-serif text-sm leading-relaxed">
                  {result.content}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-jungle-500 dark:text-jungle-300 mb-2">Summary</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{result.summary}</p>
              </div>

              {result.risk_flags?.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} /> Risk flags
                  </h3>
                  <ul className="space-y-2">
                    {result.risk_flags.map((flag, i) => (
                      <li key={i} className="text-amber-600 dark:text-amber-400 text-sm flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!result && !loading && !error && (
            <div className="bg-white dark:bg-gray-800 p-16 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-gray-300 dark:text-gray-500" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Describe your contract, choose jurisdiction, and click generate.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
