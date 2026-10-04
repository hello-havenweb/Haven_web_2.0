import React, { useState } from 'react';
import { Clock, Compass, Shield, Award, Calendar, ChevronRight, CheckCircle2, X } from 'lucide-react';

export const VintageAtelierApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-10-15');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [clientName, setClientName] = useState('');

  const pieces = [
    {
      id: 'chrono-i',
      name: 'Chronographe Monopoussoir No. 04',
      year: '1924 Heritage Edition',
      category: 'chronograph',
      material: '18k Rose Gold & Grand Feu Enamel',
      movement: 'Calibre 11-B Hand-Wound (38 Hours)',
      price: '$42,500',
      description: 'Single-button column-wheel chronograph with Breguet numerals and blued steel hands.',
    },
    {
      id: 'tourbillon-ii',
      name: 'Tourbillon Souscription No. 09',
      year: 'Piece Unique',
      category: 'tourbillon',
      material: '950 Platinum & Frosted German Silver',
      movement: 'Calibre 14-T Flying Tourbillon (60s)',
      price: '$128,000',
      description: 'One-minute flying tourbillon carriage rotating on ceramic ball bearings with handmade hairspring.',
    },
    {
      id: 'astronomique-iii',
      name: 'Quantième Perpétuel Lunaire',
      year: 'Limited to 12 Pieces',
      category: 'complication',
      material: 'White Gold & Aventurine Star Dial',
      movement: 'Calibre 18-QP Perpetual Calendar',
      price: '$94,000',
      description: 'Astronomical moonphase accurate to one day every 122 years, paired with instant jump perpetual date.',
    },
    {
      id: 'atelier-iv',
      name: 'L’Observatoire Chronomètre',
      year: 'Artisan Series',
      category: 'chronograph',
      material: 'Surgical Stainless Steel & Salmon Guilloché',
      movement: 'Calibre 08-C Geneva Seal Certified',
      price: '$28,900',
      description: 'Hand-turned guilloché dial created on a 1912 rose engine lathe in our Geneva workshop.',
    },
  ];

  const filteredPieces = selectedCategory === 'all'
    ? pieces
    : pieces.filter((p) => p.category === selectedCategory);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;
    setAppointmentBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#110e0c] text-[#ece4d9] font-serif-vintage selection:bg-[#c5a059] selection:text-black">
      {/* Editorial Luxury Header */}
      <header className="border-b border-[#342a22] bg-[#15110e]/95 backdrop-blur-md sticky top-0 z-30 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] text-xs font-cinzel font-bold">
            V
          </div>
          <div>
            <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#f4efe8] uppercase block leading-none">
              VINTAGE ATELIER
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#a38656] uppercase font-sans">
              Genève · Fondé en 1894
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-[#bcaaa0] font-sans">
          <a href="#creations" className="hover:text-[#c5a059] transition-colors">Creations</a>
          <a href="#heritage" className="hover:text-[#c5a059] transition-colors">Heritage</a>
          <a href="#craftsmanship" className="hover:text-[#c5a059] transition-colors">The Craft</a>
        </nav>

        <button
          onClick={() => setAppointmentModalOpen(true)}
          className="px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-widest uppercase border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all cursor-pointer"
        >
          Private Salon
        </button>
      </header>

      {/* Hero: Editorial Photography & Serif Grandeur */}
      <section className="relative py-24 px-8 max-w-6xl mx-auto text-center">
        <div className="inline-block border-b border-[#c5a059]/40 pb-2 mb-8">
          <span className="text-xs uppercase tracking-[0.35em] text-[#c5a059] font-sans font-medium">
            Haute Horlogerie & Bespoke Atelier
          </span>
        </div>

        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#fbf8f5] mb-8 leading-[1.15]">
          Timeless Precision, <br />
          <span className="italic font-serif text-[#d6b579]">Sculpted by Hand.</span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#bdae9f] max-w-2xl mx-auto leading-relaxed mb-12 font-light">
          For over a century, Vintage Atelier has preserved the purist Swiss art of mechanical movement finishing. No mass production. Only numbered pieces crafted for connoisseurs of the rare and eternal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 font-sans">
          <a
            href="#creations"
            className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#c5a059] text-black hover:bg-[#d8b368] transition-all cursor-pointer"
          >
            Explore Timepieces
          </a>
          <button
            onClick={() => setAppointmentModalOpen(true)}
            className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-[#524135] text-[#ece4d9] hover:border-[#c5a059] transition-all cursor-pointer"
          >
            Reserve Private Consultation
          </button>
        </div>
      </section>

      {/* Heritage Timeline Section */}
      <section id="heritage" className="py-20 border-t border-b border-[#2b221b] bg-[#140f0c]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-sans block mb-2">Chronicle of Excellence</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#f4efe8]">A Century of Heritage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-sans">
            {[
              { year: '1894', title: 'The First Workshop', desc: 'Master watchmaker Henri Laurent establishes the atelier in Vallée de Joux.' },
              { year: '1924', title: 'Grand Prix de Genève', desc: 'Awarded first prize for the precision of the Calibre 11 Monopoussoir.' },
              { year: '1968', title: 'Perpetual Innovation', desc: 'First ultrathin skeletonized perpetual calendar movement debuts.' },
              { year: 'Today', title: 'Restricted Production', desc: 'Strict limit of 80 hand-finished timepieces per calendar year.' },
            ].map((milestone, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#1a1410] border border-[#34271e]">
                <div className="font-cinzel text-3xl font-bold text-[#c5a059] mb-3">{milestone.year}</div>
                <h3 className="font-serif-vintage text-lg font-bold text-white mb-2">{milestone.title}</h3>
                <p className="text-xs text-[#a89789] leading-relaxed font-light">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Pieces Showcase */}
      <section id="creations" className="py-24 max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-sans block mb-2">Curated Horology</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#f4efe8]">Numbered Masterworks</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-sans text-xs">
            {[
              { id: 'all', label: 'All Creations' },
              { id: 'chronograph', label: 'Chronographs' },
              { id: 'tourbillon', label: 'Tourbillons' },
              { id: 'complication', label: 'Grand Complications' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'border border-[#3d2f25] text-[#a89789] hover:border-[#c5a059]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPieces.map((piece) => (
            <div
              key={piece.id}
              className="p-8 rounded-3xl bg-[#17120e] border border-[#362920] hover:border-[#c5a059]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 font-sans text-xs">
                  <span className="text-[#c5a059] tracking-wider uppercase font-semibold">{piece.year}</span>
                  <span className="text-neutral-400 font-mono">{piece.price}</span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-white mb-2 group-hover:text-[#c5a059] transition-colors">
                  {piece.name}
                </h3>

                <p className="text-sm text-[#b3a191] leading-relaxed mb-6 font-sans font-light">
                  {piece.description}
                </p>

                <div className="space-y-2 py-4 border-t border-[#2e231a] font-sans text-xs text-[#9d8d80]">
                  <div className="flex justify-between">
                    <span className="text-[#7a6b60]">Case & Dial:</span>
                    <span className="text-white">{piece.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7a6b60]">Engine:</span>
                    <span className="text-[#c5a059]">{piece.movement}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 font-sans">
                <button
                  onClick={() => setAppointmentModalOpen(true)}
                  className="w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#c5a059]/60 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all cursor-pointer"
                >
                  Inquire Acquisition
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Modal */}
      {appointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#18130f] border border-[#c5a059]/40 p-8 rounded-3xl max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => {
                setAppointmentModalOpen(false);
                setAppointmentBooked(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {appointmentBooked ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#c5a059] mx-auto mb-4" />
                <h3 className="font-cinzel text-2xl text-white mb-2">Salon Visit Reserved</h3>
                <p className="font-sans text-xs text-[#b8a798] leading-relaxed mb-6 font-light">
                  Thank you, <strong className="text-[#c5a059] font-medium">{clientName}</strong>. Our Horology Director has reserved your private viewing for <strong className="text-white font-medium">{bookingDate} at {bookingTime}</strong>. A concierge invitation has been dispatched.
                </p>
                <button
                  onClick={() => {
                    setAppointmentModalOpen(false);
                    setAppointmentBooked(false);
                  }}
                  className="px-6 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-[#c5a059] text-black cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="font-sans">
                <div className="text-xs uppercase tracking-widest text-[#c5a059] mb-1 font-semibold">
                  Private Salon Viewing
                </div>
                <h3 className="font-cinzel text-2xl text-white mb-4">Request Consultation</h3>
                <p className="text-xs text-[#a9998b] mb-6 leading-relaxed font-light">
                  Experience our masterworks at our flagship salon in Geneva or London.
                </p>

                <div className="space-y-4 text-xs mb-6">
                  <div>
                    <label className="block text-[#a9998b] uppercase tracking-wider mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Lord Harrington"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#221a14] border border-[#423326] text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#a9998b] uppercase tracking-wider mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#221a14] border border-[#423326] text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#a9998b] uppercase tracking-wider mb-1">Time</label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#221a14] border border-[#423326] text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#c5a059] text-black hover:bg-[#d8b368] transition-all cursor-pointer"
                >
                  Confirm Salon Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Vintage Footer */}
      <footer className="border-t border-[#34271e] py-12 px-8 text-center text-xs text-[#87786d] font-sans">
        <p className="tracking-widest uppercase mb-2">VINTAGE ATELIER DE GENÈVE</p>
        <p className="font-light">Excellence in Independent Haute Horlogerie · Handcrafted Architecture by HAVEN</p>
      </footer>
    </div>
  );
};
