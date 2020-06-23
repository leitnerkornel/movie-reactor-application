import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_URL_MOVIE, API_URL_PICTURE, API_KEY, IMAGE_SIZES} from "../../Constants";
import {getMovieIdFromUrl} from "../../Utils";
import SeatingPicture from "../seating_page/SeatingPicture";
import FirstRow from "../movie_detail_page/FirstRow";
import TheaterSeat from "./TheaterSeat";

const SeatingChart = (props) => {

    let freeSeatClass = "fa-square-o";
    let occupiedSeatClass = "fa-square";
    let ownReserveSeatClass = "fa-plus-square";

    let reactorYellow = "#e6b31e";

    let [occupiedSeats, setOccupiedSeats] = useState(props.reservedSeats);
    let occupiedSeatsMap = new Map(); // key: row; value: column
    let seats = props.room.seats;

    let columns = [[]];
    for (let i = 0; i < props.columns; i++) {
        let row = []
        for (let j = 0; j < props.rows; j++) {
            row.push(<TheaterSeat key={`row-${i}-seat-${j}`} row={j} column={i}/>)
        }
        columns.push(<>{row} <p/></>)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
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

    // getOccupiedSeats();

    function drawOccupiedSeats(seat) {
        let seatRow = seat.getAttribute("data-row").toString();
        let seatColumn = seat.getAttribute("data-column").toString();
        if (occupiedSeatsMap.get(seatRow) !== undefined) {
            let currentRowSeatsTaken = occupiedSeatsMap.get(seatRow);
            if (currentRowSeatsTaken.indexOf(seatColumn) !== -1) {
                if (seat.classList.contains(freeSeatClass)) {
                    seat.classList.add(occupiedSeatClass);
                    seat.classList.remove(freeSeatClass);
                    seat.style.color = reactorYellow;
                    seat.style.opacity = "0.5";
                }
            }
        }
    }

    // key: row; value: column
    const seatsSetup = () => {
        if (occupiedSeatsMap.size > 0) {
            seats.forEach((seat) => {
                drawOccupiedSeats(seat);
            })
        }
    }

    seatsSetup();

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