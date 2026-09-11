import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Paperclip, Smile, Check, CheckCheck, Clock, Sparkles } from 'lucide-react';

export const ChatWindow = ({
  messages,
  onSendMessage,
  onOpenTemplates,
  inputDraft,
  setInputDraft,
  loadingSend
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputDraft.trim() || loadingSend) return;
    onSendMessage(inputDraft.trim());
    setInputDraft('');
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/70 relative">
      {/* Messages stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 text-emerald-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-400">No message history yet</p>
            <p className="text-xs text-slate-600 mt-1 max-w-xs">
              Start the conversation or choose an approved WhatsApp template below.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOutbound = msg.direction === 'outbound';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isOutbound ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3.5 py-2.5 shadow-md ${
                    isOutbound
                      ? 'chat-bubble-outbound text-white rounded-br-none'
                      : 'chat-bubble-inbound text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed break-words">
                    {msg.text}
                  </p>
                  
                  <div
                    className={`flex items-center gap-1.5 mt-1 justify-end text-[10px] ${
                      isOutbound ? 'text-emerald-100/70' : 'text-slate-400'
                    }`}
                  >
                    <span>{formatTime(msg.timestamp)}</span>
                    {isOutbound && (
                      <span>
                        {msg.status === 'read' ? (
                          <CheckCheck className="w-3.5 h-3.5 text-sky-300 inline" />
                        ) : msg.status === 'delivered' ? (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-200 inline" />
                        ) : msg.status === 'sent' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-200 inline" />
                        ) : (
                          <Clock className="w-3 h-3 text-emerald-200 inline" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplates}
            title="Browse Approved WhatsApp Templates"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700/60 transition-all flex items-center gap-1.5 text-xs font-medium shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={inputDraft}
              onChange={(e) => setInputDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a WhatsApp message or select an AI suggestion..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none max-h-24"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!inputDraft.trim() || loadingSend}
            className={`p-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              inputDraft.trim() && !loadingSend
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/40'
            }`}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
