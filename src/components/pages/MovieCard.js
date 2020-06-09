import ReactCardFlip from "react-card-flip";
import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import Get from "../hook/FetchGet";
import {Link} from "react-router-dom";
import {WatchlistContext} from "../context/WatchlistContext";

export default function MovieCard(props) {

  let movie = props.movie;
  let movieId = movie.id;
  let API_KEY = props.API_KEY;
  let currentMovieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  const [isLoading, actualMovie] = Get(currentMovieURL, movie);
  const [isFlipped, setIsFlipped] = useState(false);

  const [backdrop, setBackdrop] = useState("");
  const [poster, setPoster] = useState("");
  const [watchlist, setWatchlist] = useContext(WatchlistContext);

  useEffect(() => {
    axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
        .then((res) => {
          setBackdrop(res.data['backdrop_path']);
          setPoster(res.data['poster_path']);
        });
  });

  let setFlipCard = (e) => {
    e.preventDefault();
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  let limitString = (inputString, titleString) => {
    let overviewCharacterLimit = 180 - titleString.length * 2;
    let outputString = "No overview available.";
    if (inputString.length > overviewCharacterLimit) {
      for (let i = 0; i < inputString.length - overviewCharacterLimit; i++) {
        if (inputString.charAt(overviewCharacterLimit + i) === " ") {
          return inputString.substring(0, overviewCharacterLimit + i) + " ...";
        }
      }
    } else {
      outputString = inputString;
    }

    return outputString;
  }

  let limitedOverview =
      actualMovie
          ? limitString(actualMovie.overview, actualMovie.title)
          : "Loading / Not available";

  let linkToMovieDetailPage = (
      <Link to={`/movie/${movieId}`} style={buttonStyle}>
        {"Details".toUpperCase()}
      </Link>
  );

  let addToWatchlist = (e) => {
    e.preventDefault();
    if (!isTheMovieAdded() && !watchlist.includes(movie)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  let removeFromWatchlist = (e) => {
    e.preventDefault();
    let filteredArray = watchlist.filter(
        (selectedMovie) => selectedMovie.id !== movieId
    );
    setWatchlist(filteredArray);
  };

  let isTheMovieAdded = () => {
    for (let selectedMovie of watchlist) {
      if (selectedMovie.id == movieId) {
        return true;
      }
    }
    return false;
  };

  let cardButtons = (
      <div className="btn-group" role="group" aria-label="Basic example">
        {isTheMovieAdded() ? (
            <button
                type="button"
                className="btn btn-secondary"
                onClick={removeFromWatchlist}
                style={{
                  opacity: "0.7",
                  transition: ".7s",
                  transitionTimingFunction: "ease",
                }}
            >
              {"unWatchlist".toUpperCase()}
            </button>
        ) : (
            <button
                type="button"
                className="btn btn-secondary"
                onClick={addToWatchlist}
                style={{
                  opacity: "1",
                  transition: ".7s",
                  transitionTimingFunction: "ease",
                }}
            >
              {"Watchlist it!".toUpperCase()}
            </button>
        )}
        <Link to={`/movie/${movieId}`} style={buttonStyle}>
          <button type="button" className="btn btn-secondary"
                  style={{...buttonStyle, borderRadius: "0px", width: "130px"}}>
            {"Details".toUpperCase()}
          </button>
        </Link>
      </div>
  );

  let mainCard = (
      <>
        <div
            id={`${movie.id}-front`}
            className="card border-secondary mt-1 mb-3 clearfix overflow-hidden "
            style={cardStyle}
        >
          {actualMovie ? (
              <div className="card-body" onClick={setFlipCard}>
                <div
                    className={"poster-container"}
                    data-toggle="tooltip"
                    title={actualMovie.title}
                >
                  <img
                      style={centerCoverImage}
                      src={`https://image.tmdb.org/t/p/${imageSizes.poster_sizes[3]}${poster}`}
                      alt={`WE ARE SORRY, THERE IS NO POSTER IMAGE FOR THE MOVIE TITLED '${actualMovie.title.toUpperCase()}'`}
                  />
                </div>
              </div>
          ) : (
              <div>Card is loading</div>
          )}
          {cardButtons}
        </div>
      </>
  );

  let ratedAdultLogo =
      actualMovie && actualMovie['adult'] ? (
          <img
              style={ratedAdultStyle}
              src={"/images/adult.png"}
              alt="Votes"
              data-toggle="tooltip"
              title="Rated adult"
          />
      ) : (
          <React.Fragment/>
      );

  let ratingBackgroundLogo = actualMovie && actualMovie['vote_average'] !== 0 ? (
      <img
          style={ratingBackgroundStyle}
          src={"/images/star64.png"}
          alt="Votes"
          data-toggle="tooltip"
      />
  ) : (
      <div/>
  );

  let ratingNumber = actualMovie && actualMovie['vote_average'] !== 0 ? (
      <div
          style={ratingStyle}
          title={`User rating: ${actualMovie['vote_average']}, based on ${actualMovie['vote_count']} votes.`}
      >
        <b>{`${actualMovie['vote_average']}`}</b>
      </div>
  ) : (
      <div/>
  );

  let backCard =
      actualMovie != null ? (
          <>
            <div
                id={`${movie.id}-back`}
                className="card border-secondary mt-1 mb-3 clearfix overflow-hidden"
                style={cardStyle}
            >
              {actualMovie ? (
                  <div className="card-body" onClick={setFlipCard}>
                    <div className="backdrop-container">
                      <img
                          src={`https://image.tmdb.org/t/p/${imageSizes.backdrop_sizes[0]}${backdrop}`}
                          alt={`  NO PICTURE AVAILABLE FOR ${actualMovie.title.toUpperCase()}`}
                          style={centerImage}
                      />
                    </div>
                    <div>
                      <h5 className="card-title" style={{textAlign: "center"}}>
                        {`${actualMovie.title.toUpperCase()} (${actualMovie['release_date'].slice(
                            0,
                            4
                        )})`}
                      </h5>
                      <span className="card-text overflow-hidden">
                        {ratingBackgroundLogo}
                        {ratingNumber}
                        {ratedAdultLogo}
                        {limitedOverview}
                      </span>
                    </div>
                  </div>
              ) : (
                  <div>Card is loading</div>
              )}
              {cardButtons}
            </div>
          </>
      ) : (
          <div/>
      );

  return (
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div>{mainCard}</div>
        <div>{backCard}</div>
      </ReactCardFlip>
  );
}

const imageSizes = {
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

const centerImage = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  minHeight: "200px",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-15.5%, -10%) scale(1)",
};

const centerCoverImage = {
  position: "absolute",
  top: "0%",
  left: "50%",
  transform: "translate(-50%, -7%) scale(0.88)",
  zIndex: "0",
};

const cardStyle = {
  width: "18rem",
  minHeight: "28rem",
  height: "28rem",
  backgroundColor: "#e6b31e",
  borderRadius: "8px",
  textAlign: "justify",
  boxShadow:
      "  0 2.8px 2.2px rgba(200, 200, 200, 0.034),\n" +
      "  0 6.7px 5.3px rgba(200, 200, 200, 0.048),\n" +
      "  0 12.5px 10px rgba(200, 200, 200, 0.06),\n" +
      "  0 22.3px 17.9px rgba(200, 200, 200, 0.072),\n" +
      "  0 41.8px 33.4px rgba(200, 200, 200, 0.086),\n" +
      "  0 100px 80px rgba(200, 200, 200, 0.12)",
};

const buttonStyle = {
  color: "white",
  textDecoration: "none",
};

const ratingStyle = {
  position: "absolute",
  top: "43.5%",
  left: "15%",
  transform: "translate(-50%, -50%)",
  zIndex: "1",
  textAlign: "center",
};

const ratingBackgroundStyle = {
  position: "absolute",
  top: "43%",
  left: "15%",
  transform: "translate(-50%, -50%)",
  opacity: ".85",
  zIndex: "1",
  width: "50px",
};

const ratedAdultStyle = {
  position: "absolute",
  top: "43%",
  left: "80%",
  backgroundColor: "#e6b31e",
  transform: "translate(-50%, -50%)",
  zIndex: "1",
  borderRadius: "50%",
  width: "35px",
};
