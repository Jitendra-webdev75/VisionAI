const apiKey = import.meta.env.VITE_GROQ_API_KEY;

async function main(prompt) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 100,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are a concise AI assistant. Give short, direct, and to-the-point answers in 2-3 sentences max. Do not elaborate unless asked.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.choices[0].message.content;
}

export default main;
