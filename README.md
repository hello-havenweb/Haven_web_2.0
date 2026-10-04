# HAVEN — Digital Studio & HAVEN AI Voice Assistant

HAVEN is a premier commercial website-building studio offering bespoke multi-page templates, custom flagships, high-performance edge infrastructure, and an intelligent voice assistant: **HAVEN AI**.

---

## ✦ HAVEN AI Overview

HAVEN AI acts as a dedicated digital agency project consultant. Rather than a basic chatbot, HAVEN AI engages in natural spoken or typed dialogue with clients to:
- Understand their industry, brand concept, and aesthetic vision.
- Answer questions regarding HAVEN services, multi-page templates, and transparent starting pricing.
- Recommend the ideal design system (e.g., **NEXUS** for Esports, **VINTAGE** for Fine Dining, **LUMI** for Creative Studios, **ORBIT** for SaaS, **NOVA** for Corporate Advisory, or **MONARCH** for Executive Brands).
- Maintain conversation memory and compile a structured project brief.
- Formulate a clean summary for client confirmation before dispatching it to the HAVEN design team.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Pure semantic HTML5, CSS3, and Vanilla ES6 JavaScript (100% static, ultra-fast, zero framework overhead, fully compatible with GitHub Pages edge hosting).
- **Voice Engine**: Web Speech Recognition API (`SpeechRecognition` / `webkitSpeechRecognition`) for natural voice input with automated language detection, paired with `SpeechSynthesis` for natural spoken responses.
- **Backend**: Node.js & Express server (`server.ts`) hosting server-side Gemini API endpoints and transactional email dispatch.
- **AI Intelligence**: Google Gemini API via official `@google/genai` TypeScript SDK using `gemini-3.8-flash`.
- **Transactional Dispatch**: Resend API for delivering structured project briefs directly to the studio owner's inbox.

---

## 🔑 Environment Variables Setup

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Populate the required keys:

```env
# 1. Google Gemini API Key
# Obtain from Google AI Studio: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# 2. Resend API Key (Optional in local dev, recommended for production)
# Obtain from Resend: https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here

# 3. Studio Owner Email
# Verified recipient for inbound project briefs
HAVEN_OWNER_EMAIL=hello.havenweb@gmail.com

# 4. Server Port (Default: 3000)
PORT=3000

# 5. Production CORS Origin (e.g., https://yourdomain.com or * for development)
ALLOWED_ORIGIN=*
```

> **Security Note**: Never expose `GEMINI_API_KEY` or `RESEND_API_KEY` in frontend HTML, CSS, client-side JS, or public git commits. All AI calls and email dispatches are strictly executed server-side.

---

## 🚀 Running the Studio Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Full-Stack Dev Server (Vite + Express)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access HAVEN and [http://localhost:3000/ai.html](http://localhost:3000/ai.html) for HAVEN AI.

### 3. Production Build
```bash
npm run build
```

---

## 🌐 Deploying the Backend & Connecting to GitHub Pages

### Connecting Static Frontend to Backend (`API_BASE_URL`)
If you host the static HTML files on GitHub Pages (or a CDN) while hosting `server.ts` on a server (e.g. Cloud Run, Render, Railway, or VPS):

1. Set `ALLOWED_ORIGIN` in your backend `.env` to your GitHub Pages URL:
   ```env
   ALLOWED_ORIGIN=https://username.github.io
   ```
2. In `ai.html` or `script.js`, set the global API URL if hosted on a separate domain:
   ```html
   <script>
     window.HAVEN_API_BASE_URL = "https://your-haven-api.onrender.com";
   </script>
   ```
   *(By default, when hosted as a full-stack Node/Express app, `window.HAVEN_API_BASE_URL` is empty, using relative `/api` paths seamlessly).*

---

## 🧪 Testing HAVEN AI

### 1. Voice Conversation Testing
1. Navigate to `/ai.html`.
2. Click **START A CONVERSATION**.
3. Click the glowing purple **Microphone Button** (or press Space when focused).
4. Allow browser microphone access when prompted.
5. Speak naturally:
   > *"I need a luxury website for my restaurant in Lahore. We offer fine dining, tasting menus, and need online reservations."*
6. Observe:
   - Voice status turns to **Thinking...**
   - HAVEN AI speaks the response using natural speech synthesis.
   - VINTAGE template is recommended.
   - The **Brief Progress** pill bar updates with Business, Category, and Template.

### 2. Speech Interruption Testing
- While HAVEN AI is speaking, click the **Stop Speaking** button or click the **Microphone Button**.
- Speech synthesis immediately cancels, and the microphone reactivates for your next statement.

### 3. Text Fallback Testing
- If microphone permission is blocked or unavailable, type into the bottom text input:
  > *"What are the starting prices for your website packages?"*
- HAVEN AI returns the transparent starting prices (PKR 29,000 for templates up to PKR 49,000 with hosting/domain, and from PKR 69,000 for custom builds).

### 4. Multilingual Testing
- Type or speak in Roman Urdu or Urdu:
  > *"Mujhe ek esports gaming team ke liye website banwani hai, tournament brackets ke sath."*
- HAVEN AI understands, mirrors the language naturally, and recommends the **NEXUS** system.

### 5. Project Brief Review & Submission Testing
- When key details (business name, template, pages, email) are discussed, HAVEN AI presents the **YOUR HAVEN PROJECT** summary card.
- Click **EDIT DETAILS** to refine any requirements.
- Click **SEND ENQUIRY**:
  - Validates contact email.
  - Submits payload to `/api/submit-enquiry`.
  - Dispatches email via Resend (or logs to server if Resend key is pending).
  - Displays confirmation card with unique reference ID (e.g., `HVN-xxxx-xxx`).

---

## 📁 Repository Structure

```
├── index.html              # Flagship homepage with interactive day/night hero
├── ai.html                 # Dedicated HAVEN AI voice consultant studio
├── templates.html          # Commercial template marketplace (6 design systems)
├── services.html           # Studio services breakdown
├── pricing.html            # Transparent starting pricing matrix
├── about.html              # Agency philosophy and craftsmanship
├── contact.html            # Dynamic project inquiry intake
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── server.ts               # Express full-stack server (Gemini & Enquiry APIs)
├── script.js               # Lightweight client runtime & voice controller
├── style.css               # Design system & dark cinematic aesthetics
├── templates/              # 36 complete multi-page template pages
│   ├── nexus*.html         # Esports & Gaming suite
│   ├── vintage*.html       # Fine Dining & Culinary suite
│   ├── lumi*.html          # Creative Studio & Lifestyle suite
│   ├── orbit*.html         # Deep-Tech & SaaS suite
│   ├── nova*.html          # Corporate Advisory suite
│   └── monarch*.html       # Executive Personal Brand suite
├── .env.example            # Environment configuration template
└── package.json            # Scripts & full-stack dependencies
```

---

© 2026 HAVEN Digital Studio. All rights reserved.
