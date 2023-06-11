import { getLOTRData } from '@utils/axios';
import Image from 'next/image';

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
    <section className="flex-center flex-col w-full p-5">
      <div className="flex-center flex-col gap-5">
        <h2 className="text-4xl md:text-6xl text-gray-600 md:mb-20 mb-10 font-bold">
          {name}
        </h2>
        <div className="flex-center gap-5 p-5">
          <div className="flex flex-col gap-3 justify-start items-start p-5">
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Runtime:{' '}
              <span className="text-amber-900 ">
                {runtimeInMinutes} minutes
              </span>
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

          <div className="md:flex hidden p-5">
            <Image
              src="/assets/images/gandalfsaruman.png"
              alt="Gandalf&Saruman"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailPage;
