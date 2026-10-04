import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { TEMPLATES_DATA } from '../data/templatesData';
import { ClientEnquiry, TemplateId } from '../types';
import { Send, CheckCircle2, Sparkles, X, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { selectedEnquiryTemplate, setSelectedEnquiryTemplate, navigateTo } = useNavigation();
  const { isNight } = useTheme();

  const [formData, setFormData] = useState<ClientEnquiry>({
    fullName: '',
    email: '',
    businessName: '',
    selectedTemplate: selectedEnquiryTemplate || '',
    projectType: 'Bespoke Production Website',
    needHosting: true,
    needDomain: true,
    budgetRange: '$1,000 - $2,500',
    timeline: '2-4 weeks',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ClientEnquiry, string>>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Sync if context selectedEnquiryTemplate changes
  React.useEffect(() => {
    if (selectedEnquiryTemplate && selectedEnquiryTemplate !== formData.selectedTemplate) {
      setFormData((prev) => ({ ...prev, selectedTemplate: selectedEnquiryTemplate }));
    }
  }, [selectedEnquiryTemplate]);

  const selectedTemplateObj = TEMPLATES_DATA.find((t) => t.id === formData.selectedTemplate);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ClientEnquiry, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.businessName.trim()) {
      errs.businessName = 'Please enter your business or project name';
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      errs.message = 'Please provide a brief description of your project requirements (min 15 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate real submission handling
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission a Project</span>
          </div>
          <h1
            className={`font-syne text-4xl sm:text-5xl font-black tracking-tight mb-4 ${
              isNight ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Start Your HAVEN Project
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Tell us about your brand vision. Whether you have chosen an architectural template or desire a tailored custom build, we review every enquiry within 24 business hours.
          </p>
        </div>

        {submitted ? (
          <div
            className={`p-10 sm:p-14 rounded-3xl text-center border animate-in zoom-in-95 duration-300 ${
              isNight
                ? 'bg-[#0e091e] border-purple-800/40 shadow-2xl'
                : 'bg-white border-purple-200 shadow-xl'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className={`font-syne text-3xl font-bold mb-3 ${isNight ? 'text-white' : 'text-neutral-900'}`}>
              Enquiry Successfully Received
            </h2>
            <p className="text-sm text-neutral-400 max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-purple-300 font-semibold">{formData.fullName}</strong>. Our lead architect has received your project briefing for <strong className="text-purple-300 font-semibold">{formData.businessName}</strong>
              {selectedTemplateObj ? ` based on the ${selectedTemplateObj.name} foundation` : ''}.
            </p>
            <div className={`p-4 rounded-xl text-xs max-w-md mx-auto mb-8 ${isNight ? 'bg-purple-950/40 text-purple-300' : 'bg-purple-50 text-purple-900'}`}>
              We will contact you at <span className="font-semibold underline">{formData.email}</span> with a discovery outline and preliminary staging timeline.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    businessName: '',
                    selectedTemplate: '',
                    projectType: 'Bespoke Production Website',
                    needHosting: true,
                    needDomain: true,
                    budgetRange: '$1,000 - $2,500',
                    timeline: '2-4 weeks',
                    message: '',
                  });
                  setSelectedEnquiryTemplate('');
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer ${
                  isNight ? 'bg-purple-950/60 text-purple-300 hover:text-white border border-purple-800/40' : 'bg-neutral-100 text-neutral-800'
                }`}
              >
                Submit Another Request
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`p-8 sm:p-12 rounded-3xl border transition-all ${
              isNight
                ? 'bg-[#0d081b]/80 border-purple-900/30 shadow-2xl'
                : 'bg-white border-purple-100 shadow-xl'
            }`}
          >
            {/* Auto Selected Template Banner */}
            {selectedTemplateObj ? (
              <div className={`p-4 rounded-2xl mb-8 flex items-center justify-between gap-4 border ${
                isNight
                  ? 'bg-purple-950/40 border-purple-700/50'
                  : 'bg-purple-50 border-purple-200'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-purple-400/30">
                    <img
                      src={selectedTemplateObj.previewImage}
                      alt={selectedTemplateObj.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      Selected Starting Template
                    </div>
                    <div className={`font-syne text-sm font-bold ${isNight ? 'text-white' : 'text-neutral-900'}`}>
                      {selectedTemplateObj.name} ({selectedTemplateObj.category})
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Starting at ${selectedTemplateObj.startingPrice} · Custom adaptations included
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, selectedTemplate: '' }));
                    setSelectedEnquiryTemplate('');
                  }}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-purple-900/40 cursor-pointer"
                  title="Remove template selection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="mb-8">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Select a Template Foundation (Optional)
                </label>
                <select
                  value={formData.selectedTemplate}
                  onChange={(e) => {
                    const val = e.target.value as TemplateId | 'custom' | '';
                    setFormData((prev) => ({ ...prev, selectedTemplate: val }));
                    setSelectedEnquiryTemplate(val);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors cursor-pointer ${
                    isNight
                      ? 'bg-purple-950/20 border-purple-900/40 text-neutral-200 focus:border-purple-500'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-purple-500'
                  }`}
                >
                  <option value="">No template selected (100% Bespoke from scratch)</option>
                  {TEMPLATES_DATA.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {t.category} (From ${t.startingPrice})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Katherine Vance"
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                    errors.fullName ? 'border-red-500' : isNight ? 'bg-purple-950/20 border-purple-900/40 text-neutral-200 focus:border-purple-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-purple-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="katherine@yourdomain.com"
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500' : isNight ? 'bg-purple-950/20 border-purple-900/40 text-neutral-200 focus:border-purple-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-purple-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Brand or Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Apex Vanguard"
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                    errors.businessName ? 'border-red-500' : isNight ? 'bg-purple-950/20 border-purple-900/40 text-neutral-200 focus:border-purple-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-purple-500'
                  }`}
                />
                {errors.businessName && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.businessName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Estimated Budget
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors cursor-pointer ${
                    isNight ? 'bg-purple-950/20 border-purple-900/40 text-neutral-200 focus:border-purple-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-purple-500'
                  }`}
                >
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 - $2,500 (Standard HAVEN Build)</option>
                  <option value="$2,500 - $5,000">$2,500 - $5,000 (Multi-Page / Enterprise)</option>
                  <option value="$5,000+">$5,000+ (Full Brand Identity & Bespoke Platform)</option>
                </select>
              </div>
            </div>

            {/* Scope / Checkboxes */}
            <div className="mb-6 p-4 rounded-xl border border-purple-900/20 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Managed Infrastructure Needs
              </div>
              <label className="flex items-center gap-3 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.needHosting}
                  onChange={(e) => setFormData({ ...formData, needHosting: e.target.checked })}
                  className="rounded border-purple-700 text-purple-600 focus:ring-purple-500"
                />
                <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>
                  Include high-speed Managed Cloud Edge CDN Hosting ($29/mo)
                </span>
              </label>
              <label className="flex items-center gap-3 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.needDomain}
                  onChange={(e) => setFormData({ ...formData, needDomain: e.target.checked })}
                  className="rounded border-purple-700 text-purple-600 focus:ring-purple-500"
                />
                <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>
                  Register or configure custom branded domain & DNS records ($12/mo)
                </span>
              </label>
            </div>

            {/* Project Details Message */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Project Vision & Requirements *
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your brand, what pages or features you need, and any specific aesthetic ideas or references..."
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors ${
                  errors.message ? 'border-red-500' : isNight ? 'bg-purple-950/20 border-purple-900/40 text-neutral-200 focus:border-purple-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-purple-500'
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting Enquiry...' : 'Submit Project Enquiry'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
