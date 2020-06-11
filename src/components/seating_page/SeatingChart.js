import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_URL_MOVIE, API_URL_PICTURE, API_KEY, IMAGE_SIZES} from "../../Constants";
import {getMovieIdFromUrl} from "../../Utils";
import SeatingPicture from "../seating_page/SeatingPicture";
import FirstRow from "../movie_detail_page/FirstRow";
import TheaterSeat from "./TheaterSeat";

const SeatingChart = (props) => {

    let freeSeatString = "fa-square-o";
    let occupiedSeatString = "fa-square";

    let [occupiedSeats, setOccupiedSeats] = useState(null);
    let occupiedSeatsMap = new Map();

    let columns = [[]];
    for (let i = 0; i < props.columns; i++) {
        let row = []
        for (let j = 0; j < props.rows; j++) {
            row.push(<TheaterSeat key={`row-${i}-seat-${j}`} row={j} column={i}/>)
        }
        columns.push(<>{row} <p/></>)
    }

    useEffect(() => {
        // window.scrollTo(0, 0);
        axios
            .get(`http://localhost:8080/reserved-seats/show/${props.screeningId}`)
            .then((res) => {
                setOccupiedSeats([res.data]);
            });
    }, [])

    const getOccupiedSeats = () => {
        if (occupiedSeats) {
            for (let currentOccupied of occupiedSeats[0]) {
                let currentSeat = currentOccupied.seat;
                let currentKey = currentSeat["row"].toString();
                let currentValue = currentSeat["number"].toString();

                if (occupiedSeatsMap.get(currentKey) !== undefined) {
                    let valuesToCheck = occupiedSeatsMap.get(currentKey);
                    if (valuesToCheck !== currentValue) {
                        occupiedSeatsMap.set(currentKey, [...valuesToCheck, currentValue]);
                    }
                } else {
                    occupiedSeatsMap.set(currentKey, currentValue);
                }
            }
            // // console.log("map")
            // console.log(occupiedSeatsMap);
            // // console.log(occupiedSeats[0]);
        }
    }

    getOccupiedSeats();


    const setSeatOccupied = () => {
        let seats = document.querySelectorAll(".theater-seat");
        if (occupiedSeatsMap.size > 0) {
            console.log(occupiedSeatsMap)
            // seats.forEach((seat) => {
            //     let seatRow = seat.getAttribute("data-row"); // convert to number!!!
            //     let seatColumn = seat.getAttribute("data-column"); // convert to number!!!


                // occupiedSeats[0].forEach((currentOccupied) => {
                //     console.log(currentOccupied);
                //     currentOccupied.forEach((actualFilled) => {
                //         console.log(actualFilled.seat);
                //     })
                // })
            // })
        }
    }

    setSeatOccupied();

    return (
        <div style={mainCardStyle}
             key="seating-chart"
             className="card-deck m-auto">
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