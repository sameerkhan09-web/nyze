import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Cpu, Terminal } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useChatStore from '../store/useChatStore';
import api from '../services/api';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();
  const { socket, messages, setMessages, sendMessage, initSocket } = useChatStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      initSocket(user._id);
      fetchChatHistory();
    }
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const fetchChatHistory = async () => {
    try {
      const { data } = await api.get('/chat');
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching chat', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage(user._id, user._id, message);
    setMessage('');
  };

  if (!user || user.role === 'admin') return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-cyber-black/80 backdrop-blur-3xl w-96 h-[600px] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="bg-white/5 p-6 flex items-center justify-between border-b border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative">
                 <Cpu className="w-7 h-7" />
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-cyber-black animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-black text-white text-sm uppercase italic tracking-widest">Support</h4>
                <div className="flex items-center space-x-2">
                   <Terminal className="w-3 h-3 text-primary" />
                   <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-transparent">
            {messages.length === 0 ? (
              <div className="text-center py-20 space-y-6 opacity-20">
                 <Terminal className="w-16 h-16 mx-auto text-primary" />
                 <p className="text-xs font-black uppercase tracking-[0.4em] text-primary">How can we help?</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender.role === 'admin' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex flex-col ${msg.sender.role === 'admin' ? 'items-start' : 'items-end'} space-y-2 max-w-[85%]`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                        msg.sender.role === 'admin'
                          ? 'bg-white/5 text-slate-100 rounded-bl-none border border-white/10'
                          : 'bg-primary/10 text-primary border border-primary/30 rounded-br-none shadow-[0_0_15px_rgba(0,242,255,0.1)]'
                      }`}
                    >
                      <p className="font-medium">{msg.text}</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-2">
                       {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-6 bg-white/5 border-t border-white/5">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary/40 focus:bg-white/10 outline-none transition-all text-sm text-white placeholder:text-slate-600"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-primary hover:bg-primary-hover text-black p-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] disabled:opacity-50 disabled:shadow-none"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
          
          {/* Bottom Scanner Effect */}
          <div className="h-0.5 w-full bg-primary/20 relative overflow-hidden">
             <div className="absolute inset-y-0 w-24 bg-primary shadow-[0_0_10px_#00F2FF] animate-[move_2s_linear_infinite]"></div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-black p-5 rounded-full shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all transform hover:scale-110 active:scale-95 group relative border border-white/20"
        >
          <Terminal className="w-8 h-8" />
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
