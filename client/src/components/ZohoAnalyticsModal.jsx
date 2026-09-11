import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, MessageSquare, Headphones, FileSignature, X, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const ZohoAnalyticsModal = ({ onClose }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalytics()
      .then(data => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Zoho Analytics & ROI Overview</h3>
              <p className="text-xs text-slate-400">Omnichannel WhatsApp metrics across your Zoho One suite</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 flex-1 overflow-y-auto space-y-4">
          {loading ? (
            <p className="text-xs text-slate-400 text-center py-8">Loading Analytics Dashboard...</p>
          ) : (
            <>
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block mb-1">Messages Sent</span>
                  <span className="text-base font-bold text-white font-mono">{stats?.totalMessagesSent?.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">{stats?.deliveryRate} Delv.</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block mb-1">AI Copilot Replies</span>
                  <span className="text-base font-bold text-purple-300 font-mono">{stats?.aiAssistedReplies?.toLocaleString()}</span>
                  <span className="text-[10px] text-purple-400 block mt-0.5">Gemini 1.5</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block mb-1">Books Payments</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{stats?.invoicesCollectedViaWhatsApp}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Collected</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block mb-1">Deals Revenue</span>
                  <span className="text-base font-bold text-blue-400 font-mono">{stats?.dealsInfluencedRevenue}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">CRM Value</span>
                </div>
              </div>

              {/* Product Integrations Health */}
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2.5">
                <h4 className="text-xs font-semibold text-slate-200">Zoho One Connected Products Status</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> Zoho CRM (Leads & Contacts)
                    </span>
                    <span className="text-emerald-400 font-medium">Active (Real-time Sync)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Zoho Books (Invoices & Payments)
                    </span>
                    <span className="text-emerald-400 font-medium">Active (Auto-Link)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span> Zoho Desk (Support Tickets)
                    </span>
                    <span className="text-emerald-400 font-medium">{stats?.deskTicketsResolvedViaWhatsApp} Tickets Handled</span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span> Zoho Sign (e-Signatures)
                    </span>
                    <span className="text-purple-300 font-medium">{stats?.signDocumentsCompleted} Completed</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
