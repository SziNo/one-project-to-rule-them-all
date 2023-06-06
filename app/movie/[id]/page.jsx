import { getLOTRData } from '@utils/axios';

const MovieDetailPage = ({ params }) => {
  return (
    <div>
      <h1>Movie</h1>
      <p>{params.id}</p>
    </div>
  );
};

export default MovieDetailPage;
