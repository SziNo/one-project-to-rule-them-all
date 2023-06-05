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
    setQuote(randomQuote?.dialog);

    const characterData = await getLOTRData('character', randomQuote.character);
    setCharacter(characterData[0]?.name);

    const movieData = await getLOTRData('movie', randomQuote.movie);
    setMovie(movieData[0]?.name);
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
        <div className="glassmorphism flex flex-col gap-3 items-center p-6 rounded-lg shadow-lg tracking-normal max-w-md w-full">
          <p className="text-xl font-semibold mb-4">&ldquo;{quote}&rdquo;</p>
          <div className="w-full flex justify-end items-end text-sm text-gray-700 tracking-tight">
            <p>
              - <span className="text-red-500 italic">{character}</span> from{' '}
              <span className="text-blue-500 italic">{movie}</span>
            </p>
          </div>
        </div>
      )}
      <button className="black_btn mx-auto mt-5" onClick={fetchData}>
        New Quote
      </button>
    </article>
  );
};

export default RandomQuote;
