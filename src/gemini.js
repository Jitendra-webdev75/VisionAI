const apiKey = "AQ.Ab8RN6LB1jRT1qIy5uoD_E9CMbloDaHaC53UCAl3HoXt27NF-Q";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

const tools = [
  {
    type: "google_search",
  },
];

const generationConfig = {
  temperature: 1,
  max_output_tokens: 65536,
  topP: 0.95,
};

async function main(prompt) {
  const interaction = await ai.interactions.create({
    model: "models/gemini-2.5-flash",
    input: prompt,
    tools: tools,
    generation_config: generationConfig,
  });

  console.log(interaction.text);
}

export default main();
