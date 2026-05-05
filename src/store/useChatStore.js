import { create } from "zustand";
import { io } from "socket.io-client";

// ENV se backend URL lo
const SOCKET_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const socket = io(SOCKET_URL);

const useChatStore = create((set) => ({
  messages: [],
  socket: socket,
  connected: false,

  initSocket: (userId, isAdmin = false) => {
    socket.on("connect", () => {
      set({ connected: true });

      if (!isAdmin) {
        socket.emit("join_chat", userId);
      }
    });

    socket.on("receive_message", (message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    socket.on("disconnect", () => {
      set({ connected: false });
    });
  },

  setMessages: (messages) => set({ messages }),

  sendMessage: (customerId, sender, text) => {
    socket.emit("send_message", { customerId, sender, text });
  },
}));

export default useChatStore;