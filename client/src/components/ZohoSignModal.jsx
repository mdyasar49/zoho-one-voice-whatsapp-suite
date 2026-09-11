import React, { useState, useEffect } from 'react';
import { FileSignature, Send, X, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const ZohoSignModal = ({ contact, onClose, onRefreshChat }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docName, setDocName] = useState('Non-Disclosure Agreement (NDA).pdf');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!contact?.phone) return;
    api.getSignDocs(contact.phone)
      .then(res => setDocuments(res))
      .finally(() => setLoading(false));
  }, [contact]);

  const handleRequestSign = async (e) => {
    e.preventDefault();
    if (!docName.trim()) return;
    setSending(true);
    try {
      await api.requestSign({
        phone: contact.phone,
        contactName: contact.name,
        documentName: docName
      });
      onRefreshChat();
      const updated = await api.getSignDocs(contact.phone);
      setDocuments(updated);
      alert("Zoho Sign e-Signature link dispatched via WhatsApp!");
    } catch (err) {
      alert("Failed to send signature request: " + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <FileSignature className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Zoho Sign (e-Signatures)</h3>
              <p className="text-xs text-slate-400">Send contracts and agreements for instant signing on WhatsApp</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 flex-1 overflow-y-auto space-y-4">
          <form onSubmit={handleRequestSign} className="p-3.5 rounded-xl bg-slate-800/80 border border-purple-500/30 space-y-3">
            <h4 className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> 1-Click Send Document for e-Signature
            </h4>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Select / Type Document Name</label>
              <input
                type="text"
                required
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g. Master Services Agreement (MSA) - TechNova.pdf"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/40"
            >
              <Send className="w-3.5 h-3.5" />
              {sending ? "Generating Signing Link..." : "Send via WhatsApp"}
            </button>
          </form>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-2">Sent Documents</h4>
            {loading ? (
              <p className="text-xs text-slate-400">Loading documents...</p>
            ) : documents.length === 0 ? (
              <p className="text-xs text-slate-500">No documents sent yet for this contact.</p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div className="truncate mr-2">
                    <p className="text-xs font-medium text-white truncate">{doc.docName}</p>
                    <span className="text-[10px] text-amber-400">{doc.status}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 shrink-0">
                    Zoho Sign
                  </span>
                </div>
              ))
            )}
          </div>
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
