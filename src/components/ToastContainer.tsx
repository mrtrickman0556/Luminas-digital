import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-xl shadow-xl border flex items-start gap-3 text-xs backdrop-blur-md transition-all animate-in slide-in-from-top-2 ${
            toast.type === 'success'
              ? 'bg-neutral-900/95 border-emerald-500/40 text-neutral-100'
              : toast.type === 'error'
              ? 'bg-neutral-900/95 border-rose-500/40 text-neutral-100'
              : 'bg-neutral-900/95 border-indigo-500/40 text-neutral-100'
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 leading-snug">{toast.message}</div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-neutral-500 hover:text-white shrink-0 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
