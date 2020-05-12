import ReactCardFlip from "react-card-flip";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Get from "../hook/FetchGet";

const imageSizes = {
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

export default function MovieCard(props) {
  let movie = props.movie;
  let movieId = movie.id;
  let API_KEY = props.API_KEY;
  let currentMovieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  const [isLoading, actualMovie] = Get(currentMovieURL, movie);
  const [isFlipped, setIsFlipped] = useState(false);

  const [backdrop, setBackdrop] = useState("");
  const [poster, setPoster] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => {
        setBackdrop(res.data.backdrop_path);
        setPoster(res.data.poster_path);
      });
  });

  let setFlipCard = (e) => {
    e.preventDefault();
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  let mainCard = (
    <>
      <div
        id={`${movie.id}-front`}
        className="card border-warning mb-5 clearfix"
        style={{ width: "22rem" }}
      >
        {actualMovie ? (
          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: "center" }}>
              {actualMovie.title.toUpperCase()}
            </h5>
            <div className={"poster-container"}>
              <img
                style={centerImage}
                src={`https://image.tmdb.org/t/p/${imageSizes.poster_sizes[2]}${poster}`}
                alt="No poster available"
              />
            </div>
          </div>
        ) : (
          <div>Card is loading</div>
        )}
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-light" onClick={setFlipCard}>
            Flip
          </button>
        </div>
      </div>
    </>
  );

  let backCard =
    actualMovie != null ? (
      <>
        <div
          id={`${movie.id}-back`}
          className="card border-warning mb-5 clearfix"
          style={{ width: "22rem" }}
        >
          {actualMovie ? (
            <React.Fragment>
              <div className={"backdrop-container"}>
                <img
                  src={`https://image.tmdb.org/t/p/${imageSizes.backdrop_sizes[0]}${backdrop}`}
                  alt="No backdrop available"
                  style={centerImage}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title" style={{ textAlign: "center" }}>
                  {actualMovie.title.toUpperCase()}
                </h5>
                <p className="card-text">
                  Original title: {actualMovie.original_title}
                  <p></p>
                  {actualMovie.overview}
                </p>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={setFlipCard}
                  >
                    Flip
                  </button>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div>Card is loading</div>
          )}
        </div>
      </>
    ) : (
      <div />
    );

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div>{mainCard}</div>
      <div>{backCard}</div>
    </ReactCardFlip>
  );
}

const centerImage = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};
