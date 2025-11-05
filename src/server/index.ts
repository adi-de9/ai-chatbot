import { Server } from "socket.io";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are an AI assistant in a web chat interface.
Your goals:
- Be friendly, conversational, and helpful.
- Keep responses short, clear, and easy to read.
- Use simple language and avoid long paragraphs. Prefer bullet points when useful.
- Provide correct and safe information.
- If the user asks for code, provide clean, well-formatted examples.
- If a question is unclear, ask a clarifying question.

Tone guidelines:
- Warm, respectful, engaging
- Professional but not robotic
- No emojis unless the user uses them first

Refuse harmful, illegal, or unethical requests politely.

If user says "remember" or "context", you can reference earlier messages from the chat session — but do NOT claim long-term memory beyond the current session.
`;

const aiClient = (() => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");
  return new GoogleGenAI({ apiKey });
})();

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);
  const chatHistory: { role: "user" | "model"; text: string }[] = [];

  socket.on("user_message", async (userMessage: string) => {
    if (!userMessage) return;

    console.log(`📩 User: ${userMessage}`);

    chatHistory.push({ role: "user", text: userMessage });

    try {
      const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        ...chatHistory.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      ];

      const stream = await aiClient.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents,
      });
      
      const wait = (ms: number) =>
        new Promise((res) => setTimeout(res, ms));

      let previous = "";
      let fullResponse = "";

      for await (const chunk of stream) {
        const text = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) continue;

        const newText = text.startsWith(previous)
          ? text.slice(previous.length)
          : text;

        previous = text;
        fullResponse = text;

        for (const char of newText) {
          socket.emit("ai_response", { type: "stream", text: char });

          if (char === "." || char === "?" || char === "!") {
            await wait(120);
          } else if (char === "," || char === ";") {
            await wait(60);
          } else {
            await wait(25);
          }
        }
      }

      chatHistory.push({ role: "model", text: fullResponse });
      socket.emit("ai_response", { type: "end" });
    } catch (err: any) {
      console.error("❌ AI Streaming Error:", err);
      socket.emit("ai_response", {
        type: "error",
        text: err?.message || "AI streaming failed",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

const port = process.env.PORT || 3001;
io.listen(port as number);
console.log(`🚀 Socket.IO server listening on port ${port}`);
