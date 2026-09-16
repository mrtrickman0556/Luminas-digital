import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, Send, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast, setActivePage } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('Download or Access Help');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    showToast('Your message has been sent to our support desk!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Mail className="w-3.5 h-3.5" />
          <span>Help & Customer Care</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Contact Lumina Support
        </h1>
        <p className="text-sm text-neutral-400">
          Have questions about your download, prompt packs, or order receipt? We are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-white font-display">
              Direct Support Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Primary Email</span>
                  <a
                    href="mailto:support@luminadigital.com"
                    className="text-white font-medium hover:text-indigo-300 transition-colors"
                  >
                    support@luminadigital.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Guaranteed Response Time</span>
                  <span className="text-white font-medium">Under 12 hours (7 days a week)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">14-Day Refund Requests</span>
                  <span className="text-white font-medium">Processed within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Looking for quick answers?</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Most questions regarding file formats, Notion setup, and refund policies are answered in our FAQ.
            </p>
            <button
              type="button"
              onClick={() => setActivePage('faq')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 pt-1"
            >
              <span>Visit the FAQ Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white font-display">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Topic / Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Download or Access Help">Download or Access Help</option>
                      <option value="Question About a Product">Question About a Product</option>
                      <option value="14-Day Refund Request">14-Day Refund Request</option>
                      <option value="Custom Prompt or Partnership">Custom Prompt or Partnership</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Order ID (If applicable)
                    </label>
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g. ORD-98241"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need assistance with..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Support Request</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto">
                  Thank you, {name}. A member of our support engineering team will reply to <strong className="text-white">{email}</strong> within 12 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
