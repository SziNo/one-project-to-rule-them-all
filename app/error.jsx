'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Oops, something went wrong!</h2>
      <button
        type="button"
        onClick={() => {
          reset();
          router.push('/');
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
}
