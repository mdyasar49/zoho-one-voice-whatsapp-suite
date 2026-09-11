import axios from 'axios';
import { io } from 'socket.io-client';

const API_BASE = 'http://localhost:5000/api';

export const socket = io('http://localhost:5000');

export const api = {
  // WhatsApp Messages
  getMessages: async (phone) => {
    const res = await axios.get(`${API_BASE}/whatsapp/messages/${phone}`);
    return res.data?.messages || [];
  },

  sendMessage: async ({ to, text, contactName }) => {
    const res = await axios.post(`${API_BASE}/whatsapp/send`, { to, text, contactName });
    return res.data;
  },

  sendTemplate: async ({ to, templateId, variables }) => {
    const res = await axios.post(`${API_BASE}/whatsapp/send-template`, { to, templateId, variables });
    return res.data;
  },

  getTemplates: async () => {
    const res = await axios.get(`${API_BASE}/whatsapp/templates`);
    return res.data?.templates || [];
  },

  // AI Copilot
  getAISuggestions: async ({ phone, contactName, company }) => {
    const res = await axios.post(`${API_BASE}/ai/suggest-replies`, { phone, contactName, company });
    return res.data?.suggestions || null;
  },

  summarizeChat: async ({ phone, contactName }) => {
    const res = await axios.post(`${API_BASE}/ai/summarize-chat`, { phone, contactName });
    return res.data;
  },

  // Zoho CRM Contacts
  getContacts: async () => {
    const res = await axios.get(`${API_BASE}/zoho/contacts`);
    return res.data?.contacts || [];
  },

  getContactByPhone: async (phone) => {
    const res = await axios.get(`${API_BASE}/zoho/contacts/${phone}`);
    return res.data?.contact || null;
  },

  // Zoho Books
  getInvoices: async (phone) => {
    const res = await axios.get(`${API_BASE}/zoho-one/books/invoices/${phone}`);
    return res.data?.invoices || [];
  },

  sendInvoice: async ({ invoiceId, phone, contactName }) => {
    const res = await axios.post(`${API_BASE}/zoho-one/books/send-invoice`, { invoiceId, phone, contactName });
    return res.data;
  },

  // Zoho Desk
  getTickets: async (phone) => {
    const res = await axios.get(`${API_BASE}/zoho-one/desk/tickets/${phone}`);
    return res.data?.tickets || [];
  },

  createTicket: async ({ phone, contactName, subject, description, priority }) => {
    const res = await axios.post(`${API_BASE}/zoho-one/desk/create-ticket`, { phone, contactName, subject, description, priority });
    return res.data;
  },

  // Zoho Sign
  getSignDocs: async (phone) => {
    const res = await axios.get(`${API_BASE}/zoho-one/sign/documents/${phone}`);
    return res.data?.documents || [];
  },

  requestSign: async ({ phone, contactName, documentName }) => {
    const res = await axios.post(`${API_BASE}/zoho-one/sign/request-signature`, { phone, contactName, documentName });
    return res.data;
  },

  // Zoho Analytics
  getAnalytics: async () => {
    const res = await axios.get(`${API_BASE}/zoho-one/analytics/overview`);
    return res.data?.analytics || {};
  },

  // AI Voice Agent
  getVoicePersonas: async () => {
    const res = await axios.get(`${API_BASE}/voice/personas`);
    return res.data?.personas || [];
  },

  triggerAICall: async ({ phone, contactName, company, personaId, customPrompt }) => {
    const res = await axios.post(`${API_BASE}/voice/trigger-call`, { phone, contactName, company, personaId, customPrompt });
    return res.data?.callResult || null;
  }
};
