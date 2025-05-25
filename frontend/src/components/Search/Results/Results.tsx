import { useGetStarWarsPeopleQuery } from '../../../services/generatedCodeApi';
import { useTypedSelector } from '../../../store/store';
import './style.css';
import { Link } from 'react-router-dom';
const Results = () => {
  const searchTerm = useTypedSelector((store) => store.sharedReducer.searchTerm);
  const { data, isFetching } = useGetStarWarsPeopleQuery(
    { name: searchTerm },
    {
      skip: searchTerm === '',
    },
  );
  return (
    <div className="results__container">
      <span className="results__title">Results</span>
      <div className="results__divider"></div>

      {data && data.length > 0 ? (
        data?.map((item) => (
          <div key={item.uid} className="results__item">
            <div className="results__item-container">
              <span className="results__item-name">{item.name}</span>
              <Link to={`/details/${item.uid}`}>
                <button className={'results__item-see-details-button'}>
                  <span className="results__item-see-details-button-text">SEE DETAILS</span>
                </button>
              </Link>
            </div>
            <div className="results__item-divider"></div>
          </div>
        ))
      ) : isFetching ? (
        <div className="results__center-element">
          <span className="results__no-results">Searching...</span>
        </div>
      ) : (
        <div className="results__center-element">
          <span className="results__no-results">There are zero matches.</span>
          <span className="results__no-results">Use the form to search for People or Movies.</span>
        </div>
      )}
    </div>
  );
};

export default Results;
