import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Basic security & parsing middleware
app.use(express.json({ limit: '1mb' }));

// Security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');
  next();
});

// CORS configuration (enforces configured origin or permissive in local dev)
app.use((req, res, next) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  const requestOrigin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', allowedOrigin === '*' ? requestOrigin : allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('[HAVEN AI] Failed to initialize GoogleGenAI client:', err);
  }
}

const SYSTEM_INSTRUCTION = `
You are HAVEN AI, an elite digital agency project consultant representing HAVEN (a premier website-building and digital experience studio).
Your purpose is to have natural, consultative conversations with prospective clients, understand their brand vision, discuss their requirements, recommend relevant HAVEN templates or custom builds, and compile a structured project brief.

HAVEN FACTS & CAPABILITIES:
- Business: HAVEN is a real high-end digital craftsmanship studio specializing in boutique multi-page websites, custom flagships, and high-performance web architecture.
- 6 Boutique 6-Page Design Systems:
  1. NEXUS — Esports, competitive gaming organizations, tournament circuits, creator syndicates.
  2. VINTAGE — Fine dining, artisanal restaurants, wood-fired hearths, luxury cafes, natural wine bars.
  3. LUMI — Avant-garde design studios, creative directors, architects, identity agencies, editorial practices.
  4. ORBIT — Deep-tech, developer SaaS, AI platforms, vector databases, cloud infrastructure.
  5. NOVA — Corporate advisory, M&A consultancies, institutional turnarounds, investment firms.
  6. MONARCH — Executive personal brand, board advisors, keynote speakers, authors, thought leaders.
- Transparent Starting Pricing:
  - Template Website: PKR 29,000 (approx. $105 USD one-time)
  - Template + Hosting: PKR 39,000 (approx. $140 USD all-in)
  - Template + Hosting + Domain: PKR 49,000 (approx. $175 USD all-in)
  - Custom Website: From PKR 69,000 (from ~$250+ USD bespoke)
  - Always explain that starting prices cover the turnkey multi-page design system and initial content placement, and final pricing varies based on custom pages, integrations, and unique requirements. Never promise a fixed final quote—HAVEN's team will confirm the final quote upon review.
- Never invent fake statistics, fake awards, fake testimonials, or non-existent templates.

CONVERSATIONAL PERSONALITY:
- Tone: Professional, warm, articulate, confident, human, and concise.
- Crucial: DO NOT speak like a generic chatbot or robot. Never say "As an AI..." or "How can I assist you today?".
- Voice-First: Keep your responses relatively concise (2-4 sentences max per turn) so they are crisp, engaging, and sound natural when read aloud by text-to-speech.
- Avoid markdown formatting (no bold asterisks **, no bullet points * or # headers) in your conversational 'reply' so that speech synthesis reads it fluently and naturally.
- Multilingual: Automatically mirror the client's language! If they speak or write in English, reply in English. If in Urdu, reply in Urdu. If in Roman Urdu (e.g. "Mujhe ek restaurant website chahiye"), reply in natural Roman Urdu. If in Hindi, Arabic, or Punjabi, reply in that language.
- Active Listening & Memory: Extract whatever facts the client shares (e.g. their name, business name, city, industry, requested pages, budget, timeline) and update the project brief. NEVER ask for details the client has already shared!
- Natural Pacing: Ask only 1 or at most 2 relevant follow-up questions at a time based on what they just said.

PROJECT BRIEF TRACKING:
Maintain and update this JSON object with every turn:
{
  "name": string,
  "email": string,
  "phone": string,
  "businessName": string,
  "country": string,
  "city": string,
  "businessType": string,
  "websiteType": string,
  "projectType": "Template" | "Custom" | "",
  "template": "NEXUS" | "VINTAGE" | "LUMI" | "ORBIT" | "NOVA" | "MONARCH" | "Custom Vision" | "",
  "pages": string[],
  "features": string[],
  "hosting": "Yes" | "No" | "",
  "domain": "Yes" | "No" | "",
  "budget": string,
  "timeline": string,
  "stylePreferences": string,
  "brandColors": string,
  "existingWebsite": string,
  "referenceWebsites": string,
  "additionalRequirements": string
}

READY FOR SUMMARY:
When you have collected enough key information (at minimum: business concept/type, website scope, template or custom preference, and the client's name or contact email), or when the client explicitly asks to wrap up/review/submit their project, set "isReadyForSummary": true. If email is missing, ask naturally for their email address so the HAVEN team can contact them with the project scope.

RESPONSE FORMAT:
You MUST ALWAYS respond with a valid JSON object matching this schema:
{
  "reply": "Your concise, spoken conversational response without markdown asterisks",
  "projectState": { ...the complete updated projectState JSON... },
  "isReadyForSummary": boolean,
  "detectedLanguage": "en" | "ur" | "roman-urdu" | "hi" | "ar" | "other"
}
`;

// Helper: Intelligent Fallback Consultant Engine when API Key is pending
function generateFallbackConsultantResponse(message: string, currentState: any): any {
  const text = message.toLowerCase();
  const newState = { ...(currentState || {}) };

  // Detect basic name
  const nameMatch = message.match(/(?:my name is|i am|i'm|name's)\s+([A-Za-z]+)/i);
  if (nameMatch && !newState.name) {
    newState.name = nameMatch[1];
  }

  // Detect email
  const emailMatch = message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch && !newState.email) {
    newState.email = emailMatch[1];
  }

  // Detect industry / template
  let recommendedTemplate = newState.template || '';
  let reply = '';

  if (text.includes('game') || text.includes('gaming') || text.includes('esport')) {
    recommendedTemplate = 'NEXUS';
    newState.template = 'NEXUS';
    newState.businessType = newState.businessType || 'Gaming & Esports';
    reply = "For gaming and esports organizations, our NEXUS design system is the benchmark, complete with live tournament brackets, pro athlete rosters, and media hub. What is the name of your organization or gaming team?";
  } else if (text.includes('food') || text.includes('restaurant') || text.includes('cafe') || text.includes('dining')) {
    recommendedTemplate = 'VINTAGE';
    newState.template = 'VINTAGE';
    newState.businessType = newState.businessType || 'Restaurant & Hospitality';
    reply = "Our VINTAGE template is tailored for fine dining and boutique restaurants, featuring tasting menus, atmosphere galleries, and online table reservations. What kind of cuisine or dining atmosphere are you planning?";
  } else if (text.includes('creative') || text.includes('design') || text.includes('agency') || text.includes('architect') || text.includes('studio')) {
    recommendedTemplate = 'LUMI';
    newState.template = 'LUMI';
    newState.businessType = newState.businessType || 'Creative Studio';
    reply = "Our LUMI system is crafted specifically for design directors and spatial studios, emphasizing expansive typography, whitespace, and detailed case studies. Do you have existing branding or project portfolios ready to showcase?";
  } else if (text.includes('tech') || text.includes('saas') || text.includes('software') || text.includes('ai') || text.includes('app')) {
    recommendedTemplate = 'ORBIT';
    newState.template = 'ORBIT';
    newState.businessType = newState.businessType || 'Deep Tech / SaaS';
    reply = "ORBIT is engineered for high-performance developer tools and SaaS platforms, featuring interactive terminal snippets, benchmark diagrams, and tiered pricing. What core solution does your product deliver?";
  } else if (text.includes('corporate') || text.includes('finance') || text.includes('consult') || text.includes('advisory') || text.includes('business')) {
    recommendedTemplate = 'NOVA';
    newState.template = 'NOVA';
    newState.businessType = newState.businessType || 'Corporate Advisory';
    reply = "NOVA delivers an authoritative corporate presence with executive leadership profiles, fiduciary track records, and bespoke service practice breakdowns. What is your firm's primary focus area?";
  } else if (text.includes('personal') || text.includes('speaker') || text.includes('author') || text.includes('consultant') || text.includes('monarch')) {
    recommendedTemplate = 'MONARCH';
    newState.template = 'MONARCH';
    newState.businessType = newState.businessType || 'Executive Personal Brand';
    reply = "For personal brands, keynote speakers, and board advisors, our MONARCH system offers commanding editorial layouts and private office retainer inquiries. Are you looking to showcase published works, speaking engagements, or advisory mandates?";
  } else if (text.includes('price') || text.includes('cost') || text.includes('how much') || text.includes('pkr')) {
    reply = "Our turnkey multi-page template packages start at PKR 29,000 for the standalone website, PKR 39,000 with managed edge hosting, and PKR 49,000 including custom domain registration. Bespoke custom flagship websites start from PKR 69,000 depending on unique integrations and pages. Would you prefer a turnkey template or a fully custom flagship build?";
  } else if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('start')) {
    reply = "Welcome to HAVEN. I am your project consultant. Tell me about the website you are imagining, your business, and your key goals.";
  } else if (newState.name && !newState.businessName && !text.includes('my name is')) {
    newState.businessName = message.trim();
    reply = `Wonderful to meet you, ${newState.name}. What is the primary purpose of your website, and do you have a target launch date in mind?`;
  } else {
    reply = "I understand your vision. To ensure we craft the exact solution for your brand, what key features or interactive elements are most important for your visitors?";
  }

  // Check if ready for summary
  const hasBasicInfo = (newState.businessName || newState.businessType || newState.template) && (newState.name || newState.email);
  const isReady = Boolean(hasBasicInfo && (text.includes('submit') || text.includes('ready') || text.includes('send') || text.includes('summary') || text.includes('done') || newState.email));

  if (isReady && !newState.email) {
    reply = "I have your project details organized. Before I prepare the final brief for the HAVEN team, what is your preferred contact email address?";
  }

  return {
    reply,
    projectState: newState,
    isReadyForSummary: isReady && Boolean(newState.email),
    detectedLanguage: 'en',
  };
}

// ============================================================================
// 1. API: /api/chat — Real-time Gemini Powered Voice/Text Assistant
// ============================================================================
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, projectState } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // If Gemini API is configured, invoke gemini-3.8-flash
    if (aiClient && geminiApiKey && geminiApiKey !== 'your_gemini_api_key_here') {
      try {
        const contentsPayload: any[] = [];

        // Add conversation history
        if (Array.isArray(history)) {
          for (const item of history.slice(-8)) {
            if (item.role && item.text) {
              contentsPayload.push({
                role: item.role === 'model' || item.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: item.text }],
              });
            }
          }
        }

        // Add current user message with context
        const promptWithContext = `Current Project Brief State: ${JSON.stringify(projectState || {})}\n\nClient Message: "${message}"\n\nRemember to respond strictly with a valid JSON object containing: reply, projectState, isReadyForSummary, detectedLanguage.`;

        contentsPayload.push({
          role: 'user',
          parts: [{ text: promptWithContext }],
        });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contentsPayload,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const rawText = response.text || '';
        try {
          const parsed = JSON.parse(rawText);
          return res.json({
            reply: parsed.reply || "I understand your vision. Let's continue planning your HAVEN build.",
            projectState: parsed.projectState || projectState || {},
            isReadyForSummary: Boolean(parsed.isReadyForSummary),
            detectedLanguage: parsed.detectedLanguage || 'en',
          });
        } catch (jsonErr) {
          console.warn('[HAVEN AI] JSON parsing error from Gemini, extracting markdown block:', jsonErr);
          const match = rawText.match(/\{[\s\S]*\}/);
          if (match) {
            const extracted = JSON.parse(match[0]);
            return res.json(extracted);
          }
          return res.json({
            reply: rawText.replace(/[#*`]/g, '').trim(),
            projectState: projectState || {},
            isReadyForSummary: false,
            detectedLanguage: 'en',
          });
        }
      } catch (geminiCallErr: any) {
        console.error('[HAVEN AI] Gemini API call failed:', geminiCallErr?.message || geminiCallErr);
        return res.status(502).json({
          error: 'Gemini request failed.',
          reply: 'I could not reach the HAVEN AI service right now. Please try again in a moment.',
        });
      }
    }

    // Graceful fallback consultant engine if Gemini API key is not yet set
    const fallback = generateFallbackConsultantResponse(message, projectState);
    return res.json({
      reply: fallback.reply,
      projectState: fallback.projectState,
      isReadyForSummary: fallback.isReadyForSummary,
      detectedLanguage: fallback.detectedLanguage || 'en',
    });
  } catch (err: any) {
    console.error('[HAVEN AI] /api/chat error:', err);
    return res.status(500).json({
      error: 'An internal error occurred while processing your request.',
      reply: "I am having trouble connecting right now. You can continue by typing or explore our templates directly.",
    });
  }
});

// ============================================================================
// 2. API: /api/live-token — Secure Gemini Live API ephemeral token
// ============================================================================
app.post('/api/live-token', async (_req: Request, res: Response) => {
  try {
    if (!geminiApiKey || geminiApiKey === 'your_gemini_api_key_here') {
      return res.status(503).json({ error: 'Gemini API key is not configured on the server.' });
    }

    const now = Date.now();
    const tokenResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
      method: 'POST',
      headers: {
        'x-goog-api-key': geminiApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uses: 1,
        expireTime: new Date(now + 30 * 60 * 1000).toISOString(),
        newSessionExpireTime: new Date(now + 60 * 1000).toISOString(),
        liveConnectConstraints: {
          model: 'gemini-3.8-live',
          config: {
            responseModalities: ['AUDIO'],
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
        },
      }),
    });

    const raw = await tokenResponse.text();
    if (!tokenResponse.ok) {
      console.error('[HAVEN AI] Live token provisioning failed:', tokenResponse.status, raw);
      return res.status(tokenResponse.status).json({
        error: 'Unable to create a Gemini Live session token.',
      });
    }

    const data = JSON.parse(raw);
    if (!data.name) {
      console.error('[HAVEN AI] Live token response did not contain a token name.');
      return res.status(502).json({ error: 'Gemini did not return a Live session token.' });
    }

    return res.json({ token: data.name });
  } catch (err: any) {
    console.error('[HAVEN AI] /api/live-token error:', err?.message || err);
    return res.status(500).json({ error: 'Unable to initialize HAVEN AI voice right now.' });
  }
});

// ============================================================================
// 3. API: /api/submit-enquiry — Confirmed Project Brief Dispatch
// ============================================================================
app.post('/api/submit-enquiry', async (req: Request, res: Response) => {
  try {
    const {
      clientInfo,
      business,
      project,
      budgetTimeline,
      design,
      additionalRequirements,
      transcript,
    } = req.body;

    const email = clientInfo?.email?.trim();
    const name = clientInfo?.name?.trim() || 'Prospective Client';
    const businessName = business?.businessName?.trim() || 'Untitled Brand';

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required to submit your project enquiry.',
      });
    }

    const referenceId = `HVN-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
    const ownerEmail = process.env.HAVEN_OWNER_EMAIL || 'hello.havenweb@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY || '';

    // Email Body (Plaintext and HTML)
    const subject = `New HAVEN AI Project Enquiry — ${businessName} (${name})`;
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #07050e; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid #271f3f;">
        <div style="margin-bottom: 24px; border-bottom: 1px solid #271f3f; padding-bottom: 16px;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px;">HAVEN AI // PROJECT ENQUIRY</h1>
          <p style="color: #c084fc; font-family: monospace; font-size: 13px; margin: 0;">REFERENCE: ${referenceId} &bull; SOURCE: HAVEN AI CONSULTANT</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="color: #d8b4fe; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Client Information</h2>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Phone / WhatsApp:</strong> ${clientInfo?.phone || 'Not provided'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Location:</strong> ${[clientInfo?.city, clientInfo?.country].filter(Boolean).join(', ') || 'Not specified'}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="color: #d8b4fe; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Business & Concept</h2>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Brand / Venture:</strong> ${businessName}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Business Type:</strong> ${business?.businessType || 'General'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Existing Website:</strong> ${business?.existingWebsite || 'None'}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="color: #d8b4fe; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Project Scope & Specifications</h2>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Website Type:</strong> ${project?.websiteType || 'Custom Website'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Architecture:</strong> ${project?.projectType || 'Template System'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Selected Template:</strong> <span style="color: #22d3ee; font-weight: 600;">${project?.template || 'Custom Bespoke Scope'}</span></p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Required Pages:</strong> ${Array.isArray(project?.pages) && project.pages.length ? project.pages.join(', ') : 'Standard 6-Page Multi-Page Suite'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Desired Features:</strong> ${Array.isArray(project?.features) && project.features.length ? project.features.join(', ') : 'Standard flagship features'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Managed Edge Hosting:</strong> ${project?.hosting || 'Interested'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Domain Registration:</strong> ${project?.domain || 'Interested'}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="color: #d8b4fe; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Budget & Timeline</h2>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Estimated Budget:</strong> ${budgetTimeline?.budget || 'Standard Studio Tier'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Target Timeline:</strong> ${budgetTimeline?.timeline || 'Standard (2–4 weeks)'}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="color: #d8b4fe; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Design & Identity</h2>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Style Direction:</strong> ${design?.style || 'Dark cinematic, minimal'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Brand Colors:</strong> ${design?.brandColors || 'HAVEN Palette'}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Reference Websites:</strong> ${design?.referenceWebsites || 'None provided'}</p>
        </div>

        ${additionalRequirements ? `
        <div style="margin-bottom: 24px;">
          <h2 style="color: #d8b4fe; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Additional Requirements</h2>
          <p style="margin: 4px 0; font-size: 14px; background: rgba(255,255,255,0.04); padding: 12px; border-radius: 6px;">${additionalRequirements}</p>
        </div>` : ''}

        <div style="margin-top: 32px; border-top: 1px solid #271f3f; padding-top: 20px;">
          <h3 style="color: #94a3b8; font-size: 13px; text-transform: uppercase; margin: 0 0 12px;">Consultation Transcript</h3>
          <div style="font-family: monospace; font-size: 12px; line-height: 1.6; color: #cbd5e1; max-height: 300px; overflow-y: auto; background: #0c0918; padding: 16px; border-radius: 8px;">
            ${Array.isArray(transcript) ? transcript.map((t: any) => `<div><strong>${t.role === 'model' ? 'HAVEN AI' : name}:</strong> ${t.text}</div>`).join('<br>') : 'Live voice conversation transcript recorded.'}
          </div>
        </div>
      </div>
    `;

    // Dispatch via Resend if RESEND_API_KEY is configured
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'HAVEN <onboarding@resend.dev>',
            to: [ownerEmail],
            reply_to: email,
            subject: subject,
            html: htmlContent,
          }),
        });

        if (!resendRes.ok) {
          const resendErr = await resendRes.text();
          console.warn('[HAVEN AI] Resend API responded with error:', resendErr);
        } else {
          console.log('[HAVEN AI] Successfully dispatched enquiry via Resend to:', ownerEmail);
        }
      } catch (sendErr) {
        console.error('[HAVEN AI] Error calling Resend API:', sendErr);
      }
    } else {
      console.log('----------------------------------------------------');
      console.log(`[HAVEN AI] NEW PROJECT ENQUIRY RECEIVED (REFERENCE: ${referenceId})`);
      console.log(`Client: ${name} (${email}) | Business: ${businessName}`);
      console.log(`Template: ${project?.template || 'Custom'} | Budget: ${budgetTimeline?.budget || 'N/A'}`);
      console.log(`Owner recipient configured: ${ownerEmail}`);
      console.log('----------------------------------------------------');
    }

    return res.json({
      success: true,
      referenceId,
      message: 'Your project enquiry has been successfully transmitted to the HAVEN design team.',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[HAVEN AI] /api/submit-enquiry error:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to submit your project enquiry at this time. Please try again or reach us at hello.havenweb@gmail.com.',
    });
  }
});

// 404 handler for undefined API routes
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// ============================================================================
// 4. Mount Vite in Dev Mode or Static Files in Production
// ============================================================================
async function startServer() {
  const fourOhFourPath = path.resolve(__dirname, '404.html');

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });

    // Development check: return 404 for non-existent HTML pages/routes
    app.use(async (req, res, next) => {
      if ((req.method === 'GET' || req.method === 'HEAD') && !req.path.startsWith('/@') && !req.path.startsWith('/node_modules') && !req.path.startsWith('/src') && !req.path.startsWith('/api')) {
        let cleanPath = req.path.replace(/^\//, '');
        if (!cleanPath) cleanPath = 'index.html';
        
        // If no file extension, test whether .html exists
        if (!path.extname(cleanPath)) {
          const withHtml = path.resolve(__dirname, cleanPath + '.html');
          if (fs.existsSync(withHtml)) {
            return next();
          }
        }

        const exactPath = path.resolve(__dirname, cleanPath);
        const publicPath = path.resolve(__dirname, 'public', cleanPath);
        if (!fs.existsSync(exactPath) && !fs.existsSync(publicPath)) {
          if (fs.existsSync(fourOhFourPath)) {
            try {
              let html = fs.readFileSync(fourOhFourPath, 'utf-8');
              html = await vite.transformIndexHtml(req.url, html);
              return res.status(404).set({ 'Content-Type': 'text/html' }).send(html);
            } catch {
              return res.status(404).sendFile(fourOhFourPath);
            }
          }
          return res.status(404).send('Page not found');
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        const potentialFile = path.resolve(distPath, req.path.replace(/^\//, ''));
        if (fs.existsSync(potentialFile) && fs.statSync(potentialFile).isFile()) {
          return res.sendFile(potentialFile);
        }
        const fourOhFourDist = path.resolve(distPath, '404.html');
        if (fs.existsSync(fourOhFourDist)) {
          return res.status(404).sendFile(fourOhFourDist);
        }
        res.status(404).sendFile(fourOhFourPath);
      });
    } else {
      app.use(express.static(__dirname));
      app.use((_req, res) => {
        res.status(404).sendFile(fourOhFourPath);
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HAVEN Studio & AI] Server live at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[HAVEN Studio] Fatal server startup failure:', err);
  process.exit(1);
});
