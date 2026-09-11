import React, { useState, useEffect } from 'react';
import { Receipt, Send, X, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../services/api';

export const ZohoBooksModal = ({ contact, onClose, onRefreshChat }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState(null);

  useEffect(() => {
    if (!contact?.phone) return;
    api.getInvoices(contact.phone)
      .then(res => setInvoices(res))
      .finally(() => setLoading(false));
  }, [contact]);

  const handleSendInvoice = async (invoiceId) => {
    setSendingId(invoiceId);
    try {
      await api.sendInvoice({
        invoiceId,
        phone: contact.phone,
        contactName: contact.name
      });
      onRefreshChat();
      alert("Zoho Books Invoice & Payment link successfully sent via WhatsApp!");
    } catch (err) {
      alert("Failed to send invoice: " + err.message);
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Zoho Books & Invoices</h3>
              <p className="text-xs text-slate-400">Manage billing and send payment links to {contact?.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 flex-1 overflow-y-auto space-y-3">
          {loading ? (
            <p className="text-xs text-slate-400 text-center py-6">Loading invoices from Zoho Books...</p>
          ) : invoices.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Receipt className="w-10 h-10 mx-auto mb-2 opacity-40 text-emerald-400" />
              <p className="text-sm text-slate-300">No Invoices found in Zoho Books</p>
              <p className="text-xs text-slate-500 mt-1">Create an invoice in Zoho Books to share via WhatsApp.</p>
            </div>
          ) : (
            invoices.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:border-emerald-500/40 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">{inv.invoiceNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="font-semibold text-slate-200">{inv.amount}</span>
                    <span>Due: {inv.dueDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSendInvoice(inv.id)}
                  disabled={sendingId === inv.id}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md shadow-emerald-900/40 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {sendingId === inv.id ? "Sending..." : "Send on WhatsApp"}
                </button>
              </div>
            ))
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
