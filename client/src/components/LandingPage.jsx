import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  MessageSquare, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Receipt, 
  Headphones, 
  FileSignature, 
  BarChart3,
  ExternalLink,
  ChevronRight,
  Layers,
  Star
} from 'lucide-react';

export const LandingPage = ({ onLaunchWidget, onOpenVoiceDemo }) => {
  const [selectedPlan, setSelectedPlan] = useState('growth');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Top Notification Banner */}
      <div className="bg-gradient-to-r from-rose-900/60 via-purple-900/60 to-indigo-900/60 border-b border-rose-500/20 py-2 px-4 text-center text-xs font-medium text-slate-300 flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">
          New Release
        </span>
        <span>The 1st Autonomous AI Voice & WhatsApp Calling Agent built for the Zoho One Ecosystem</span>
        <button 
          onClick={onLaunchWidget}
          className="text-white underline hover:text-rose-300 font-semibold ml-1 flex items-center gap-0.5"
        >
          Try Live Simulator <ChevronRight className="w-3 h-3 inline" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-rose-950/50">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              Z-Agentforce <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">Zoho One</span>
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#comparison" className="hover:text-white transition-colors">Why Zoho Needs This</a>
          <a href="#integrations" className="hover:text-white transition-colors">Zoho One Apps</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchWidget}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            CRM Widget View
          </button>
          <button
            onClick={onOpenVoiceDemo}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition-all flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Live AI Call Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Qualify Inbound Leads in <strong>10 Seconds</strong> via AI Phone Call & WhatsApp</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          Autonomous <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">AI Voice & WhatsApp</span> Sales Agent for Zoho One
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The missing piece in Zoho One. Automatically dial new leads, converse in fluent English or Tamil, qualify budgets, schedule demos into Zoho CRM, and dispatch invoices on WhatsApp.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenVoiceDemo}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-sm font-bold shadow-xl shadow-rose-950/60 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            Experience Live AI Call Demo
          </button>
          <button
            onClick={onLaunchWidget}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-800 transition-all flex items-center justify-center gap-2"
          >
            Open Zoho CRM Widget Simulator
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs text-slate-500 block mb-1">Lead Response Speed</span>
            <span className="text-xl font-bold text-white font-mono">&lt; 10 Secs</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Instant AI Dialing</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs text-slate-500 block mb-1">Lead Conversion Rate</span>
            <span className="text-xl font-bold text-rose-400 font-mono">3.8x Higher</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">vs Manual Calls</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs text-slate-500 block mb-1">Supported Languages</span>
            <span className="text-xl font-bold text-indigo-400 font-mono">English + Vernacular</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Tamil, Hindi, Spanish</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-xs text-slate-500 block mb-1">Zoho One Connected</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">7 Core Apps</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">CRM, Books, Desk, Sign</span>
          </div>
        </div>
      </section>

      {/* Why Zoho One Needs This (Comparison) */}
      <section id="comparison" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Why Zoho One Needs Z-Agentforce
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Salesforce has Agentforce, Freshworks has Freddy AI. This plugin brings native Autonomous Voice & WhatsApp intelligence to Zoho One.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Traditional Setup</span>
              <h3 className="text-base font-bold text-white mb-2">Human Telecallers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Leads wait hours before receiving a call. 60% never pick up. Expensive full-time staff salaries ($2,000/mo per caller).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-rose-400 font-medium">
              ❌ High cost, slow response
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Zoho Default</span>
              <h3 className="text-base font-bold text-white mb-2">Zoho Zia Text AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provides basic email text suggestions and field predictions. Cannot speak, cannot make phone calls, no native WhatsApp automation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-amber-400 font-medium">
              ⚠️ Limited to text predictions
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-950/40 via-slate-900 to-indigo-950/40 border border-rose-500/40 shadow-xl shadow-rose-950/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">Our Solution</span>
              <h3 className="text-base font-bold text-white mb-2">Z-Agentforce Autonomous Suite</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calls leads within 10 seconds, talks naturally, scores lead priority, books CRM demos, and sends WhatsApp invoices in 1 continuous workflow.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-500/20 text-xs text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 10x ROI & 24/7 Coverage
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Unified Across All Zoho One Applications
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            One intelligent agent that bridges sales, finance, support, and legal operations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Zoho CRM & Bigin</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-dial new leads, score customer intent (95/100), and automatically update deal stages and timeline notes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3">
              <Receipt className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Zoho Books & Invoice</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              1-Click send pending invoices, payment links, and GST e-Way bills to customers directly over WhatsApp.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Zoho Desk Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Convert WhatsApp messages and inbound voice queries into organized Zoho Desk tickets automatically.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-3">
              <FileSignature className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Zoho Sign (e-Sign)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dispatch NDAs, proposals, and service contracts for instant, secure digital signing over WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Simple, Predictable Pricing</h2>
          <p className="mt-2 text-sm text-slate-400">Available on the Zoho Marketplace with 14-day free trial.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Starter</h3>
              <p className="text-xs text-slate-400 mb-4">For growing sales teams starting with WhatsApp CRM</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-white">$29</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Zoho CRM WhatsApp Widget</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Gemini AI Smart Copilot</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 1,000 Messages / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Auto Lead Capture</li>
              </ul>
            </div>
            <button 
              onClick={onLaunchWidget}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Start Free Trial
            </button>
          </div>

          {/* Growth Plan (Popular) */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-950/30 to-slate-900 border-2 border-rose-500/50 shadow-xl shadow-rose-950/30 flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </span>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Growth & Voice Agent</h3>
              <p className="text-xs text-slate-400 mb-4">Autonomous AI Voice Caller + Omnichannel Zoho One</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-white">$79</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" /> <strong>Autonomous AI Voice Caller</strong></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multi-Lingual (English/Tamil/Hindi)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Zoho Books, Desk & Sign 1-Click Sync</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited WhatsApp Messaging</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Executive Analytics Dashboard</li>
              </ul>
            </div>
            <button 
              onClick={onOpenVoiceDemo}
              className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-rose-950/50"
            >
              Get Started with AI Voice
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Enterprise Custom</h3>
              <p className="text-xs text-slate-400 mb-4">For large Zoho One organizations with dedicated voice agents</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-white">$199</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Custom Voice Clone / Fine-tuned LLM</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated Twilio/Meta SIP Trunks</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Custom Zoho Creator / Flow Webhooks</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 24/7 Dedicated Account Manager</li>
              </ul>
            </div>
            <button 
              onClick={onLaunchWidget}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          <span>© 2026 Z-Agentforce Suite. Built by Mohamed Yasar for Zoho One.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/mdyasar49/zoho-one-voice-whatsapp-suite" target="_blank" rel="noreferrer" className="hover:text-slate-300 flex items-center gap-1">
            GitHub Repo <ExternalLink className="w-3 h-3" />
          </a>
          <button onClick={onLaunchWidget} className="hover:text-slate-300">
            Zoho CRM Sandbox Simulator
          </button>
        </div>
      </footer>
    </div>
  );
};
