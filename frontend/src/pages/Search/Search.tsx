import Results from '../../components/Search/Results/Results';
import SearchInput from '../../components/Search/SearchInput/SearchInput';
import './style.css';

const Search = () => {
  return (
    <div className="search__search-container">
      <SearchInput />
      <Results />
    </div>
  );
};

export default Search;
