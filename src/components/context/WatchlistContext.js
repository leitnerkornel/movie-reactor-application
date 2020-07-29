import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const WatchlistContext = createContext([]);

export const WatchlistProvider = (props) => {
  const [watchlist, setWatchlist] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      username: `${localStorage.getItem("username")}`,
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user`, config)
      .then((response) => setWatchlist(response.data));
  }, []);

  return (
    <WatchlistContext.Provider value={[watchlist, setWatchlist]}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
