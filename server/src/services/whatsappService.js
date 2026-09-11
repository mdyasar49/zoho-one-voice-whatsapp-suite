import axios from 'axios';

export class WhatsAppService {
  constructor() {
    this.token = process.env.WHATSAPP_TOKEN || '';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'zoho_whatsapp_webhook_secret_2026';
    this.graphApiUrl = `https://graph.facebook.com/v21.0`;
  }

  /**
   * Send a direct text message via Meta WhatsApp Cloud API
   */
  async sendMessage({ to, text }) {
    const cleanTo = to.replace(/[^0-9]/g, '');

    // If no valid Meta credentials, simulate successful delivery for local development & testing
    if (!this.token || this.token.includes('mock_') || !this.phoneNumberId || this.phoneNumberId.includes('000000')) {
      console.log(`[SIMULATED WHATSAPP SEND] to: +${cleanTo}, text: "${text}"`);
      return {
        success: true,
        mock: true,
        messageId: `wamid.mock_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        status: "delivered",
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await axios.post(
        `${this.graphApiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanTo,
          type: "text",
          text: { preview_url: true, body: text }
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json"
          }
        }
      );

      return {
        success: true,
        messageId: response.data?.messages?.[0]?.id,
        status: "sent",
        raw: response.data
      };
    } catch (err) {
      console.error("WhatsApp API Error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.error?.message || "Failed to send WhatsApp message via Meta Cloud API");
    }
  }

  /**
   * Send pre-approved WhatsApp Template message
   */
  async sendTemplateMessage({ to, templateName, languageCode = "en_US", components = [] }) {
    const cleanTo = to.replace(/[^0-9]/g, '');

    if (!this.token || this.token.includes('mock_')) {
      console.log(`[SIMULATED WHATSAPP TEMPLATE] to: +${cleanTo}, template: ${templateName}`);
      return {
        success: true,
        mock: true,
        messageId: `wamid.tmpl_mock_${Date.now()}`,
        status: "sent"
      };
    }

    try {
      const response = await axios.post(
        `${this.graphApiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          to: cleanTo,
          type: "template",
          template: {
            name: templateName,
            language: { code: languageCode },
            components
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json"
          }
        }
      );

      return {
        success: true,
        messageId: response.data?.messages?.[0]?.id,
        status: "sent"
      };
    } catch (err) {
      console.error("WhatsApp Template Send Error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.error?.message || "Failed to send WhatsApp template message");
    }
  }

  /**
   * Parse incoming webhook payload from Meta
   */
  parseInboundWebhook(body) {
    try {
      const entry = body?.entry?.[0];
      const changes = entry?.changes?.[0]?.value;
      
      if (!changes || !changes.messages) return null;

      const messageObj = changes.messages[0];
      const contactObj = changes.contacts?.[0];

      let text = "";
      if (messageObj.type === "text") {
        text = messageObj.text?.body || "";
      } else if (messageObj.type === "button") {
        text = messageObj.button?.text || "";
      } else if (messageObj.type === "interactive") {
        text = messageObj.interactive?.button_reply?.title || messageObj.interactive?.list_reply?.title || "[Interactive Selection]";
      } else if (messageObj.type === "image" || messageObj.type === "document") {
        text = `[Attachment: ${messageObj.type}] ${messageObj.caption || ''}`;
      } else {
        text = `[Received ${messageObj.type}]`;
      }

      return {
        messageId: messageObj.id,
        fromPhone: messageObj.from,
        senderName: contactObj?.profile?.name || "WhatsApp User",
        text,
        type: messageObj.type,
        timestamp: new Date(parseInt(messageObj.timestamp, 10) * 1000).toISOString()
      };
    } catch (err) {
      console.error("Webhook parse error:", err);
      return null;
    }
  }
}

export const whatsappService = new WhatsAppService();
