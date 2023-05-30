import axios from 'axios';
import { THE_ONE_API_BASE_URL } from '@utils/constants';

const getCharactersData = async () => {
  const res = await axios.get(`${THE_ONE_API_BASE_URL}/character`, {
    headers: {
      Authorization: `Bearer ${process.env.THE_ONE_API_KEY}`,
    },
  });

  return res.data.docs;
};

const CharacterList = async () => {
  const characters = await getCharactersData();
  console.log(characters);

  return <div>CharacterList</div>;
};

export default CharacterList;
