import React from 'react';
import { User, Building2, Phone, Search, X } from 'lucide-react';

export const ContactSidebar = ({ contacts, selectedPhone, onSelectContact, onClose }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0 z-30">
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Zoho CRM Contacts</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-800 text-slate-400 md:hidden">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-2 border-b border-slate-800">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, phone, company..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map((c) => {
          const isSelected = c.phone === selectedPhone;
          return (
            <div
              key={c.id || c.phone}
              onClick={() => onSelectContact(c)}
              className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-emerald-950/40 border border-emerald-500/40 shadow-sm'
                  : 'hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                {c.name ? c.name.charAt(0) : 'U'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-medium text-white truncate">{c.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">+{c.phone.slice(-4)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
                  <span>{c.company || c.zohoModule}</span>
                  {c.leadStatus && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400">{c.leadStatus}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
