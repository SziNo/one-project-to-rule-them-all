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
