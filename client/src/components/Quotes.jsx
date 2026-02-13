import React, { useEffect, useState } from "react";

function Quotes() {
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("http://localhost:3001/quotes");
        const dataQuotes = await response.json();

        const randomIndex = Math.floor(Math.random() * dataQuotes.length);
        setRandomQuote(dataQuotes[randomIndex]);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    }

    fetchQuotes();
  }, []);

  return (
    <div >
      {randomQuote ? (
        <p >
          {randomQuote.text}
        </p>
      ) : (
        <p>Loading quote...</p>
      )}
    </div>
  );
}

export default Quotes;
