'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Favorites = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      setTimeout(() => {
        router.push('/');
      }, 4000);
    }
  }, [session, router]);

  return (
    <div>
      {!session?.user ? (
        <h1 className="desc">You need to log in to access this page!</h1>
      ) : (
        <>
          <h1>Favorites</h1>
        </>
      )}
    </div>
  );
};

export default Favorites;
