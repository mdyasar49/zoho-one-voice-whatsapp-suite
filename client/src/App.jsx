import React, { useState, useEffect } from 'react';
import { zohoSDK } from './services/zohoSdk';
import { api, socket } from './services/api';
import { ZohoOneTopNav } from './components/ZohoOneTopNav';
import { ZohoOneAppRail } from './components/ZohoOneAppRail';
import { ZohoCRMLeadWorkspace } from './components/ZohoCRMLeadWorkspace';
import { LandingPage } from './components/LandingPage';
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

export default function App() {
  // Navigation Mode: 'landing' (Zoho One Official Style Showcase) vs 'widget' (Zoho CRM Native View)
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

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1a30] font-sans antialiased text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Official Zoho One Global Header */}
      <ZohoOneTopNav
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenVoiceDemo={() => {
          setViewMode('widget');
          setActiveModal('voice');
        }}
      />

      {viewMode === 'landing' ? (
        /* Zoho One Official Style Product Landing Page (100% Scrollable) */
        <LandingPage
          onLaunchWidget={() => setViewMode('widget')}
          onOpenVoiceDemo={() => {
            setViewMode('widget');
            setActiveModal('voice');
          }}
        />
      ) : (
        /* Zoho One Native CRM View: Left App Rail + Center Lead Workspace + Right WhatsApp Widget */
        <div className="flex flex-1 h-[calc(100vh-48px)] overflow-hidden">
          {/* Left: Zoho One App Rail (CRM, Desk, Books, Sign, Analytics) */}
          <ZohoOneAppRail
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
            onOpenModal={(prodId) => setActiveModal(prodId)}
          />

          {/* Optional: Contacts / Leads List Sidebar */}
          {showSidebar && (
            <div className="h-full z-40">
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
          )}

          {/* Center: Zoho CRM Lead Details Workspace */}
          <div className="hidden lg:flex flex-1 h-full overflow-hidden border-r border-[#172e50]">
            <ZohoCRMLeadWorkspace
              currentContact={currentContact}
              onOpenVoiceDemo={() => setActiveModal('voice')}
              onOpenTemplates={() => setShowTemplates(true)}
            />
          </div>

          {/* Right: Native Embedded Zoho CRM WhatsApp & AI Copilot Panel */}
          <div className="w-full lg:w-[460px] xl:w-[500px] flex flex-col h-full bg-[#0d1e38] border-l border-[#172e50] relative shrink-0">
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
      )}

      {/* WhatsApp Template Selector Modal */}
      {showTemplates && (
        <TemplateSelector
          templates={templates}
          onSendTemplate={handleSendTemplate}
          onClose={() => setShowTemplates(false)}
          contactName={currentContact?.name}
        />
      )}

      {/* Autonomous AI Voice Caller Modal */}
      {activeModal === 'voice' && (
        <AIVoiceCallerModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Books Modal */}
      {activeModal === 'books' && (
        <ZohoBooksModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Desk Modal */}
      {activeModal === 'desk' && (
        <ZohoDeskModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Sign Modal */}
      {activeModal === 'sign' && (
        <ZohoSignModal
          contact={currentContact}
          onClose={() => setActiveModal(null)}
          onRefreshChat={() => loadMessagesAndAI(currentContact?.phone)}
        />
      )}

      {/* Zoho Analytics Modal */}
      {activeModal === 'analytics' && (
        <ZohoAnalyticsModal
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
