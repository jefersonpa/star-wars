import './style.css';
const SearchInput = () => {
  return (
    <div className="search-input__container">
      <span className="search-input__question-text">What are you searching for?</span>
      <div className="search-input__search-input-container">
        <div className="search-input__ellipse ellipse-selected"></div>
        <span className="search-input__people people-gap">People</span>
        <div className="search-input__ellipse"></div>
        <span className="search-input__people">Movies</span>
      </div>
      <input
        type="search"
        className="search-input__input input-text"
        placeholder="e.g. Chewbacca, Yoda, Boba Fett"
      ></input>
      <button className="search-input__search-button search-button-disabled">
        <span className="search-input__search-button-text">SEARCH</span>
      </button>
    </div>
  );
};

export default SearchInput;
