import ReactCardFlip from "react-card-flip";
import React, { useState, useContext } from "react";
import Get from "../hook/FetchGet";


export default function MovieCard(props) {
    let movie = props.movie;
    let movieId = movie.id;
    let API_KEY = props.API_KEY;
    let currentMovieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    console.log(currentMovieURL);
    const [isLoading, actualMovie] = Get(currentMovieURL, movie);
    const [isFlipped, setIsFlipped] = useState(false);

    let setFlipCard = (e) => {
        e.preventDefault();
        isFlipped ? setIsFlipped(false) : setIsFlipped(true);
    };


    let mainCard = (
        <>
            <div
                id={movie.id}
                className="card border-warning mb-3 clearfix"
                style={{ width: "18rem" }}
            >
                {actualMovie ? (
                    <div className="card-body">
                        <h5 className="card-title">{actualMovie.title.toUpperCase()}</h5>
                        <p className="card-text">
                            {actualMovie.overview}
                        </p>
                    </div>
                    ) : (
                    <div />
                )}
                        <button type="button " class="btn btn-light" onClick={setFlipCard}>
                            Flip
                        </button>
            </div>
        </>
    );

    let backCard =
        actualMovie != null ? (
            <>
                <div
                    id={movie.id}
                    className="card border-warning mb-3 clearfix"
                    style={{ width: "18rem" }}
                >
                    {actualMovie ? (
                        <React.Fragment>
                            <img
                                className="card-img-top"
                                src={actualMovie.poster_path}
                                style={{backgroundColor: "gold"}}
                            />
                        <div className="card-body">
                            <h5 className="card-title">{actualMovie.title.toUpperCase()}</h5>
                            <p className="card-text">Original title: {actualMovie.original_title}</p>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-light" onClick={setFlipCard}>
                                    Flip
                                </button>
                            </div>
                        </div>
                        </React.Fragment>
                    ) : (
                        <div/>
                    )}
                </div>
            </>
        ) : (
            <div />
        );

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div>{mainCard}</div>
            <div>{backCard}</div>
        </ReactCardFlip>
    );
}
