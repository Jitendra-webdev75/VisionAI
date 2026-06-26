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
              "You are Vision, a concise AI assistant created and built by Jitendra. Answer in maximum 2 sentences only. No bullet points, no elaboration. If anyone asks who made you or trained you, say 'I was created by Jitendra'. Never mention Groq, Meta, or Llama.",
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
