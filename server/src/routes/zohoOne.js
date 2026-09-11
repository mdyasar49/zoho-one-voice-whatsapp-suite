import express from 'express';
import { zohoOneService } from '../services/zohoOneService.js';
import { whatsappService } from '../services/whatsappService.js';
import { db } from '../db/db.js';

export const zohoOneRouter = express.Router();

// --- ZOHO BOOKS ROUTES ---
zohoOneRouter.get('/books/invoices/:phone', async (req, res) => {
  const invoices = await zohoOneService.getInvoicesForContact(req.params.phone);
  res.json({ success: true, invoices });
});

zohoOneRouter.post('/books/send-invoice', async (req, res) => {
  try {
    const { invoiceId, phone, contactName } = req.body;
    const { messageText, invoice } = await zohoOneService.sendInvoiceViaWhatsApp(invoiceId, phone, contactName);

    // Dispatch via WhatsApp Cloud API
    await whatsappService.sendMessage({ to: phone, text: messageText });

    // Save to message store
    const savedMsg = db.addMessage({
      contactPhone: phone.replace(/[^0-9]/g, ''),
      direction: "outbound",
      sender: "Zoho Books System",
      text: messageText,
      status: "sent"
    });

    const io = req.app.get('io');
    if (io) io.emit('new_message', { message: savedMsg });

    res.json({ success: true, message: savedMsg, invoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ZOHO DESK ROUTES ---
zohoOneRouter.get('/desk/tickets/:phone', async (req, res) => {
  const tickets = await zohoOneService.getTicketsForContact(req.params.phone);
  res.json({ success: true, tickets });
});

zohoOneRouter.post('/desk/create-ticket', async (req, res) => {
  try {
    const { phone, contactName, subject, description, priority } = req.body;
    const result = await zohoOneService.convertChatToTicket({ phone, contactName, subject, description, priority });

    // Send confirmation message to client on WhatsApp
    const replyText = `Hello ${contactName || 'there'}, your support ticket ${result.ticket.ticketNumber} ('${subject}') has been logged in our Zoho Desk system. Our team will assist you shortly.`;
    await whatsappService.sendMessage({ to: phone, text: replyText });

    const savedMsg = db.addMessage({
      contactPhone: phone.replace(/[^0-9]/g, ''),
      direction: "outbound",
      sender: "Zoho Desk Bot",
      text: replyText,
      status: "sent"
    });

    const io = req.app.get('io');
    if (io) io.emit('new_message', { message: savedMsg });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ZOHO SIGN ROUTES ---
zohoOneRouter.get('/sign/documents/:phone', async (req, res) => {
  const docs = await zohoOneService.getSignDocuments(req.params.phone);
  res.json({ success: true, documents: docs });
});

zohoOneRouter.post('/sign/request-signature', async (req, res) => {
  try {
    const { phone, contactName, documentName } = req.body;
    const { signDoc, messageText } = await zohoOneService.requestESignature({ phone, contactName, documentName });

    await whatsappService.sendMessage({ to: phone, text: messageText });

    const savedMsg = db.addMessage({
      contactPhone: phone.replace(/[^0-9]/g, ''),
      direction: "outbound",
      sender: "Zoho Sign Bot",
      text: messageText,
      status: "sent"
    });

    const io = req.app.get('io');
    if (io) io.emit('new_message', { message: savedMsg });

    res.json({ success: true, document: signDoc, message: savedMsg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ZOHO ANALYTICS ROUTE ---
zohoOneRouter.get('/analytics/overview', (req, res) => {
  res.json({ success: true, analytics: db.getAnalytics() });
});
