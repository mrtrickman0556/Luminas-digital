import React from 'react';
import { Sparkles, Target, Award, Users, Zap, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Brand Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Empowering the next generation of builders, creators, and leaders.
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
          Lumina Digital was created with a clear standard: build concise, battle-tested, high-utility digital resources that eliminate noise and accelerate tangible results.
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Zero Academic Fluff</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Most business and productivity books are 300 pages of padding around 10 pages of actionable substance. Every Lumina e-book and prompt pack is 100% tactical signal.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Immediate Implementation</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            You don't need a 6-month curriculum. Download our Notion workspaces, copy our AI prompts, or read our playbooks in an afternoon and deploy them immediately.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Lifetime Updates</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            AI paradigms and digital commerce change monthly. Whenever we test new strategies or update prompt syntaxes, all previous buyers receive revised editions free forever.
          </p>
        </div>
      </div>

      {/* Who We Build For */}
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="max-w-xl">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            Target Audience
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Who These Resources Are Built For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Gen Z Founders', desc: 'Building high-margin solo software or media businesses without huge venture capital.' },
            { title: 'College & University Students', desc: 'Mastering personal finance, deep study focus, and modern portfolio building.' },
            { title: 'Freelancers & Agency Owners', desc: 'Automating client workflows, lead qualification, and contracts with Notion and AI.' },
            { title: 'Content Creators', desc: 'Scaling short-form video hooks, newsletter scripts, and visual social branding.' },
            { title: 'Young Tech Professionals', desc: 'Leveraging cutting-edge prompt engineering to deliver 10x output at work.' },
            { title: 'Self-Directed Learners', desc: 'People passionate about continuous self-improvement and financial freedom.' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-1.5">
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="text-2xl font-bold font-display text-white">
          Explore Our Digital Catalog
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
          Join thousands of operators mastering high-leverage skills today.
        </p>
        <button
          type="button"
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <span>Browse All Digital Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
