import { getLOTRData } from '@utils/axios';

const CharacterDetailPage = async ({ params }) => {
  const { docs: character } = await getLOTRData('character', params.id);

  console.log(character[0]);

  return (
    <div>
      <h1>Character</h1>
      <p>{params.id}</p>
    </div>
  );
};

export default CharacterDetailPage;
