import React, {useEffect, useState} from "react";
import axios from "axios";

import FirstRow from "./FirstRow";
import CoverPicture from "./CoverPicture";
import PosterPicture from "./PosterPicture";
import LinksToExternalPagesGroup from "./LinksToExternalPagesGroup";
import TitleGenreRatingBox from "./TitleGenreRatingBox";

const API_KEY = process.env.REACT_APP_API_KEY;

const IMAGE_SIZES = {
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

const MovieDetailPage = () => {

    const getMovieIdFromUrl = () => {
        let urlFragments = window.location.href.split("/");
        return urlFragments[urlFragments.length - 1];
    };
    let MOVIE_ID = getMovieIdFromUrl();

    const [backdrop, setBackdrop] = useState(null);
    const [poster, setPoster] = useState("");
    const [title, setTitle] = useState("");
    const [popularity, setPopularity] = useState("");
    const [voteAvg, setVoteAvg] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [genres, setGenres] = useState([]);
    const [homepage, setHomepage] = useState("");
    const [runtime, setRuntime] = useState("");
    const [spokenLanguages, setSpokenLanguages] = useState([]);
    const [imdbId, setImdbId] = useState("");
    const [youtubeTrailer, setYoutubeTrailer] = useState("");
    const [overview, setOverview] = useState("");
    const [tagline, setTagline] = useState("");

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`
            )
            .then((res) => {
                if (res.data.results.length === 0) {
                    setYoutubeTrailer('no-trailer');
                } else {
                    setYoutubeTrailer(res.data.results[0].key);
                }
            });
        axios
            .get(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}`)
            .then((res) => {
                setBackdrop(res.data["backdrop_path"]);
                setPoster(res.data["poster_path"]);
                setTitle(res.data["title"]);
                setPopularity(res.data["popularity"]);
                setVoteAvg(res.data["vote_average"]);
                setReleaseDate(res.data["release_date"]);
                setGenres(
                    res.data["genres"].map((item) => {
                        return item["name"];
                    })
                );
                setHomepage(res.data["homepage"]);
                setRuntime(res.data["runtime"]);
                setSpokenLanguages(
                    res.data["spoken_languages"].map((item) => {
                        return item["name"];
                    })
                );
                setImdbId(res.data["imdb_id"]);
                setOverview(res.data["overview"]);
                setTagline(res.data["tagline"]);
            });
    }, [MOVIE_ID]);

    return (
        <div className={"media"}>
            <div className="col-2 align-self-start" style={{
                display: "flex",
                flexFlow: "row wrap",
                backgroundColor: "#e6b31e",
                height: "1500px",
                padding: "0"
            }}>
            </div>
            <div className="col-9 align-self-center" style={{
                display: "flex",
                flexFlow: "row wrap",
                padding: "0",
                backgroundColor: '#343434',
                height: "1500px"
            }}>
                {/* The center container div. There is a grid in it. */}
                <div className="container-fluid" style={{padding: "0"}}>
                    <FirstRow/>
                    <div className="row no-gutters">
                        {/*IF IMAGE load takes too much time, too slow, should change the size to 1 or 2. 0 is too small. */}
                        <CoverPicture size={IMAGE_SIZES.backdrop_sizes[3]}
                                      backdrop={backdrop}/>
                    </div>
                    <div className="row no-gutters" style={{padding: "0"}}>
                        <div className="col-md-5"
                             style={{textAlign: "center", padding: "5% 5% 0"}}>
                            <PosterPicture imageSize={IMAGE_SIZES.poster_sizes[3]}
                                           poster={poster}/>
                            <div className="row no-gutters">
                                <div
                                    className="col-md-12 d-flex justify-content-center align-content-center flex-wrap"
                                    style={{height: "100px", backgroundColor: "#2e2e2e"}}><p style={{
                                    fontStyle: "italic",
                                    fontSize: "20px",
                                    color: "white",
                                    textAlign: "center"
                                }}>{tagline}</p>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <LinksToExternalPagesGroup
                                    homepage={homepage}
                                    imdbId={imdbId}
                                    youtubeTrailer={youtubeTrailer}/>
                            </div>
                            <div className="row no-gutters">
                                <div
                                    className="col-md-12 d-flex justify-content-center align-content-center flex-wrap"
                                    style={{height: "150px", backgroundColor: "#2e2e2e"}}>
                                    <div style={{
                                        fontStyle: "italic",
                                        fontSize: "20px",
                                        color: "white",
                                        textAlign: "center"
                                    }}>
                                        <p>Spoken language(s):</p>
                                        <p>{spokenLanguages.join(", ")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7" style={{textAlign: "center", padding: "5% 5% 0",}}>
                            <TitleGenreRatingBox backdrop={backdrop}
                                                 title={title}
                                                 releaseDate={releaseDate}
                                                 genres={genres}
                                                 popularity={popularity}
                                                 voteAvg={voteAvg}
                                                 runtime={runtime}/>
                            <div className="row no-gutters d-flex">
                                <div className="col-md-8 d-flex " style={{
                                    height: "300px",
                                    width: "100%",
                                    color: "white",
                                    backgroundColor: "#2e2e2e",
                                    textAlign: "justify",
                                }}>
                                    <div className="justify-content-center align-self-center"
                                         style={{marginLeft: "10%", lineHeight: "150%"}}>
                                        {overview}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="col-md-12 d-flex justify-content-center"
                                         style={{height: "300px", backgroundColor: "#2e2e2e", padding: "80px 0",}}>
                                        <button type="button" className="btn btn-warning"
                                                style={{fontWeight: "bold"}}>Add to Watchlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-1 align-self-end" style={{
                display: "flex",
                flexFlow: "row wrap",
                backgroundColor: "#e6b31e",
                height: "1500px",
                padding: "0"
            }}/>
        </div>
    );
}

export default MovieDetailPage;
