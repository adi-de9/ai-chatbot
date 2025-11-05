## Real-Time AI Chatbot with Streaming

A Next.js + TypeScript chatbot that streams AI responses over WebSockets with Socket.IO and Google Generative AI (Gemini).

### Tech Stack

- React 18 / Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Socket.IO (WebSocket transport)
- Google Generative AI (`@google/genai`) with streaming

### Features (Core)

- Chat UI with user/AI bubbles and timestamps
- Auto-scroll to the latest message
- Enter-to-send, button to send
- Input disabled during AI response; character limit indicator
- Connection status indicator (online/offline)
- Real-time streaming display (token-by-token)
- Basic reconnection logic, error handling

### Bonus (Optional, partially included)

- Clear chat via close button in header
- Typing indicator animation while waiting for first chunk

## Setup Instructions

1. Requirements: Node 18+ (or Bun/PNPM/Yarn)

2. Environment variables: create `.env.local` in the repo root with:

```
GEMINI_API_KEY=your_google_generative_ai_api_key
```

Note: If your environment blocks dotfiles creation, create `env.local` then rename to `.env.local`.

3. Install dependencies:

```bash
npm install
# or: pnpm i / yarn / bun install
```

4. Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## How It Works

- Client initializes Socket.IO by calling the API route at `/api/socket`, which boots a singleton Socket.IO server.
- User messages are sent via `user_message` events.
- Server calls Gemini with a system prompt + running conversation and streams back characters via `ai_response` events of type `stream`, then `end`.
- UI renders the streaming text live and commits a final AI message on `end`.

## Commands

- `npm run dev` – start development
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – run eslint

## Files to Review

- `src/pages/api/socket.ts` – Socket.IO server + Gemini streaming
- `src/app/hooks/useWebSocket.ts` – client socket hook & lifecycle
- `src/app/components/chatbot/*` – chat UI components

## Submission Checklist

- Public GitHub repository with source code
- `.env.example` or README documenting required env vars (see above)
- Demo video link: add here

## Time Spent

Add your time log here.
