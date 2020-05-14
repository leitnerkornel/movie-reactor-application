import React, { useContext} from "react";
import {WatchlistContext} from "../context/WatchlistContext";
import MovieCard from "./MovieCard";

import Get from "../hook/FetchGet";
import axios from "axios";
import FetchGet from "../hook/FetchGet";

const Watchlist = (props) => {

    let URL = props.url + "?api_key=" + props.API_KEY;
    const [watchlist, setWatchlist] = useContext(WatchlistContext);

    let layout = (
        <React.Fragment>
            <div className="row" style={{ backgroundColor: "#e6b31e" }}>
                <div
                    className="col-2 align-self-start d-flex align-items-stretch"
                    style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        backgroundColor: "#e6b31e",
                    }}
                >
                    <b style={pageTitleStyle}>{props.title.toUpperCase()}</b>
                </div>
                <div
                    className="col-10 align-self-end"
                    style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        backgroundColor: "#2e2e2e",
                        marginTop: "30px",
                    }}
                >
                    {watchlist ? (
                        watchlist.map((movie, index) => (
                            <div className="card-deck ml-5 mr-3 mt-5">
                                <MovieCard
                                    movie={movie}
                                    key={movie.id}
                                    API_KEY={props.API_KEY}
                                />
                            </div>
                        ))
                    ) : (
                        <h1>No movies are watchlisted</h1>
                    )}
                </div>
            </div>
        </React.Fragment>
    );

    return layout;
};

export default Watchlist;

const pageTitleStyle = {
    position: "fixed",
    left: "12%",
    top: "36px",
    backgroundColor: "#e6b31e",
    zIndex: "1",
    textAlign: "left",
    height: "100%",
    fontSize: "1.2em",
    textOrientation: "upright",
    writingMode: "vertical-rl",
};


//     let layout = (
//         <div className="row">
//             <div
//                 className="col-2 align-self-start"
//                 style={{display: "flex", flexFlow: "row wrap"}}
//             ></div>
//             <div
//                 className="col-10 align-self-center"
//                 style={{display: "flex", flexFlow: "row wrap"}}
//             >
//                 {watchlist.map(movie => (
//                     <MovieCard movie={movie} key={movie.id} API_KEY={props.API_KEY}/>
//                 ))}
//             </div>
//         </div>
//     );
//
//     return layout;
//
//
// };
//
// export default Watchlist;