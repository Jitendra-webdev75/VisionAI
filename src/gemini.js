import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });
console.log("Sending key:", apiKey?.substring(0, 10) + "...");
const tools = [{ googleSearch: {} }];

const generationConfig = {
  temperature: 0.7, // Temperature thoda kam karne se AI idhar-udhar ki baatein nahi karta
  maxOutputTokens: 300, // Safety ke liye ise thoda bada rakhein taaki sentence na kate
  topP: 0.95,
  systemInstruction:
    "You are a concise AI assistant. Give short, direct, and to-the-point answers in 2-3 sentences max. Do not elaborate unless asked.",
};

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    tools: tools,
    config: generationConfig,
  });

  return response.text;
}

export default main;
