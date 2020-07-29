import React, { useContext, useEffect, useState } from "react";
import { WatchlistContext } from "../../context/WatchlistContext";
import axios from "axios";

const AddToWatchlistButton = (props) => {
  let movie = props.movieObject;
  let movieId = movie.id;

  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user`)
      .then((response) => setWatchlist(response.data));
  }, []);

  let isTheMovieAdded = () => {
    for (let selectedMovie of watchlist) {
      if (selectedMovie.id === movieId) {
        return true;
      }
    }
    return false;
  };

  const addToWatchList = (e) => {
    e.preventDefault();
    //if (!isTheMovieAdded() && !watchlist.includes(movie)) {
    //?
    //setWatchlist([...watchlist, movie]);
    axios
      .post(`http://localhost:8080/save/${movie.id}`)
      .then((response) => console.log(response.data));
    //}
  };

  const removeFromWatchlist = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/delete/${movie.id}`)
      .then((response) => console.log(response.data));
    // let filteredArray = watchlist.filter(
    //   (selectedMovie) => selectedMovie.id !== movieId
    // );
    // setWatchlist(filteredArray);
  };

  if (isTheMovieAdded()) {
    return (
      <div
        className="col-md-12 d-flex justify-content-center"
        style={columnStyle}
      >
        <button
          type="button"
          className="btn btn-danger"
          style={buttonStyle}
          onClick={removeFromWatchlist}
        >
          {"Remove from Watchlist".toUpperCase()}
        </button>
      </div>
    );
  } else {
    return (
      <div
        className="col-md-12 d-flex justify-content-center"
        style={columnStyle}
      >
        <button
          type="button"
          className="btn btn-warning"
          style={buttonStyle}
          onClick={addToWatchList}
        >
          {"Add to Watchlist".toUpperCase()}
        </button>
      </div>
    );
  }
};

const columnStyle = {
  height: "300px",
  backgroundColor: "#2e2e2e",
  padding: "80px 20px",
};

const buttonStyle = {
  fontWeight: "bold",
  width: "80%",
};

export default AddToWatchlistButton;
