import React, { useState } from 'react';
import { Orbit, Compass, Sparkles, Cpu, Layers, Radio, Globe, Shield, ArrowRight, CheckCircle2, X, Terminal } from 'lucide-react';

export const OrbitSpatialApp: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'quantum' | 'spatial' | 'hologram'>('spatial');
  const [dimensionMode, setDimensionMode] = useState<'3D' | 'Spatial' | 'Holo'>('Spatial');
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [briefSent, setBriefSent] = useState(false);
  const [founderName, setFounderName] = useState('');
  const [founderEmail, setFounderEmail] = useState('');
  const [ventureScope, setVentureScope] = useState('Spatial Web Operating System');

  const nodes = {
    quantum: {
      code: 'NODE-01 // QUANTUM MATRIX',
      title: 'Neural Spatial Processing Core',
      desc: 'Distributed spatial compute pipelines rendering millions of volumetric points at sub-millisecond latencies for spatial headsets and holographic canvases.',
      telemetry: '0.12ms Latency · 120 FPS Native · 16M Volumetric Voxels',
      status: 'ONLINE & SYNCHRONIZED',
    },
    spatial: {
      code: 'NODE-02 // SPATIAL ENGINE',
      title: 'Holographic User Architecture',
      desc: 'Boundary-free user interfaces designed for post-screen reality. Depth-mapped tactile surfaces that respond to biological gaze and subtle spatial gestures.',
      telemetry: '6DoF Tracking · Zero Screen Anchor · Realtime Occlusion',
      status: 'ACTIVE RUNTIME',
    },
    hologram: {
      code: 'NODE-03 // VOLUMETRIC MESH',
      title: 'Orbital Telepresence Systems',
      desc: 'High-fidelity multi-user telepresence transferring lifelike human spatial avatars across global edge clusters with real-time biometric synchrony.',
      telemetry: '38 Global Nodes · End-to-End Encrypted Volumetric Stream',
      status: 'CLUSTER BALANCED',
    },
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderName || !founderEmail) return;
    setBriefSent(true);
  };

  return (
    <div className="min-h-screen bg-[#04010a] text-[#ede8fc] font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Background Cosmic Starfield & Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cybernetic Navigation Bar */}
      <header className="border-b border-purple-900/40 bg-[#070213]/90 backdrop-blur-md sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <Orbit className="w-5 h-5 text-white animate-spin [animation-duration:12s]" />
          </div>
          <div>
            <span className="font-syne font-black text-xl tracking-widest text-white uppercase block leading-none">
              ORBIT <span className="text-purple-400">SPATIAL</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-purple-300 uppercase">
              NEXT-GEN CREATIVE TECH & SPATIAL PLATFORM
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-neutral-400">
          <a href="#nodes" className="hover:text-purple-300 transition-colors">Compute Nodes</a>
          <a href="#telemetry" className="hover:text-purple-300 transition-colors">Telemetry</a>
          <a href="#ventures" className="hover:text-purple-300 transition-colors">Ventures</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Dimension Selector */}
          <div className="hidden sm:flex items-center p-1 rounded-lg bg-purple-950/40 border border-purple-800/40 text-xs font-mono">
            {(['3D', 'Spatial', 'Holo'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDimensionMode(mode)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  dimensionMode === mode
                    ? 'bg-purple-600 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setBriefModalOpen(true)}
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
          >
            Launch Venture
          </button>
        </div>
      </header>

      {/* Hero: Astronomical Spatial Experience */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/50 text-[11px] font-mono uppercase tracking-widest text-purple-300 mb-6 backdrop-blur-md">
          <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
          <span>ORBITAL PLATFORM PROTOCOL v4.8 // READY FOR POST-SCREEN ERA</span>
        </div>

        <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-6 leading-none">
          BEYOND SCREENS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-200 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
            INFINITE SPACE.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-10 font-normal">
          ORBIT crafts next-generation spatial computing interfaces, volumetric web environments, and AI-accelerated spatial operating systems for visionary founders and laboratories.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setBriefModalOpen(true)}
            className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <span>Initiate Studio Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#nodes"
            className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider glass-panel border border-purple-800/50 text-neutral-200 hover:border-purple-400 transition-all"
          >
            Inspect Compute Nodes
          </a>
        </div>
      </section>

      {/* Interactive 3D Node Matrix Inspector */}
      <section id="nodes" className="py-20 border-t border-purple-900/40 bg-[#070312]/80">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-1">
                Spatial Architecture
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white">
                Interactive Orbital Node Grid
              </h2>
            </div>

            {/* Node selection tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-purple-950/40 border border-purple-900/50">
              {(['quantum', 'spatial', 'hologram'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveNode(key)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer ${
                    activeNode === key
                      ? 'bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#0d0620]/80 border border-purple-800/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono text-purple-400">
                {nodes[activeNode].code}
              </div>
              <h3 className="font-syne text-3xl font-bold text-white">
                {nodes[activeNode].title}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {nodes[activeNode].desc}
              </p>
              <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-900/40 text-xs font-mono text-purple-200">
                <div>TELEMETRY: {nodes[activeNode].telemetry}</div>
                <div className="text-emerald-400 mt-1">STATUS: {nodes[activeNode].status}</div>
              </div>
            </div>

            <div className="lg:col-span-5 aspect-square rounded-2xl bg-[#090317] border border-purple-700/40 flex flex-col items-center justify-center p-8 relative overflow-hidden">
              <div className="relative flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-purple-500/30 animate-spin [animation-duration:20s]" />
                <div className="absolute w-36 h-36 rounded-full border border-violet-400/40 animate-spin [animation-duration:10s] [animation-direction:reverse]" />
                <div className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-[0_0_30px_rgba(168,85,247,0.8)] flex items-center justify-center">
                  <Orbit className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="mt-8 text-center text-xs font-mono text-purple-300">
                ACTIVE MODE: {dimensionMode.toUpperCase()} VIEWPORT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Spatial Ventures */}
      <section id="ventures" className="py-24 max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-1">
            Proven Deployments
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white">
            Visionary Commission Portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Solstice Holographic OS',
              category: 'Spatial Platform',
              metric: '4.8M Headset Users',
              desc: 'Volumetric workspace environment with spatial multi-window canvas and dynamic physics.'
            },
            {
              title: 'Aero Dynamics Telepresence',
              category: 'Realtime Mesh',
              metric: '0.2ms Edge Latency',
              desc: 'Global tele-operative 3D avatar streaming protocol for aerospace engineering teams.'
            },
            {
              title: 'Vesper Neural Canvas',
              category: 'AI Spatial Studio',
              metric: 'Series B Funded',
              desc: 'Generative 3D spatial modeling studio operated purely through gaze and natural gesture cues.'
            }
          ].map((v, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-[#0b051b]/70 border border-purple-900/30 hover:border-purple-500/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-mono uppercase text-purple-400 block mb-2">{v.category}</span>
                <h3 className="font-syne text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {v.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-purple-900/30 text-xs font-mono text-purple-300 flex items-center justify-between">
                <span>{v.metric}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brief Launch Modal */}
      {briefModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f0724] border border-purple-600/50 p-8 rounded-3xl max-w-md w-full relative shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <button
              onClick={() => {
                setBriefModalOpen(false);
                setBriefSent(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {briefSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-syne text-2xl font-bold text-white mb-2">Venture Brief Received</h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  Thank you, <strong className="text-purple-300">{founderName}</strong>. Our Lead Spatial Architect will review your scope for <strong className="text-white">{ventureScope}</strong> and connect at <span className="text-purple-300 underline">{founderEmail}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setBriefModalOpen(false);
                    setBriefSent(false);
                  }}
                  className="px-6 py-2 rounded-full text-xs font-semibold bg-purple-600 text-white cursor-pointer"
                >
                  Return to Orbit
                </button>
              </div>
            ) : (
              <form onSubmit={handleBriefSubmit} className="space-y-4 text-xs font-sans">
                <div className="text-[10px] font-mono uppercase tracking-widest text-purple-400 mb-1">
                  Commission Protocol
                </div>
                <h3 className="font-syne text-2xl font-bold text-white mb-4">
                  Initiate Spatial Brief
                </h3>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono mb-1">Founder / Studio Name</label>
                  <input
                    type="text"
                    required
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-800 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={founderEmail}
                    onChange={(e) => setFounderEmail(e.target.value)}
                    placeholder="elena@solstice-spatial.io"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-800 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono mb-1">Venture Scope</label>
                  <select
                    value={ventureScope}
                    onChange={(e) => setVentureScope(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-800 text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                  >
                    <option>Spatial Web Operating System</option>
                    <option>AI Volumetric Studio Showcase</option>
                    <option>Realtime 3D Mesh Hardware Platform</option>
                    <option>Interactive WebGL Portfolio Experience</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  Submit Studio Brief
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Orbit Footer */}
      <footer className="border-t border-purple-900/40 py-12 px-8 text-center text-xs text-neutral-500 font-mono">
        <p>ORBIT SPATIAL ARCHITECTURE LAB · TOKYO · SAN FRANCISCO · ZURICH</p>
        <p className="mt-1">Architected & Engineered on HAVEN Digital Framework · All Rights Reserved 2026</p>
      </footer>
    </div>
  );
};
