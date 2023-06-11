'use client';

import { useState, useEffect } from 'react';
import { getFavorites } from '@utils/axios';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { deleteFavorite } from '@utils/axios';
import Image from 'next/image';

const FavoritesDetailPage = ({ params }) => {
  const [favoriteItem, setFavoriteItem] = useState(null);
  const [characterObj, setCharacterObj] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const currentPath = pathName.slice(1).split('/')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFavorites();
        const favoriteItem = data.find(
          (item) => item.character._id === params.id,
        );
        // We need the whole object and its _id to delete
        setFavoriteItem(favoriteItem);
        // We need only character object to display details
        setCharacterObj(favoriteItem.character);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (data) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this favorite item?',
    );

    if (hasConfirmed) {
      try {
        await deleteFavorite(data._id);

        // Navigate to the /favorites page
        router.push('/favorites');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="flex-center flex-col w-full p-5">
      <div className="flex-center flex-col gap-5">
        <h2 className="text-4xl md:text-6xl text-gray-600 md:mb-20 mb-10 font-bold">
          {characterObj?.name}
        </h2>
        <div className="flex-center gap-5 p-5">
          <div className="flex flex-col gap-3 justify-start items-start p-5">
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Race:{' '}
              <span className="text-amber-900 ">
                {characterObj?.race || 'N/A'}
              </span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Gender:{' '}
              <span className="text-amber-900 ">
                {characterObj?.gender || 'N/A'}
              </span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Birth:{' '}
              <span className="text-amber-900 ">
                {characterObj?.birth || 'N/A'}
              </span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Death:{' '}
              <span className="text-amber-900 ">
                {characterObj?.death || 'N/A'}
              </span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Spouse:{' '}
              <span className="text-amber-900 ">
                {characterObj?.spouse || 'N/A'}
              </span>
            </p>

            {currentPath === 'favorites' && session?.user && (
              <button
                type="button"
                className="bg-red-800 text-white text-md px-4 py-2 rounded-md mt-2"
                onClick={() => handleDelete(favoriteItem)}
              >
                Remove Item
              </button>
            )}
          </div>

          <div className="md:flex hidden p-5">
            <Image
              src="/assets/images/gimli-cartoon.png"
              alt="Gimli"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoritesDetailPage;
