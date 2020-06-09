import React, { useContext} from "react";
import {WatchlistContext} from "../context/WatchlistContext";
import MovieCard from "./MovieCard";

const Watchlist = (props) => {
    const [watchlist, setWatchlist] = useContext(WatchlistContext);

    let layout = (
        <div className="row">
            <div
                className="col-2 align-self-start"
                style={{display: "flex", flexFlow: "row wrap"}}
            ></div>
            <div
                className="col-10 align-self-center"
                style={{display: "flex", flexFlow: "row wrap"}}
            >
                {watchlist.map(movie => (
                    <MovieCard movie={movie} key={movie.id} API_KEY={props.API_KEY}/>
                ))}
            </div>
        </div>
    );

    return layout;


};

export default Watchlist;