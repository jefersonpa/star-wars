import './style.css';
const Results = () => {
  return (
    <div className="results__container">
      <span className="results__title">Results</span>
      <div className="results__divider"></div>
      <div className="results__center-element">
        <span className="results__no-results">There are zero matches.</span>
        <span className="results__no-results">Use the form to search for People or Movies.</span>
      </div>
    </div>
  );
};

export default Results;
