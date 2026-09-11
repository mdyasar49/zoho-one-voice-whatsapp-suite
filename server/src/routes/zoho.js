import express from 'express';
import { db } from '../db/db.js';
import { zohoService } from '../services/zohoService.js';

export const zohoRouter = express.Router();

/**
 * Get all active Contacts/Leads in the workspace
 */
zohoRouter.get('/contacts', (req, res) => {
  const contacts = db.getContacts();
  res.json({ success: true, contacts });
});

/**
 * Get or lookup a contact by phone/recordId
 */
zohoRouter.get('/contacts/:phone', async (req, res) => {
  const phone = req.params.phone;
  let contact = db.getContactByPhone(phone);
  
  if (!contact) {
    // Try to search live from Zoho CRM
    const zohoRecord = await zohoService.searchRecordByPhone(phone);
    if (zohoRecord.found) {
      contact = db.saveContact({
        name: zohoRecord.record.Full_Name || "Zoho Contact",
        phone: phone.replace(/[^0-9]/g, ''),
        company: zohoRecord.record.Company || "N/A",
        zohoModule: zohoRecord.module,
        zohoRecordId: zohoRecord.record.id,
        leadStatus: zohoRecord.record.Lead_Status || "Active",
        tags: ["Synced from Zoho"]
      });
    }
  }

  res.json({ success: true, contact: contact || null });
});

/**
 * Update CRM extension settings
 */
zohoRouter.get('/settings', (req, res) => {
  res.json({ success: true, settings: db.getSettings() });
});

zohoRouter.post('/settings', (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json({ success: true, settings: updated });
});
