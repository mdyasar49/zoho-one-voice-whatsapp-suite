import React, { useState, useEffect } from 'react';
import { Headphones, Plus, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const ZohoDeskModal = ({ contact, onClose, onRefreshChat }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('High');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!contact?.phone) return;
    api.getTickets(contact.phone)
      .then(res => setTickets(res))
      .finally(() => setLoading(false));
  }, [contact]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!subject.trim()) return;
    setSubmitting(true);
    try {
      await api.createTicket({
        phone: contact.phone,
        contactName: contact.name,
        subject,
        priority
      });
      onRefreshChat();
      setShowCreateForm(false);
      setSubject('');
      // refresh tickets list
      const updated = await api.getTickets(contact.phone);
      setTickets(updated);
      alert("Zoho Desk Support Ticket created and client notified on WhatsApp!");
    } catch (err) {
      alert("Failed to create ticket: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Zoho Desk Support Hub</h3>
              <p className="text-xs text-slate-400">Convert WhatsApp inquiries into Zoho Desk tickets</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 flex-1 overflow-y-auto space-y-3">
          {!showCreateForm ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Active Tickets ({tickets.length})</span>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1 shadow-md shadow-amber-950/40"
                >
                  <Plus className="w-3.5 h-3.5" /> Convert to Ticket
                </button>
              </div>

              {loading ? (
                <p className="text-xs text-slate-400 text-center py-6">Loading tickets from Zoho Desk...</p>
              ) : tickets.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Headphones className="w-10 h-10 mx-auto mb-2 opacity-40 text-amber-400" />
                  <p className="text-sm text-slate-300">No Open Tickets for this Contact</p>
                  <p className="text-xs text-slate-500 mt-1">Click above to log a new ticket directly from chat.</p>
                </div>
              ) : (
                tickets.map((tkt) => (
                  <div
                    key={tkt.id}
                    className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400 font-mono">{tkt.ticketNumber}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {tkt.priority} Priority
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                          {tkt.status}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-white mt-1">{tkt.subject}</p>
                    </div>
                  </div>
                ))
              )}
            </>
          ) : (
            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Ticket Subject / Issue Summary</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Inquired about API Rate limits or custom domain setup..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-md"
                >
                  {submitting ? "Logging Ticket..." : "Create in Zoho Desk"}
                </button>
              </div>
            </form>
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
