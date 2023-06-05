'use client';

import { useState, useEffect, useCallback } from 'react';
import { getLOTRData } from '@utils/axios';

const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [character, setCharacter] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const quotesData = await getLOTRData('quote');

    const randomQuote =
      quotesData.docs[Math.floor(Math.random() * quotesData.docs.length)];
    setQuote(randomQuote?.dialog);

    const characterData = await getLOTRData('character', randomQuote.character);
    setCharacter(characterData.docs[0]?.name);

    const movieData = await getLOTRData('movie', randomQuote.movie);
    setMovie(movieData.docs[0]?.name);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <article className="mt-20 w-full flex flex-col justify-center items-center">
      {loading ? (
        <div className="spinner mb-10" />
      ) : (
        <div className="glassmorphism flex flex-col items-center justify-between p-6 rounded-lg shadow-lg tracking-normal max-w-md w-full">
          <p className="text-xl text-center font-semibold mb-4">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="w-full flex justify-end items-end text-sm text-gray-700 tracking-tight">
            <p>
              - <span className="text-red-500 italic">{character}</span> from{' '}
              <span className="text-blue-500 italic">{movie}</span>
            </p>
          </div>
        </div>
      )}
      <button
        className={`black_btn mx-auto mt-5 ${
          loading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={fetchData}
      >
        {loading ? 'Loading...' : 'New Quote'}
      </button>
    </article>
  );
};

export default RandomQuote;
