const presetReplies = [
  {
    keywords: ["perfume", "fragrance", "scent"],
    reply:
      "For a bold signature scent, start with Noir Oud Elixir. If you want something more intimate and skin-close, Velvet Amber Oil is the smoother daily pick.",
  },
  {
    keywords: ["gift", "present","gift ideas","cadaux"],
    reply:
      "A strong gift bundle would be Velvet Amber Oil plus the Ember Signet Ring. It keeps the entry price approachable while still feeling premium.",
  },
  {
    keywords: ["watch"],
    reply:
      "The Obsidian Chrono Watch is our statement accessory. It works especially well as an upsell beside darker fragrances and the Studio Tee.",
  },
  {
    keywords: ["3assba","ya3tek 3assba","عصبة","يعطك عصبة","3asba"],
    reply:
      "3assba fi ssormek",
  },
  {
    keywords: ["toxic man","TOXIC MAN"],
    reply:
      "TOXIC MAN IS TOXIC",
  },
  {
    keywords: ["bara nayek","برا نيك"],
    reply:
      "3ayetli martek nayek m3aha",
  },
];

export async function generateChatReply(message) {
  const normalized = message.toLowerCase();

  const match = presetReplies.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (process.env.OPENROUTER_API_KEY) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
          "X-Title": "Toxic Man AI Stylist",
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are Toxic Man's luxury shopping assistant. Recommend products, cross-sells, and care tips in short persuasive language.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return (
          data?.choices?.[0]?.message?.content ??
          match?.reply ??
          "I can help you choose fragrances, oils, watches, and accessories. Tell me the vibe or budget you want."
        );
      }
    } catch {}
  }

  return (
    match?.reply ??
    "I can help you choose fragrances, oils, watches, and accessories. Tell me the vibe, budget, or whether this is for day wear, night wear, or gifting."
  );
}
