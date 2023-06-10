'use client';

import { useState, useEffect } from 'react';

const SearchComponent = ({ data, setSearchedData }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchedText, setDebouncedSearchedText] =
    useState(searchText);

  // Add a new useEffect hook to update the debounced search text
  useEffect(() => {
    // Set a timeout to update the debounced search text after 500ms
    const timeoutId = setTimeout(() => {
      setDebouncedSearchedText(searchText);
    }, 500);

    // Clear the timeout when the searchText or the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  // Update the filteredData when the debouncedSearchText changes
  useEffect(() => {
    const filteredData = data.filter((item) => {
      const character = item.character || item;
      return (
        character.name
          ?.toLowerCase()
          .includes(debouncedSearchedText.toLowerCase()) ||
        character.race
          ?.toLowerCase()
          .includes(debouncedSearchedText.toLowerCase())
      );
    });

    setSearchedData(filteredData);
  }, [data, debouncedSearchedText]);

  // Add an onSubmit event handler to prevent form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex justify-center items-center my-3 w-60"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="p-2 my-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring"
        placeholder="Search by name or race..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchComponent;
