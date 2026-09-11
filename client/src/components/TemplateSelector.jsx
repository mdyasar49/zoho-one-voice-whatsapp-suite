import React, { useState } from 'react';
import { FileText, Send, X, Check } from 'lucide-react';

export const TemplateSelector = ({ templates, onSendTemplate, onClose, contactName }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [variables, setVariables] = useState({});

  const handleSelect = (tmpl) => {
    setSelectedTemplate(tmpl);
    const initialVars = {};
    if (tmpl.variables && tmpl.variables.length > 0) {
      tmpl.variables.forEach((v, idx) => {
        initialVars[idx] = idx === 0 ? (contactName || 'Valued Customer') : '';
      });
    }
    setVariables(initialVars);
  };

  const handleSend = () => {
    if (!selectedTemplate) return;
    const varList = selectedTemplate.variables ? selectedTemplate.variables.map((_, idx) => variables[idx] || '') : [];
    onSendTemplate(selectedTemplate.id, varList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">WhatsApp Approved Templates</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-3 flex-1 overflow-y-auto space-y-2">
          {!selectedTemplate ? (
            templates.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => handleSelect(tmpl)}
                className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white">{tmpl.name}</span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                    {tmpl.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{tmpl.body}</p>
              </div>
            ))
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-emerald-500/30">
                <span className="text-xs font-semibold text-emerald-400 block mb-1">{selectedTemplate.name}</span>
                <p className="text-xs text-slate-200">{selectedTemplate.body}</p>
              </div>

              {selectedTemplate.variables && selectedTemplate.variables.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-medium text-slate-300">Template Variables:</span>
                  {selectedTemplate.variables.map((varName, idx) => (
                    <div key={idx}>
                      <label className="text-[11px] text-slate-400 block mb-0.5">{`{{${idx + 1}}} ${varName}`}</label>
                      <input
                        type="text"
                        value={variables[idx] || ''}
                        onChange={(e) => setVariables({ ...variables, [idx]: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        placeholder={`Enter ${varName}...`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
          {selectedTemplate ? (
            <>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
              >
                Back
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md shadow-emerald-900/30"
              >
                <Send className="w-3.5 h-3.5" />
                Send Template
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
