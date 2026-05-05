import { useState, useEffect } from 'react';
import { Search, Send, User, MessageCircle, Cpu, Terminal, Activity } from 'lucide-react';
import api from '../services/api';
import useAuthStore from '../store/useAuthStore';
import useChatStore from '../store/useChatStore';

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();
  const { socket, messages, setMessages, sendMessage } = useChatStore();

  useEffect(() => {
    fetchConversations();
    
    socket.on('chat_updated', () => {
      fetchConversations();
    });

    socket.on('receive_message', (msg) => {
      if (activeChat && msg.sender.role === 'customer') {
        setMessages([...messages, msg]);
      }
      fetchConversations();
    });

    return () => {
      socket.off('chat_updated');
      socket.off('receive_message');
    };
  }, [activeChat, messages]);

  const fetchConversations = async () => {
    try {
      const { data } = await api.get('/chat/admin/conversations');
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations', error);
    }
  };

  const handleSelectChat = async (chat) => {
    setActiveChat(chat);
    try {
      const { data } = await api.get(`/chat/admin/${chat.customerId._id}`);
      setMessages(data.messages || []);
      socket.emit('admin_join_chat', chat.customerId._id);
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    sendMessage(activeChat.customerId._id, user._id, message);
    setMessage('');
  };

  return (
    <div className="flex bg-white/5 rounded-[40px] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden h-[78vh] glass-card">
      {/* Sidebar */}
      <div className="w-96 border-r border-white/5 flex flex-col bg-white/5">
        <div className="p-8 border-b border-white/5 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black italic text-white uppercase tracking-widest">Support Chats</h3>
              <div className="bg-primary/10 p-2 rounded-xl text-primary animate-pulse">
                 <Activity className="w-5 h-5" />
              </div>
           </div>
           <div className="relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="neon-input w-full pl-12 text-xs group-focus-within:border-primary" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-primary transition-colors" />
           </div>
        </div>
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {conversations.length === 0 ? (
            <div className="p-20 text-center space-y-4 opacity-20">
               <Terminal className="w-12 h-12 text-primary mx-auto" />
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">No active chats</p>
            </div>
          ) : (
            conversations.map((chat) => (
              <button
                key={chat._id}
                onClick={() => handleSelectChat(chat)}
                className={`w-full p-8 text-left hover:bg-white/10 transition-all flex items-center space-x-6 border-b border-white/5 relative group ${
                  activeChat?.customerId._id === chat.customerId._id ? 'bg-primary/10' : ''
                }`}
              >
                {activeChat?.customerId._id === chat.customerId._id && <div className="absolute left-0 top-0 w-1.5 h-full bg-primary shadow-[0_0_15px_#00F2FF]"></div>}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:border-primary/40 transition-colors">
                   <User className="w-7 h-7 text-white" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-black italic text-white uppercase tracking-widest truncate">{chat.customerId?.name}</h4>
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">12:45 PM</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[200px]">
                    {chat.messages[chat.messages.length - 1]?.text || 'No messages yet'}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-grow flex flex-col bg-transparent relative">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
        
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-8 bg-white/5 border-b border-white/5 flex items-center justify-between relative z-10">
               <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative">
                    <Cpu className="w-6 h-6" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-cyber-black animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="font-black italic text-white uppercase tracking-widest text-lg">{activeChat.customerId?.name}</h4>
                    <div className="flex items-center space-x-2">
                       <Terminal className="w-3 h-3 text-primary" />
                       <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Online</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-10 space-y-8 relative z-10 custom-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender.role === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col ${msg.sender.role === 'admin' ? 'items-end' : 'items-start'} space-y-2 max-w-[75%]`}>
                    <div
                      className={`p-6 rounded-[24px] text-sm leading-relaxed shadow-lg ${
                        msg.sender.role === 'admin'
                          ? 'bg-primary/10 text-primary border border-primary/30 rounded-br-none shadow-[0_0_20px_rgba(0,242,255,0.1)]'
                          : 'bg-white/5 text-slate-100 rounded-bl-none border border-white/10'
                      }`}
                    >
                      <p className="font-medium tracking-wide">{msg.text}</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-4">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-8 bg-white/5 border-t border-white/5 relative z-10">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="neon-input flex-grow text-sm group-focus-within:border-primary"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-primary hover:bg-primary-hover text-black p-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] disabled:opacity-50 disabled:shadow-none"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center space-y-8 opacity-20 relative z-10">
             <div className="bg-white/5 p-12 rounded-full border border-white/10 shadow-[0_0_50px_rgba(0,242,255,0.05)]">
                <MessageCircle className="w-24 h-24 text-primary" />
             </div>
             <div className="text-center space-y-4">
                <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">SELECT CHAT</h3>
                <p className="text-xs font-black text-primary uppercase tracking-[0.4em] animate-pulse">Waiting for selection...</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
