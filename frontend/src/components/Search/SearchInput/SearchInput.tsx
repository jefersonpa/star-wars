import { useDispatch } from 'react-redux';
import './style.css';
import { searchByOptions, setSearchBy, setSearchTerm } from '../../../store/sharedSlice';
import { useTypedSelector } from '../../../store/store';
import { useGetStarWarsPeopleQuery } from '../../../services/generatedCodeApi';
import { useState } from 'react';
const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useTypedSelector((store) => store.sharedReducer.searchTerm);
  const searchBy = useTypedSelector((store) => store.sharedReducer.searchBy);
  const [searchValue, setSearchValue] = useState(searchTerm);
  const { isFetching } = useGetStarWarsPeopleQuery(
    { name: searchTerm },
    {
      skip: searchTerm === '' || searchBy !== searchByOptions.people,
    },
  );

  const handleSearch = () => {
    dispatch(setSearchTerm(searchValue));
  };
  const handleComboClick = (searchBy: string) => {
    dispatch(setSearchBy(searchBy));
  };
  return (
    <div className="search-input__container">
      <span className="search-input__question-text">What are you searching for?</span>
      <div className="search-input__search-input-container">
        <div
          className={`search-input__ellipse ${searchBy == searchByOptions.people ? 'search-input__ellipse-selected' : ''}`}
          onClick={() => handleComboClick(searchByOptions.people)}
        ></div>
        <span className="search-input__people people-gap">People</span>
        <div
          className={`search-input__ellipse ${searchBy == searchByOptions.movies ? 'search-input__ellipse-selected' : ''}`}
          onClick={() => handleComboClick(searchByOptions.movies)}
        ></div>
        <span className="search-input__people">Movies</span>
      </div>
      <input
        type="search"
        className="search-input__input input-text"
        placeholder={
          searchBy == searchByOptions.people
            ? 'e.g. Chewbacca, Yoda, Boba Fett'
            : 'e.g. A New Hope, The Empire Strikes Back'
        }
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      <button
        onClick={handleSearch}
        disabled={isFetching == true || searchValue == ''}
        className={`search-input__search-button ${isFetching == true || searchValue == '' ? 'search-input__search-button-disabled' : ''}`}
      >
        <span className="search-input__search-button-text">{isFetching ? 'SEARCHING...' : 'SEARCH'}</span>
      </button>
    </div>
  );
};

export default SearchInput;
