import { getLOTRData } from '@utils/axios';
import Image from 'next/image';

const CharacterDetailPage = async ({ params }) => {
  const { docs: character } = await getLOTRData('character', params.id);
  const { name, race, gender, birth, death, spouse } = character[0];

  return (
    <section className="flex-center flex-col w-full p-5">
      <div className="flex-center flex-col gap-5">
        <h2 className="text-4xl md:text-6xl text-gray-600 md:mb-20 mb-10 font-bold">
          {name}
        </h2>
        <div className="flex-center gap-5 p-5">
          <div className="flex flex-col gap-3 justify-start items-start p-5">
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Race: <span className="text-amber-900 ">{race || 'N/A'}</span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Gender: <span className="text-amber-900 ">{gender || 'N/A'}</span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Birth: <span className="text-amber-900 ">{birth || 'N/A'}</span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Death: <span className="text-amber-900 ">{death || 'N/A'}</span>
            </p>
            <p className="text-xl md:text-2xl italic text-gray-800 font-bold">
              Spouse: <span className="text-amber-900 ">{spouse || 'N/A'}</span>
            </p>
          </div>

          <div className="md:flex hidden p-5">
            <Image
              src="/assets/images/frodosmeagol.png"
              alt="Frodo&Smeagol"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterDetailPage;
