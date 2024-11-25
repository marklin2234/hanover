import React from "react";

const Reply = ({ searchResult, aiResult }: { searchResult: any, aiResult: string }) => {
  return (
    <div className="chat-reply">
      <h3>Search Result:</h3>
      {searchResult && searchResult.map((result: any, index: number) => {
        return (
          <div className="search-result" key={index}>
            <div className="search-result-thumbnail">
              <img src={result.thumbnail} alt={result.title} />
            </div>
            <div className="search-result-info">
              <a href={result.redirect_link} target="_blank" rel="noopener noreferrer">
                {result.displayed_link}
              </a>
              <p>{result.title}</p>
            </div>
          </div>
        )
      })}
      <div className="ai-response">
        <h3>AI Response:</h3>
        <p>{aiResult}</p>
      </div>
    </div>
  );
};

export default Reply;
