import React from 'react';
import { Sparkles, ArrowRight, Zap, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

export const AICopilotBar = ({ suggestions, onSelectReply, loading }) => {
  if (loading) {
    return (
      <div className="mx-3 my-2 p-3 rounded-xl bg-purple-950/20 border border-purple-800/30 flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
          <span className="text-xs text-purple-300 font-medium">Gemini AI is analyzing conversation context...</span>
        </div>
      </div>
    );
  }

  if (!suggestions) return null;

  return (
    <div className="mx-3 my-2 p-2.5 rounded-xl bg-gradient-to-r from-purple-950/30 via-slate-900/90 to-indigo-950/30 border border-purple-500/20 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase">
            AI Copilot Suggestions
          </span>
        </div>
        {suggestions.sentiment && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <TrendingUp className="w-3 h-3 text-purple-400" />
            {suggestions.sentiment}
          </span>
        )}
      </div>

      {suggestions.actionable_summary && (
        <p className="text-[11px] text-slate-300 mb-2.5 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>{suggestions.actionable_summary}</span>
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        {suggestions.action_oriented && (
          <button
            onClick={() => onSelectReply(suggestions.action_oriented)}
            className="group w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-900/30 border border-slate-700/60 hover:border-purple-500/40 text-xs text-slate-200 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Action
              </span>
              <span className="truncate">{suggestions.action_oriented}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </button>
        )}

        {suggestions.professional && (
          <button
            onClick={() => onSelectReply(suggestions.professional)}
            className="group w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-900/30 border border-slate-700/60 hover:border-purple-500/40 text-xs text-slate-200 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                Pro
              </span>
              <span className="truncate">{suggestions.professional}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </button>
        )}

        {suggestions.concise && (
          <button
            onClick={() => onSelectReply(suggestions.concise)}
            className="group w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-900/30 border border-slate-700/60 hover:border-purple-500/40 text-xs text-slate-200 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                Quick
              </span>
              <span className="truncate">{suggestions.concise}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};
