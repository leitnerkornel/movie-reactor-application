import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {API_URL_MOVIE, API_URL_PICTURE, API_KEY, IMAGE_SIZES} from "../../Constants";
import {getMovieIdFromUrl} from "../../Utils";
import SeatingPicture from "../seating_page/SeatingPicture";
import FirstRow from "../movie_detail_page/FirstRow";

const SeatingChart = (props) => {

    return (
        <div>{props.rows}</div>
    )
}

export default SeatingChart;