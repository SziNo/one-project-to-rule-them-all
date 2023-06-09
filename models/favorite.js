import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  character: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Favorite =
  mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema);

export default Favorite;
