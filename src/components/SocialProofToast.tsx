import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const RECENT_ACTIVITIES = [
  { name: 'Sarah K.', location: 'London', product: 'How to Be Financially Free at a Young Age', time: '3 minutes ago' },
  { name: 'Marcus C.', location: 'Austin, TX', product: 'The Ultimate AI Creator & Business Mega-Pack', time: '7 minutes ago' },
  { name: 'Elena R.', location: 'Berlin', product: 'Ultimate Life & Business Notion OS', time: '12 minutes ago' },
  { name: 'Devon V.', location: 'Toronto', product: 'Content Machine: 365 Viral Video Prompts', time: '18 minutes ago' }
];

export const SocialProofToast: React.FC = () => {
  const { navigateToProduct, products, settings } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || !settings.enableSocialProofToasts) return;

    // Show after 5 seconds
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    // Hide after 6 seconds, then cycle
    const cycleTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % RECENT_ACTIVITIES.length);
        setVisible(true);
      }, 10000); // 10s quiet interval
    }, 16000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, [dismissed, settings.enableSocialProofToasts]);

  if (!settings.enableSocialProofToasts || dismissed || !visible) return null;

  const activity = RECENT_ACTIVITIES[currentIdx];

  const handleClick = () => {
    const found = products.find(p => p.title.toLowerCase().includes(activity.product.toLowerCase().slice(0, 15)));
    if (found) {
      navigateToProduct(found.slug);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-5 left-5 z-30 max-w-xs bg-neutral-900/95 border border-neutral-800 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 cursor-pointer hover:border-neutral-700 transition-all animate-in slide-in-from-bottom-5"
    >
      <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
        <ShoppingBag className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[11px] text-neutral-400">
          <strong className="text-white font-medium">{activity.name}</strong> in {activity.location}
        </p>
        <p className="text-xs font-semibold text-neutral-200 truncate mt-0.5">
          Purchased {activity.product}
        </p>
        <span className="text-[10px] text-neutral-400 font-mono">{activity.time}</span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setDismissed(true);
        }}
        className="text-neutral-400 hover:text-neutral-300 p-1 shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
