import React, { useState, useEffect } from "react";
import axios from "axios";
import ListUrl from "./ListUrl";
const UrlShortner = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");
    try {
      const response = await axios.post("http://localhost:5000/shorten", {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
      setUrls([...urls, response.data]);
      setOriginalUrl("");
    } catch (error) {
      console.error("There was an error creating the short URL!", error);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <div>
      <div className="min-h-1/2 flex justify-center">
        <div className="bg-gray-700 mt-6 bg-opacity-50 h-auto backdrop-blur-md p-8 rounded-lg border border-gray-300 shadow-lg w-1/3">
          <h1 className="text-3xl text-green-400 mb-4">URL Shortener</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter URL"
              required
              className="w-full p-2 mb-4 text-black rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-500 text-black py-2 rounded"
            >
              Shorten
            </button>
          </form>
          {shortUrl && (
            <div className="mt-4 p-4 bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-200 shadow-lg flex items-center justify-between">
              <div>
                <p className="text-green-400">Shortened URL:</p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={() => handleCopy(shortUrl)}
                className="ml-4 bg-green-400 hover:bg-green-500 text-black py-1 px-2 rounded"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
      <ListUrl urls={urls} handleCopy={handleCopy} />
    </div>
  );
};

export default UrlShortner;
