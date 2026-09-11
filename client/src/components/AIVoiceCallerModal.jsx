import React, { useState, useEffect } from 'react';
import { PhoneCall, PhoneOff, Mic, Sparkles, CheckCircle2, X, Volume2, User, Globe, TrendingUp, Calendar, Zap } from 'lucide-react';
import { api } from '../services/api';

export const AIVoiceCallerModal = ({ contact, onClose, onRefreshChat }) => {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState('sarah_sales');
  const [callingState, setCallingState] = useState('idle'); // 'idle' | 'calling' | 'in_call' | 'completed'
  const [callResult, setCallResult] = useState(null);
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  useEffect(() => {
    api.getVoicePersonas().then(res => setPersonas(res));
  }, []);

  const handleStartCall = async () => {
    setCallingState('calling');
    setTranscriptIndex(0);

    try {
      const result = await api.triggerAICall({
        phone: contact.phone,
        contactName: contact.name,
        company: contact.company,
        personaId: selectedPersona
      });

      setCallResult(result);
      setCallingState('in_call');

      // Simulate live line-by-line speech stream
      let currentLine = 0;
      const interval = setInterval(() => {
        currentLine++;
        if (currentLine <= result.transcript.length) {
          setTranscriptIndex(currentLine);
        } else {
          clearInterval(interval);
          setCallingState('completed');
          onRefreshChat();
        }
      }, 2500);

    } catch (err) {
      alert("Failed to start AI Voice Call: " + err.message);
      setCallingState('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-950/40">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">Autonomous AI Voice Caller</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Zoho One Exclusive
                </span>
              </div>
              <p className="text-xs text-slate-400">Natural voice call + instant CRM qualification & WhatsApp sync</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 flex-1 overflow-y-auto space-y-4">
          {callingState === 'idle' && (
            <div className="space-y-4">
              {/* Contact Card Summary */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Calling Target</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{contact?.name || "Target Lead"}</h4>
                  <p className="text-xs text-slate-400">{contact?.company} • +{contact?.phone}</p>
                </div>
                <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {contact?.zohoModule || "Lead"}
                </span>
              </div>

              {/* Persona Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Select AI Voice Persona & Dialect:</label>
                <div className="space-y-2">
                  {personas.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPersona(p.id)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex items-start gap-3 ${
                        selectedPersona === p.id
                          ? 'bg-rose-950/20 border-rose-500/50 shadow-md shadow-rose-950/30'
                          : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 ${selectedPersona === p.id ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-white">{p.name}</h5>
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                            <Globe className="w-3 h-3" /> {p.language}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{p.objective}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dial Button */}
              <button
                onClick={handleStartCall}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                Trigger Live AI Voice Call Now
              </button>
            </div>
          )}

          {(callingState === 'calling' || callingState === 'in_call' || callingState === 'completed') && (
            <div className="space-y-4 animate-fade-in">
              {/* Call Status Banner & Soundwave Animation */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                    {callingState === 'calling' ? 'Dialing Contact...' : callingState === 'in_call' ? 'Live AI Conversation in Progress' : 'Call Completed & Lead Qualified'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">{contact?.name} (+{contact?.phone})</h4>
                <p className="text-xs text-slate-400 mt-0.5">AI Persona: {personas.find(p => p.id === selectedPersona)?.name}</p>

                {/* Soundwave Visualizer */}
                <div className="flex items-center justify-center gap-1.5 my-3 h-8">
                  {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 85, 60].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: callingState === 'in_call' ? `${h}%` : '20%' }}
                      className="w-1 bg-gradient-to-t from-rose-500 to-indigo-400 rounded-full transition-all duration-300 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Live Transcript Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 max-h-56 overflow-y-auto space-y-2.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Live Speech-to-Text Transcript:
                </span>
                {callResult?.transcript.slice(0, transcriptIndex).map((line, idx) => (
                  <div key={idx} className="text-xs leading-relaxed animate-fade-in">
                    <span className={`font-semibold mr-1.5 ${line.speaker === 'AI Agent' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      [{line.speaker}]:
                    </span>
                    <span className="text-slate-200">{line.text}</span>
                  </div>
                ))}
              </div>

              {/* Post-Call Qualification Report */}
              {callingState === 'completed' && callResult?.qualification && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> AI Lead Score: {callResult.qualification.leadScore}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      Duration: {callResult.duration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Outcome:</strong> {callResult.qualification.nextAction}
                  </p>

                  <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
                    <span>✅ Zoho CRM Lead Status: <strong>Demo Scheduled</strong></span>
                    <span>✅ WhatsApp Invite: <strong>Sent</strong></span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Powered by Gemini Voice Engine & Twilio
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
