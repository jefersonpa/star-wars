import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { useGetStarWarsMovieQuery, useGetStarWarsPersonQuery } from '../../services/generatedCodeApi';
import { searchByOptions } from '../../store/sharedSlice';

const Details = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { detailsBy } = useParams<{ detailsBy: string }>();

  const isPeopleDetails = detailsBy === searchByOptions.people;

  const personDetails = {
    birth_year: '24BBY',
    gender: 'male',
    eye_color: 'brown',
    hair_color: 'black',
    height: '183',
    mass: '84',
  };

  const personFieldLabels: Record<keyof typeof personDetails, string> = {
    birth_year: 'Birth Year',
    gender: 'Gender',
    eye_color: 'Eye Color',
    hair_color: 'Hair Color',
    height: 'Height',
    mass: 'Mass',
  };

  const { data: personData, isFetching: personIsFetching } = useGetStarWarsPersonQuery(
    { uid: id },
    {
      skip: id === '' || detailsBy !== searchByOptions.people,
    },
  );

  const { data: movieData, isFetching: movieIsFetching } = useGetStarWarsMovieQuery(
    { uid: id },
    {
      skip: id === '' || detailsBy !== searchByOptions.movies,
    },
  );

  const PersonDetails = () => {
    if (!personData || personIsFetching) {
      return <></>;
    }
    return (
      <div>
        {Object.entries(personFieldLabels).map(([key, label]) => (
          <div key={key}>
            {label}: {personData[key as keyof typeof personData] as string}
          </div>
        ))}
      </div>
    );
  };

  const MovieDetails = () => {
    if (!movieData || movieIsFetching) {
      return <></>;
    }
    return (
      <>
        <div className="details__multiple-characters">{movieData.opening_crawl}</div>
      </>
    );
  };

  const handleClick = (uid: string | undefined) => {
    if (!uid) {
      return;
    }

    navigate(`/details/${isPeopleDetails ? searchByOptions.movies : searchByOptions.people}/${uid}`);
  };

  if ((isPeopleDetails && (!personData || personIsFetching)) || (!isPeopleDetails && (!movieData || movieIsFetching))) {
    return (
      <div className="details__container">
        <span className="details__loading">Loading...</span>
        <Link to="/">
          <button className="details__back-to-search-button">
            <span className="details__back-to-search-button-text">BACK TO SEARCH</span>
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="details__container">
      <span className="details__title">{isPeopleDetails ? personData?.name : movieData?.title}</span>
      <div className="details__content">
        <div className="details__box">
          <span className="details__subtitle">{isPeopleDetails ? 'Details' : 'Opening Crawl'}</span>
          <span className="details__divider"></span>
          <span className="details__description">{isPeopleDetails ? PersonDetails() : MovieDetails()}</span>
        </div>
        <div className="details__box">
          <span className="details__subtitle">{isPeopleDetails ? 'Movies' : 'Characters'}</span>
          <span className="details__divider"></span>
          <span className="details__character">
            {isPeopleDetails
              ? personData?.movies?.map((movie, index) => (
                  <span key={movie.uid}>
                    <span className="details__character-link" onClick={() => handleClick(movie.uid)}>
                      {movie.description}
                    </span>
                    {personData?.movies && index < personData?.movies?.length - 1 && ', '}
                  </span>
                ))
              : movieData?.characters?.map((character, index) => (
                  <span key={character.uid}>
                    <span className="details__character-link" onClick={() => handleClick(character.uid)}>
                      {character.name}
                    </span>
                    {movieData?.characters && index < movieData?.characters?.length - 1 && ', '}
                  </span>
                ))}
          </span>
        </div>
      </div>
      <Link to="/">
        <button className="details__back-to-search-button">
          <span className="details__back-to-search-button-text">BACK TO SEARCH</span>
        </button>
      </Link>
    </div>
  );
};

export default Details;
