import React from 'react';
import { Sparkles, Phone, Building2, User, RefreshCw, Layers } from 'lucide-react';

export const Header = ({ currentContact, onRefresh, showSidebar, setShowSidebar, isAIMode, setIsAIMode }) => {
  return (
    <header className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          title="Toggle Lead / Contact List"
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/50 md:hidden"
        >
          <Layers className="w-4 h-4" />
        </button>

        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-emerald-900/40">
            {currentContact?.name ? currentContact.name.charAt(0) : 'U'}
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white tracking-tight">
              {currentContact?.name || "Select Contact"}
            </h2>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {currentContact?.zohoModule || "Lead"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              +{currentContact?.phone || "919876543210"}
            </span>
            {currentContact?.company && (
              <span className="hidden sm:flex items-center gap-1 text-slate-400">
                <Building2 className="w-3 h-3 text-slate-500" />
                {currentContact.company}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsAIMode(!isAIMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
            isAIMode
              ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-900/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
          }`}
          title="Toggle Gemini AI Copilot Suggestions"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isAIMode ? 'text-purple-400 animate-pulse' : 'text-slate-400'}`} />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        <button
          onClick={onRefresh}
          title="Refresh Conversation & AI Suggestions"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/50"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
