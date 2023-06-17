'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full flex-center flex-col text-center tracking-[3px]">
      <h2 className="head_text">Oops, something went wrong!</h2>
      <button
        type="button"
        onClick={() => {
          reset();
          router.push('/');
        }}
        className="black_btn mx-auto mt-5 cursor-pointer"
      >
        Back to Home Page
      </button>
    </div>
  );
}
