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
    let occupiedSeatsMap = new Map(); // key: row; value: column

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
        }
    }

    getOccupiedSeats();


    // key: row; value: column
    const setSeatOccupied = () => {
        let seats = document.querySelectorAll(".theater-seat");
        if (occupiedSeatsMap.size > 0) {
            seats.forEach((seat) => {
                // console.log(seat)
                let seatRow = seat.getAttribute("data-row").toString(); // convert to number!!!
                let seatColumn = seat.getAttribute("data-column").toString(); // convert to number!!!

                // console.log(occupiedSeatsMap)

                if (occupiedSeatsMap.get(seatRow) !== undefined) {
                    let currentRowSeatsTaken = occupiedSeatsMap.get(seatRow);
                    if (currentRowSeatsTaken.indexOf(seatColumn) !== -1) {
                        // console.log(seat.classList)
                        if (seat.classList.contains(freeSeatString)) {
                            // console.log("contains");
                            seat.classList.add(occupiedSeatString);
                            seat.classList.remove(freeSeatString);

                            seat.style.color ="#e6b31e";
                            seat.style.opacity = "0.5";
                        }
                    }
                }
            })
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