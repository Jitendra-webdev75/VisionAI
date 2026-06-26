import { RiMicAiFill, RiMoonClearFill, RiSunFill } from "@remixicon/react";
import { useContext, useState } from "react";
import { dataContext } from "./context/UserContext";
function App() {
  const { recognise, speak, setSpeak, prompt, response, speech } =
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
        <nav
          className="flex h-[10vh] w-full justify-between pr-6 items-center
          sm:flex sm:justify-between sm:pr-6"
        >
          <img
            onClick={() => speech("It's just a logo")}
            className="logo h-20"
            src="./logo.png"
            alt=""
          />
          <button
            onClick={toogleSwitch}
            className="BackgSwitch dark:text-primary cursor-pointer  "
          >
            {!darkmode ? <RiMoonClearFill /> : <RiSunFill />}
          </button>
        </nav>
        <div className="content flex flex-col items-center gap-6">
          <img
            src="./friday.png"
            className="w-[70vw] h-[50vh]
            sm:h-[50vh] sm:w-[49vw]
            md:h-[58vh] md:w-[47vw]
            lg:h-[52vh] lg:w-[33vw]"
          />
          <h1 className="greet text-zinc-900 dark:text-amber-50 text-[1.2rem] font-semibold">
            Hey, I am Friday your ai assistance
          </h1>
          {!speak ? (
            <button
              onClick={() => {
                setSpeak(true);
                recognise.start();
              }}
              className="askBtn  h-[7vh] w-[40vw] bg-purple-600 flex justify-center items-center bg-linear-240 from-blue-600 to-purple-500 text-amber-50 text-2xl rounded-4xl 
              active:scale-90
              sm:w-[30vw] md:w-[22vw] lg:w-[20vw]"
            >
              <RiMicAiFill />
              Ask
            </button>
          ) : (
            <div className="w-full flex flex-col items-center ">
              {!response ? (
                <img
                  src="./listening.gif"
                  className="w-[40vw]
                  sm:w-[38vw] md:w-[37vw] lg:w-[10vw]"
                />
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
