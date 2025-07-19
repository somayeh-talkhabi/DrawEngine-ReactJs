import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error, is your backend running?"));
  }, []);

  return (
    <>
      <div className="bg-white h-16 shadow-lg border-b-1">
        <img className="h-14 w-auto mt-2 ml-3" src={"/nav-logo.png"}></img>
      </div>
      <div style={{ backgroundColor: "#cc232a" }} className="h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl text-white text-balance mt-[18%]">
            {message}
          </h1>
          <img src={"/giphy.webp"}></img>
        </div>
      </div>
    </>
  );
}

export default App;
