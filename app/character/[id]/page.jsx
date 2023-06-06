import { getLOTRData } from '@utils/axios';

const CharacterDetailPage = ({ params }) => {
  return (
    <div>
      <h1>Character</h1>
      <p>{params.id}</p>
    </div>
  );
};

export default CharacterDetailPage;
