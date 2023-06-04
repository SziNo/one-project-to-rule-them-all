import axios from 'axios';

export const axiosOne = axios.create({
  baseURL: 'https://the-one-api.dev/v2',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_THE_ONE_API_KEY}`,
  },
});

export const getQuotesPage = async (route) => {
  const response = await axiosOne.get(`/${route}`);
  return response.data;
};
