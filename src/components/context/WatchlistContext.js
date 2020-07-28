import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const WatchlistContext = createContext([]);

export const WatchlistProvider = (props) => {
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user`)
      .then((response) => setWatchlist(response.data));
    //console.log(topRatedMovies);
  }, []);

  return (
    <WatchlistContext.Provider value={[watchlist, setWatchlist]}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
