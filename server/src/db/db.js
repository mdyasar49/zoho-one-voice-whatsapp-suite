import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'store.json');

// Comprehensive Zoho One Multi-Product Database Schema
const defaultData = {
  // Zoho CRM Leads & Contacts
  contacts: [
    {
      id: "cont_1",
      name: "Raveena Arun",
      phone: "919876543210",
      email: "raveena@technova.com",
      company: "TechNova Corp",
      zohoModule: "Leads",
      zohoRecordId: "48291000000213001",
      leadStatus: "Negotiation",
      dealValue: "₹4,50,000",
      tags: ["High Priority", "Enterprise", "Zoho One Prospect"]
    },
    {
      id: "cont_2",
      name: "Suresh Kumar",
      phone: "919812345678",
      email: "suresh@apexglobal.in",
      company: "Apex Global Solutions",
      zohoModule: "Contacts",
      zohoRecordId: "48291000000345002",
      leadStatus: "Customer",
      dealValue: "₹12,00,000",
      tags: ["Active Client", "Zoho Books User"]
    }
  ],

  // Zoho Books / Invoice Data
  invoices: [
    {
      id: "inv_101",
      contactPhone: "919876543210",
      invoiceNumber: "INV-2026-0042",
      amount: "₹1,25,000",
      status: "Unpaid",
      dueDate: "2026-09-20",
      pdfUrl: "https://books.zoho.com/api/v3/invoices/INV-2026-0042.pdf",
      paymentLink: "https://payments.zoho.com/pay/inv_101_technova"
    },
    {
      id: "inv_102",
      contactPhone: "919812345678",
      invoiceNumber: "INV-2026-0038",
      amount: "₹3,80,000",
      status: "Paid",
      dueDate: "2026-08-30",
      pdfUrl: "https://books.zoho.com/api/v3/invoices/INV-2026-0038.pdf",
      paymentLink: "https://payments.zoho.com/pay/inv_102_apex"
    }
  ],

  // Zoho Desk Support Tickets
  tickets: [
    {
      id: "tkt_501",
      contactPhone: "919876543210",
      ticketNumber: "#ZD-8921",
      subject: "API Rate limits on Enterprise plan",
      priority: "High",
      status: "Open",
      channel: "WhatsApp",
      createdTime: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ],

  // Zoho Sign Documents
  signDocuments: [
    {
      id: "sign_201",
      contactPhone: "919876543210",
      docName: "Non-Disclosure Agreement (NDA) - TechNova.pdf",
      status: "Pending Signature",
      signUrl: "https://sign.zoho.com/sign/doc_201_token"
    }
  ],

  // Zoho Recruit Candidates
  candidates: [
    {
      id: "rec_301",
      name: "Raveena Arun",
      phone: "919876543210",
      appliedRole: "Senior Cloud Architect",
      stage: "Technical Interview Round 2",
      interviewDate: "Tomorrow, 11:00 AM"
    }
  ],

  // Live WhatsApp Chat Messages
  messages: [
    {
      id: "msg_1",
      contactPhone: "919876543210",
      direction: "inbound",
      sender: "Raveena Arun",
      text: "Hi, we received your proposal. Can you send the updated invoice and meeting link for tomorrow?",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: "read"
    },
    {
      id: "msg_2",
      contactPhone: "919876543210",
      direction: "outbound",
      sender: "Sales Rep",
      text: "Hello Raveena! Absolutely, I have attached the latest Zoho Books Invoice and the demo calendar invite.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: "delivered"
    },
    {
      id: "msg_3",
      contactPhone: "919876543210",
      direction: "inbound",
      sender: "Raveena Arun",
      text: "Great! Also, please share the Zoho Sign NDA link so our legal team can sign it before the call.",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: "received"
    }
  ],

  // Pre-approved WhatsApp Templates for Zoho One Ecosystem
  templates: [
    {
      id: "tmpl_books_invoice",
      zohoApp: "Zoho Books",
      name: "Send Zoho Books Invoice & Payment Link",
      category: "PAYMENT",
      body: "Hi {{1}}, here is your invoice {{2}} for {{3}}. You can view the invoice and pay securely online here: {{4}}",
      variables: ["Client Name", "Invoice No", "Amount", "Payment Link"]
    },
    {
      id: "tmpl_sign_request",
      zohoApp: "Zoho Sign",
      name: "Zoho Sign Document e-Signature",
      category: "UTILITY",
      body: "Hello {{1}}, please e-sign the document '{{2}}' securely via Zoho Sign using this link: {{3}}",
      variables: ["Client Name", "Document Name", "Signing Link"]
    },
    {
      id: "tmpl_desk_ticket",
      zohoApp: "Zoho Desk",
      name: "Zoho Desk Ticket Acknowledgement",
      category: "SUPPORT",
      body: "Hello {{1}}, support ticket {{2}} has been created for your request: '{{3}}'. Our support engineer is on it.",
      variables: ["Client Name", "Ticket Number", "Issue Title"]
    },
    {
      id: "tmpl_recruit_interview",
      zohoApp: "Zoho Recruit",
      name: "Interview Call Confirmation",
      category: "UTILITY",
      body: "Hi {{1}}, your interview with our engineering team for {{2}} is confirmed for {{3}}. Meeting link: {{4}}",
      variables: ["Candidate Name", "Role", "Date & Time", "Meeting Link"]
    },
    {
      id: "tmpl_inventory_dispatch",
      zohoApp: "Zoho Inventory",
      name: "Order Dispatched & Tracking Update",
      category: "UTILITY",
      body: "Dear {{1}}, your order {{2}} has been dispatched via {{3}}. Track live shipment here: {{4}}",
      variables: ["Customer Name", "Order ID", "Courier Partner", "Tracking Link"]
    }
  ],

  // Zoho Analytics & Suite Metrics
  analytics: {
    totalMessagesSent: 14820,
    deliveryRate: "99.4%",
    readRate: "89.2%",
    aiAssistedReplies: 11240,
    dealsInfluencedRevenue: "₹84,50,000",
    invoicesCollectedViaWhatsApp: "₹38,20,000",
    deskTicketsResolvedViaWhatsApp: 1840,
    signDocumentsCompleted: 430
  },

  settings: {
    autoLeadCapture: true,
    aiSmartReplyEnabled: true,
    syncTimelineToZoho: true,
    zohoCliqAlerts: true,
    zohoDeskTicketAutoCreate: true,
    zohoBooksInvoiceAutoShare: true
  }
};

class DBStore {
  constructor() {
    if (!fs.existsSync(DB_FILE)) {
      this.data = defaultData;
      this.save();
    } else {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // ensure multi-product schema fields exist
        if (!this.data.invoices) this.data.invoices = defaultData.invoices;
        if (!this.data.tickets) this.data.tickets = defaultData.tickets;
        if (!this.data.signDocuments) this.data.signDocuments = defaultData.signDocuments;
        if (!this.data.candidates) this.data.candidates = defaultData.candidates;
        if (!this.data.analytics) this.data.analytics = defaultData.analytics;
        this.save();
      } catch (err) {
        console.error("DB Load Error, resetting to default:", err);
        this.data = defaultData;
        this.save();
      }
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error("DB Save Error:", err);
    }
  }

  getContacts() { return this.data.contacts; }
  getContactByPhone(phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.data.contacts.find(c => c.phone === cleanPhone || c.phone.endsWith(cleanPhone) || cleanPhone.endsWith(c.phone));
  }
  saveContact(contact) {
    const existingIndex = this.data.contacts.findIndex(c => c.phone === contact.phone);
    if (existingIndex >= 0) {
      this.data.contacts[existingIndex] = { ...this.data.contacts[existingIndex], ...contact };
    } else {
      contact.id = contact.id || `cont_${Date.now()}`;
      this.data.contacts.unshift(contact);
    }
    this.save();
    return contact;
  }

  getMessages(phone) {
    if (!phone) return this.data.messages;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.data.messages.filter(m => 
      m.contactPhone === cleanPhone || m.contactPhone.endsWith(cleanPhone) || cleanPhone.endsWith(m.contactPhone)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  addMessage(msg) {
    msg.id = msg.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    msg.timestamp = msg.timestamp || new Date().toISOString();
    this.data.messages.push(msg);
    this.save();
    return msg;
  }

  // Zoho Books Invoices
  getInvoices(phone) {
    if (!phone) return this.data.invoices;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.data.invoices.filter(i => i.contactPhone === cleanPhone || i.contactPhone.endsWith(cleanPhone));
  }

  // Zoho Desk Tickets
  getTickets(phone) {
    if (!phone) return this.data.tickets;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.data.tickets.filter(t => t.contactPhone === cleanPhone || t.contactPhone.endsWith(cleanPhone));
  }

  addTicket(ticket) {
    ticket.id = ticket.id || `tkt_${Date.now()}`;
    ticket.ticketNumber = ticket.ticketNumber || `#ZD-${Math.floor(1000 + Math.random() * 9000)}`;
    ticket.createdTime = new Date().toISOString();
    this.data.tickets.unshift(ticket);
    this.save();
    return ticket;
  }

  // Zoho Sign
  getSignDocuments(phone) {
    if (!phone) return this.data.signDocuments;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.data.signDocuments.filter(s => s.contactPhone === cleanPhone || s.contactPhone.endsWith(cleanPhone));
  }

  addSignDocument(doc) {
    doc.id = doc.id || `sign_${Date.now()}`;
    doc.status = "Pending Signature";
    this.data.signDocuments.unshift(doc);
    this.save();
    return doc;
  }

  getTemplates() { return this.data.templates; }
  getAnalytics() { return this.data.analytics; }
  getSettings() { return this.data.settings; }
  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.save();
    return this.data.settings;
  }
}

export const db = new DBStore();
