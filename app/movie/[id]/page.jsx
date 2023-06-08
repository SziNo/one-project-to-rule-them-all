import { getLOTRData } from '@utils/axios';

const MovieDetailPage = async ({ params }) => {
  const { docs: movie } = await getLOTRData('movie', params.id);
  const {
    name,
    runtimeInMinutes,
    budgetInMillions,
    boxOfficeRevenueInMillions,
    academyAwardNominations,
    academyAwardWins,
    rottenTomatoesScore,
  } = movie[0];

  const budgetConverter = (num) => {
    const intNumStr = Math.round(num).toString();
    return intNumStr.length < 4
      ? `$${intNumStr}.000.000`
      : intNumStr.length === 4
      ? `$${intNumStr[0]}.${intNumStr.slice(1)}.000.000`
      : intNumStr.length === 5
      ? `$${intNumStr.slice(0, 2)}.${intNumStr.slice(2)}.000.000`
      : `$${intNumStr.slice(0, 3)}.${intNumStr.slice(3)}.000.000`;
  };

  return (
    <section className="flex flex-col justify-center items-center w-full p-5">
      <h1 className="orange_gradient text-center mb-10 font-bold text-3xl md:text-5xl">
        Movie
      </h1>
      <div className="flex flex-col gap-5 flex-wrap items-center justify-center">
        <h2 className="text-4xl md:text-6xl text-gray-600 mb-5 font-bold">
          {name}
        </h2>
        <div className="flex flex-col gap-3 justify-start items-start">
          <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
            Runtime:{' '}
            <span className="text-amber-900 ">{runtimeInMinutes} minutes</span>
          </p>
          <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
            Budget:{' '}
            <span className="text-amber-900 ">
              {budgetConverter(budgetInMillions)}
            </span>
          </p>
          <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
            Box Office Revenue:{' '}
            <span className="text-amber-900 ">
              {budgetConverter(boxOfficeRevenueInMillions)}
            </span>
          </p>
          <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
            Academy Award Nominations:{' '}
            <span className="text-amber-900 ">{academyAwardNominations}</span>
          </p>
          <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
            Academy Awards Won:{' '}
            <span className="text-amber-900 ">{academyAwardWins}</span>
          </p>
          <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
            Rotten Tomatoes Score:{' '}
            <span className="text-amber-900 ">
              {rottenTomatoesScore.toFixed()}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailPage;
