import React, { useContext, useEffect, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import axios from "axios";
import Get from "../hook/FetchGet";

const SeatLayout = (props) => { }
// let API_KEY = props.API_KEY;
//
// // let movie = props.movie;
// let movieId = movie.id;
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
            setBackdrop(res.data.backdrop_path);
            setPoster(res.data.poster_path);
        });
});

export default SeatLayout;