# 🚀 Zoho CRM WhatsApp & AI Copilot Suite (Marketplace Edition)

> An enterprise-grade Zoho Marketplace Extension that brings native two-way WhatsApp Cloud messaging, 1-click approved templates, automated lead capture, and Gemini AI Copilot directly inside Zoho CRM.

---

## 🌟 Key Features

1. **Embedded Zoho CRM Widget:**
   - Works directly on Lead, Contact, and Deal detail pages.
   - 1-click messaging without leaving Zoho CRM.
   - Full timeline history sync with delivery receipts (Sent, Delivered, Read).

2. **🤖 Gemini AI Smart Copilot:**
   - Automatically reads the incoming customer message and previous chat context.
   - Generates 3 intelligent one-click replies (*Action-oriented*, *Professional*, *Concise*).
   - Real-time conversation sentiment analysis.

3. **📲 Meta WhatsApp Cloud API Integration:**
   - Two-way real-time messaging via Webhooks.
   - Official WhatsApp message templates with dynamic variable insertion.
   - Automated Lead capture when unknown numbers message the business.

---

## 🛠️ Quick Start (Local Run)

### 1. Start the Backend Server (Port 5000)
```bash
cd server
npm install
npm start
```
Server runs at `http://localhost:5000`

### 2. Start the Zoho Client Widget (Port 3000)
```bash
cd client
npm install
npm run dev
```
Client runs at `http://localhost:3000`

---

## 🔌 How to Test in Zoho CRM Developer Sandbox

1. Go to [Zoho Developer Console (Sigma)](https://sigma.zoho.com)
2. Click **Create Extension** -> Choose **Zoho CRM**.
3. Under **Components** -> **Widgets** -> Add New Widget:
   - **Type:** Web
   - **Hosting:** External URL -> `http://localhost:3000`
   - **Location:** `crm.lead.rightpanel` & `crm.contact.rightpanel`
4. Click **Test in Sandbox** -> Open any Lead in your Zoho CRM Sandbox -> The WhatsApp AI Copilot widget will load directly on the right panel!

---

## 🎯 Meta WhatsApp Cloud API Webhook Configuration

1. In the [Meta App Dashboard](https://developers.facebook.com):
   - **Callback URL:** `https://your-domain.com/api/whatsapp/webhook`
   - **Verify Token:** `zoho_whatsapp_webhook_secret_2026`
2. Subscribe to `messages` event.
