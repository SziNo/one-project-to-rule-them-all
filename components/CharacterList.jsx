import { THE_ONE_API_BASE_URL } from '@utils/constants';

const CharacterList = async () => {
  const response = await fetch(`${THE_ONE_API_BASE_URL}/character`, {
    headers: {
      Authorization: `Bearer ${process.env.THE_ONE_API_KEY}`,
    },
  });
  const data = await response.json();

  return <div>CharacterList</div>;
};

export default CharacterList;
