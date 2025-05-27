import { useGetStarWarsMoviesQuery, useGetStarWarsPeopleQuery } from '../../../services/generatedCodeApi';
import { useTypedSelector } from '../../../store/store';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { searchByOptions } from '../../../store/sharedSlice';

const Results = () => {
  const navigate = useNavigate();
  const searchTerm = useTypedSelector((store) => store.sharedReducer.searchTerm);
  const searchBy = useTypedSelector((store) => store.sharedReducer.searchBy);
  const { data: peopleData, isFetching: peopleIsFetching } = useGetStarWarsPeopleQuery(
    { name: searchTerm },
    {
      skip: searchTerm === '' || searchBy !== searchByOptions.people,
    },
  );
  const { data: moviesData, isFetching: moviesIsFetching } = useGetStarWarsMoviesQuery(
    { title: searchTerm },
    {
      skip: searchTerm === '' || searchBy !== searchByOptions.movies,
    },
  );

  const handleClick = (uid: string | undefined) => {
    if (!uid) {
      return;
    }
    navigate(`/details/${searchBy}/${uid}`);
  };

  const renderPeopleResults = () => {
    if (peopleIsFetching) {
      return (
        <div className="results__center-element">
          <span className="results__no-results">Searching...</span>
        </div>
      );
    }
    if (!peopleData || peopleData.length == 0) {
      return (
        <div className="results__center-element">
          <span className="results__no-results">There are zero matches.</span>
          <span className="results__no-results">Use the form to search for People or Movies.</span>
        </div>
      );
    }
    return peopleData?.map((item) => (
      <div key={item.uid} className="results__item">
        <div className="results__item-container">
          <span className="results__item-name">{item.name}</span>
          <button className={'results__item-see-details-button'} onClick={() => handleClick(item.uid)}>
            <span className="results__item-see-details-button-text">SEE DETAILS</span>
          </button>
        </div>
        <div className="results__item-divider"></div>
      </div>
    ));
  };

  const renderMoviesResults = () => {
    if (moviesIsFetching) {
      return (
        <div className="results__center-element">
          <span className="results__no-results">Searching...</span>
        </div>
      );
    }
    if (!moviesData || moviesData.length == 0) {
      return (
        <div className="results__center-element">
          <span className="results__no-results">There are zero matches.</span>
          <span className="results__no-results">Use the form to search for People or Movies.</span>
        </div>
      );
    }
    return moviesData?.map((item) => (
      <div key={item.uid} className="results__item">
        <div className="results__item-container">
          <span className="results__item-name">{item.title}</span>
          <button className={'results__item-see-details-button'} onClick={() => handleClick(item.uid)}>
            <span className="results__item-see-details-button-text">SEE DETAILS</span>
          </button>
        </div>
        <div className="results__item-divider"></div>
      </div>
    ));
  };

  return (
    <div className="results__container">
      <span className="results__title">Results</span>
      <div className="results__divider"></div>
      {searchBy === searchByOptions.people ? renderPeopleResults() : renderMoviesResults()}
    </div>
  );
};

export default Results;
