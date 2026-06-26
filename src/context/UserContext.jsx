import { createContext, useState } from "react";
import main from "../groq";
export const dataContext = createContext();
function UserContext({ children }) {
  const [speak, setSpeak] = useState(false);
  const [prompt, setPrompt] = useState("Listening...");
  const [response, setResponse] = useState(false);
  const speech = (text) => {
    const speech_text = new SpeechSynthesisUtterance(text);
    speech_text.volume = 1;
    speech_text.rate = 1;
    speech_text.pitch = 1;
    speech_text.lang = "hi-IN";

    window.speechSynthesis.speak(speech_text);
  };

  const aiResponse = async (prompt) => {
    let text = await main(prompt);
    setPrompt(text);
    speech(text);
    setResponse(true);
    setTimeout(() => {
      setSpeak(false);
    }, 5000);
  };
  const speechRecognise =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognise = new speechRecognise();
  recognise.onresult = (e) => {
    let transcript = e.results[0][0].transcript;
    setPrompt(transcript);
    aiResponse(transcript);
  };
  const value = {
    recognise,
    speak,
    setSpeak,
    prompt,
    response,
    setResponse,
  };

  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
}

export default UserContext;
