import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { whatsappRouter } from './routes/whatsapp.js';
import { aiRouter } from './routes/ai.js';
import { zohoRouter } from './routes/zoho.js';
import { zohoOneRouter } from './routes/zohoOne.js';
import { voiceRouter } from './routes/voice.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set('io', io);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/whatsapp', whatsappRouter);
app.use('/api/ai', aiRouter);
app.use('/api/zoho', zohoRouter);
app.use('/api/zoho-one', zohoOneRouter);
app.use('/api/voice', voiceRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    suite: "Zoho One Omnichannel WhatsApp & AI Voice Agent Suite",
    supportedFeatures: [
      "AI Voice Calling Agent (English/Tamil/Hindi)",
      "WhatsApp Cloud API Omnichannel Messaging",
      "Gemini 1.5 Flash Copilot",
      "Zoho CRM, Books, Desk, Sign Integration"
    ],
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Socket.io Connection handling
io.on('connection', (socket) => {
  console.log(`⚡ Zoho One Widget Client Connected: ${socket.id}`);
  
  socket.on('join_contact_room', (phone) => {
    socket.join(phone);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
====================================================================
🚀 Zoho One Omnichannel AI Voice & WhatsApp Suite - Live Server
====================================================================
📡 Port:              http://localhost:${PORT}
🎙️ AI Voice Caller:  http://localhost:${PORT}/api/voice/personas
💬 WhatsApp Webhook: http://localhost:${PORT}/api/whatsapp/webhook
🤖 AI Copilot:       Active (Gemini AI Engine)
💼 Zoho One Apps:    CRM | Books | Desk | Sign | Recruit | Cliq
====================================================================
  `);
});
