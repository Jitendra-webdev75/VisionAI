import { RiMicAiFill } from "@remixicon/react";
import { useContext } from "react";
import { dataContext } from "./context/UserContext";
function App() {
  const { recognise } = useContext(dataContext);

  return (
    <>
      <main className="min-h-screen w-full bg-blue-50 flex items-center justify-center">
        <div className="content flex flex-col items-center gap-6">
          <img src="./visionImg.png" />
          <h1 className="greet text-zinc-900 text-[1.2rem] font-semibold">
            Hey, I am Vision your ai assistance
          </h1>
          <button
            onClick={() => recognise.start()}
            className="askBtn  h-[7vh] w-[40vw] bg-purple-600 flex justify-center items-center bg-linear-240 from-blue-600 to-purple-500 text-amber-50 text-2xl rounded-4xl active:scale-90"
          >
            <RiMicAiFill />
            Ask
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
