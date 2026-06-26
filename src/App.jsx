import { RiMicAiFill } from "@remixicon/react";
import { useContext, useState } from "react";
import { dataContext } from "./context/UserContext";
function App() {
  const { recognise, speak, setSpeak, prompt, response } =
    useContext(dataContext);
  const [darkmode, setdarkmode] = useState(false);

  const toogleSwitch = () => {
    setdarkmode(!darkmode);
  };

  return (
    <>
      <main
        className={`${darkmode ? "dark" : ""} min-h-screen w-full
       bg-primary dark:bg-secondary  flex flex-col items-center`}
      >
        <nav className="flex h-[10vh] w-full gap-52 items-center">
          <img className="logo h-20" src="./logo.png" alt="" />
          <button
            onClick={toogleSwitch}
            className="BackgSwitch dark:text-primary  "
          >
            Dark
          </button>
        </nav>
        <div className="content flex flex-col items-center gap-6">
          <img src="./visionImg.png" className="w-[84vw] h-[52vh]" />
          <h1 className="greet text-zinc-900 dark:text-amber-50 text-[1.2rem] font-semibold">
            Hey, I am Vision your ai assistance
          </h1>
          {!speak ? (
            <button
              onClick={() => {
                setSpeak(true);
                recognise.start();
              }}
              className="askBtn  h-[7vh] w-[40vw] bg-purple-600 flex justify-center items-center bg-linear-240 from-blue-600 to-purple-500 text-amber-50 text-2xl rounded-4xl active:scale-90"
            >
              <RiMicAiFill />
              Ask
            </button>
          ) : (
            <div className="w-full flex flex-col items-center">
              {!response ? (
                <img src="./listening.gif" className="w-[40vw]" />
              ) : (
                <img
                  src="./aiVoice.gif"
                  className="w-[68vw] h-[12vh] rounded-b-full"
                />
              )}
              <p className="text-[1.2rem] p-7 font-medium text-secondary dark:text-primary">
                {prompt}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
