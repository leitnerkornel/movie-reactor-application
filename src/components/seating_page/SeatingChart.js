import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {API_URL_MOVIE, API_URL_PICTURE, API_KEY, IMAGE_SIZES} from "../../Constants";
import {getMovieIdFromUrl} from "../../Utils";
import SeatingPicture from "../seating_page/SeatingPicture";
import FirstRow from "../movie_detail_page/FirstRow";
import TheaterSeat from "./TheaterSeat";
import SeatsRow from "./SeatsRow";

const SeatingChart = (props) => {

    let columns = [];
    for (let i = 0; i < props.columns; i++) {
        columns.push(<SeatsRow column={i} rows={props.rows}/>);
    }

    return (
        <div style={mainCardStyle} key="seating-chart" className="card-deck m-auto">
            {columns}
        </div>
    )
}

export default SeatingChart;

const mainCardStyle = {
    position: "absolute",
    top: "58%",
    left: "50%",
    transform: "translate(-50%)",
    zIndex: "0",
    flex: "wrap"
}