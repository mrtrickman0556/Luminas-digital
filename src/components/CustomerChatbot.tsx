import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  Search,
  ExternalLink,
  RotateCcw,
  User,
  ChevronDown,
  Brain,
  ShieldCheck,
  Flame,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  sources?: { title: string; url: string }[];
  grounded?: boolean;
  model?: string;
  thinkingSteps?: string[];
}

const SUGGESTED_ENQUIRIES = [
  { text: "What's in the 100 Trending ChatGPT Prompts?", icon: Flame },
  { text: "How do the Prompt PDF Books work?", icon: BookOpen },
  { text: "Can I use these prompts for client projects?", icon: ShieldCheck },
  { text: "What discount codes are currently active?", icon: Sparkles }
];

export const CustomerChatbot: React.FC = () => {
  const { user, saveCustomerEnquiry, fetchCustomerEnquiries } = useAuth();
  const { setActivePage } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'agent',
      text: "Hi there! I'm **Lumina Concierge**, your AI customer assistant.\n\nI can help you explore our AI prompt packs, explain prompt engineering workflows, answer pricing & licensing questions, or help with your downloads.\n\nWhat can I help you with today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [currentThinkingStep, setCurrentThinkingStep] = useState<string>('');
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isThinking]);

  // Load past enquiries from Firestore when user signs in
  useEffect(() => {
    if (user) {
      fetchCustomerEnquiries().then((pastEnquiries) => {
        if (pastEnquiries && pastEnquiries.length > 0) {
          const formatted = pastEnquiries.map(item => ({
            id: item.id,
            sender: item.sender,
            text: item.message,
            timestamp: item.timestamp
          }));
          setMessages(prev => {
            // Keep welcome msg at top
            const existingIds = new Set(formatted.map(f => f.id));
            const filteredPrev = prev.filter(p => p.id === 'welcome-msg' || !existingIds.has(p.id));
            return [...filteredPrev, ...formatted];
          });
        }
      });
    }
  }, [user]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isThinking) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    // Save user message to Firestore if authenticated
    if (user) {
      saveCustomerEnquiry({
        id: userMessageId,
        message: textToSend,
        sender: 'user',
        timestamp: userMsg.timestamp
      }).catch(err => console.warn('Enquiry save notice:', err));
    }

    // Thinking process simulation while fetching
    const thinkingSteps = [
      'Understanding customer enquiry...',
      'Checking store catalog & prompt specifications...',
      'Running Google Search grounding for real-time information...',
      'Formulating simple, clear reply...'
    ];

    let stepIndex = 0;
    setCurrentThinkingStep(thinkingSteps[0]);
    const thinkingInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < thinkingSteps.length) {
        setCurrentThinkingStep(thinkingSteps[stepIndex]);
      }
    }, 450);

    try {
      // Build conversation history for the server
      const historyPayload = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      clearInterval(thinkingInterval);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const agentMsgId = `agent-${Date.now()}`;
      const agentReply: ChatMessage = {
        id: agentMsgId,
        sender: 'agent',
        text: data.reply || "I'm here to help! Could you please clarify your question?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        grounded: !!data.grounded,
        model: data.model
      };

      setMessages(prev => [...prev, agentReply]);

      if (!isOpen) {
        setHasNewMessage(true);
      }

      // Save agent response to Firestore if authenticated
      if (user) {
        saveCustomerEnquiry({
          id: agentMsgId,
          message: agentReply.text,
          sender: 'agent',
          timestamp: agentReply.timestamp
        }).catch(err => console.warn('Enquiry agent save notice:', err));
      }
    } catch (error) {
      clearInterval(thinkingInterval);
      console.error('Chat error:', error);
      const fallbackMsg: ChatMessage = {
        id: `agent-err-${Date.now()}`,
        sender: 'agent',
        text: "I'm right here to assist you! All our prompt packs include lifetime access and commercial rights. You can also explore our **100 Trending ChatGPT '/' Prompts** or **Prompt PDF Books Vault** directly in the top menu.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
      setCurrentThinkingStep('');
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'agent',
        text: "Fresh chat started! What can I help you find or explain today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div id="customer-chatbot-trigger" className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(prev => !prev)}
          className="relative group flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white px-4 py-3 rounded-full shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 border border-indigo-400/30 transition-all cursor-pointer"
          aria-label="Open AI Customer Help & Enquiry Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-neutral-950 animate-pulse" />
          </div>
          <span className="text-sm font-semibold tracking-wide hidden sm:inline">
            {isOpen ? 'Close Concierge' : 'AI Help & Enquiries'}
          </span>

          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="customer-chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[620px] h-[85vh] bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100"
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm text-white">Lumina Concierge</h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">Autonomous Customer Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Restart Conversation"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature Banner: Search Grounding & Persistent Sync */}
            <div className="px-3.5 py-1.5 bg-indigo-950/40 border-b border-indigo-900/30 flex items-center justify-between text-[11px] text-indigo-300">
              <span className="flex items-center gap-1.5">
                <Search className="w-3 h-3 text-indigo-400" />
                <span>Google Search Grounding Connected</span>
              </span>
              {user ? (
                <span className="text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  Cloud Synced
                </span>
              ) : (
                <span className="text-[10px] text-neutral-400">Sign in to save history</span>
              )}
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin">
              {messages.map((msg) => {
                const isAgent = msg.sender === 'agent';

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${isAgent ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAgent && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-300 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className={`max-w-[85%] space-y-1.5`}>
                      <div
                        className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                          isAgent
                            ? 'bg-neutral-800/80 text-neutral-200 border border-neutral-700/50 rounded-tl-sm'
                            : 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Google Search Grounding Sources */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="pt-1 flex flex-wrap gap-1.5">
                          <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                            <Search className="w-3 h-3 text-cyan-400" />
                            Grounded via Google Search:
                          </span>
                          {msg.sources.slice(0, 3).map((source, idx) => (
                            <a
                              key={idx}
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] bg-neutral-800 text-cyan-300 hover:text-white px-2 py-0.5 rounded-full border border-neutral-700 transition-colors"
                            >
                              <span>{source.title.length > 25 ? source.title.slice(0, 25) + '...' : source.title}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ))}
                        </div>
                      )}

                      <span className={`block text-[10px] text-neutral-500 ${isAgent ? 'text-left' : 'text-right'}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {!isAgent && (
                      <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 text-neutral-300 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Thinking Indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 justify-start"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-300 mt-0.5">
                    <Brain className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="p-3 bg-neutral-800/80 border border-neutral-700/50 rounded-2xl rounded-tl-sm text-neutral-300 space-y-2 max-w-[85%]">
                    <div className="flex items-center gap-2 text-xs font-medium text-indigo-300">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                      <span>{currentThinkingStep || 'Agent is thinking & preparing answer...'}</span>
                    </div>
                    <div className="w-full bg-neutral-700/50 h-1 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 w-1/2"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Enquiry Suggestions */}
            {messages.length < 3 && !isThinking && (
              <div className="px-4 py-2 border-t border-neutral-800/60 bg-neutral-900/50">
                <p className="text-[11px] text-neutral-400 mb-1.5 font-medium">Suggested customer questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_ENQUIRIES.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(item.text)}
                        className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-neutral-700/60 transition-all flex items-center gap-1.5 text-left cursor-pointer"
                      >
                        <Icon className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>{item.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-neutral-800 bg-neutral-900/90 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about prompts, pricing, downloads..."
                disabled={isThinking}
                className="flex-1 bg-neutral-800/80 border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isThinking}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
