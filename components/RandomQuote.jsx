'use client';

import { useState, useEffect, useCallback } from 'react';
import { getLOTRData } from '@utils/axios';

const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [character, setCharacter] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const quotesData = await getLOTRData('quote');
    const randomQuote =
      quotesData[Math.floor(Math.random() * quotesData.length)];
    setQuote(randomQuote);

    const characterData = await getLOTRData('character', randomQuote.character);
    setCharacter(characterData[0]);

    const movieData = await getLOTRData('movie', randomQuote.movie);
    setMovie(movieData[0]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <article className="mt-20">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{quote?.dialog}</p>
          <p>Character: {character?.name}</p>
          <p>Movie: {movie?.name}</p>
        </>
      )}
      <button onClick={fetchData}>Fetch</button>
    </article>
  );
};

export default RandomQuote;
