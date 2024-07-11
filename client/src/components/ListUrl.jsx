import React, { useState, useEffect } from "react";
import axios from "axios";

const ListUrl = ({ urls, handleCopy }) => {
  return (
    <div>
      <div>
        <h2 className="text-2xl text-green-400 mt-8">Previous URLs:</h2>
        {urls.map((url) => (
          <div
            key={url.shortId}
            className="mt-4 p-4 bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-200 shadow-lg flex items-center justify-between"
          >
            <div>
              <p className="text-green-400">Original URL:</p>
              <a
                href={url.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline break-all"
              >
                {url.originalUrl}
              </a>
              <p className="text-green-400 mt-2">Shortened URL:</p>
              <a
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline break-all"
              >
                {url.shortUrl}
              </a>
            </div>
            <button
              onClick={() => handleCopy(url.shortUrl)}
              className="ml-4 bg-green-400 hover:bg-green-500 text-black py-1 px-2 rounded"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUrl;
