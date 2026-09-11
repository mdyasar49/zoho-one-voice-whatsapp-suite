import express from 'express';
import { whatsappService } from '../services/whatsappService.js';
import { zohoService } from '../services/zohoService.js';
import { db } from '../db/db.js';

export const whatsappRouter = express.Router();

/**
 * Meta Webhook Verification (GET)
 * Meta calls this when setting up the webhook URL in Meta Developer Portal
 */
whatsappRouter.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === whatsappService.verifyToken) {
      console.log("✅ WhatsApp Webhook Verified successfully by Meta!");
      return res.status(200).send(challenge);
    } else {
      console.warn("❌ WhatsApp Webhook Verification Token mismatch.");
      return res.sendStatus(403);
    }
  }
  res.sendStatus(400);
});

/**
 * Inbound Webhook Event (POST)
 * Receives incoming WhatsApp messages in real-time
 */
whatsappRouter.post('/webhook', async (req, res) => {
  res.sendStatus(200); // Always respond 200 immediately to Meta

  const parsed = whatsappService.parseInboundWebhook(req.body);
  if (!parsed) return;

  console.log(`📩 Inbound WhatsApp from ${parsed.senderName} (${parsed.fromPhone}): "${parsed.text}"`);

  // 1. Save inbound message to local store
  const savedMsg = db.addMessage({
    contactPhone: parsed.fromPhone,
    direction: "inbound",
    sender: parsed.senderName,
    text: parsed.text,
    status: "received",
    timestamp: parsed.timestamp
  });

  // 2. Check if contact exists or auto-create Lead in Zoho
  let contact = db.getContactByPhone(parsed.fromPhone);
  if (!contact) {
    contact = db.saveContact({
      name: parsed.senderName,
      phone: parsed.fromPhone,
      company: "New Inbound Lead",
      zohoModule: "Leads",
      leadStatus: "New",
      tags: ["WhatsApp Inbound"]
    });

    // Auto-create in Zoho CRM
    if (db.getSettings().autoLeadCapture) {
      await zohoService.autoCreateLead({
        name: parsed.senderName,
        phone: parsed.fromPhone,
        message: parsed.text
      });
    }
  }

  // 3. Emit via Socket.io to all open Zoho CRM client widgets
  const io = req.app.get('io');
  if (io) {
    io.emit('new_message', {
      message: savedMsg,
      contact
    });
  }
});

/**
 * Send direct WhatsApp message from Zoho CRM Widget
 */
whatsappRouter.post('/send', async (req, res) => {
  try {
    const { to, text, contactName } = req.body;
    if (!to || !text) {
      return res.status(400).json({ error: "Missing 'to' phone number or 'text' message body" });
    }

    // Call WhatsApp Cloud API
    const result = await whatsappService.sendMessage({ to, text });

    // Save outbound message to DB
    const savedMsg = db.addMessage({
      contactPhone: to.replace(/[^0-9]/g, ''),
      direction: "outbound",
      sender: "Sales Rep",
      text,
      status: result.status || "sent"
    });

    // Log to Zoho CRM Timeline Note
    if (db.getSettings().syncTimelineToZoho) {
      const contact = db.getContactByPhone(to);
      if (contact?.zohoRecordId) {
        await zohoService.logConversationNote({
          recordId: contact.zohoRecordId,
          module: contact.zohoModule || "Leads",
          title: "WhatsApp Message Sent",
          content: text
        });
      }
    }

    // Broadcast via Socket.io
    const io = req.app.get('io');
    if (io) {
      io.emit('new_message', { message: savedMsg });
    }

    return res.json({ success: true, message: savedMsg, result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * Send pre-approved template message
 */
whatsappRouter.post('/send-template', async (req, res) => {
  try {
    const { to, templateId, variables = [] } = req.body;
    const templates = db.getTemplates();
    const template = templates.find(t => t.id === templateId);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // Replace variable placeholders
    let renderedText = template.body;
    variables.forEach((val, idx) => {
      renderedText = renderedText.replace(new RegExp(`\\{\\{${idx + 1}\\}\\}`, 'g'), val);
    });

    const result = await whatsappService.sendTemplateMessage({
      to,
      templateName: template.name.toLowerCase().replace(/[^a-z0-9]/g, '_')
    });

    const savedMsg = db.addMessage({
      contactPhone: to.replace(/[^0-9]/g, ''),
      direction: "outbound",
      sender: "Sales Rep (Template)",
      text: renderedText,
      status: "sent"
    });

    const io = req.app.get('io');
    if (io) {
      io.emit('new_message', { message: savedMsg });
    }

    return res.json({ success: true, message: savedMsg, result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * Fetch chat message history for a phone number
 */
whatsappRouter.get('/messages/:phone', (req, res) => {
  const phone = req.params.phone;
  const messages = db.getMessages(phone);
  res.json({ success: true, messages });
});

/**
 * Fetch all pre-approved templates
 */
whatsappRouter.get('/templates', (req, res) => {
  res.json({ success: true, templates: db.getTemplates() });
});
