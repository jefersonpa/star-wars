import { useDispatch } from 'react-redux';
import { useGetStarWarsPeopleQuery } from '../../../services/generatedCodeApi';
import { useTypedSelector } from '../../../store/store';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { setDetailsBy } from '../../../store/sharedSlice';
const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useTypedSelector((store) => store.sharedReducer.searchTerm);
  const searchBy = useTypedSelector((store) => store.sharedReducer.searchBy);
  const { data, isFetching } = useGetStarWarsPeopleQuery(
    { name: searchTerm },
    {
      skip: searchTerm === '',
    },
  );

  const handleClick = (uid: string | undefined) => {
    if (!uid) {
      return;
    }
    dispatch(setDetailsBy(searchBy));
    navigate('/details/' + uid);
  };

  return (
    <div className="results__container">
      <span className="results__title">Results</span>
      <div className="results__divider"></div>

      {data && data.length > 0 ? (
        data?.map((item) => (
          <div key={item.uid} className="results__item">
            <div className="results__item-container">
              <span className="results__item-name">{item.name}</span>
              <button className={'results__item-see-details-button'} onClick={() => handleClick(item.uid)}>
                <span className="results__item-see-details-button-text">SEE DETAILS</span>
              </button>
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
