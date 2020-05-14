import React, { useContext} from "react";
import {WatchlistContext} from "../context/WatchlistContext";
import MovieCard from "./MovieCard";

const Watchlist = (props) => {
    var width = window.innerWidth;
    var height = window.innerHeight;
    let URL = props.url + "?api_key=" + props.API_KEY;
    const [watchlist, setWatchlist] = useContext(WatchlistContext);
    let layout = (
        <div className="row media">
            <div className="col-2 align-self-start" style={{
                // ...mainColumnStyle,
                ...{backgroundColor: "#e6b31e", minHeight: height, height: "100%", }}}>
                <b style={pageTitleStyle}>{props.title.toUpperCase()}</b>
            </div>
            <div className="col-10 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}, width: width,  maxWidth: width, minHeight: height}}>
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
                     <h1 style={{position: "fixed", top: "50%", left: "50%"}}>No movies are watchlisted</h1>
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
    padding: "10"
}

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