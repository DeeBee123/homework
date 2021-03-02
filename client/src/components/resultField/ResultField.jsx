import React from "react";
import {ReactComponent as Star} from "../../assets/icons/star.svg";
import PropTypes from "prop-types";
import "./resultField.scss"


export const ResultField = ({selectedMovie}) => {
    return(
        <div className="result-field">
            {selectedMovie[0].poster_path !== null && (
              <div className="result-field__image">
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    selectedMovie[0].poster_path
                  }
                  alt="Movie Poster"
                />
              </div>
            )}
            <div className="result-field__info">
              <span className="title">
                {selectedMovie[0].title} (
                {selectedMovie[0].release_date.slice(0, 4)})
              </span>
              <span className="language">
                Original language:{" "}
                {selectedMovie[0].original_language.toUpperCase()}
              </span>
              {selectedMovie[0].vote_average !== 0 && (
                <div className="ranking">
                 <Star className="ranking__star"/>
                  <div className="ranking__vote">
                    <span>
                      {selectedMovie[0].vote_average}
                      <span className="ranking__vote-small">/10</span>
                    </span>
                    <span className="ranking__vote-count">
                      {selectedMovie[0].vote_count} votes
                    </span>
                  </div>
                </div>
              )}
              <p>{selectedMovie[0].overview}</p>
            </div>
          </div>
    )
}

ResultField.propTypes={
  selectedMovie: PropTypes.array
}