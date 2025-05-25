import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { useGetStarWarsPersonQuery } from '../../services/generatedCodeApi';
import { useTypedSelector } from '../../store/store';
import { searchByOptions, setDetailsBy, setSearchBy, setSearchTerm } from '../../store/sharedSlice';
import { useDispatch } from 'react-redux';

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const detailsBy = useTypedSelector((store) => store.sharedReducer.detailsBy);

  const isPeopleDetails = detailsBy === searchByOptions.people;

  const personDetails = {
    birth_year: '24BBY',
    gender: 'male',
    eye_color: 'brown',
    hair_color: 'black',
    height: '183',
    mass: '84',
  };

  const fieldLabels: Record<keyof typeof personDetails, string> = {
    birth_year: 'Birth Year',
    gender: 'Gender',
    eye_color: 'Eye Color',
    hair_color: 'Hair Color',
    height: 'Height',
    mass: 'Mass',
  };

  const { data, isFetching } = useGetStarWarsPersonQuery(
    { uid: id },
    {
      skip: id === '',
    },
  );

  const PersonDetails = () => {
    if (!data || isFetching) {
      return <></>;
    }
    return (
      <div>
        {Object.entries(fieldLabels).map(([key, label]) => (
          <div key={key}>
            {label}: {data[key as keyof typeof data]}
          </div>
        ))}
      </div>
    );
  };

  const MovieDetails = () => {
    if (!data || isFetching) {
      return <></>;
    }
    return (
      <div>
        Luke Skywalker has returned to his home planet of Tatooine in an attempt to rescue his friend Han Solo from the
        clutches of the vile gangster Jabba the Hutt. <br />
        <br />
        Little does Luke know that the GALACTIC EMPIRE has secretly begun construction on a new armored space station
        even more powerful than the first dreaded Death Star. <br />
        <br />
        When completed, this ultimate weapon will spell certain doom for the small band of rebels struggling to restore
        freedom to the galaxy...
      </div>
    );
  };

  const handleClick = (uid: string | undefined) => {
    if (!uid) {
      return;
    }
    dispatch(setDetailsBy(isPeopleDetails ? searchByOptions.movies : searchByOptions.people));
    navigate('/details/' + uid);
  };
  return (
    <div className="details__container">
      <span className="details__title">{!data || isFetching ? 'Loading...' : data?.name}</span>
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
            {isPeopleDetails ? (
              data?.movies?.map((movie, index) => (
                <span key={movie.uid}>
                  <span className="details__character-link" onClick={() => handleClick(movie.uid)}>
                    {movie.description}
                  </span>
                  {data?.movies && index < data?.movies?.length - 1 && ', '}
                </span>
              ))
            ) : (
              <></>
            )}
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
