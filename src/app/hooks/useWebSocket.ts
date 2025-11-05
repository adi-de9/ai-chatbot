import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";

export const useWebSocket = (onMessage: (data: any) => void) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const onMessageRef = useRef(onMessage);

  // Keep latest onMessage without re-subscribing socket listeners
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    // Initialize the Socket.IO server via API route, then connect client
    (async () => {
      try {
        const res = await fetch("/api/socket");
        if (!res.ok) {
          console.error("Failed to init socket server:", res.status);
        }
      } catch (err) {
        console.error("Error bootstrapping socket server:", err);
      } finally {
        socket.connect();
      }
    })();

    function onConnect() {
      setIsConnected(true);
      console.log("✅ Socket connected:", socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("❌ Socket disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", (err) => {
      console.error("WS connect_error:", err);
    });
    socket.on("ai_response", (data) => {
      onMessageRef.current(data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ai_response");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!socket.connected) return;
    socket.emit("user_message", text);
  };

  return { sendMessage, isConnected };
};
