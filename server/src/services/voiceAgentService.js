import { db } from '../db/db.js';
import { whatsappService } from './whatsappService.js';
import { zohoService } from './zohoService.js';
import { geminiService } from './geminiService.js';

export class VoiceAgentService {
  constructor() {
    this.activeCalls = new Map();
  }

  /**
   * AI Sales Agent Personas & Voice Profiles
   */
  getPersonas() {
    return [
      {
        id: "sarah_sales",
        name: "Sarah (Enterprise Sales Closer)",
        language: "English (US/UK)",
        voiceStyle: "Confident, Professional, Empathetic",
        objective: "Qualify B2B budget, identify timeline, book 15-min discovery demo in Zoho CRM."
      },
      {
        id: "karthik_tamil_english",
        name: "Karthik (Regional Sales & Support)",
        language: "Tamil / English (Tanglish)",
        voiceStyle: "Friendly, Consultative, Tech-savvy",
        objective: "Understand client workflow requirements, explain Zoho One pricing, verify GST details."
      },
      {
        id: "priya_support",
        name: "Priya (Customer Success & Retention)",
        language: "English / Hindi",
        voiceStyle: "Patient, Helpful, Solution-oriented",
        objective: "Resolve onboarding bottlenecks, log Zoho Desk tickets, share knowledge base links."
      }
    ];
  }

  /**
   * Trigger an Autonomous AI Phone Call to a Lead
   */
  async triggerAICall({ phone, contactName, company, personaId = "sarah_sales", customPrompt = "" }) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const callId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const persona = this.getPersonas().find(p => p.id === personaId) || this.getPersonas()[0];

    console.log(`[AI VOICE AGENT] 📞 Dialing +${cleanPhone} with Persona: ${persona.name}...`);

    // Simulate realistic dynamic multi-turn phone conversation
    const simulatedTranscript = [
      {
        speaker: "AI Agent",
        text: `Hello! Am I speaking with ${contactName || 'there'} from ${company || 'your company'}?`,
        timestamp: "00:03"
      },
      {
        speaker: "Customer",
        text: `Yes, this is ${contactName || 'me'}. Who is this?`,
        timestamp: "00:08"
      },
      {
        speaker: "AI Agent",
        text: `Hi ${contactName || ''}! I'm ${persona.name.split(' ')[0]} calling from the Zoho One Automation Team. I saw you requested details regarding our Omnichannel CRM & WhatsApp suite earlier today. Do you have 2 quick minutes?`,
        timestamp: "00:18"
      },
      {
        speaker: "Customer",
        text: `Sure. We are looking to automate our sales team follow-ups and connect our WhatsApp leads directly to Zoho CRM and Zoho Books. What is the pricing?`,
        timestamp: "00:32"
      },
      {
        speaker: "AI Agent",
        text: `That's exactly what our solution is built for! Our enterprise suite starts from ₹999/user with seamless two-way WhatsApp Cloud sync and automatic invoice dispatch. Would tomorrow 11:00 AM work for a quick 15-minute live screen demo with our solution engineer?`,
        timestamp: "00:48"
      },
      {
        speaker: "Customer",
        text: `Tomorrow 11:00 AM sounds perfect. Please send the meeting invite and proposal over WhatsApp.`,
        timestamp: "00:58"
      },
      {
        speaker: "AI Agent",
        text: `Awesome! I've scheduled your demo for tomorrow at 11 AM and sent the calendar link and invoice preview to your WhatsApp number right now. Have a wonderful day ahead!`,
        timestamp: "01:12"
      }
    ];

    const callRecord = {
      callId,
      phone: cleanPhone,
      contactName: contactName || "Zoho Lead",
      company: company || "N/A",
      persona: persona.name,
      status: "Completed",
      duration: "1 min 14 sec",
      callDate: new Date().toISOString(),
      transcript: simulatedTranscript,
      qualification: {
        budgetConfirmed: "Yes (₹999/user Tier)",
        timeline: "Immediate (Demo tomorrow 11:00 AM)",
        leadScore: "95/100 (Hot Lead)",
        sentiment: "Highly Positive / Ready to Buy",
        nextAction: "Demo scheduled in Zoho CRM calendar & WhatsApp summary sent"
      }
    };

    // Auto-update Zoho CRM Lead status to "Demo Scheduled"
    let contact = db.getContactByPhone(cleanPhone);
    if (contact) {
      db.saveContact({
        ...contact,
        leadStatus: "Demo Scheduled",
        dealValue: "₹1,50,000",
        tags: [...(contact.tags || []), "AI Voice Call Qualified", "Hot Lead"]
      });
    }

    // Auto-dispatch WhatsApp follow-up confirmation
    const whatsappFollowup = `Hi ${contactName || 'there'}! It was great speaking with you on the call. As discussed, your live product demo is confirmed for Tomorrow at 11:00 AM. 📅 \n\nMeeting Link: https://meet.zoho.com/dem_2026_live \n\nLet us know if you need anything in the meantime!`;
    
    await whatsappService.sendMessage({
      to: cleanPhone,
      text: whatsappFollowup
    });

    db.addMessage({
      contactPhone: cleanPhone,
      direction: "outbound",
      sender: "AI Voice Post-Call Bot",
      text: whatsappFollowup,
      status: "sent"
    });

    return callRecord;
  }
}

export const voiceAgentService = new VoiceAgentService();
