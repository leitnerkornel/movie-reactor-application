import React, {useContext} from 'react';
import {WatchlistContext} from "../context/WatchlistContext";

const AddToWatchlistButton = (props) => {
  let movie = props.movieObject;
  let movieId = movie.id;

  const [watchlist, setWatchlist] = useContext(WatchlistContext);

  let isTheMovieAdded = () => {
    for (let selectedMovie of watchlist) {
      if (selectedMovie.id === movieId) {
        return true;
      }
    }
    return false;
  };

  let addToWatchList = (e) => {
    e.preventDefault();
    if (!isTheMovieAdded() && !watchlist.includes(movie)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  return (
      <div className="col-md-12 d-flex justify-content-center"
           style={columnStyle}>
        <button
            type="button" className="btn btn-warning"
            style={buttonStyle}
            onClick={addToWatchList}>
          {"Add to Watchlist".toUpperCase()}
        </button>
      </div>
  );
}

const columnStyle = {
  height: "300px", backgroundColor: "#2e2e2e", padding: "80px 0"
}

const buttonStyle = {
  fontWeight: "bold"
}

export default AddToWatchlistButton;