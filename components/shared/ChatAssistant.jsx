"use client";

import { useMemo, useState } from "react";
import SmartToyOutlined from "@mui/icons-material/SmartToyOutlined";
import SendRounded from "@mui/icons-material/SendRounded";

const starterMessages = [
  {
    role: "assistant",
    content:
      "I am your Toxic Man AI stylist. Ask for fragrance recommendations, gift ideas, or matching accessories.",
  },
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!input.trim() || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: input }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed.");
      }

      const data = await response.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.reply ??
            "I can help you build a scent profile, choose a gift, or match products into a bundle.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "The assistant could not connect right now, but the local fallback setup is ready for OpenRouter or OpenAI keys.",
        },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <section className="py-12">
      <div className="section-shell grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-bronze/80">
            AI Agent Chatbot
          </p>
          <h2 className="font-display text-4xl md:text-5xl">
            A shopping assistant that can sell like a live stylist.
          </h2>
          <p className="text-lg leading-8 text-white/70">
            This chatbot is wired for free-friendly development. It works with
            local fallback responses now and can switch to OpenRouter later by
            adding a single environment key.
          </p>
        </div>

        <div className="glass-panel rounded-[2rem] p-5 shadow-haze">
          <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-bronze/20 text-bronze">
              <SmartToyOutlined />
            </div>
            <div>
              <h3 className="font-display text-2xl">Toxic Man Concierge</h3>
              <p className="text-sm text-white/60">Sales, style, and bundle assistant</p>
            </div>
          </div>

          <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "assistant"
                    ? "max-w-[88%] rounded-3xl rounded-bl-md bg-white/8 px-4 py-3 text-sm leading-7 text-white/85"
                    : "ml-auto max-w-[88%] rounded-3xl rounded-br-md bg-bronze/20 px-4 py-3 text-sm leading-7 text-white"
                }
              >
                {message.content}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="mt-5 flex gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask for a date-night scent or a gift bundle..."
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink transition hover:scale-[1.02] disabled:opacity-60"
            >
              <SendRounded />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
