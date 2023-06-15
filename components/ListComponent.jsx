'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getLOTRData, getFavorites, postFavorite } from '@utils/axios';
import Link from 'next/link';
import SearchComponent from './SearchComponent';
import ReactPaginate from 'react-paginate';

const ListComponent = ({ chapter = null }) => {
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pathName = usePathname();
  const currentPath = pathName.slice(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Fetch data when the component mounts or when the pathname or current page changes
    const fetchData = async () => {
      // Only fetch data if searchedData is empty
      if (searchedData.length === 0) {
        let result;
        if (currentPath === 'favorites') {
          // Pass the user ID to the getFavorites function
          result = await getFavorites(session?.user.id);

          const dataTotalPages = Math.ceil(
            result.length !== 0 ? result.length / itemsPerPage : 1,
          );

          setDisplayedData(result);
          setTotalPages(dataTotalPages);
        } else {
          // Add query params for pagination
          const queryParams = {
            page: currentPage + 1,
            limit: itemsPerPage,
          };

          result = await getLOTRData(currentPath, null, null, queryParams);
          setDisplayedData(result.docs);
          setTotalPages(result.pages);
        }
      }
    };

    fetchData();
  }, [currentPath, currentPage]);

  // Fetch all data without pagination
  useEffect(() => {
    const fetchAllData = async () => {
      if (currentPath === 'favorites') {
        const data = await getFavorites(session?.user.id);

        setAllData(data);
      } else {
        const result = await getLOTRData(currentPath);
        setAllData(result.docs);
      }
    };

    fetchAllData();
  }, [currentPath]);

  // Update displayedData and totalPages whenever searchedData changes
  useEffect(() => {
    // Calculate the start and end indices of the data to display
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Update displayedData to only include the data to display
    setDisplayedData(searchedData.slice(startIndex, endIndex));

    // Update totalPages based on the length of searchedData
    setTotalPages(Math.ceil(searchedData.length / itemsPerPage));
  }, [searchedData, currentPage]);

  // Reset currentPage to 0 whenever searchedData changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchedData]);

  const handlePageChange = (selectedItem) =>
    setCurrentPage(selectedItem.selected);

  const addToFavorites = async (e, item) => {
    e.stopPropagation();

    try {
      // Fetch the favorites data
      const favorites = await getFavorites(session?.user.id);

      // Check if the item already exists in the database
      const itemExists = favorites.some(
        (favorite) => favorite.character._id === item._id,
      );

      if (itemExists) {
        // Item already exists in the database
        alert('Already added to favorites!');
      } else {
        // Item does not exist in the database, so add it
        const response = await postFavorite(item, session?.user.id);

        if (response) {
          alert('Favorite added successfully!');
        } else {
          console.error('Failed to add favorite');
        }
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  return (
    <>
      <SearchComponent data={allData} setSearchedData={setSearchedData} />
      <div className="flex flex-wrap items-center justify-center mb-5">
        {displayedData.map((item) => {
          const data = currentPath === 'favorites' ? item.character : item;
          return (
            <Link
              key={data._id}
              className="glassmorphism shadow-md flex flex-col items-center justify-around flex-auto w-80 h-40"
              href={
                chapter
                  ? `${currentPath}/${data._id}/${chapter}`
                  : `${currentPath}/${data._id}`
              }
            >
              <h2 className="text-lg text-gray-600 mb-1 font-bold">
                {data.name}
              </h2>

              {data.race && data.gender && (
                <p className="italic text-emerald-600 mb-1 font-semibold">
                  {data.race} {data.gender}
                </p>
              )}

              {data.wikiUrl && (
                <a
                  href={data.wikiUrl}
                  target="_blank"
                  className="text-amber-600 font-semibold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read more on Wiki
                </a>
              )}

              {currentPath === 'character' && session?.user && (
                // if button used here then click event will be triggered on Link despite using e.stopPropagation
                <a
                  href="#"
                  className="bg-teal-900 text-white text-sm px-4 py-2 rounded-md mt-2"
                  onClick={(e) => addToFavorites(e, data)}
                >
                  Add to Favorites
                </a>
              )}
            </Link>
          );
        })}
      </div>

      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center items-center"
        pageClassName="mx-1 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        activeClassName="bg-blue-500 font-semibold underline"
        previousClassName="mx-1 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        nextClassName="mx-1 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
      />
    </>
  );
};

export default ListComponent;

// Finding out how many races the database contains, use it in the useffect where all data fetched
// console.log([...new Set(result.docs.map((item) => item.race))]);
