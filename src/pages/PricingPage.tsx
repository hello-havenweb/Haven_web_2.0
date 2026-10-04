import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { PRICING_PLANS, CURRENCIES, ADDONS_DATA } from '../data/pricingData';
import { ArrowRight, Check, Sparkles, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const curr = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investment Structure</span>
          </div>
          <h1
            className={`font-syne text-4xl sm:text-6xl font-black tracking-tight mb-4 ${
              isNight ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Transparent Studio Pricing
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed">
            Choose the exact scope your project demands. We cleanly separate the custom website build from ongoing hosting and domain registration.
          </p>
        </div>

        {/* Currency & Billing Cycle Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          {/* Billing Cycle Switcher */}
          <div className={`p-1.5 rounded-full flex items-center gap-1 ${isNight ? 'bg-purple-950/40 border border-purple-800/30' : 'bg-neutral-100'}`}>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-purple-600 text-white shadow-md'
                  : isNight ? 'text-neutral-400 hover:text-white' : 'text-neutral-600'
              }`}
            >
              <span>Annual Service (Save 20%)</span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-purple-600 text-white shadow-md'
                  : isNight ? 'text-neutral-400 hover:text-white' : 'text-neutral-600'
              }`}
            >
              <span>Monthly Service</span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium">Currency:</span>
            <div className={`p-1 rounded-lg flex items-center gap-1 ${isNight ? 'bg-purple-950/40 border border-purple-800/30' : 'bg-neutral-100'}`}>
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrencyCode(c.code)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    currencyCode === c.code
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

        {/* 4 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PRICING_PLANS.map((plan) => {
            const setupPrice = Math.round(plan.setupFeeUSD * curr.rate);
            const rawMonthly = billingCycle === 'annual'
              ? Math.round((plan.priceAnnualUSD / 12) * curr.rate)
              : Math.round(plan.priceMonthlyUSD * curr.rate);

            return (
              <div
                key={plan.id}
                className={`p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                  plan.highlight
                    ? isNight
                      ? 'bg-gradient-to-b from-[#180e33] to-[#0b0617] border-2 border-purple-500 shadow-xl shadow-purple-950/40'
                      : 'bg-white border-2 border-purple-600 shadow-lg'
                    : isNight
                    ? 'bg-[#0d091b]/70 border border-purple-900/30 hover:border-purple-600/40'
                    : 'bg-white border border-purple-100 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h2 className={`font-syne text-xl font-bold mb-1 ${isNight ? 'text-white' : 'text-neutral-900'}`}>
                    {plan.name}
                  </h2>
                  <p className="text-xs text-neutral-400 mb-6 min-h-[34px]">
                    {plan.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-t border-b border-purple-900/20 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1">
                      Setup & Custom Build
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-syne text-3xl sm:text-4xl font-black text-purple-400">
                        {curr.symbol}{setupPrice}
                      </span>
                      <span className="text-xs text-neutral-400">one-time</span>
                    </div>

                    <div className="mt-3 text-xs">
                      {plan.priceMonthlyUSD > 0 ? (
                        <div className="flex items-center gap-1 text-neutral-300 font-medium">
                          <span>Service:</span>
                          <span className="text-purple-300 font-bold">{curr.symbol}{rawMonthly}</span>
                          <span className="text-neutral-400">/month</span>
                        </div>
                      ) : (
                        <span className="text-emerald-400 font-medium">No recurring fees to HAVEN</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('contact')}
                  className={`w-full py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                      : isNight
                      ? 'bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 text-purple-300'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Optional Add-Ons Section */}
        <div className="mt-20">
          <h2 className={`font-syne text-2xl font-bold mb-6 ${isNight ? 'text-white' : 'text-neutral-900'}`}>
            Studio Add-On Enhancements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADDONS_DATA.map((addon) => {
              const price = Math.round(addon.priceUSD * curr.rate);
              return (
                <div
                  key={addon.id}
                  className={`p-6 rounded-2xl ${
                    isNight
                      ? 'bg-[#0d091b]/50 border border-purple-900/30'
                      : 'bg-white border border-purple-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-syne text-base font-bold ${isNight ? 'text-white' : 'text-neutral-900'}`}>
                      {addon.title}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-purple-400">
                      +{curr.symbol}{price}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {addon.description}
                  </p>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request with Project</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ note */}
        <div className={`mt-16 p-6 rounded-2xl border flex items-start gap-4 ${isNight ? 'bg-purple-950/20 border-purple-900/30' : 'bg-purple-50/50 border-purple-100'}`}>
          <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-neutral-400">
            <span className="font-semibold text-purple-300">Need a completely custom enterprise agreement?</span> We accommodate custom SLAs, dedicated infrastructure configurations, NDA requirements, and bespoke multi-site discounts. Reach out directly through our contact page.
          </div>
        </div>
      </div>
    </div>
  );
};
