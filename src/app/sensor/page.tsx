"use client";

import { useEffect, useRef, useState } from "react";

const clientIds = ["A1", "A2", "A3", "user1", "user2", "User3"];

type Message = {
  text: string;
  who: "me" | "server";
};

export default function MultiChatPage() {
  return (
    <div className="flex flex-wrap gap-5 p-5 font-sans">
      {clientIds.map((clientId) => (
        <ChatWindow key={clientId} clientId={clientId} />
      ))}
    </div>
  );
}

function ChatWindow({ clientId }: { clientId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://valet-production.up.railway.app?clientId=${clientId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      addMessage("✅ Connected", "server");
    };

    ws.onmessage = (event) => {
      addMessage(event.data, "server");
    };

    return () => {
      ws.close();
    };
  }, [clientId]);

  const addMessage = (text: string, who: "me" | "server") => {
    setMessages((prev) => [...prev, { text, who }]);
    setTimeout(() => {
      chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    }, 0);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    if (inputValue.startsWith("/b ")) {
      wsRef.current?.send(JSON.stringify({
        type: "broadcast",
        message: inputValue.slice(3),
      }));
    } else {
      wsRef.current?.send(inputValue);
    }

    addMessage(inputValue, "me");
    setInputValue("");
  };

  return (
    <div className="chat-wrapper border border-gray-300 bg-gray-50 p-3 w-[300px] flex-1">
      <h3 className="font-bold mb-2">🟢 Client {clientId}</h3>
      <div
        ref={chatBoxRef}
        className="chat-box border border-gray-300 bg-white h-[200px] overflow-y-auto p-2 mb-2 text-sm"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.who === "me" ? "text-right text-blue-600" : "text-left text-green-600"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          placeholder={`Send as ${clientId}`}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-2 py-1 border border-gray-300 text-sm"
        />
        <button
          onClick={handleSend}
          className="w-[60px] bg-blue-500 text-white px-2 py-1 text-sm hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
