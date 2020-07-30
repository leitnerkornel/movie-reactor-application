import React, { useContext, useEffect, useState } from "react";
import { WatchlistContext } from "../../context/WatchlistContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {GET_CONFIG, POST_CONFIG} from "../../../Constants";

const AddToWatchlistButton = (props) => {
  let movie = props.movieObject;
  let movieId = movie.id;

  const history = useHistory();

  const redirect = () => {
    history.push("/auth/login");
    window.location.reload();
  };

  const [watchlist, setWatchlist] = useContext(WatchlistContext);

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
    if (localStorage.getItem("token") === null) {
      redirect();
    } else if (!isTheMovieAdded() && !watchlist.includes(movie)) {
      axios
        .post(`http://localhost:8080/watchlist/save/${movie.id}`, "", {
          headers: POST_CONFIG,
        })
        .then((response) =>
          axios
            .get(`http://localhost:8080/watchlist/user`, GET_CONFIG)
            .then((response) => setWatchlist(response.data))
        );
    }
  };

  const removeFromWatchlist = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/watchlist/delete/${movie.id}`, {
        headers: POST_CONFIG,
      })
      .then((response) =>
        axios
          .get(`http://localhost:8080/watchlist/user`, GET_CONFIG)
          .then((response) => setWatchlist(response.data))
      );
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
