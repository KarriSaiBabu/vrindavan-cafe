import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Wand2 } from 'lucide-react';
import genAI from '../gemini';
import { MENU_ITEMS } from '../constants';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Namaskaram! 🙏 I am Bhojanam, your digital guide to the legendary flavors of Vrindavan Cafe. How may I illuminate your palate today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const prompt = `You are Bhojanam, the friendly and knowledgeable AI assistant for "Vrindavan Cafe", a premium Andhra Pradesh-style restaurant. 
      Your personality: Warm, welcoming, uses "Namaskaram", passionate about spicy Andhra food.
      Menu context: ${JSON.stringify(MENU_ITEMS)}
      Guidelines:
      1. Recommend items from the menu based on user preference (spicy, veg, lunch, etc.).
      2. Explain Andhra food terms (like Pesarattu, Gongura, Guntur spices) if asked.
      3. Keep responses concise but flavorful.
      4. If you don't know something about the current status of an order, ask the user to check their profile or contact support at +91 9374567746.
      
      User says: "${userMessage}"`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'bot', text: text || "I'm having trouble connecting to the kitchen. Please try again later!" }]);
    } catch (error) {
       console.error("AI Error:", error);
       setMessages(prev => [...prev, { role: 'bot', text: "Namaskaram! I'm taking a quick break to refine my spice blends. Please feel free to explore our menu!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-gold text-black rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center group border border-white/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute left-full ml-4 bg-gold text-black px-4 py-2 rounded-xl text-[10px] font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-white/20 uppercase tracking-widest translate-x-2 group-hover:translate-x-0">
          Summon Bhojanam
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: -50 }}
            className="fixed bottom-28 left-8 z-50 w-[400px] h-[550px] glass-dark rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/10"
          >
            {/* Header */}
            <div className="bg-gold p-8 text-black flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center border border-black/5">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                    Bhojanam <Sparkles size={16} className="animate-pulse" />
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Signature Essence</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-black/5 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-white/[0.01] custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gold text-black rounded-tr-none font-bold' 
                      : 'glass-dark text-white shadow-xl border border-white/5 rounded-tl-none italic'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass-dark p-5 rounded-[1.5rem] shadow-xl border border-white/5 rounded-tl-none flex gap-2">
                    {[0, 1, 2].map((d) => (
                      <motion.div 
                        key={d}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
                        transition={{ repeat: Infinity, duration: 1.5, delay: d * 0.2 }} 
                        className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_5px_rgba(212,175,55,0.5)]" 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Ask about our signature masalas..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full pl-6 pr-14 py-5 bg-white/5 rounded-xl focus:outline-none focus:border-gold/30 border border-white/5 transition-all text-sm text-white placeholder:text-white/20"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gold text-black rounded-lg shadow-xl shadow-gold/10 hover:scale-105 transition-all disabled:opacity-30 flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-center text-[9px] uppercase tracking-widest text-white/20 mt-4 font-bold">Encrypted Spice Intel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
