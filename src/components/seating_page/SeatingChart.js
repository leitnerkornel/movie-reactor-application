import React, {useEffect} from "react";
import TheaterSeat from "./TheaterSeat";

const SeatingChart = (props) => {

    let freeSeatClass = "fa-square-o";
    let occupiedSeatClass = "fa-square";
    let ownReserveSeatClass = "fa-plus-square";

    let reactorYellow = "#e6b31e";

    let occupiedSeats = props.reservedSeats;
    let room = props.room;
    let seats = room.seats;
    let columns = [[]];

    function fillSeatsTable() {
        // create 2D array for seats
        for (let actualRowNumber = 0; actualRowNumber < room.numberOfRows - 1; actualRowNumber++) {
            let row = []
            for (let actualSeatNumber = 0; actualSeatNumber < room.numberOfSeatsPerRow; actualSeatNumber++) {
                row.push(<div>Seat here</div>)
            }
            columns.push(row);
        }

        // place seats in the array
        let previousSeat = null;
        for (let seat of seats) {
            let currentRowNumber = parseInt(seat.rowNumber);
            let currentSeatNumber = parseInt(seat.seatNumber);
            columns[currentRowNumber - 1][currentSeatNumber - 1] = (
                <TheaterSeat key={`row-${currentRowNumber}-seat-${currentSeatNumber}`}
                             row={currentRowNumber}
                             column={currentSeatNumber}
                             id={seat.id}
                />);
            if (previousSeat != null) {
                if (parseInt(previousSeat.rowNumber) < currentRowNumber + 1) {

                    columns[currentRowNumber - 1][currentSeatNumber] =
                        <p key={`element-${currentRowNumber}`} className="row no-gutters"/>;
                }
            }
            previousSeat = seat;
        }
    }

    function occupySeats() {
        let occupiedSeatIds = [];
        for (let occupiedSeat of occupiedSeats) {
            occupiedSeatIds.push(parseInt(occupiedSeat.seat.id));
        }

        let allSeats = document.getElementsByClassName("theater-seat");

        for (let seat of allSeats) {
            if (occupiedSeatIds.includes(parseInt(seat.dataset.id)) && seat.classList.contains(freeSeatClass)) {
                seat.classList.add(occupiedSeatClass);
                seat.classList.remove(freeSeatClass);
                seat.style.color = reactorYellow;
                seat.style.opacity = "0.5";
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    fillSeatsTable();
    occupySeats();

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