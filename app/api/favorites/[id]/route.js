import Favorite from '@models/favorite';
import { connectToDB } from '@utils/database';

export const DELETE = async (request, { params }) => {
  try {
    console.log('DELETE method called with ID:', params.id);

    await connectToDB();

    // Find the prompt by ID and remove it
    await Favorite.findOneAndDelete({ _id: params.id });

    return new Response('Favorite deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting favorite item:', error);
    return new Response('Error deleting favorite item', { status: 500 });
  }
};
