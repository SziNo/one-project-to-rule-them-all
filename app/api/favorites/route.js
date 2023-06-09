import Favorite from '@models/favorite';
import { connectToDB } from '@utils/database';
import { getSession } from 'next-auth/react';

export const GET = async (request) => {
  try {
    await connectToDB();

    const session = await getSession({ req: request });

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const favorites = await Favorite.find({ user: session.user.id });

    return new Response(JSON.stringify(favorites), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch favorites', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectToDB();

    const session = await getSession({ req: request });

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { character } = await request.json();

    await Favorite.create({
      character,
      user: session.user.id,
    });

    return new Response('Favorite added successfully', { status: 201 });
  } catch (error) {
    return new Response('Failed to add favorite', { status: 500 });
  }
};
