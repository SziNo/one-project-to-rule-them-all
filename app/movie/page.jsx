'use client';

import ListComponent from '@components/ListComponent';

const Movies = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full p-5">
      <h1 className="orange_gradient text-center mb-2 font-bold text-2xl md:text-5xl">
        Movies
      </h1>

      <ListComponent />
    </section>
  );
};

export default Movies;
