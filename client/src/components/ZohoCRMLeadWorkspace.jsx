import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Tag, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Clock, 
  ShieldCheck, 
  FileText,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const ZohoCRMLeadWorkspace = ({ currentContact, onOpenVoiceDemo, onOpenTemplates }) => {
  const stages = [
    { name: "New Lead", completed: true },
    { name: "Contacted", completed: true },
    { name: "AI Voice Qualified", completed: true, active: true },
    { name: "Proposal / Quote", completed: false },
    { name: "Negotiation", completed: false },
    { name: "Closed Won", completed: false }
  ];

  return (
    <div className="flex-1 bg-[#0d1c33] text-slate-200 overflow-y-auto p-4 flex flex-col gap-4">
      {/* Top Breadcrumb & Lead Action Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1b3457]">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="text-[#0074E4] font-semibold hover:underline cursor-pointer">Leads</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-white font-bold">{currentContact?.name || "Raveena Arun"}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E42528]/20 text-[#ff5c5c] border border-[#E42528]/30">
            Hot Lead (AI Score 95)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenVoiceDemo}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            1-Click AI Call
          </button>
          <button
            onClick={onOpenTemplates}
            className="px-3 py-1 rounded-lg bg-[#00A859] hover:bg-[#00924d] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Mail className="w-3.5 h-3.5" />
            WhatsApp Template
          </button>
        </div>
      </div>

      {/* Zoho CRM Lead Pipeline Stage Bar */}
      <div className="bg-[#10233f] border border-[#1b3457] rounded-xl p-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Zoho CRM Lead Conversion Pipeline
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5">
          {stages.map((stg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                stg.active
                  ? 'bg-[#0074E4] text-white shadow-md ring-1 ring-blue-400'
                  : stg.completed
                  ? 'bg-[#00A859]/20 text-[#00A859] border border-[#00A859]/30'
                  : 'bg-[#142a4a] text-slate-400'
              }`}
            >
              {stg.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
              <span className="truncate">{stg.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Details Grid */}
      <div className="grid sm:grid-cols-3 gap-3">
        {/* Card 1: Contact Info */}
        <div className="bg-[#10233f] border border-[#1b3457] rounded-xl p-3.5 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <User className="w-3 h-3 text-[#0074E4]" /> Contact Information
          </span>
          <div className="text-xs space-y-1.5 pt-1">
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Full Name:</span>
              <strong className="text-white">{currentContact?.name}</strong>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Phone:</span>
              <strong className="text-[#00A859] font-mono">+{currentContact?.phone}</strong>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Company:</span>
              <strong className="text-white">{currentContact?.company || "TechNova Corp"}</strong>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Email:</span>
              <span className="text-slate-300">{currentContact?.email || "raveena@technova.com"}</span>
            </p>
          </div>
        </div>

        {/* Card 2: Deal & Revenue */}
        <div className="bg-[#10233f] border border-[#1b3457] rounded-xl p-3.5 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-[#00A859]" /> Deal & Books Integration
          </span>
          <div className="text-xs space-y-1.5 pt-1">
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Deal Value:</span>
              <strong className="text-emerald-400 font-mono text-sm">{currentContact?.dealValue || "₹4,50,000"}</strong>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Zoho Books:</span>
              <span className="text-blue-400 font-semibold">INV-2026-0042 (Active)</span>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Zoho Sign NDA:</span>
              <span className="text-purple-400 font-semibold">Pending Signature</span>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Lead Source:</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400">
                WhatsApp Inbound
              </span>
            </p>
          </div>
        </div>

        {/* Card 3: AI Copilot Intelligence */}
        <div className="bg-[#10233f] border border-[#1b3457] rounded-xl p-3.5 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> AI Zia / Gemini Copilot
          </span>
          <div className="text-xs space-y-1.5 pt-1">
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Buying Intent:</span>
              <span className="text-emerald-400 font-bold">High (95/100)</span>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Sentiment:</span>
              <span className="text-blue-300">Ready to Buy</span>
            </p>
            <p className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Next Action:</span>
              <span className="text-amber-300 font-medium">Demo Tomorrow 11 AM</span>
            </p>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/60">
              AI Voice Agent qualified budget for 50 Enterprise seats.
            </p>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-[#10233f] border border-[#1b3457] rounded-xl p-4 flex-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Zoho CRM Lead Activity History
        </span>

        <div className="space-y-3">
          <div className="flex items-start gap-3 text-xs">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-medium">Autonomous AI Voice Call Completed (Duration: 1m 14s)</p>
              <p className="text-slate-400 text-[11px]">Spoke with Raveena Arun • Demo locked for Tomorrow 11:00 AM • Lead Qualified</p>
              <span className="text-[10px] text-slate-500">Just now</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-medium">WhatsApp Demo Calendar Invite Dispatched</p>
              <p className="text-slate-400 text-[11px]">Sent meeting link (https://meet.zoho.com/dem_2026_live) to +91 98765 43210</p>
              <span className="text-[10px] text-slate-500">10 mins ago</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-medium">Zoho Books Invoice INV-2026-0042 Generated</p>
              <p className="text-slate-400 text-[11px]">Invoice of ₹1,25,000 shared via WhatsApp Cloud API</p>
              <span className="text-[10px] text-slate-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
