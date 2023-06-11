'use client';

import ListComponent from '@components/ListComponent';

const Characters = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full p-5">
      <h1 className="orange_gradient text-center mb-2 font-bold text-2xl md:text-5xl">
        Characters
      </h1>
      <p className="mt-2 text-sm text-gray-700">
        Log in and save your favorite characters!
      </p>

      <ListComponent />
    </section>
  );
};

export default Characters;
