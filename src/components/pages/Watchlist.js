import React, {useContext, useEffect, useState} from "react";
import {WatchlistContext} from "../context/WatchlistContext";
import MovieCard from "./MovieCard";

const Watchlist = (props) => {
    // var width = window.innerWidth;
    var width = document.body.clientWidth;
    var height = window.innerHeight;

    let URL = props.url + "?api_key=" + props.API_KEY;
    const [watchlist, setWatchlist] = useContext(WatchlistContext);

    let resizeWindow = () => {
        width = document.body.clientWidth;
    }
    window.addEventListener('resize', resizeWindow);


    let layout = (
        <div className="row media">
            <div className="col-2 align-self-start" style={{
                // ...mainColumnStyle,
                ...{backgroundColor: "#e6b31e", minHeight: height, height: "100%", }}}>
                <b style={pageTitleStyle}>{props.title.toUpperCase()}</b>
            </div>
            <div className="col-10 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"},
                width: width,
                // maxWidth: window.innerWidth,
                minHeight: height}}>
                 {watchlist.length !== 0 ? (
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
                     <div className="card-deck ml-5 mr-3 mt-5">
                         <div
                             className="card border-secondary mt-1 mb-3 clearfix overflow-hidden"
                             style={cardStyle}
                         >
                                 <div className="card-body">
                                     <div className="backdrop-container">
                                         {/*<img*/}
                                         {/*    // src={`https://image.tmdb.org/t/p/${imageSizes.backdrop_sizes[0]}${backdrop}`}*/}
                                         {/*    // alt={`  NO PICTURE AVAILABLE FOR ${actualMovie.title.toUpperCase()}`}*/}
                                         {/*    style={centerImage}*/}
                                         {/*/>*/}
                                     </div>
                                     <div>
                                         <h5 className="card-title" style={{ textAlign: "center" }}>
                                             {`YOU HAVEN'T WATCHLISTED ANYTHING YET`}
                                         </h5>
                                     </div>
                                 </div>
                         </div>
                     </div>
                 )}
            </div>
        </div>

        )

    // let layout = (
    //     <React.Fragment>
    //         <div className="row" style={{ backgroundColor: "#e6b31e", height: "100%", display: "cover", objectFit: "cover" }}>
    //             <div
    //                 className="col-2 align-self-start d-flex align-items-stretch"
    //                 style={{
    //                     // minHeight: height,
    //                     // minWidth: width,
    //                     display: "flex",
    //                     // flexFlow: "row wrap",
    //                     backgroundColor: "#e6b31e",
    //                     zIndex: "1"
    //                 }}
    //             >
    //                 <b style={pageTitleStyle}>{props.title.toUpperCase()}</b>
    //             </div>
    //             <div
    //                 className="col-10 align-self-end"
    //                 style={{
    //                     display: "fixed",
    //                     // flexFlow: "row wrap",
    //                     backgroundColor: "#2e2e2e",
    //                     marginTop: "30px",
    //                     height: height-30,
    //                     top: "50%",
    //                     left: "50%",
    //                     transform: "translate (100%, 100%)",
    //                     zIndex: "0",
    //                     gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    //                 }}
    //             >
    //                 {watchlist ? (
    //                     watchlist.map((movie, index) => (
    //                         <div className="card-deck ml-5 mr-3 mt-5">
    //                             <MovieCard
    //                                 movie={movie}
    //                                 key={movie.id}
    //                                 API_KEY={props.API_KEY}
    //                             />
    //                         </div>
    //                     ))
    //                 ) : (
    //                     <h1 style={{position: "fixed", top: "50%", left: "50%"}}>No movies are watchlisted</h1>
    //                 )}
    //             </div>
    //         </div>
    //     </React.Fragment>
    // );

    return layout;
};

export default Watchlist;

const pageTitleStyle = {
    position: "fixed",
    left: "120px",
    top: "36px",
    backgroundColor: "#e6b31e",
    zIndex: "1",
    textAlign: "left",
    height: "90%",
    fontSize: "1.2em",
    textOrientation: "upright",
    writingMode: "vertical-rl",
};

const mainColumnStyle = {
    display: "flex",
    flexFlow: "row wrap",
    padding: "10",
    transition: "opacity 1s ease-in",
    transitionDuration: "0.3s",
transitionTimingFunction: "ease",
}

const cardStyle = {
    width: "18rem",
    minHeight: "28rem",
    height: "28rem",
    backgroundColor: "#e6b31e",
    borderRadius: "8px",
    textAlign: "justify",
    boxShadow:
        "  0 2.8px 2.2px rgba(200, 200, 200, 0.034),\n" +
        "  0 6.7px 5.3px rgba(200, 200, 200, 0.048),\n" +
        "  0 12.5px 10px rgba(200, 200, 200, 0.06),\n" +
        "  0 22.3px 17.9px rgba(200, 200, 200, 0.072),\n" +
        "  0 41.8px 33.4px rgba(200, 200, 200, 0.086),\n" +
        "  0 100px 80px rgba(200, 200, 200, 0.12)",
    //boxShadow: "10px 10px #e6b31e",
};

const centerImage = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "200px",
    textAlign: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-15.5%, -10%) scale(1)",
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