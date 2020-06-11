import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {API_URL_MOVIE, API_URL_PICTURE, API_KEY, IMAGE_SIZES} from "../../Constants";
import {getMovieIdFromUrl} from "../../Utils";
import SeatingPicture from "../seating_page/SeatingPicture";
import FirstRow from "../movie_detail_page/FirstRow";
import SeatingChart from "../seating_page/SeatingChart";
import ShowTime from "../seating_page/ShowTime";
import ShowDate from "../seating_page/ShowDate";
import Theater from "../seating_page/Theater";
import RuntimeElement from "../seating_page/RuntimeElement";

const SeatLayout = (props) => {
    let screeningId = getMovieIdFromUrl();
    let movieUrl = "";

    const [movieId, setMovieId] = useState(null);
    const [startingTime, setStartingTime] = useState(null);
    const [startingDate, setStartingDate] = useState(null);
    const [numberOfRows, setNumberOfRows] = useState(0);
    const [seatsPerNumberOfRows, setSeatsPerNumberOfRows] = useState(0);
    // const [unavailable, setUnavailable] = useState(true);
    // const [loaded, setLoaded] = useState(false);
    const [auditorium, setAuditorium] = useState("");

    // const [movieObject, setMovieObject] = useState({})
    const [backdrop, setBackdrop] = useState(null);
    // const [poster, setPoster] = useState("");
    const [title, setTitle] = useState("");
    // const [popularity, setPopularity] = useState("");
    // const [voteAvg, setVoteAvg] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    // const [genres, setGenres] = useState([]);
    // const [homepage, setHomepage] = useState("");
    const [runtime, setRuntime] = useState("");
    // const [spokenLanguages, setSpokenLanguages] = useState([]);
    // const [imdbId, setImdbId] = useState("");
    // const [youtubeTrailer, setYoutubeTrailer] = useState("");
    // const [overview, setOverview] = useState("");
    // const [tagline, setTagline] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`http://localhost:8080/show/${screeningId}`)
            .then((res) => {
                setMovieId(res.data.movie.id);
                setStartingTime(res.data["startingTime"].substring(0,5));
                setAuditorium(res.data["room"]["name"]);
                setStartingDate(res.data["startingDate"]);
                setSeatsPerNumberOfRows(res.data.room.numberOfSeatsPerRow);
                setNumberOfRows(res.data.room.numberOfRows);


            });
    }, [])

    useEffect(() => {
        if (movieId) {
            movieUrl = `${API_URL_MOVIE}${movieId}?api_key=${API_KEY}`;
            // let videoUrl = `${API_URL_MOVIE}${movieId}/videos?api_key=${API_KEY}`;
            axios
                .get(movieUrl)
                .then((res) => {
                    // console.log(startingTime);
                    // setMovieObject(res.data);
                    setBackdrop(res.data["backdrop_path"]);
                    // setPoster(res.data["poster_path"]);
                    setTitle(res.data["title"]);
                    // setPopularity(res.data["popularity"]);
                    // setVoteAvg(res.data["vote_average"]);
                    setReleaseDate(res.data["release_date"]);
                    // setGenres(
                    //     res.data["genres"].map((item) => {
                    //         return item["name"];
                    //     })
                    // );
                    // setHomepage(res.data["homepage"]);
                    setRuntime(res.data["runtime"]);
                    // setSpokenLanguages(
                    //     res.data["spoken_languages"].map((item) => {
                    //         return item["name"];
                    //     })
                    // );
                    // setImdbId(res.data["imdb_id"]);
                    // setOverview(res.data["overview"]);
                    // setTagline(res.data["tagline"]);
                    //
                    // setUnavailable(false);
                })
            // .catch(err => {
            //     if (err.response.status === 404) {
            //         setUnavailable(true);
            //         setLoaded(true);
            //     }
            // });
        }
    }, [movieId]);

    function checkStatus(response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    function parseJSON(response) {
        return response.json();
    }

    return (
        <div className="row no-gutters">

            <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
            </div>
            <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
                <div className="container-fluid" style={{padding: "0"}}>
                    <FirstRow/>
                    <div className="row no-gutters">
                        <SeatingPicture size={IMAGE_SIZES.backdrop_sizes[3]}
                                      backdrop={backdrop} />
                    </div>
                    <div>
                        <h1 style={titleStyle}>{title} <span className="hazy">({releaseDate.substring(0,4)})</span></h1>
                        <Theater theater={auditorium}/>
                        <ShowTime time={startingTime}/>
                        <ShowDate date={startingDate}/>
                        <RuntimeElement runtime={runtime}/>
                        <SeatingChart rows={numberOfRows} columns={seatsPerNumberOfRows} screeningId={screeningId} />
                    </div>
                    <h1>{title}</h1>
                </div>
            </div>
            <div className="col-1 align-self-end" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}/>
        </div>
    )
}

export default SeatLayout;

const mainColumnStyle = {
    // display: "flex",
    flexFlow: "row wrap",
    height: "1500px",
    padding: "0"
}

const titleStyle = {
    position: "absolute",
    fontSize: "3em",
    top: "30%",
    left: "53%",
    transform: "translate(-50%, -7%)",
    zIndex: "1",
    color: "white",
}





