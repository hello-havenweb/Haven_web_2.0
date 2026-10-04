import React, { useState } from 'react';
import { Gamepad2, Trophy, Users, Shield, Radio, MessageSquare, ChevronRight, Swords, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

export const NexusGamingApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matches' | 'roster' | 'games'>('matches');
  const [joinedCommunity, setJoinedCommunity] = useState(false);
  const [selectedGame, setSelectedGame] = useState('Apex Legends');

  const matches = [
    {
      tournament: 'VALORANT MASTERS TOKYO',
      time: 'LIVE NOW',
      isLive: true,
      teamA: 'NEXUS CYBER',
      teamB: 'SOLARIS PRIME',
      scoreA: 12,
      scoreB: 11,
      map: 'Ascent (Overtime)',
    },
    {
      tournament: 'GLOBAL CS2 MAJOR QUALIFIER',
      time: 'TODAY 20:00 CET',
      isLive: false,
      teamA: 'NEXUS CS',
      teamB: 'VORTEX ESPORTS',
      scoreA: 0,
      scoreB: 0,
      map: 'Mirage / Inferno',
    },
    {
      tournament: 'APEX GLOBAL SERIES FINALS',
      time: 'TOMORROW 18:30 EST',
      isLive: false,
      teamA: 'NEXUS TRIO',
      teamB: '20 Squad Lobby',
      scoreA: '-',
      scoreB: '-',
      map: 'World’s Edge',
    },
  ];

  const roster = [
    { name: 'KAELEN "VAPOR" REED', role: 'Entry Fragger / Duelist', kda: '1.48 K/D', main: 'Jett / Raze', winRate: '68%' },
    { name: 'MIRA "NEO" CHEN', role: 'In-Game Leader (IGL)', kda: '1.22 K/D', main: 'Omen / Astra', winRate: '71%' },
    { name: 'ALEXEI "PHANTOM" VOLKOV', role: 'Sniper & Recon', kda: '1.56 K/D', main: 'Sova / Fade', winRate: '65%' },
    { name: 'ELENA "CYPHER" ORTEGA', role: 'Sentinel Anchor', kda: '1.19 K/D', main: 'Killjoy / Cypher', winRate: '74%' },
  ];

  const games = [
    { title: 'Apex Legends', genre: 'Battle Royale', division: 'Pro League Tier 1', rank: '#2 Global' },
    { title: 'Valorant', genre: 'Tactical Shooter', division: 'VCT Champions Americas', rank: '#4 Global' },
    { title: 'Counter-Strike 2', genre: 'Competitive FPS', division: 'ESL Pro League Div 1', rank: '#7 Global' },
    { title: 'Rocket League', genre: 'Vehicular Soccer', division: 'RLCS Major', rank: '#3 Global' },
  ];

  return (
    <div className="min-h-screen bg-[#06030e] text-[#e2d9fc] font-sans selection:bg-cyan-500 selection:text-black">
      {/* Cyberpunk Top Bar */}
      <nav className="border-b border-purple-900/40 bg-[#090416]/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 via-violet-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Gamepad2 className="w-5 h-5 text-black" />
          </div>
          <span className="font-syne text-xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            NEXUS <span className="text-cyan-400">GAMING</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('matches')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'matches' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Matches & Live
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'roster' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Pro Roster
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'games' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Divisions
          </button>
        </div>

        <button
          onClick={() => setJoinedCommunity(true)}
          className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-cyan-500 text-black hover:opacity-90 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
        >
          {joinedCommunity ? 'Joined Discord' : 'Join Guild'}
        </button>
      </nav>

      {/* Cyber Hero */}
      <header className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-950/70 border border-purple-700/50 text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-6">
            <Radio className="w-3 h-3 animate-pulse text-red-500" />
            <span>GLOBAL ESPORTS FRANCHISE // SEASON 2026</span>
          </div>

          <h1 className="font-syne text-5xl sm:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-none">
            DEFY LIMITS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-teal-200 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              DOMINATE ARENAS.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed mb-8">
            NEXUS is home to world champions across tactical shooters, battle royales, and team combat. 14 major championship trophies and 2.4 million guild members worldwide.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('matches')}
              className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Watch Live Matches</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setJoinedCommunity(true)}
              className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-purple-950/60 border border-purple-700 text-purple-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Enter Community Discord</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Sections Tabs */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
              <h2 className="font-syne text-2xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-cyan-400" />
                <span>Tournament Schedule & Live Arenas</span>
              </h2>
              <span className="text-xs font-mono text-cyan-400">SERVER STATUS: TICK 128HZ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matches.map((m, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border transition-all ${
                    m.isLive
                      ? 'bg-purple-950/30 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                      : 'bg-[#0d071d]/60 border-purple-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-wider text-purple-400 uppercase">
                      {m.tournament}
                    </span>
                    {m.isLive ? (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-600/30 border border-red-500 text-red-400 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        LIVE
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-neutral-400">{m.time}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between my-6 py-4 border-t border-b border-purple-900/30 text-base font-bold text-white">
                    <span className="text-cyan-300">{m.teamA}</span>
                    <span className="font-mono text-xl text-white px-3 py-1 bg-purple-950/80 rounded border border-purple-800">
                      {m.scoreA} : {m.scoreB}
                    </span>
                    <span className="text-neutral-300">{m.teamB}</span>
                  </div>

                  <div className="text-xs text-neutral-400 flex items-center justify-between">
                    <span>Map: {m.map}</span>
                    <button
                      onClick={() => alert(`Connecting to Twitch Live Stream for ${m.tournament}...`)}
                      className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                    >
                      Watch Stream →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Tournament Bracket */}
            <div className="p-8 rounded-2xl bg-[#0d071e]/70 border border-purple-900/50 mt-12">
              <h3 className="font-syne text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Swords className="w-5 h-5 text-purple-400" />
                <span>Playoff Elimination Bracket (VCT Americas)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
                <div className="space-y-3">
                  <div className="text-purple-400 font-bold uppercase">Quarterfinals</div>
                  <div className="p-3 rounded bg-purple-950/50 border border-purple-800/60">
                    <div className="text-cyan-400 font-bold">NEXUS CYBER (2)</div>
                    <div className="text-neutral-400">Luminosity (0)</div>
                  </div>
                  <div className="p-3 rounded bg-purple-950/50 border border-purple-800/60">
                    <div className="text-white font-bold">Solaris Prime (2)</div>
                    <div className="text-neutral-400">Team Apex (1)</div>
                  </div>
                </div>
                <div className="space-y-3 sm:mt-6">
                  <div className="text-cyan-400 font-bold uppercase">Semifinals</div>
                  <div className="p-3 rounded bg-purple-900/40 border border-cyan-500/50">
                    <div className="text-cyan-300 font-bold">NEXUS CYBER (2)</div>
                    <div className="text-neutral-300">Solaris Prime (1)</div>
                  </div>
                </div>
                <div className="space-y-3 sm:mt-12">
                  <div className="text-amber-400 font-bold uppercase">Grand Final</div>
                  <div className="p-4 rounded bg-gradient-to-r from-purple-950 to-cyan-950 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <div className="text-[11px] text-amber-400 font-bold mb-1">CHAMPIONSHIP MATCH</div>
                    <div className="text-cyan-300 font-bold text-sm">NEXUS CYBER vs TBD</div>
                    <div className="text-neutral-400 mt-1 text-[10px]">Sunday 21:00 CET · Trophy on the line</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roster Tab */}
        {activeTab === 'roster' && (
          <div>
            <h2 className="font-syne text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Championship Starting Roster</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roster.map((player, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#0e071e]/70 border border-purple-900/40 hover:border-cyan-400 transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center font-syne font-black text-2xl text-black mb-4 group-hover:scale-105 transition-transform">
                    {player.name.charAt(0)}
                  </div>
                  <h3 className="font-syne text-lg font-bold text-white mb-1">{player.name}</h3>
                  <div className="text-xs text-cyan-400 font-mono mb-4">{player.role}</div>
                  <div className="space-y-1.5 text-xs text-neutral-300 border-t border-purple-900/30 pt-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Career K/D:</span>
                      <span className="font-mono font-bold text-white">{player.kda}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Signature:</span>
                      <span>{player.main}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Win Rate:</span>
                      <span className="text-emerald-400 font-mono font-bold">{player.winRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Games Divisions Tab */}
        {activeTab === 'games' && (
          <div>
            <h2 className="font-syne text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Flame className="w-5 h-5 text-cyan-400" />
              <span>Active Competitive Divisions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((g, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedGame(g.title)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    selectedGame === g.title
                      ? 'bg-purple-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'bg-[#0d071e]/70 border-purple-900/40 hover:border-purple-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-syne text-xl font-bold text-white">{g.title}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                      {g.rank}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">{g.genre} · {g.division}</p>
                  <div className="text-xs text-purple-300 flex items-center gap-1 font-semibold">
                    <span>Division Active · Open Tryouts</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Modal Feedback */}
        {joinedCommunity && (
          <div className="mt-12 p-6 rounded-2xl bg-cyan-950/40 border border-cyan-400/60 flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Discord Guild Invitation Verified</div>
                <div className="text-xs text-neutral-300">You are now queued for Member role assignment in NEXUS Official Guild.</div>
              </div>
            </div>
            <button
              onClick={() => setJoinedCommunity(false)}
              className="text-xs text-cyan-300 underline font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </main>

      {/* Esports Footer */}
      <footer className="border-t border-purple-900/40 bg-[#05020c] py-12 px-6 text-xs text-neutral-400 text-center">
        <p className="max-w-md mx-auto mb-3">
          NEXUS GAMING ESPORTS FRANCHISE — Powered by HAVEN 2.0 Web Architecture.
        </p>
        <p>© 2026 NEXUS ESPORTS LLC. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};
