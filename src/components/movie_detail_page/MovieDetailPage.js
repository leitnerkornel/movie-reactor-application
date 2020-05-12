import React, {useEffect, useState} from "react";
import axios from "axios";
import LinkIMDB from "./LinkIMDB";
import LinkYouTube from "./LinkYouTube";

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

    const getYearFromDate = (date) => {
        return date.split("-")[0];
    };

    const [backdrop, setBackdrop] = useState("");
    const [poster, setPoster] = useState("");
    const [title, setTitle] = useState("");
    const [originalTitle, setOriginalTitle] = useState("");
    const [popularity, setPopularity] = useState("");
    const [voteAvg, setVoteAvg] = useState("");
    const [year, setYear] = useState("");
    const [genres, setGenres] = useState([]);
    const [homepage, setHomepage] = useState("");
    const [runtime, setRuntime] = useState("");
    const [budget, setBudget] = useState("");
    const [revenue, setRevenue] = useState("");
    const [originalLanguage, setOriginalLanguage] = useState("");
    const [spokenLanguages, setSpokenLanguages] = useState([]);
    const [imdbId, setImdbId] = useState("");
    const [companies, setCompanies] = useState([]);
    const [youtubeTrailer, setYoutubeTrailer] = useState("");
    const [overview, setOverview] = useState("");

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
                console.log(res.data);
                setBackdrop(res.data.backdrop_path);
                setPoster(res.data.poster_path);
                setTitle(res.data.title);
                setOriginalTitle(res.data.original_title);
                setPopularity(res.data.popularity);
                setVoteAvg(res.data.vote_average);
                setYear(getYearFromDate(res.data.release_date));
                setGenres(
                    res.data.genres.map((item) => {
                        return item.name;
                    })
                );
                setHomepage(res.data.homepage);
                setRuntime(res.data.runtime);
                setBudget(res.data.budget);
                setRevenue(res.data.revenue);
                setOriginalLanguage(res.data.original_language);
                setSpokenLanguages(
                    res.data.spoken_languages.map((item) => {
                        return item.name;
                    })
                );
                setImdbId(res.data.imdb_id);
                setCompanies(
                    res.data.production_companies.map((item) => {
                        return [item.name, item.logo_path];
                    })
                );
                setOverview(res.data.overview);
            });
    }, [MOVIE_ID, API_KEY]);

    return (
        <div className={"media"}>
            <div className="col-2 align-self-start" style={{
                display: "flex",
                flexFlow: "row wrap",
                backgroundColor: "#e6b31e",
                height: "1080px",
                padding: "0"
            }}>
            </div>
            <div className="col-9 align-self-center" style={{
                display: "flex",
                flexFlow: "row wrap",
                padding: "0",
                backgroundColor: '#343434',
                height: "1080px"
            }}>
                <div className="container-fluid" style={{padding: "0"}}>
                    <div className="row no-gutters">
                        <div className="col-md-12" style={{height: "50px", backgroundColor: "#e6b31e", padding: "0"}}>
                        </div>
                    </div>
                    <div className="row no-gutters" style={{padding: "0"}}>
                        <div className="col-md-6">
                            <div className="row no-gutters">
                                <div className="col-md-12"
                                     style={{height: "250px", width: "100%", backgroundColor: "#e6b31e", padding: "0"}}>
                                    <div>{title}</div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6" style={{
                                    height: "250px",
                                    width: "100%",
                                    backgroundColor: "#e6b31e",
                                    padding: "0",
                                    textAlign: "right"
                                }}>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{textAlign: "center", backgroundColor: "red", padding: "0"}}>
                            <div style={{textAlign: "center", padding: "50px"}}>
                                <img
                                    src={`https://image.tmdb.org/t/p/${IMAGE_SIZES.backdrop_sizes[1]}${backdrop}`}
                                    alt="Backdrop" style={{width: "600px"}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div style={{width: "100%", height: "700px", backgroundColor: "#343434"}}>
                    <div className={"backdrop-container"}
                         style={{height: "250px", width: "100%", backgroundColor: '#2e2e2e', textAlign: "right"}}>
                        <img
                            src={`https://image.tmdb.org/t/p/${IMAGE_SIZES.backdrop_sizes[1]}${backdrop}`}
                            alt="Backdrop" style={{padding: "50px", width: "50%"}}
                        />
                    </div>
                    <div style={{ padding: "50px"}}>{title}</div>

                </div>
                <LinkIMDB imdbId={imdbId}/>,
                <LinkYouTube youtubeTrailer={youtubeTrailer}/>*/}
            </div>
            <div className="col-1 align-self-end" style={{
                display: "flex",
                flexFlow: "row wrap",
                backgroundColor: "#e6b31e",
                height: "1080px",
                padding: "0"
            }}/>
        </div>

        /*<div>
            This is a Movie Detail Page

            <div className={"poster-container"}>
                <img
                    src={`https://image.tmdb.org/t/p/${IMAGE_SIZES.poster_sizes[2]}${poster}`}
                    alt="Poster"
                />
            </div>
        </div>,
            <div>{title}</div>,
            <div>{originalTitle}</div>,
            <div>{popularity}</div>,
            <div>{voteAvg}</div>,
            <div>{year}</div>,
            <div>{genres}</div>,
            <div>{homepage}</div>,
            <div>{runtime}</div>,
            <div>{budget}</div>,
            <div>{revenue}</div>,
            <div>{originalLanguage}</div>,
            <div>{spokenLanguages}</div>,
            <div>{imdbId}</div>,
            <div>{companies}</div>,
            <div>{youtubeTrailer}</div>,
            <div>{overview}</div>,

            <div className="row">
                <div className="col">{popularity}</div>
                <div className="col">{voteAvg}</div>
                <div className="col">{year}</div>
            </div>,

            */
    );
};

MovieDetailPage.propTypes = {};

export default MovieDetailPage;
