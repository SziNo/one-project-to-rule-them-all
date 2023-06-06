'use client';

import ListComponent from '@components/ListComponent';

const Books = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full p-5">
      <h1 className="orange_gradient text-center mb-2 font-bold text-2xl md:text-5xl">
        Books
      </h1>

      <ListComponent chapter="chapter" />
    </section>
  );
};

export default Books;

// name: 'The Fellowship Of The Ring';
// _id: '5cf5805fb53e011a64671582';
