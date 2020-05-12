import React, { useState, createContext } from "react";

export const Watchlist = createContext();

export const WatchlistProvider = (props) => {
    const [watchlist, setWatchlist] = useState([
    ]);
    return (
        <WatchlistProvider.Provider value={[watchlist, setWatchlist]}>
            {props.children}
        </WatchlistProvider.Provider>
    );
};