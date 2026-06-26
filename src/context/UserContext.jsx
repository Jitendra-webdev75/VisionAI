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
    inputCommand(transcript.toLowerCase());
  };
  const value = {
    recognise,
    speak,
    setSpeak,
    prompt,
    response,
    setResponse,
    speech,
  };

  const inputCommand = (command) => {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speech("opening youtube");
      setPrompt("opening youtube");
      setTimeout(() => {
        setSpeak(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speech("opening google");
      setPrompt("opening google");
      setTimeout(() => {
        setSpeak(false);
      }, 5000);
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speech(time);
      setPrompt(time);
      setTimeout(() => {
        setSpeak(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  };
  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
}

export default UserContext;
