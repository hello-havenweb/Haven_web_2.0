import React, { useState } from 'react';
import { Briefcase, TrendingUp, ShieldCheck, CheckCircle2, ChevronRight, BarChart3, Calculator, Award } from 'lucide-react';

export const BusinessProApp: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(25);
  const [selectedPractice, setSelectedPractice] = useState<string>('mna');
  const [consultationBooked, setConsultationBooked] = useState(false);
  const [consultName, setConsultName] = useState('');
  const [consultEmail, setConsultEmail] = useState('');

  // Interactive growth calculation
  const calculatedLift = Math.round(revenue * 0.18 * 10) / 10;
  const calculatedValuation = Math.round((revenue + calculatedLift) * 6.5 * 10) / 10;

  const practices = [
    {
      id: 'mna',
      title: 'Strategic M&A & Divestitures',
      desc: 'Buy-side origination, sell-side auction architecture, synergy due diligence, and post-merger integration for middle-market market leaders.',
      metric: '$4.2B+ Total Transaction Value'
    },
    {
      id: 'capital',
      title: 'Capital Structure Optimization',
      desc: 'Refinancing debt tranches, mezzanine facilities, and syndicated equity structuring to minimize cost of capital and maximize agility.',
      metric: '320bps Average Yield Spread Reduced'
    },
    {
      id: 'expansion',
      title: 'Cross-Border Market Expansion',
      desc: 'Jurisdictional tax alignment, foreign entity regulatory approvals, and channel distributor acquisition in EMEA and APAC territories.',
      metric: '18 Markets Successfully Penetrated'
    },
    {
      id: 'turnaround',
      title: 'Operational Restructuring & Margin Capture',
      desc: 'Root-cause operational audits, SG&A rationalization, and liquidity conservation protocols for stressed or high-growth balance sheets.',
      metric: '+480bps Operating Margin Improvement'
    }
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultEmail) return;
    setConsultationBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-[#e2e8f0] font-sans selection:bg-blue-600 selection:text-white">
      {/* Executive Header */}
      <header className="border-b border-slate-800 bg-[#0a0f1d]/90 backdrop-blur-md sticky top-0 z-30 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-syne font-bold text-sm">
            A
          </div>
          <div>
            <span className="font-syne font-bold text-lg text-white tracking-tight uppercase block leading-none">
              APEX ADVISORY
            </span>
            <span className="text-[10px] tracking-wider text-blue-400 font-mono">
              STRATEGIC M&A & CORPORATE FINANCE
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <a href="#practices" className="hover:text-blue-400 transition-colors">Practice Areas</a>
          <a href="#calculator" className="hover:text-blue-400 transition-colors">EBITDA Calculator</a>
          <a href="#consultation" className="hover:text-blue-400 transition-colors">Advisory Board</a>
        </nav>

        <a
          href="#consultation"
          className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all"
        >
          Confidential Briefing
        </a>
      </header>

      {/* Corporate Hero */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-mono text-blue-300 uppercase mb-6">
          <Award className="w-3.5 h-3.5 text-blue-400" />
          <span>Independent Advisory to Fortune 1000 Boards</span>
        </div>

        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Precision Advisory for High-Stakes Capital Decisions.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal">
          We engineer competitive transaction dynamics and operational restructuring that create measurable enterprise value. Over $8.4B in closed transactions across North America and Europe.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#0e1629] border border-slate-800 mb-12">
          <div>
            <div className="font-syne text-3xl font-black text-white">$8.4B+</div>
            <div className="text-xs text-slate-400 mt-1">Transaction Volume</div>
          </div>
          <div>
            <div className="font-syne text-3xl font-black text-blue-400">94.2%</div>
            <div className="text-xs text-slate-400 mt-1">Mandate Success Rate</div>
          </div>
          <div>
            <div className="font-syne text-3xl font-black text-white">48 Days</div>
            <div className="text-xs text-slate-400 mt-1">Avg Due Diligence Cycle</div>
          </div>
          <div>
            <div className="font-syne text-3xl font-black text-blue-400">140+</div>
            <div className="text-xs text-slate-400 mt-1">Senior Advisors Globally</div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practices" className="py-20 border-t border-slate-800/80 bg-[#090e1c]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase text-blue-400 block mb-1">Advisory Capabilities</span>
            <h2 className="font-syne text-3xl font-bold text-white">Core Practice Disciplines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practices.map((p) => (
              <div
                key={p.id}
                className="p-8 rounded-2xl bg-[#0c1326] border border-slate-800 hover:border-blue-500/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-5">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-syne text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {p.desc}
                </p>
                <div className="pt-4 border-t border-slate-800 text-xs font-mono text-blue-400 flex items-center justify-between">
                  <span>{p.metric}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive EBITDA & Valuation Estimator */}
      <section id="calculator" className="py-24 max-w-6xl mx-auto px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1429] to-[#080d1b] border border-slate-700/80">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-400 mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Model</span>
            </div>
            <h2 className="font-syne text-3xl font-bold text-white mb-2">
              Enterprise Value Acceleration Calculator
            </h2>
            <p className="text-sm text-slate-300">
              Estimate the potential enterprise valuation lift following our operational and strategic margin optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Current Annual Revenue:</span>
                  <span className="text-blue-400 font-mono text-lg">${revenue}M USD</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>$5M</span>
                  <span>$75M</span>
                  <span>$150M+</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                Assumes baseline 18% EBITDA margin lift and a conservative 6.5x EV/EBITDA multiple for B2B middle-market companies.
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4 p-6 rounded-2xl bg-[#0f1933] border border-blue-900/50">
              <div className="p-4 rounded-xl bg-[#090e1c]">
                <div className="text-xs text-slate-400 uppercase font-mono mb-1">Projected EBITDA Gain</div>
                <div className="font-syne text-2xl sm:text-3xl font-black text-emerald-400">
                  +${calculatedLift}M
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Annual recurring profit</div>
              </div>

              <div className="p-4 rounded-xl bg-[#090e1c]">
                <div className="text-xs text-slate-400 uppercase font-mono mb-1">Est. Enterprise Valuation</div>
                <div className="font-syne text-2xl sm:text-3xl font-black text-blue-400">
                  ${calculatedValuation}M
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Post-optimization basis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Scheduling Form */}
      <section id="consultation" className="py-20 border-t border-slate-800 bg-[#080d1a]">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase text-blue-400 block mb-1">Confidential Engagement</span>
            <h2 className="font-syne text-3xl font-bold text-white mb-2">Request Senior Partner Briefing</h2>
            <p className="text-xs sm:text-sm text-slate-400">All discussions covered by mutual corporate NDA.</p>
          </div>

          {consultationBooked ? (
            <div className="p-8 rounded-2xl bg-blue-950/40 border border-blue-500/60 text-center animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="font-syne text-xl font-bold text-white mb-2">Briefing Request Registered</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                Thank you, {consultName}. A Managing Director will reach out confidentially to {consultEmail} within 4 business hours to coordinate an NDA and introductory call.
              </p>
              <button
                onClick={() => setConsultationBooked(false)}
                className="text-xs text-blue-400 underline font-semibold cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="p-8 rounded-2xl bg-[#0c1326] border border-slate-800 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-mono mb-1">Executive Name</label>
                  <input
                    type="text"
                    required
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    placeholder="e.g. Richard Vance"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#070b14] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-mono mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={consultEmail}
                    onChange={(e) => setConsultEmail(e.target.value)}
                    placeholder="rvance@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#070b14] border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-mono mb-1">Mandate Scope</label>
                <select className="w-full px-4 py-2.5 rounded-lg bg-[#070b14] border border-slate-700 text-white focus:outline-none focus:border-blue-500 cursor-pointer">
                  <option>M&A Sell-Side Representation ($20M - $250M EV)</option>
                  <option>M&A Buy-Side Acquisition Search</option>
                  <option>Debt Refinancing & Capital Restructuring</option>
                  <option>Strategic Board Valuation Advisory</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                Schedule Confidential Call
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="border-t border-slate-800 py-12 px-8 text-center text-xs text-slate-500 font-mono">
        <p>APEX ADVISORY GROUP LLC · NEW YORK · LONDON · ZURICH</p>
        <p className="mt-1 text-slate-600">Built on HAVEN Corporate Architecture System · All Rights Reserved 2026</p>
      </footer>
    </div>
  );
};
