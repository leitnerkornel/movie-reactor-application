import ReactCardFlip from "react-card-flip";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Get from "../hook/FetchGet";
import {ThemeProvider} from "styled-components";
import MovieDetailPage from "../movie_detail_page/MovieDetailPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SelectionPage from "./SelectionPage";
import {elastic as BurgerMenu} from "react-burger-menu";
import {WatchlistContext} from "../context/WatchlistContext";

const imageSizes = {
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

export default function MovieCard(props) {
  let overviewCharacterLimit = 100;
  let movie = props.movie;
  let movieId = movie.id;
  let API_KEY = props.API_KEY;
  let currentMovieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  const [isLoading, actualMovie] = Get(currentMovieURL, movie);
  const [isFlipped, setIsFlipped] = useState(false);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  const [backdrop, setBackdrop] = useState("");
  const [poster, setPoster] = useState("");

  const [watchlist, setWatchlist] = useContext(WatchlistContext);

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

  let limitedOverView = actualMovie ? (actualMovie.overview.substring(0, (actualMovie.overview.length > overviewCharacterLimit ? overviewCharacterLimit: actualMovie.overview.length)) + "...") : ("nothing");

  let linkToMovieDetailPage = (
      <Link
          to={`/movie/${movieId}`}
      >Details</Link>
  );

    let addToWatchlist = (e) => {
        e.preventDefault();
        console.log("adding in progress");
        if ( !watchlist.includes(movie)){
            setWatchlist([...watchlist, movie]);
            setAddedToWatchlist(true);
        }
    };

    let removeFromWatchlist = (e) => {
        e.preventDefault();
        /*let movie = e.target.value;
        setWatchlist(watchlist.filter((e)=>(e !== movie)));
        setAddedToWatchlist(false);*/
    };




  let mainCard = (
    <>
      <div
        id={`${movie.id}-front`}
        className="card border-secondary mb-3 clearfix overflow-hidden"
        style={cardStyle}
        onClick={setFlipCard}
      >
        {actualMovie ? (
          <div className="card-body">
            <div className={"poster-container"}>
              <img
                style={centerCoverImage}
                src={`https://image.tmdb.org/t/p/${imageSizes.poster_sizes[3]}${poster}`}
                alt={actualMovie.title.toUpperCase()}
              />
            </div>
          </div>
        ) : (
          <div>Card is loading</div>
        )}
        <div className="btn-group" role="group" aria-label="Basic example">
            {addedToWatchlist ? <button type="button" className="btn btn-light" onClick={addToWatchlist}>
                Remove </button> : <button type="button" className="btn btn-light" onClick={removeFromWatchlist}>
                Add to Watchlist </button>}


            <button type="button" className="btn btn-light">
                {linkToMovieDetailPage}
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
          className="card border-secondary mb-3 clearfix overflow-hidden"
          style={cardStyle}
          onClick={setFlipCard}
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
                <p className="card-text overflow-hidden" >
                  Original title: {actualMovie.original_title}
                    <span>&nbsp;&nbsp;</span>
                  {limitedOverView}
                </p>

              </div>
            </React.Fragment>
          ) : (
            <div>Card is loading</div>
          )}
            <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
            >
                {addedToWatchlist ? <button type="button" className="btn btn-light" onClick={addToWatchlist}>
                    Remove </button> : <button type="button" className="btn btn-light" onClick={removeFromWatchlist}>
                    Add to Watchlist </button>}
            </div>
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

const centerCoverImage = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0.88)",
    zIndex: "0"
}

const cardStyle = {
    width: "18rem",
    minHeight: "28rem",
    height: "28rem",
    backgroundColor: "#e6b31e",
};
