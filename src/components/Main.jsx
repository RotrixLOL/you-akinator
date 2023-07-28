import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import Chat from "./Chat";

const Main = () => {
  // TODO: remove my api key
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (localStorage.getItem("cohere_key")) {
      setApiKey(localStorage.getItem("cohere_key"));
    }
  }, []);

  const handleKeyChange = (e) => {
    setApiKey(e.target.value);
    localStorage.setItem("cohere_key", e.target.value);
  };

  return (
    <section>
      <div className="mb-16">
        <label
          htmlFor="api-key-input"
          className="mb-2 text-lg font-medium text-gray-900 flex justify-center"
        >
          Cohere AI API Key (
          <a
            className="text-blue-500"
            rel="noopener noreferrer"
            href="https://dashboard.cohere.ai/api-keys"
            target="_blank"
          >
            Don't have one?
          </a>
          )
        </label>
        <input
          type="text"
          id="api-key-input"
          className="bg-black-card md:max-w-3xl px-6 py-4 text-white"
          placeholder="yourApiKeyGoesHere"
          value={apiKey}
          onChange={(e) => handleKeyChange(e)}
        />
      </div>
      {apiKey && <Chat apiKey={apiKey} />}
      <Toaster />
    </section>
  );
};

export default Main;
