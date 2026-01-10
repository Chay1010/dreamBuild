import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MessageCircle, X, Send, Loader2, ShieldAlert, Sparkles, Bot, User } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatBotProps {
  lang?: Language;
}

export const ChatBot: React.FC<ChatBotProps> = ({ lang = 'en' }) => {
  const t = translations[lang].chat;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  // Initialize message with correct language
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t.initial }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message if language changes and chat hasn't started essentially
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      setMessages([{ role: 'model', text: t.initial }]);
    }
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = async () => {
    if (chatSession.current) return;

    try {
      if (typeof window !== 'undefined' && window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
        return;
      }

      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        console.error("API Key is missing in process.env.API_KEY. Make sure GEMINI_API_KEY is set in .env.local and restart the server.");
        throw new Error("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey });
      chatSession.current = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          systemInstruction: `
            You are "DreamBuild Copilot", an expert AI automotive design assistant and legal advisor.
            
            YOUR MISSION:
            1. **Design Companion**: Help users choose colors, rims, body kits, and styles (JDM, Muscle, Euro, Drift) for their cars.
            2. **Legal Guard (CRITICAL)**: You MUST advise on the legality of modifications.
               - If a user asks for illegal mods (e.g., "full windshield tint 5%", "remove airbags", "red headlights", "muffler delete"), you MUST warn them that this is likely illegal in most jurisdictions and unsafe.
               - Suggest legal alternatives (e.g., "legal tint limit", "certified aftermarket exhaust").
            3. **Bilingual Support**: You speak fluent **English** and **French**. Detect the user's language and respond in the same language as the user.
            
            TONE:
            - Professional, enthusiastic, and safety-conscious.
            - Keep responses concise and helpful for a chat interface.
            - Keep responses concise and helpful for a chat interface.
          `,
        },
      });
    } catch (e) {
      console.error("Chat init error", e);
      throw e;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (typeof window !== 'undefined' && window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
      await window.aistudio.openSelectKey();
      return;
    }

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatSession.current) {
        await initChat();
      }

      if (chatSession.current) {
        const result = await chatSession.current.sendMessageStream({ message: userMsg });

        let fullResponse = "";
        setMessages(prev => [...prev, { role: 'model', text: "" }]);

        for await (const chunk of result) {
          const c = chunk as GenerateContentResponse;
          if (c.text) {
            fullResponse += c.text;
            setMessages(prev => {
              const newArr = [...prev];
              newArr[newArr.length - 1].text = fullResponse;
              return newArr;
            });
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errMsg = lang === 'fr'
        ? "Erreur de connexion. Veuillez vérifier votre clé API ou votre connexion internet. (Détails: " + (error instanceof Error ? error.message : String(error)) + ")"
        : "Connection error. Please check your API Key or internet connection. (Details: " + (error instanceof Error ? error.message : String(error)) + ")";
      setMessages(prev => [...prev, { role: 'model', text: errMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-gray-900 text-white rotate-90' : 'bg-[#00C853] text-black'
          }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6 fill-current" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] md:w-[400px] bg-[#111] border border-[#333] rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
          }`}
        style={{ height: '600px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-[#00C853] p-4 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-black text-lg leading-none">{t.title}</h3>
            <span className="text-black/70 text-xs font-medium">{t.subtitle}</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0e0e0e]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#333]' : 'bg-[#00C853]/10'
                  }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-gray-300" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#00C853]" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                  ? 'bg-[#333] text-white rounded-tr-none'
                  : 'bg-[#1a1a1a] text-gray-200 border border-[#333] rounded-tl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00C853]/10 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-[#00C853] animate-spin" />
              </div>
              <div className="bg-[#1a1a1a] text-gray-500 text-xs p-3 rounded-2xl rounded-tl-none italic border border-[#333]">
                {t.analyzing}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#111] border-t border-[#333]">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t.placeholder}
              className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] transition-all placeholder:text-gray-600"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#00C853] text-black rounded-lg hover:bg-[#00E676] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex justify-center items-center gap-1 text-[10px] text-gray-600">
            <ShieldAlert className="w-3 h-3" />
            <span>{t.guard}</span>
          </div>
        </div>
      </div>
    </>
  );
};