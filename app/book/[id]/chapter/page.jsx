import { getLOTRData } from '@utils/axios';

const ChaptersDetailPage = async ({ params }) => {
  const { docs: chapters } = await getLOTRData('book', params.id, 'chapter');

  return (
    <section className="flex flex-col justify-center items-center w-full p-5">
      <h1 className="orange_gradient text-center mb-10 font-bold text-2xl md:text-5xl">
        Chapters
      </h1>
      <ul className="flex flex-wrap items-center justify-center mb-5">
        {chapters.map((item, idx) => (
          <li
            key={item._id}
            className="glassmorphism rounded-lg shadow-md flex flex-col items-center flex-auto w-80"
          >
            <h2 className="text-lg text-gray-600 mb-1 font-bold">
              Chapter {idx + 1}
            </h2>

            <p className="text-lg italic text-amber-600 font-semibold">
              {item.chapterName}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChaptersDetailPage;
