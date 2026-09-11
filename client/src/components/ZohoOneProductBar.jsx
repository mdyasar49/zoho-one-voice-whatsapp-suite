import React from 'react';
import { 
  Users, 
  Receipt, 
  Headphones, 
  FileSignature, 
  BarChart3, 
  Mic,
  Sparkles
} from 'lucide-react';

export const ZohoOneProductBar = ({ activeProduct, setActiveProduct, onOpenModal }) => {
  const products = [
    { id: 'crm', name: 'CRM', icon: Users, color: 'text-blue-400', bg: 'hover:bg-blue-500/10' },
    { id: 'voice', name: 'AI Voice Caller', icon: Mic, color: 'text-rose-400', bg: 'hover:bg-rose-500/10', highlight: true },
    { id: 'books', name: 'Books', icon: Receipt, color: 'text-emerald-400', bg: 'hover:bg-emerald-500/10' },
    { id: 'desk', name: 'Desk', icon: Headphones, color: 'text-amber-400', bg: 'hover:bg-amber-500/10' },
    { id: 'sign', name: 'Sign', icon: FileSignature, color: 'text-purple-400', bg: 'hover:bg-purple-500/10' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'text-sky-400', bg: 'hover:bg-sky-500/10' },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-xs">
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1.5 flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Zoho One
        </span>

        {products.map((p) => {
          const Icon = p.icon;
          const isActive = activeProduct === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onOpenModal(p.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all font-medium shrink-0 ${
                p.highlight
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-500/40 hover:bg-rose-900/50 shadow-sm'
                  : isActive
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : `text-slate-400 ${p.bg} hover:text-slate-200`
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${p.color}`} />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
        <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Autonomous Agent Active
        </span>
      </div>
    </div>
  );
};
