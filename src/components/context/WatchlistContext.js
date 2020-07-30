import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import {GET_CONFIG} from "../../Constants";

export const WatchlistContext = createContext([]);

export const WatchlistProvider = (props) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user`, GET_CONFIG)
      .then((response) => setWatchlist(response.data));
  }, []);

  return (
    <WatchlistContext.Provider value={[watchlist, setWatchlist]}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
