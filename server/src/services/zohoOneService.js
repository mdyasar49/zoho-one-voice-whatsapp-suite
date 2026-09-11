import axios from 'axios';
import { db } from '../db/db.js';

export class ZohoOneService {
  constructor() {
    this.accountsUrl = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';
    this.booksUrl = 'https://www.zohoapis.in/books/v3';
    this.deskUrl = 'https://desk.zoho.in/api/v1';
    this.signUrl = 'https://sign.zoho.in/api/v1';
  }

  // --- 1. ZOHO BOOKS & INVOICE INTEGRATION ---
  async getInvoicesForContact(phone) {
    return db.getInvoices(phone);
  }

  async sendInvoiceViaWhatsApp(invoiceId, phone, contactName) {
    const invoices = db.getInvoices(phone);
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) throw new Error("Invoice not found in Zoho Books");

    const messageText = `Hello ${contactName || 'Valued Client'}, here is your invoice ${invoice.invoiceNumber} for ${invoice.amount} due on ${invoice.dueDate}. \n\n📄 View Invoice: ${invoice.pdfUrl} \n💳 Quick Pay Link: ${invoice.paymentLink}`;
    return { success: true, messageText, invoice };
  }

  // --- 2. ZOHO DESK (SUPPORT TICKETS) ---
  async getTicketsForContact(phone) {
    return db.getTickets(phone);
  }

  async convertChatToTicket({ phone, contactName, subject, description, priority = "High" }) {
    console.log(`[ZOHO DESK] Creating Support Ticket from WhatsApp for: ${contactName} (${phone})`);
    
    const newTicket = db.addTicket({
      contactPhone: phone.replace(/[^0-9]/g, ''),
      subject: subject || "Inquiry from WhatsApp",
      priority,
      status: "Open",
      channel: "WhatsApp",
      description: description || ""
    });

    return {
      success: true,
      ticket: newTicket,
      message: `Support Ticket ${newTicket.ticketNumber} created in Zoho Desk.`
    };
  }

  // --- 3. ZOHO SIGN (E-SIGNATURES) ---
  async getSignDocuments(phone) {
    return db.getSignDocuments(phone);
  }

  async requestESignature({ phone, contactName, documentName }) {
    console.log(`[ZOHO SIGN] Sending e-Signature Request to: ${contactName} (${phone})`);
    
    const newDoc = db.addSignDocument({
      contactPhone: phone.replace(/[^0-9]/g, ''),
      docName: documentName || "Service Agreement.pdf",
      signUrl: `https://sign.zoho.com/sign/doc_${Date.now()}_secure`
    });

    const messageText = `Hi ${contactName || 'there'}, please review and e-sign '${newDoc.docName}' securely via Zoho Sign here: ${newDoc.signUrl}`;
    return { success: true, signDoc: newDoc, messageText };
  }

  // --- 4. ZOHO CLIQ (INTERNAL TEAM ALERTS) ---
  async sendCliqAlert({ title, message, contactName, phone }) {
    console.log(`[ZOHO CLIQ ALERT] 🔔 Broadcast to Sales/Support Channel: ${title} - ${contactName} (${phone})`);
    return { success: true, timestamp: new Date().toISOString() };
  }

  // --- 5. ZOHO RECRUIT (CANDIDATE UPDATES) ---
  async getCandidates(phone) {
    return db.data.candidates.filter(c => !phone || c.phone.includes(phone));
  }
}

export const zohoOneService = new ZohoOneService();
