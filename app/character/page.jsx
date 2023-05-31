'use client';

import axios from 'axios';
import { THE_ONE_API_BASE_URL } from '@utils/constants';
import { useState, useEffect } from 'react';

const CharacterList = () => {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(
          `${THE_ONE_API_BASE_URL}/character?limit=9&offset=9`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_THE_ONE_API_KEY}`,
            },
          },
        );

        setCharacters(res.data.docs);
      } catch (error) {
        console.error('Error occurred during fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  console.log(characters?.[1].wikiUrl);
  return (
    <div>
      <h1>Character List</h1>
    </div>
  );
};

export default CharacterList;

// Pagination
// const limit = 9;
// const page = 2; // Change this to the current page number
// const offset = (page - 1) * limit;
// `${THE_ONE_API_BASE_URL}/character?limit=${limit}&offset=${offset}`;
