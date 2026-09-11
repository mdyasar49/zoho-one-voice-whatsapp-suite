import React, { useState, useEffect } from 'react';
import { zohoSDK } from './services/zohoSdk';
import { api, socket } from './services/api';
import { LandingPage } from './components/LandingPage';
import { ZohoOneProductBar } from './components/ZohoOneProductBar';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { AICopilotBar } from './components/AICopilotBar';
import { TemplateSelector } from './components/TemplateSelector';
import { ContactSidebar } from './components/ContactSidebar';
import { ZohoBooksModal } from './components/ZohoBooksModal';
import { ZohoDeskModal } from './components/ZohoDeskModal';
import { ZohoSignModal } from './components/ZohoSignModal';
import { ZohoAnalyticsModal } from './components/ZohoAnalyticsModal';
import { AIVoiceCallerModal } from './components/AIVoiceCallerModal';
import { Globe, Layers } from 'lucide-react';

export default function App() {
  // Navigation Mode: 'landing' (Product Showcase Website) vs 'widget' (Embedded Zoho CRM Extension)
  const [viewMode, setViewMode] = useState('landing');

  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isAIMode, setIsAIMode] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [inputDraft, setInputDraft] = useState('');
  const [loadingSend, setLoadingSend] = useState(false);

  // Zoho One Modals state
  const [activeProduct, setActiveProduct] = useState('crm');
  const [activeModal, setActiveModal] = useState(null); // 'voice' | 'books' | 'desk' | 'sign' | 'analytics'

  // Initialize Zoho CRM SDK and fetch workspace data
  useEffect(() => {
    async function init() {
      const zohoData = await zohoSDK.initialize();

      // If running inside live Zoho CRM iframe, default to widget mode directly
      if (zohoData.isZoho) {
        setViewMode('widget');
      }

      try {
        const [contactList, templateList] = await Promise.all([
          api.getContacts(),
          api.getTemplates()
        ]);

        setContacts(contactList);
        setTemplates(templateList);

        if (zohoData?.record?.Phone) {
          const cleanPhone = zohoData.record.Phone.replace(/[^0-9]/g, '');
          const matched = contactList.find(c => c.phone.includes(cleanPhone) || cleanPhone.includes(c.phone));
          if (matched) {
            setCurrentContact(matched);
          } else {
            const newCont = {
              name: zohoData.record.Full_Name || "Zoho Contact",
              phone: cleanPhone,
              company: zohoData.record.Company || "",
              zohoModule: zohoData.entity || "Leads",
              zohoRecordId: zohoData.recordId
            };
            setCurrentContact(newCont);
          }
        } else if (contactList.length > 0) {
          setCurrentContact(contactList[0]);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (!currentContact?.phone) return;
    loadMessagesAndAI(currentContact.phone);
    socket.emit('join_contact_room', currentContact.phone);
  }, [currentContact]);

  useEffect(() => {
    socket.on('new_message', ({ message, contact }) => {
      if (contact && !contacts.some(c => c.phone === contact.phone)) {
        setContacts(prev => [contact, ...prev]);
      }

      if (currentContact && (message.contactPhone === currentContact.phone || currentContact.phone.includes(message.contactPhone))) {
        setMessages(prev => [...prev, message]);
        if (message.direction === 'inbound' && isAIMode) {
          fetchAISuggestions(currentContact);
        }
      }
    });

    socket.on('call_completed', () => {
      if (currentContact) {
        loadMessagesAndAI(currentContact.phone);
      }
    });

    return () => {
      socket.off('new_message');
      socket.off('call_completed');
    };
  }, [currentContact, isAIMode, contacts]);

  const loadMessagesAndAI = async (phone) => {
    try {
      const msgs = await api.getMessages(phone);
      setMessages(msgs);

      if (isAIMode) {
        fetchAISuggestions(currentContact);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const fetchAISuggestions = async (contact) => {
    if (!contact?.phone) return;
    setLoadingAI(true);
    try {
      const suggestions = await api.getAISuggestions({
        phone: contact.phone,
        contactName: contact.name,
        company: contact.company
      });
      setAiSuggestions(suggestions);
    } catch (err) {
      console.error("AI Suggestion error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSendMessage = async (text) => {
    if (!currentContact?.phone) return;
    setLoadingSend(true);
    try {
      await api.sendMessage({
        to: currentContact.phone,
        text,
        contactName: currentContact.name
      });
    } catch (err) {
      alert("Failed to send message: " + err.message);
    } finally {
      setLoadingSend(false);
    }
  };

  const handleSendTemplate = async (templateId, variables) => {
    if (!currentContact?.phone) return;
    try {
      await api.sendTemplate({
        to: currentContact.phone,
        templateId,
        variables
      });
    } catch (err) {
      alert("Failed to send template: " + err.message);
    }
  };

  // If viewMode is 'landing', show full marketing showcase
  if (viewMode === 'landing') {
    return (
      <div className="relative">
        <LandingPage
          onLaunchWidget={() => setViewMode('widget')}
          onOpenVoiceDemo={() => {
            setViewMode('widget');
            setActiveModal('voice');
          }}
        />

        {/* Quick Float Switcher */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setViewMode('widget')}
            className="px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 shadow-2xl backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Layers className="w-4 h-4 text-rose-400" />
            Switch to CRM Widget View
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, render the Zoho CRM Embedded Widget interface
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans relative">
      {/* Top Floating View Switcher */}
      <div className="bg-slate-950 border-b border-slate-900 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-slate-300">Zoho CRM Extension Environment (Active)</span>
        </div>
        <button
          onClick={() => setViewMode('landing')}
          className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
        >
          <Globe className="w-3.5 h-3.5" /> Back to Product Showcase Website
        </button>
      </div>

      {/* Zoho One Omnichannel Product Navigation */}
      <ZohoOneProductBar
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
        onOpenModal={(prodId) => {
          if (prodId === 'crm') {
            setActiveProduct('crm');
          } else {
            setActiveModal(prodId);
          }
        }}
      />

      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {/* Contact Sidebar */}
        <div className={`${showSidebar ? 'block' : 'hidden'} md:block h-full`}>
          <ContactSidebar
            contacts={contacts}
            selectedPhone={currentContact?.phone}
            onSelectContact={(c) => {
              setCurrentContact(c);
              setShowSidebar(false);
            }}
            onClose={() => setShowSidebar(false)}
          />
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Header
            currentContact={currentContact}
            onRefresh={() => loadMessagesAndAI(currentContact?.phone)}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            isAIMode={isAIMode}
            setIsAIMode={setIsAIMode}
          />

          {isAIMode && (
            <AICopilotBar
              suggestions={aiSuggestions}
              onSelectReply={(text) => setInputDraft(text)}
              loading={loadingAI}
            />
          )}

          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            onOpenTemplates={() => setShowTemplates(true)}
            inputDraft={inputDraft}
            setInputDraft={setInputDraft}
            loadingSend={loadingSend}
          />
        </div>
      </div>

      {/* WhatsApp Template Selector Modal */}
      {showTemplates && (
        <TemplateSelector
          templates={templates}
          onSendTemplate={handleSendTemplate}
          onClose={() => setShowTemplates(false)}
          contactName={currentContact?.name}
        />
      )}

      {/* AI Voice Caller Modal (The Missing Zoho One Piece) */}
      {activeModal === 'voice' && (
        <AIVoiceCallerModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Books Invoices Modal */}
      {activeModal === 'books' && (
        <ZohoBooksModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Desk Support Tickets Modal */}
      {activeModal === 'desk' && (
        <ZohoDeskModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Sign e-Signature Modal */}
      {activeModal === 'sign' && (
        <ZohoSignModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Analytics Dashboard Modal */}
      {activeModal === 'analytics' && (
        <ZohoAnalyticsModal
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
