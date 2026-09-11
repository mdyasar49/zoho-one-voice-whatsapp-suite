import axios from 'axios';

export class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  async generateSmartReplies({ contactName, company, chatHistory, latestMessage }) {
    // If no key provided, provide intelligent context-aware mock AI suggestions
    if (!this.apiKey || this.apiKey.includes('your_gemini')) {
      return this.getSmartHeuristicReplies(contactName, latestMessage);
    }

    try {
      const prompt = `You are an elite B2B Sales & Customer Support AI Assistant embedded inside Zoho CRM.
Analyze the following WhatsApp conversation between a sales representative and a client/lead.

Client Details:
- Name: ${contactName || 'Valued Client'}
- Company: ${company || 'N/A'}

Recent Conversation Context:
${chatHistory.map(m => `[${m.direction === 'inbound' ? 'Client' : 'Agent'}]: ${m.text}`).join('\n')}

Latest Message from Client:
"${latestMessage}"

Generate exactly 3 smart, distinct, one-click reply drafts:
1. "professional": Clear, courteous, corporate tone.
2. "action_oriented": Closing the deal, booking calendar time, next steps.
3. "concise": Fast, direct, friendly confirmation.

Also provide a brief 1-sentence "actionable_summary" and a "sentiment" (Positive/Neutral/Urgent/Hesitant).

Respond in valid JSON format:
{
  "professional": "...",
  "action_oriented": "...",
  "concise": "...",
  "actionable_summary": "...",
  "sentiment": "..."
}`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7
          }
        },
        { timeout: 10000 }
      );

      const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (content) {
        return JSON.parse(content);
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to heuristic engine:", err.message);
    }

    return this.getSmartHeuristicReplies(contactName, latestMessage);
  }

  getSmartHeuristicReplies(name = "there", text = "") {
    const lower = text.toLowerCase();
    const firstName = name.split(' ')[0] || 'there';

    if (lower.includes('demo') || lower.includes('meet') || lower.includes('call') || lower.includes('time') || lower.includes('tomorrow')) {
      return {
        professional: `Hi ${firstName}, tomorrow at 11 AM works great for us. I'll send a calendar invite with the meeting link shortly!`,
        action_oriented: `Done! Confirmed for tomorrow at 11 AM. Looking forward to demonstrating how our solution helps your team.`,
        concise: `Sounds perfect ${firstName}! Locked in for 11 AM tomorrow. See you then!`,
        actionable_summary: "Client requested a 15-minute product demo for tomorrow at 11 AM.",
        sentiment: "High Interest / Positive"
      };
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('discount') || lower.includes('quote') || lower.includes('catalog')) {
      return {
        professional: `Hello ${firstName}, I have attached our detailed pricing tiers with applicable enterprise volume discounts.`,
        action_oriented: `Hi ${firstName}, our plans start from ₹999/user. Would you like a customized proposal tailored to your team size?`,
        concise: `Sent the pricing sheet over! Let me know which plan suits your workflow best.`,
        actionable_summary: "Client inquired about pricing and volume discount tiers.",
        sentiment: "Evaluating"
      };
    }

    return {
      professional: `Hello ${firstName}, thank you for reaching out! How can we best assist your business today?`,
      action_oriented: `Hi ${firstName}, I can walk you through our platform right away or schedule a quick discovery call.`,
      concise: `Hey ${firstName}! Great to connect. How can I help you today?`,
      actionable_summary: "New conversation initiated with client.",
      sentiment: "Neutral"
    };
  }
}

export const geminiService = new GeminiService();
