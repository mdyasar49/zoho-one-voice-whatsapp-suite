import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Chip, 
  Typography, 
  Avatar, 
  Paper, 
  LinearProgress, 
  IconButton, 
  Box, 
  Slide,
  Tooltip,
  Divider,
  Stack
} from '@mui/material';
import { 
  PhoneInTalk, 
  PhoneDisabled, 
  Mic, 
  AutoAwesome, 
  CheckCircle, 
  Close, 
  VolumeUp, 
  Person, 
  Language, 
  TrendingUp, 
  EventAvailable, 
  Bolt 
} from '@mui/icons-material';
import { api } from '../services/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AIVoiceCallerModal = ({ contact, onClose, onRefreshChat }) => {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState('sarah_sales');
  const [callingState, setCallingState] = useState('idle'); // 'idle' | 'calling' | 'in_call' | 'completed'
  const [callResult, setCallResult] = useState(null);
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  useEffect(() => {
    api.getVoicePersonas().then(res => setPersonas(res));
  }, []);

  const handleStartCall = async () => {
    setCallingState('calling');
    setTranscriptIndex(0);

    try {
      const result = await api.triggerAICall({
        phone: contact.phone,
        contactName: contact.name,
        company: contact.company,
        personaId: selectedPersona
      });

      setCallResult(result);
      setCallingState('in_call');

      let currentLine = 0;
      const interval = setInterval(() => {
        currentLine++;
        if (currentLine <= result.transcript.length) {
          setTranscriptIndex(currentLine);
        } else {
          clearInterval(interval);
          setCallingState('completed');
          onRefreshChat();
        }
      }, 2500);

    } catch (err) {
      alert("Failed to start AI Voice Call: " + err.message);
      setCallingState('idle');
    }
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0d1e35',
          backgroundImage: 'radial-gradient(ellipse at top, #172e50, #0d1e35)',
          border: '1px solid #1e3a5f',
          borderRadius: '20px',
          color: '#ffffff'
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1.5, borderBottom: '1px solid #1b3252' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: 'error.main', width: 40, height: 40, boxShadow: '0 4px 14px rgba(228, 37, 40, 0.4)' }}>
            <Mic />
          </Avatar>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#fff' }}>
                Autonomous AI Voice Caller
              </Typography>
              <Chip label="Zoho One Exclusive" size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Natural speech call • Instant Lead qualification • WhatsApp calendar sync
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#fff' } }}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ py: 2.5 }}>
        {callingState === 'idle' && (
          <Stack spacing={2.5}>
            {/* Target Contact Card */}
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#10243e', borderColor: '#1b3252', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#00B4D8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Target Lead
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                  {contact?.name || "Raveena Arun"}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {contact?.company || "TechNova Corp"} • +{contact?.phone || "919876543210"}
                </Typography>
              </Box>
              <Chip label={contact?.zohoModule || "Lead"} color="secondary" size="small" sx={{ fontWeight: 700 }} />
            </Paper>

            {/* Persona Selection */}
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mb: 1, display: 'block' }}>
                Select AI Voice Persona & Dialect:
              </Typography>
              <Stack spacing={1.5}>
                {personas.map((p) => {
                  const isSelected = selectedPersona === p.id;
                  return (
                    <Paper
                      key={p.id}
                      onClick={() => setSelectedPersona(p.id)}
                      variant="outlined"
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        borderRadius: '14px',
                        transition: 'all 0.2s',
                        bgcolor: isSelected ? 'rgba(228, 37, 40, 0.08)' : '#10243e',
                        borderColor: isSelected ? 'error.main' : '#1b3252',
                        '&:hover': { borderColor: isSelected ? 'error.main' : '#2d527c' }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: isSelected ? '#ff6b6d' : '#fff' }}>
                          {p.name}
                        </Typography>
                        <Chip label={p.language} size="small" icon={<Language fontSize="inherit" />} sx={{ height: 20, fontSize: '0.65rem' }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        {p.objective}
                      </Typography>
                    </Paper>
                  );
                })}
              </Stack>
            </Box>

            {/* Trigger Button */}
            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={handleStartCall}
              startIcon={<PhoneInTalk />}
              sx={{
                py: 1.5,
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #E42528 0%, #ff5255 100%)',
                boxShadow: '0 8px 24px rgba(228, 37, 40, 0.35)'
              }}
            >
              Trigger Live AI Voice Call Now
            </Button>
          </Stack>
        )}

        {(callingState === 'calling' || callingState === 'in_call' || callingState === 'completed') && (
          <Stack spacing={2}>
            {/* Live Audio Visualizer Banner */}
            <Paper variant="outlined" sx={{ p: 2.5, bgcolor: '#10243e', borderColor: '#1b3252', borderRadius: '16px', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                <Chip
                  label={callingState === 'calling' ? 'Dialing...' : callingState === 'in_call' ? 'Live AI Conversation' : 'Call Completed & Qualified'}
                  color={callingState === 'completed' ? 'secondary' : 'error'}
                  size="small"
                  sx={{ fontWeight: 800 }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>
                {contact?.name} (+{contact?.phone})
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                AI Persona: {personas.find(p => p.id === selectedPersona)?.name}
              </Typography>

              {/* Soundwaves */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, my: 2, height: 32 }}>
                {[30, 65, 90, 50, 85, 40, 75, 100, 60, 45, 80, 55].map((h, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 4,
                      height: callingState === 'in_call' ? `${h}%` : '20%',
                      bgcolor: 'error.main',
                      borderRadius: 2,
                      transition: 'height 0.3s ease'
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Live Transcript Box */}
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#071220', borderColor: '#1b3252', borderRadius: '14px', maxHeight: 220, overflowY: 'auto' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mb: 1.5, display: 'block' }}>
                Live Speech-to-Text Transcript:
              </Typography>
              <Stack spacing={1}>
                {callResult?.transcript.slice(0, transcriptIndex).map((line, idx) => (
                  <Box key={idx} sx={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
                    <Typography component="span" sx={{ fontWeight: 700, color: line.speaker === 'AI Agent' ? '#ff6b6d' : '#00A859', mr: 1 }}>
                      [{line.speaker}]:
                    </Typography>
                    <Typography component="span" sx={{ color: '#f1f5f9' }}>
                      {line.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Post-Call Report */}
            {callingState === 'completed' && callResult?.qualification && (
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'rgba(0, 168, 89, 0.1)', borderColor: 'secondary.main', borderRadius: '14px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#00A859', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircle fontSize="small" /> AI Lead Score: {callResult.qualification.leadScore}
                  </Typography>
                  <Chip label={`Duration: ${callResult.duration}`} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                </Box>
                <Typography variant="caption" sx={{ color: '#e2e8f0', display: 'block', mb: 1 }}>
                  <strong>Outcome:</strong> {callResult.qualification.nextAction}
                </Typography>
                <Divider sx={{ my: 1, borderColor: 'rgba(0, 168, 89, 0.2)' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6ee7b7' }}>
                  <span>✅ Zoho CRM Lead: <strong>Demo Scheduled</strong></span>
                  <span>✅ WhatsApp Invite: <strong>Sent</strong></span>
                </Box>
              </Paper>
            )}
          </Stack>
        )}
      </DialogContent>

      {/* Footer */}
      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #1b3252', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Bolt fontSize="small" sx={{ color: 'warning.main' }} /> Powered by Gemini 1.5 Realtime Voice & Twilio
        </Typography>
        <Button onClick={onClose} variant="outlined" sx={{ color: 'text.secondary', borderColor: '#1b3252' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
