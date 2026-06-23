import { createContext } from "react";
export const dataContext = createContext();
function UserContext({ children }) {
  const speech = (text) => {
    window.speechSynthesis.cancel();
    const speech_text = new SpeechSynthesisUtterance(text);
    speech_text.volume = 1;
    speech_text.rate = 1;
    speech_text.pitch = 1;
    speech_text.lang = "hi-IN";
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(speech_text);
  };

  const speechRecognise =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognise = new speechRecognise();
  recognise.onresult = (e) => {
    let transcript = e.results[0][0].transcript;
    console.log(transcript);
  };
  const value = {
    recognise,
  };
  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
}

export default UserContext;
