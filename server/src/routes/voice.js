import express from 'express';
import { voiceAgentService } from '../services/voiceAgentService.js';
import { db } from '../db/db.js';

export const voiceRouter = express.Router();

/**
 * Get available AI Voice Personas
 */
voiceRouter.get('/personas', (req, res) => {
  res.json({ success: true, personas: voiceAgentService.getPersonas() });
});

/**
 * 1-Click Trigger AI Voice Call for a Contact/Lead
 */
voiceRouter.post('/trigger-call', async (req, res) => {
  try {
    const { phone, contactName, company, personaId, customPrompt } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: "Missing 'phone' number" });
    }

    const callResult = await voiceAgentService.triggerAICall({
      phone,
      contactName,
      company,
      personaId,
      customPrompt
    });

    // Notify connected Zoho CRM client widgets
    const io = req.app.get('io');
    if (io) {
      io.emit('call_completed', { callResult });
    }

    return res.json({ success: true, callResult });
  } catch (err) {
    console.error("AI Voice Call Error:", err);
    return res.status(500).json({ error: err.message });
  }
});
