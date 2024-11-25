import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './chat.css';

interface SearchResult {
  link: string;
  title: string;
  redirect_link: string;
  displayed_link: string;
  thumbnail: string;
}
const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState<SearchResult[]>([]);
  const [aiResponse, setAiResponse] = useState<string>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const result = await axios.post("http://localhost:5000/", { query });
      setAiResponse(result.data.ai_response);
      setSearchResponse(result.data.search_response);
      console.log(aiResponse)
      console.log(searchResponse)
    } catch (error) {
      console.error("Error sending query to backend:", error);
    }
  };

  return (
    <div className="chatbox">
      <form onSubmit={handleFormSubmit} className="chatbox-form">
        <input
          type="text"
          placeholder="Ask anything..."
          value={query}
          onChange={handleInputChange}
          className="chatbox-input"
        />
        <button type="submit" className="chatbox-submit">
          Send
        </button>
      </form>
      {searchResponse && searchResponse.length > 0 && (
        <div className="search-response">
          <h3>Search Results:</h3>
          <ul>
            {searchResponse.map((result, index) => (
              <li key={index}>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {aiResponse && (
        <div className="ai-response">
          <h3>AI Response:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

