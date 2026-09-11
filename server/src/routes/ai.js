import express from 'express';
import { geminiService } from '../services/geminiService.js';
import { db } from '../db/db.js';

export const aiRouter = express.Router();

/**
 * Generate Smart Suggestions & Actionable Summary for a conversation
 */
aiRouter.post('/suggest-replies', async (req, res) => {
  try {
    const { phone, contactName, company } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: "Missing 'phone' parameter" });
    }

    const chatHistory = db.getMessages(phone);
    const lastInboundMsg = [...chatHistory].reverse().find(m => m.direction === 'inbound');

    if (!lastInboundMsg) {
      return res.json({
        success: true,
        suggestions: {
          professional: `Hello ${contactName || 'there'}, hope you are having a productive day! Following up regarding your inquiry.`,
          action_oriented: `Hi ${contactName || 'there'}, are you free for a quick 5-minute call today to discuss your requirements?`,
          concise: `Hey ${contactName || 'there'}, just checking in. Let me know if you need any assistance!`,
          actionable_summary: "No prior inbound message from client.",
          sentiment: "Neutral"
        }
      });
    }

    const suggestions = await geminiService.generateSmartReplies({
      contactName,
      company,
      chatHistory: chatHistory.slice(-6), // last 6 messages context
      latestMessage: lastInboundMsg.text
    });

    return res.json({ success: true, suggestions });
  } catch (err) {
    console.error("AI Route Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * Summarize entire chat history for Zoho CRM Note attachment
 */
aiRouter.post('/summarize-chat', async (req, res) => {
  try {
    const { phone, contactName } = req.body;
    const chatHistory = db.getMessages(phone);
    
    if (!chatHistory.length) {
      return res.json({ success: true, summary: "No message history available to summarize." });
    }

    const lastMsg = chatHistory[chatHistory.length - 1];
    const suggestions = await geminiService.generateSmartReplies({
      contactName,
      chatHistory,
      latestMessage: lastMsg.text
    });

    return res.json({
      success: true,
      summary: suggestions.actionable_summary || "Client is in active discussions.",
      sentiment: suggestions.sentiment || "Positive"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
