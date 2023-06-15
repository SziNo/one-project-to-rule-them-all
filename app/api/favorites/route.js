import Favorite from '@models/favorite';
import { connectToDB } from '@utils/database';
import { parse } from 'url';

export const GET = async (request) => {
  const {
    query: { userId },
  } = parse(request.url, true);

  try {
    await connectToDB();
    const favorites = await Favorite.find({ user: userId }).populate('user');

    return new Response(JSON.stringify(favorites), { status: 200 });
  } catch (error) {
    // Log the error to see what's causing the issue
    console.error('Error fetching favorites:', error);
    return new Response('Failed to fetch favorites', { status: 500 });
  }
};

export const POST = async (request) => {
  const { userId, character } = await request.json();

  try {
    await connectToDB();

    const newFavorite = await Favorite.create({
      character,
      user: userId,
    });

    return new Response(JSON.stringify(newFavorite), { status: 201 });
  } catch (error) {
    console.error('Error with adding favorite:', error);
    return new Response('Failed to add favorite', { status: 500 });
  }
};
