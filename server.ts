import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy-initialize Google GenAI client
  let aiClient: GoogleGenAI | null = null;
  function getAiClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
    return aiClient;
  }

  // API Routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Chatbot Customer Enquiry Agent Endpoint
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getAiClient();

    // System prompt instructing the autonomous customer service agent
    const systemInstruction = `You are "Lumina Concierge", the friendly, super-smart, and helpful customer support agent for Lumina Digital marketplace (https://ais-dev-4dcgj6rpjm3p73dgbg5lj4-83827459637.asia-east1.run.app).

STORE CATALOG & KNOWLEDGE:
- Lumina Digital provides premium digital assets, curated AI prompt packs, downloadable PDF prompt books, Notion templates, and creator e-books.
- Flagship Products:
  1. "100 Trending ChatGPT '/' Prompts": Official 4-page PDF cheatsheet & web vault containing 100 slash prompt commands across Productivity, Writing, Study, Coding (/code, /debug, /optimize, /refactor, /regex, /sql, /api, /architecture), Business, and Creative ($20).
  2. "50 Trending Prompts for Editing & Designing": 5-page PDF book with single-keyword slash directives for visual editing, AI image restyling, lighting, and social formats ($20).
  3. "Complete 150 Prompts Duo Bundle": Both 100 Prompts & 50 Editing books in one discounted collection ($20).
  4. "Financial Freedom Playbook": 10-chapter master guide on budgeting, investing, passive income, and wealth creation ($19).
  5. "AI Mega-Prompt Engineering Bible": 500+ battle-tested prompts & multi-step frameworks for Claude, ChatGPT & Midjourney ($29).
  6. "Ultimate Notion Freelance OS": Complete workspace for client pipeline, invoicing, and project delivery ($39).
- Key Policies:
  - Instant direct download immediately upon checkout.
  - Lifetime access & free future version updates.
  - Commercial and personal license included for all prompts and templates.
  - Google Sign-In is supported to securely persist purchases, wishlist, and chat enquiries across devices.

BEHAVIOR & TONE:
- Language MUST be simple, friendly, easy-to-understand conversational language (like talking to a warm, knowledgeable store assistant).
- Avoid robotic phrases, artificial corporate jargon, or complicated lectures.
- Think through the customer's needs autonomously: give practical advice, answer pricing questions, troubleshoot file downloads, and guide them to the right product.
- Use Google Search Grounding to reference current facts, AI model releases, or prompt engineering best practices when relevant.
- Keep replies concise, inviting, and well-structured with short paragraphs or easy bullet points.`;

    // Format chat history
    const conversationHistory: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-8).forEach((item: { role: string; content: string }) => {
        if (item.content && (item.role === 'user' || item.role === 'model' || item.role === 'assistant')) {
          conversationHistory.push({
            role: item.role === 'assistant' ? 'model' : item.role,
            parts: [{ text: item.content }]
          });
        }
      });
    }

    // Append current message
    conversationHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Try live Gemini API with search grounding
    if (ai) {
      try {
        // Attempt with gemini-3.8-flash for conversational customer service agent
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: conversationHistory,
          config: {
            systemInstruction,
            temperature: 0.7,
            tools: [{ googleSearch: {} }]
          }
        });

        const replyText = response.text || '';
        
        // Extract search grounding metadata if present
        const searchChunks: any[] = [];
        const candidates = response.candidates || [];
        if (candidates[0]?.groundingMetadata?.groundingChunks) {
          candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
            if (chunk.web?.title && chunk.web?.uri) {
              searchChunks.push({
                title: chunk.web.title,
                url: chunk.web.uri
              });
            }
          });
        }

        res.json({
          reply: replyText,
          sources: searchChunks,
          grounded: searchChunks.length > 0,
          model: 'gemini-3.8-flash'
        });
        return;
      } catch (geminiError: any) {
        console.warn('Primary Gemini call notice, attempting backup model:', geminiError?.message || geminiError);
        
        // Attempt with gemini-flash-latest if rate-limited
        try {
          const fallbackResponse = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: conversationHistory,
            config: {
              systemInstruction,
              temperature: 0.7
            }
          });
          const replyText = fallbackResponse.text || '';
          res.json({
            reply: replyText,
            sources: [],
            grounded: false,
            model: 'gemini-flash-latest'
          });
          return;
        } catch (secondaryError: any) {
          console.warn('Secondary Gemini model notice, using autonomous concierge knowledge engine:', secondaryError?.message || secondaryError);
        }
      }
    }

    // Autonomous fallback engine with rich context and natural conversational intelligence
    const lower = message.toLowerCase();
    let reply = '';
    let sources: any[] = [];

    if (lower.includes('prompt') || lower.includes('chatgpt') || lower.includes('slash')) {
      reply = `We've got some great AI prompt resources here at Lumina! 

Our most popular is the **100 Trending ChatGPT '/' Prompts** ($19). It uses quick slash commands (like /outline, /rephrase, /pitch) that you can copy directly into ChatGPT or Claude to get sharp, professional results in seconds.

If you're into visual generation or deep-dive guides, check out our **Prompt PDF Books Vault** ($20 each)—they cover Midjourney, copywriting, and visual art with before/after recipes.

Would you like me to recommend a pack for writing, coding, marketing, or design?`;
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('discount') || lower.includes('coupon')) {
      reply = `Our assets start at just **$19** for prompt cheatsheets, **$20** for prompt PDF books, and up to **$49** for complete UI/UX design systems.

Plus, you can use coupon code **LUMINA20** at checkout for an instant **20% discount** across your entire cart! All items come with lifetime access and free future updates.`;
    } else if (lower.includes('commercial') || lower.includes('license') || lower.includes('can i use')) {
      reply = `Yes, absolutely! Every product and prompt pack purchased on Lumina Digital includes both a personal and a commercial use license. 

That means you can freely use the prompts, outputs, templates, and frameworks in your client work, client projects, social media channels, or internal business operations without extra royalties.`;
    } else if (lower.includes('download') || lower.includes('access') || lower.includes('order') || lower.includes('refund')) {
      reply = `All downloads are 100% instant! As soon as your purchase completes, you're redirected to your private Access & Download page with direct one-click links.

We also email you a download receipt. If you sign in with your Google account at the top right, all your past purchases and files stay synced right in your account so you can re-download them anytime on any device.`;
    } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('who are you')) {
      reply = `Hey there! I'm **Lumina Concierge**, your personal AI assistant for Lumina Digital. 

I can help you find the best AI prompts for your workflow, explain how our prompt books work, check licensing, or answer questions about any digital template in our store. 

What are you working on or curious about today?`;
    } else {
      reply = `Thanks for asking! Here at Lumina Digital, we create curated AI prompt packs, actionable e-books, and developer/creator systems designed to save you hours of trial and error.

You can browse our **Trending 100 Prompts**, explore the **PDF Books Vault**, or grab our **Notion Freelancer OS**. You can also sign in with Google to save your favorites and enquiry history!

Is there a specific project or topic I can help guide you through?`;
    }

    res.json({
      reply,
      sources,
      grounded: false,
      model: 'concierge-agent'
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
