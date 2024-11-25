import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './chat.css';
import Reply from './reply';

interface SearchResult {
  link: string;
  title: string;
  redirect_link: string;
  displayed_link: string;
  thumbnail: string;
}

interface ReplyType {
  searchResult: SearchResult[];
  aiResult: string;
}

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [replies, setReplies] = useState<ReplyType[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const result = await axios.post("http://localhost:5000/", { query });
      setReplies((prevReplies) => [
        ...prevReplies,
        { searchResult: result.data.search_response, aiResult: result.data.ai_response },
      ]);
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
      {replies && replies.map((reply, index) => {
        return <Reply key={index} searchResult={reply.searchResult} aiResult={reply.aiResult} />
      })}
    </div>
  );
};

export default ChatBox;

