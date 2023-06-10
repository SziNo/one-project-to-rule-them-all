import axios from 'axios';

export const axiosOne = axios.create({
  baseURL: 'https://the-one-api.dev/v2',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_THE_ONE_API_KEY}`,
  },
});

export const getLOTRData = async (
  path,
  id = null,
  chapter = null,
  queryParams = {},
) => {
  const url = chapter
    ? `/${path}/${id}/${chapter}`
    : id
    ? `/${path}/${id}`
    : `/${path}`;
  const { data } = await axiosOne.get(url, { params: queryParams });
  return data;
};

export const getFavorites = async () => {
  try {
    const url = '/api/favorites';
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
};

export const postFavorite = async (item, userId) => {
  try {
    const url = '/api/favorites';
    const response = await axios.post(url, { character: item, userId });

    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};
