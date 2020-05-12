import React, {useEffect, useState} from "react";
import axios from "axios";
import LinkIMDB from "./LinkIMDB";
import LinkYouTube from "./LinkYouTube";
import LinkHomePage from "./LinkHomePage";

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
                                     style={{
                                         height: "250px",
                                         textAlign: "left",
                                         backgroundColor: "green",
                                         padding: "0",
                                         position: "relative",
                                     }}>
                                    <h1 style={{
                                        marginLeft: "7%",
                                        marginTop: "50px",
                                        marginRight: "20px"
                                    }}>{title}<span style={{fontStyle: "italic"}}> ({year})</span></h1>
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "0",
                                            verticalAlign: "center",
                                            marginLeft: "7%",
                                            height: "40px"
                                        }}>
                                        <img style={{width: "32px", marginRight: "5px"}}
                                             src={"/images/popularity64.png"} alt="Popularity"/><span
                                        style={{marginRight: "15px"}}>{popularity}</span><img
                                        style={{width: "32px", marginRight: "5px"}} src={"/images/star64.png"}
                                        alt="Votes"/><span style={{marginRight: "5px"}}>{voteAvg}</span><img
                                        style={{width: "32px", marginLeft: "10px", marginRight: "5px"}}
                                        src={"/images/time64.png"}
                                        alt="Duration"/><span style={{marginRight: "15px"}}>{runtime} min</span>
                                    </div>
                                    <div style={{
                                        position: "absolute",
                                        bottom: "0",
                                        verticalAlign: "center",
                                        marginLeft: "55%",
                                        height: "40px",
                                        fontStyle: "italic",
                                    }}>{genres.join(", ")}</div>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6" style={{
                                    height: "250px",
                                    width: "100%",
                                    backgroundColor: "white",
                                    padding: "0",
                                    textAlign: "center"
                                }}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/${IMAGE_SIZES.poster_sizes[2]}${poster}`}
                                        alt="Poster" style={{height: "250px"}}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="row no-gutters">
                                        <div className="col-md-12 d-flex justify-content-center mx-auto" style={{
                                            height: "100px",
                                            backgroundColor: "blue",
                                            padding: "16px"
                                        }}>
                                            <LinkHomePage homepage={homepage}/>
                                            <LinkIMDB imdbId={imdbId}/>
                                            <LinkYouTube youtubeTrailer={youtubeTrailer}/>
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-md-12"
                                             style={{height: "75px", backgroundColor: "yellow"}}>2
                                        </div>
                                    </div>
                                    <div className="row no-gutters">
                                        <div className="col-md-12"
                                             style={{height: "75px", backgroundColor: "green"}}>3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"
                             style={{textAlign: "center", backgroundColor: "red", padding: "0"}}>
                            <div style={{textAlign: "center", padding: "50px"}}>
                                <img
                                    src={`https://image.tmdb.org/t/p/${IMAGE_SIZES.backdrop_sizes[1]}${backdrop}`}
                                    alt="Backdrop" style={{width: "600px"}}
                                />
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


                </div>
            </div>
            <div className="col-1 align-self-end" style={{
                display: "flex",
                flexFlow: "row wrap",
                backgroundColor: "#e6b31e",
                height: "1080px",
                padding: "0"
            }}/>
        </div>)


}

//MovieDetailPage.propTypes = {};*/}

export default MovieDetailPage;
