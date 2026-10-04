import React, { useState } from 'react';
import { Utensils, Wine, Clock, MapPin, Calendar, Users, CheckCircle2, X, Star } from 'lucide-react';

export const RestaurantApp: React.FC = () => {
  const [menuCourse, setMenuCourse] = useState<'all' | 'amuse' | 'sea' | 'land' | 'dessert'>('all');
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [partySize, setPartySize] = useState('2 Guests');
  const [reserveDate, setReserveDate] = useState('2026-10-24');
  const [reserveTime, setReserveTime] = useState('19:30');
  const [guestName, setGuestName] = useState('');

  const menuItems = [
    {
      course: 'amuse',
      name: 'Oscietra Caviar Tartlet',
      ingredients: 'Cultured Normandy butter brioche, smoked crème fraîche, chive oil',
      wine: '2012 Dom Pérignon Vintage Brut',
      dietary: 'Signature',
    },
    {
      course: 'sea',
      name: 'Wild Brittany Turbot',
      ingredients: 'Braised white asparagus, sea urchin emulsion, finger lime pearls',
      wine: '2018 Meursault 1er Cru Domaine des Comtes Lafon',
      dietary: 'Pescatarian',
    },
    {
      course: 'land',
      name: 'A5 Miyazaki Wagyu Tenderloin',
      ingredients: 'Charred morels, black truffle jus, smoked parsnip mousseline',
      wine: '2015 Château Margaux Premier Grand Cru Classé',
      dietary: 'Signature',
    },
    {
      course: 'dessert',
      name: 'Valrhona Grand Cru Soufflé',
      ingredients: 'Tahitian vanilla bean crème anglaise, roasted hazelnut praline',
      wine: '2010 Château d’Yquem Sauternes',
      dietary: 'Vegetarian',
    },
  ];

  const filteredMenu = menuCourse === 'all'
    ? menuItems
    : menuItems.filter((item) => item.course === menuCourse);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setReserved(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4] font-serif-vintage selection:bg-amber-600 selection:text-black">
      {/* Michelin Top Bar */}
      <header className="border-b border-[#292524] bg-[#141210]/95 backdrop-blur-md sticky top-0 z-30 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-amber-500/60 flex items-center justify-center text-amber-400 font-cinzel text-sm">
            ★
          </div>
          <div>
            <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-white uppercase block leading-none">
              L’ÉTOILE
            </span>
            <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-sans">
              Trois Étoiles Michelin · Paris
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-stone-400 font-sans">
          <a href="#tasting" className="hover:text-amber-400 transition-colors">Tasting Menu</a>
          <a href="#wine" className="hover:text-amber-400 transition-colors">Cellar</a>
          <a href="#story" className="hover:text-amber-400 transition-colors">Chef & Terroir</a>
        </nav>

        <button
          onClick={() => setReserveModalOpen(true)}
          className="px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-widest uppercase bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 hover:brightness-110 shadow-md shadow-amber-900/30 transition-all cursor-pointer"
        >
          Reserve Table
        </button>
      </header>

      {/* Sensual Culinary Hero */}
      <section className="relative py-28 px-8 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>

        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 leading-tight">
          Gastronomy Elevated <br />
          <span className="italic font-serif text-amber-200">to Pure Artistry.</span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed mb-10 font-light">
          An intimate 24-seat sensory dining experience in the heart of Paris. Rare seasonal harvests, wood-fired hearths, and centuries-old French culinary savoir-faire.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 font-sans text-xs">
          <button
            onClick={() => setReserveModalOpen(true)}
            className="px-8 py-3.5 rounded-full font-semibold tracking-widest uppercase bg-amber-500 text-stone-950 hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-950/40"
          >
            Book Chef’s Table
          </button>
          <a
            href="#tasting"
            className="px-8 py-3.5 rounded-full font-semibold tracking-widest uppercase border border-stone-700 text-stone-300 hover:border-amber-400 transition-all"
          >
            View Autumn Tasting
          </a>
        </div>
      </section>

      {/* Tasting Menu Section */}
      <section id="tasting" className="py-24 border-t border-b border-[#292524] bg-[#12100e]">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-sans block mb-2">Autumn Harvest Degustation</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-white">Seven-Course Tasting Menu</h2>
            <p className="font-sans text-xs text-stone-400 mt-2 font-light">€285 per guest · Optional Sommelier Wine Pairing €160</p>
          </div>

          {/* Course filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-sans text-xs">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'amuse', label: 'Amuse-Bouche' },
              { id: 'sea', label: 'L’Océan' },
              { id: 'land', label: 'La Terre' },
              { id: 'dessert', label: 'Douceur' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMenuCourse(tab.id as any)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  menuCourse === tab.id
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'border border-stone-800 text-stone-400 hover:border-amber-500/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <div className="space-y-8">
            {filteredMenu.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#171412] border border-[#2d2824] hover:border-amber-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-cinzel text-xl text-white font-bold tracking-wide">
                    {item.name}
                  </h3>
                  <span className="font-sans text-[11px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300">
                    {item.dietary}
                  </span>
                </div>

                <p className="font-sans text-sm text-stone-400 leading-relaxed mb-4 font-light">
                  {item.ingredients}
                </p>

                <div className="flex items-center gap-2 font-sans text-xs text-amber-200/80 pt-3 border-t border-stone-800/60">
                  <Wine className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Accord Mets & Vins: <strong>{item.wine}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terroir & Wine Cellar */}
      <section id="wine" className="py-24 max-w-5xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-sans block">Le Caveau</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-white leading-tight">
              A Living Cellar of 1,800 Rare References
            </h2>
            <p className="font-sans text-sm text-stone-300 leading-relaxed font-light">
              Under the guidance of Head Sommelier Jean-Baptiste Moreau, our underground limestone vault houses rare vintages from legendary estates across Burgundy, Bordeaux, the Rhône Valley, and biodynamic European growers.
            </p>
            <div className="p-4 rounded-xl bg-[#171412] border border-stone-800 text-xs font-sans text-stone-400 space-y-2">
              <div>• Vertical collections of Domaine de la Romanée-Conti (1988–2019)</div>
              <div>• Hand-blown Zalto Austrian glassware for every pairing</div>
              <div>• Coravin preservation for rare glass allocations</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1a1714] to-[#12100d] border border-stone-800 text-center">
            <Clock className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h3 className="font-cinzel text-xl text-white mb-2">Service Hours</h3>
            <div className="font-sans text-xs text-stone-400 space-y-1 mb-6 font-light">
              <div>Dinner: Wednesday through Sunday, 19:00 – 23:30</div>
              <div>Lunch: Friday and Saturday, 12:00 – 15:00</div>
              <div>Monday & Tuesday Closed for Terroir Foraging</div>
            </div>
            <div className="text-xs font-sans text-amber-400 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>18 Place Vendôme, 75001 Paris</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table Reservation Modal */}
      {reserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#181512] border border-amber-500/40 p-8 rounded-3xl max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => {
                setReserveModalOpen(false);
                setReserved(false);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {reserved ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="font-cinzel text-2xl text-white mb-2">Table Reserved</h3>
                <p className="font-sans text-xs text-stone-300 leading-relaxed mb-6 font-light">
                  Thank you, <strong className="text-amber-300 font-medium">{guestName}</strong>. Your reservation for <strong className="text-white font-medium">{partySize} on {reserveDate} at {reserveTime}</strong> has been secured in our guestbook. A confirmation has been registered.
                </p>
                <button
                  onClick={() => {
                    setReserveModalOpen(false);
                    setReserved(false);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-amber-500 text-stone-950 cursor-pointer"
                >
                  Return to Restaurant
                </button>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="font-sans">
                <div className="text-xs uppercase tracking-widest text-amber-400 mb-1 font-semibold">
                  Michelin Dining
                </div>
                <h3 className="font-cinzel text-2xl text-white mb-4">Table Reservation</h3>

                <div className="space-y-4 text-xs mb-6">
                  <div>
                    <label className="block text-stone-400 uppercase tracking-wider mb-1">Lead Guest Name</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Monsieur Laurent"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241f1a] border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-400 uppercase tracking-wider mb-1">Date</label>
                      <input
                        type="date"
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#241f1a] border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 uppercase tracking-wider mb-1">Time</label>
                      <select
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#241f1a] border border-stone-700 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-400 uppercase tracking-wider mb-1">Party Size</label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241f1a] border border-stone-700 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option>2 Guests (Dining Room)</option>
                      <option>4 Guests (Dining Room)</option>
                      <option>6 Guests (Chef’s Salon)</option>
                      <option>8 Guests (Private Cellar Table)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500 text-stone-950 hover:bg-amber-400 transition-all cursor-pointer font-sans"
                >
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Restaurant Footer */}
      <footer className="border-t border-[#292524] py-12 px-8 text-center text-xs text-stone-500 font-sans">
        <p className="tracking-widest uppercase mb-1">L’ÉTOILE GOURMET PARIS</p>
        <p className="font-light">Architected & Engineered by HAVEN 2.0 Web Platform</p>
      </footer>
    </div>
  );
};
