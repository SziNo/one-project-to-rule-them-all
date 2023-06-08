'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLOTRData } from '@utils/axios';
import Link from 'next/link';
import SearchComponent from './SearchComponent';
import ReactPaginate from 'react-paginate';

const ListComponent = ({ chapter = null }) => {
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
        // Add query params for pagination
        const queryParams = {
          page: currentPage + 1,
          limit: itemsPerPage,
        };

        const result = await getLOTRData(currentPath, null, null, queryParams);

        // Set displayedData to the result of the Axios call
        setDisplayedData(result.docs);
        setTotalPages(result.pages);
      }
    };

    fetchData();
  }, [currentPath, currentPage]);

  // Fetch all data without pagination
  useEffect(() => {
    const fetchAllData = async () => {
      const result = await getLOTRData(currentPath);
      setAllData(result.docs);
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

  return (
    <>
      <SearchComponent data={allData} setSearchedData={setSearchedData} />
      <div className="flex flex-wrap items-center justify-center mb-5">
        {displayedData.map((item) => (
          <Link
            key={item._id}
            className="glassmorphism rounded-lg shadow-md flex flex-col items-center flex-auto w-80"
            href={
              chapter
                ? `${currentPath}/${item._id}/${chapter}`
                : `${currentPath}/${item._id}`
            }
          >
            <h2 className="text-lg text-gray-600 mb-1 font-bold">
              {item.name}
            </h2>

            {item.race && item.gender && (
              <p className="italic text-emerald-600 mb-1 font-semibold">
                {item.race} {item.gender}
              </p>
            )}

            {item.wikiUrl && (
              <a
                href={item.wikiUrl}
                target="_blank"
                className="text-amber-600 font-semibold hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Read more on Wiki
              </a>
            )}
          </Link>
        ))}
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
