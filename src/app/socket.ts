import { io } from "socket.io-client";

export const socket = io("http://localhost:3001", {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 500,
  reconnectionDelayMax: 5000,
});
