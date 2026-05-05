import { create } from 'zustand';
import io from 'socket.io-client';

const socket = io('http://localhost:5002');

const useChatStore = create((set, get) => ({
  messages: [],
  socket: socket,
  connected: false,

  initSocket: (userId, isAdmin = false) => {
    socket.on('connect', () => {
      set({ connected: true });
      if (isAdmin) {
        // Admin logic here if needed
      } else {
        socket.emit('join_chat', userId);
      }
    });

    socket.on('receive_message', (message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    socket.on('disconnect', () => {
      set({ connected: false });
    });
  },

  setMessages: (messages) => set({ messages }),

  sendMessage: (customerId, sender, text) => {
    socket.emit('send_message', { customerId, sender, text });
  },
}));

export default useChatStore;
