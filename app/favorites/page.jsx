'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ListComponent from '@components/ListComponent';

const Favorites = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      setTimeout(() => {
        router.push('/');
      }, 4000);
    }
  }, [status, router]);

  return (
    <div>
      {!session?.user ? (
        <h1 className="desc">You need to log in to access this page!</h1>
      ) : (
        <>
          <section className="flex flex-col justify-center items-center w-full p-5">
            <h1 className="orange_gradient text-center mb-2 font-bold text-2xl md:text-5xl">
              Favorites
            </h1>

            <ListComponent />
          </section>
        </>
      )}
    </div>
  );
};

export default Favorites;
