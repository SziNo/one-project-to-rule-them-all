import RandomQuote from '@components/RandomQuote';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col text-center tracking-[3px]">
      <h1 className="head_text">
        One project <br className="xl:hidden" />
        <span className="orange_gradient text-center">to rule them all</span>
      </h1>

      <p className="desc orange_gradient">
        Explore the rich world of Middle-earth using the One API, featuring
        books, characters, movies, and quotes from The Lord of the Rings and The
        Hobbit trilogies.
      </p>

      <RandomQuote />
    </section>
  );
};

export default Home;
