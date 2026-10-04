import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { PRICING_PLANS, CURRENCIES } from '../../data/pricingData';
import { ArrowRight, Check } from 'lucide-react';

export const PricingPreviewSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('USD');

  const curr = CURRENCIES.find((c) => c.code === selectedCurrencyCode) || CURRENCIES[0];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
              <span>Transparent Investment</span>
            </div>
            <h2
              className={`font-syne text-3xl sm:text-5xl font-bold tracking-tight ${
                isNight ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Clear, Predictable Pricing
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl">
              Transparent packages tailored to whether you only need the custom code build, or want fully managed cloud hosting and domain care.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-neutral-400 font-medium">Currency:</span>
            <div className={`p-1 rounded-lg flex items-center gap-1 ${isNight ? 'bg-purple-950/40 border border-purple-800/30' : 'bg-neutral-100'}`}>
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCurrencyCode(c.code)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    selectedCurrencyCode === c.code
                      ? 'bg-purple-600 text-white shadow-sm'
                      : isNight ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => {
            const setupPrice = Math.round(plan.setupFeeUSD * curr.rate);
            const monthlyPrice = Math.round(plan.priceMonthlyUSD * curr.rate);

            return (
              <div
                key={plan.id}
                className={`p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                  plan.highlight
                    ? isNight
                      ? 'bg-gradient-to-b from-[#170e30] to-[#0c071a] border-2 border-purple-500 shadow-xl shadow-purple-950/40'
                      : 'bg-white border-2 border-purple-600 shadow-lg shadow-purple-600/10'
                    : isNight
                    ? 'bg-[#0c0819]/60 border border-purple-900/30 hover:border-purple-600/40'
                    : 'bg-white border border-purple-100 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3
                    className={`font-syne text-lg font-bold mb-1 ${
                      isNight ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-purple-900/20">
                    <div className="flex items-baseline gap-1">
                      <span className="font-syne text-3xl sm:text-4xl font-black tracking-tight text-purple-400">
                        {curr.symbol}{setupPrice}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">one-time build</span>
                    </div>

                    {plan.priceMonthlyUSD > 0 ? (
                      <div className="text-xs text-neutral-400 mt-1">
                        + {curr.symbol}{monthlyPrice}/mo for managed service
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-400 mt-1 font-medium">
                        Zero recurring fees to HAVEN
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.slice(0, 5).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('contact')}
                  className={`w-full py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    plan.highlight
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                      : isNight
                      ? 'bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 text-purple-300'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('pricing')}
            className={`text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
              isNight ? 'text-purple-300 hover:text-white' : 'text-purple-700 hover:text-purple-950'
            }`}
          >
            <span>Compare full package feature matrix & add-ons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
