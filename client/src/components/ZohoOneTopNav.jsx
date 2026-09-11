import React from 'react';
import { 
  Search, 
  Grid, 
  Sparkles, 
  Bell, 
  Settings, 
  User, 
  HelpCircle,
  Globe,
  Layers,
  PhoneCall
} from 'lucide-react';

export const ZohoOneTopNav = ({ viewMode, setViewMode, onOpenVoiceDemo }) => {
  return (
    <header className="bg-[#0b1a30] text-slate-200 border-b border-[#172e50] h-12 px-4 flex items-center justify-between text-xs select-none sticky top-0 z-50">
      {/* Left: Zoho One 4-Color Logo & App Launcher */}
      <div className="flex items-center gap-3">
        <button 
          title="Zoho One Apps Launcher"
          className="p-1.5 rounded-lg hover:bg-[#152945] text-slate-300 transition-colors"
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Iconic Zoho 4-Color Tile Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('landing')}>
          <div className="grid grid-cols-2 gap-0.5 w-5 h-5 rounded overflow-hidden shadow-sm">
            <span className="bg-[#E42528]"></span>
            <span className="bg-[#00A859]"></span>
            <span className="bg-[#0074E4]"></span>
            <span className="bg-[#FFB900]"></span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-extrabold text-sm tracking-tight text-white font-sans">ZOHO</span>
            <span className="font-bold text-xs text-[#00A859]">One</span>
          </div>
        </div>

        {/* Global Product Pill */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#132742] text-slate-300 border border-[#1f3a5f]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-pulse"></span>
          Autonomous AI Voice & WhatsApp Suite
        </span>
      </div>

      {/* Middle: Universal Search Bar (Zoho Search style) */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search CRM Leads, Books Invoices, Desk Tickets (Ctrl + /)..."
            className="w-full bg-[#132742] border border-[#1f3a5f] rounded-lg pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#0074E4] transition-all"
          />
          <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400 px-1 rounded bg-[#0b1a30]">
            /
          </span>
        </div>
      </div>

      {/* Right: Zia AI, View Toggle, Actions & Profile */}
      <div className="flex items-center gap-2">
        {/* Toggle between Website and Live Zoho CRM Environment */}
        <button
          onClick={() => setViewMode(viewMode === 'landing' ? 'widget' : 'landing')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'widget'
              ? 'bg-[#0074E4] hover:bg-[#0063c6] text-white shadow-md'
              : 'bg-[#152945] hover:bg-[#1d375d] text-slate-200 border border-[#1f3a5f]'
          }`}
        >
          {viewMode === 'landing' ? (
            <>
              <Layers className="w-3.5 h-3.5 text-[#FFB900]" />
              <span>Launch Zoho CRM View</span>
            </>
          ) : (
            <>
              <Globe className="w-3.5 h-3.5 text-[#00A859]" />
              <span>Product Showcase</span>
            </>
          )}
        </button>

        {/* Live AI Voice Caller Button */}
        <button
          onClick={onOpenVoiceDemo}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[#E42528] to-[#FF4B4B] hover:opacity-90 text-white font-bold text-xs shadow-sm shadow-red-950/50"
        >
          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
          <span>AI Voice Caller</span>
        </button>

        {/* Zia / AI Icon */}
        <button 
          title="Zia AI Assistant"
          className="p-1.5 rounded-lg hover:bg-[#152945] text-amber-400 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <button 
          title="Notifications"
          className="p-1.5 rounded-lg hover:bg-[#152945] text-slate-300 transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E42528]"></span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#172e50]">
          <div className="w-7 h-7 rounded-full bg-[#0074E4] text-white font-bold text-xs flex items-center justify-center shadow-inner">
            MY
          </div>
          <span className="hidden xl:inline text-xs font-medium text-slate-300">Mohamed Yasar</span>
        </div>
      </div>
    </header>
  );
};
