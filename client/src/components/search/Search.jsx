import React, { useState } from "react";
import { ReactComponent as MovieIcon } from "../../assets/icons/movie.svg";
import "./search.scss";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ResultField } from "../resultField/ResultField";
import PropTypes from "prop-types";

export const Search = () => {
  const [searchedText, setSearchedText] = useState("");
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [renderResult, setRenderResult] = useState(false);

  const handleChange = (e) => {
    const inputText = e.target.value;
    e.preventDefault();
    setSearchedText(inputText);
    inputText !== ""
      ? setSearchFieldActive(true)
      : setSearchFieldActive(false) && setError(false);

    inputText.split("").length > 2
      ? fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=fa984b0fc951f3f4fc74f19d70a79105&language=en-US&query=${inputText}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              const searchResults = result.results;
              if (searchResults.length !== 0) {
                setError(false);
                setResults(searchResults.slice(0, 8));
              } else {
                setResults("");
                setError(true);
              }
            },
            (error) => {
              setError(error);
            }
          )
      : setResults("");
  };
  const handleSelect = (e) => {
    setRenderResult(false);
    setSearchedText(e);
    setSearchFieldActive(false);
    const movie = results.filter((result) => result.title === e);
    setSelectedMovie(movie);
  };

  const handleEnter = (e, input) => {
    e.key === "Enter" && setSearchFieldActive(false);
    setSearchedText(input);
    const movie = results.filter((result) => result.title === input);
    setSelectedMovie(movie);
  };

  const handleFocus = () => {
    setSearchFieldActive(true);
  };

  const showResult = (e) => {
    e.preventDefault();
    setRenderResult(true);
  };

  return (
    <>
      <header className="search-header">
        <form className="search">
          <MovieIcon className="movie-icon" />
          <input
            autoFocus
            className="search__input"
            type="search"
            placeholder="Enter movie name"
            onChange={handleChange}
            autoComplete="off"
            onFocus={handleFocus}
            value={searchedText}
          />
          {searchFieldActive ? (
            <div className="options-field">
              {results.length > 0 && (
                <ul className="results">
                  {results.length > 0 &&
                    results.map((result) => (
                      <li
                        key={result.id}
                        className="results__result"
                        tabIndex="0"
                        onClick={() => handleSelect(result.title)}
                        onKeyDown={(e) => handleEnter(e, result.title)}
                      >
                        <span className="results__title">{result.title}</span>
                        <span className="results__rating">
                          {result.vote_average !== 0
                            ? result.vote_average
                            : "No"}{" "}
                          Rating, {result.release_date.slice(0, 4)}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ) : (
            <button className="search-button" tabIndex="0" onClick={showResult}>
              <SearchIcon className="search-button__icon" />
            </button>
          )}
        </form>
      </header>
      <section>
        {renderResult && error ? (
          <div className="error-message">There are no matching results.</div>
        ) : renderResult && !error ? (
          <ResultField selectedMovie={selectedMovie} />
        ) : null}
      </section>
    </>
  );
};

Search.propTypes = {
  searchedText: PropTypes.string,
  error: PropTypes.bool,
  results: PropTypes.array,
  searchFieldActive: PropTypes.bool,
  renderResult: PropTypes.bool,
};
